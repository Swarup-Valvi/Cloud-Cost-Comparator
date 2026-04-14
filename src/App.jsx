// src/components/App.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, Sun, Moon } from 'lucide-react';

// Import all pages and utilities
import TechStackPage from './Pages/TechStackPage';
import ConfigurationPage from './Pages/ConfigurationPage';
import ResultsPage from './Pages/ResultsPage';
import { initialInputs, calculateCosts, useCaseFitAnalysis } from '../utils/cloudLogic';

// Import CSS
import '../styles/App.css'; 

// --- Step Indicator Component ---

const StepIndicator = ({ currentStep }) => {
    const steps = ['Tech Stack', 'Configuration', 'Results'];
    const stepMap = { techStack: 1, configuration: 2, results: 3 };
    const currentStepNum = stepMap[currentStep];

    return (
        <div className="ccc-step-indicator-wrapper">
            {steps.map((step, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStepNum;
                const isCompleted = stepNum < currentStepNum;
                return (
                    <React.Fragment key={step}>
                        <div className="ccc-flex-items">
                            <div className={`ccc-step-circle ${isActive ? 'ccc-step-active' : isCompleted ? 'ccc-step-completed' : 'ccc-step-default'}`}>
                                {isCompleted ? <CheckCircle size={20} /> : stepNum}
                            </div>
                            <span className={`ccc-step-label ${isActive ? 'ccc-step-label-active' : 'ccc-step-label-default'}`}>{step}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`ccc-step-line ${isCompleted ? 'ccc-step-line-completed' : isActive ? 'ccc-step-line-active' : 'ccc-step-line-default'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// --- Dark Mode Toggle ---

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
    <div className="ccc-dark-toggle-wrapper">
        <button
            className="ccc-dark-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    </div>
);

// --- Main Application Component ---

const App = () => {
    const [page, setPage] = useState('techStack'); // 'techStack', 'configuration', 'results'
    const [inputs, setInputs] = useState(initialInputs);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'
    const [currency, setCurrency] = useState('USD'); // 'USD' or 'INR'
    const EXCHANGE_RATE = 83.5; // Current approximate USD to INR rate

    // Apply dark mode class to body
    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        return () => document.body.classList.remove('dark-mode');
    }, [darkMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Correctly handle input types, ensuring numbers are parsed as floats
        setInputs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : (type === 'range' || type === 'number' ? parseFloat(value) || 0 : value),
        }));
    };

    const handleReset = () => {
        setInputs(initialInputs);
        setResults(null);
        setPage('techStack');
        setBillingPeriod('monthly');
    };

    const [history, setHistory] = useState([]);
    const [latencies, setLatencies] = useState(null);

    const fetchHistory = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/history');
            const data = await res.json();
            setHistory(data);
        } catch (err) {
            console.error('Failed to fetch history', err);
        }
    };

    const fetchLatencies = async (region) => {
        try {
            const res = await fetch(`http://localhost:5001/api/ping?region=${region}`);
            const data = await res.json();
            setLatencies(data);
        } catch (err) {
            console.error('Failed to fetch latencies', err);
        }
    };

    // Real-time updates effect
    useEffect(() => {
        let interval;
        if (page === 'results' && results) {
            interval = setInterval(() => {
                fetchLatencies(inputs.region);
                fetchHistory();
            }, 5000); // Update every 5 seconds
        }
        return () => clearInterval(interval);
    }, [page, results, inputs.region]);

    const runComparison = async () => {
        setIsLoading(true);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5001/api/compare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputs })
            });
            const calculatedCosts = await response.json();
            
            await fetchLatencies(inputs.region);
            await fetchHistory();

            const sortedCosts = Object.entries(calculatedCosts).sort((a, b) => a[1].total - b[1].total);
            const cheapest = sortedCosts[0];
            const mostExpensive = sortedCosts[sortedCosts.length - 1];
            let savingsPercent = mostExpensive[1].total > 0 ? ((mostExpensive[1].total - cheapest[1].total) / mostExpensive[1].total) * 100 : 0;
            
            const mostSuitable = Object.keys(calculatedCosts).sort((a, b) => {
                const aFit = useCaseFitAnalysis(inputs.useCase, a, inputs).suitability === 'High' ? 2 : 1;
                const bFit = useCaseFitAnalysis(inputs.useCase, b, inputs).suitability === 'High' ? 2 : 1;
                return bFit - aFit;
            })[0];
            
            let recommendation = cheapest[0];
            if (inputs.performanceWeight > 7 && useCaseFitAnalysis(inputs.useCase, mostSuitable, inputs).suitability === 'High') {
                if ((calculatedCosts[mostSuitable].total - cheapest[1].total) / cheapest[1].total <= 0.10) {
                      recommendation = mostSuitable;
                }
            } else if (useCaseFitAnalysis(inputs.useCase, cheapest[0], inputs).suitability !== 'High' && useCaseFitAnalysis(inputs.useCase, mostSuitable, inputs).suitability === 'High') {
                recommendation = mostSuitable;
            }

            setResults({
                costs: calculatedCosts,
                cheapest: cheapest[0], mostExpensive: mostExpensive[0],
                savings: savingsPercent.toFixed(1), recommendation,
            });
            setPage('results');
        } catch (error) {
            console.error('Error running comparison:', error);
            // Fallback to local calculation if backend fails
            const localResults = calculateCosts(inputs);
            setResults({
                costs: localResults,
                cheapest: 'AWS', mostExpensive: 'GCP', savings: '0', recommendation: 'AWS'
            });
            setPage('results');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }} className="ccc-main-container">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            
            <header className="ccc-header-wrapper">
                <h1 className="ccc-title-4xl">
                    <RefreshCw size={32} style={{ marginRight: '0.75rem' }} color={darkMode ? '#818cf8' : '#4F46E5'} />
                    Cloud Cost Comparator & Advisor
                </h1>
                <p className="ccc-text-lg ccc-text-gray-500 ccc-mt-2">A guided multi-cloud cost analysis for your specific stack.</p>
            </header>

            <div className="ccc-max-w-7xl ccc-mx-auto">
                <StepIndicator currentStep={page} />

                {page === 'techStack' && <TechStackPage inputs={inputs} handleChange={handleChange} setPage={setPage} />}
                {page === 'configuration' && <ConfigurationPage inputs={inputs} handleChange={handleChange} runComparison={runComparison} setPage={setPage} isLoading={isLoading} />}
                {page === 'results' && <ResultsPage results={results} inputs={inputs} handleReset={handleReset} setPage={setPage} billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} currency={currency} setCurrency={setCurrency} exchangeRate={EXCHANGE_RATE} history={history} latencies={latencies} />}
            </div>
        </div>
    );
};

export default App;