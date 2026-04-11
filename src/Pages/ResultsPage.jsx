// src/components/Pages/ResultsPage.jsx
import React, { useMemo } from 'react';
import { RefreshCw, DollarSign, BarChart2, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import { useCaseFitAnalysis } from '../../utils/cloudLogic';

const ResultsPage = ({ results, inputs, handleReset, setPage }) => {
    const ResultDisplay = useMemo(() => {
        if (!results) return null;

        const { costs, cheapest, mostExpensive, savings, recommendation } = results;
        const recommendationAnalysis = useCaseFitAnalysis(inputs.useCase, recommendation, inputs);
        
        // Calculate future projection
        const projectionFactor = inputs.futureProjectionMonths;
        const projectedCosts = Object.fromEntries(
            Object.entries(costs).map(([provider, data]) => [
                provider, 
                (data.total * projectionFactor).toFixed(2)
            ])
        );

        const renderBreakdown = (provider) => (
            <div key={provider} className="ccc-breakdown-card">
                <h4 className="ccc-breakdown-title">{provider} Cost Breakdown:</h4>
                <ul className="ccc-breakdown-list">
                    {Object.entries(costs[provider].breakdown).map(([category, cost]) => (
                        <li key={category} className="ccc-breakdown-item">
                            <span className="ccc-breakdown-category">{category}:</span>
                            <span>${cost.toFixed(2).toLocaleString()}</span>
                        </li>
                    ))}
                    <li className="ccc-breakdown-projected">
                        <span>Projected {projectionFactor} Months:</span>
                        <span className="ccc-projected-cost">${projectedCosts[provider].toLocaleString()}</span>
                    </li>
                </ul>
            </div>
        );

        const renderSuitability = (provider) => {
            const fit = useCaseFitAnalysis(inputs.useCase, provider, inputs);
            const suitabilityClass = fit.suitability === 'High' ? 'ccc-text-indigo-600' : 'ccc-text-yellow-600';
            return (
                <div key={provider} className="ccc-suitability-card">
                    <h4 className="ccc-suitability-title">{provider}</h4>
                    <p className={`ccc-suitability-label ${suitabilityClass}`}>Suitability: {fit.suitability}</p>
                    <p className="ccc-suitability-text"><span className="ccc-text-green-600 ccc-font-medium">Strengths:</span> {fit.strength}</p>
                    <p className="ccc-suitability-text ccc-mt-1"><span className="ccc-text-red-600 ccc-font-medium">Weaknesses:</span> {fit.weakness}</p>
                </div>
            );
        };
        
        return (
            <div className="ccc-space-y-8 ccc-animate-fade-in ccc-max-w-7xl ccc-mx-auto">
                {/* Summary Panel */}
                <div className="ccc-summary-panel">
                    <div className="ccc-flex-items ccc-mb-4">
                        <BarChart2 size={24} color="#4F46E5" style={{ marginRight: '0.75rem' }} />
                        <h2 className="ccc-title-2xl ccc-font-extrabold ccc-text-gray-900">Cost Comparison Summary</h2>
                    </div>
                    <p className="ccc-text-lg ccc-text-gray-600 ccc-mb-6">
                        <span className="ccc-text-indigo-600 ccc-font-semibold">🔍 Stack:</span> {inputs.backend} on {inputs.databaseTech} |
                        <span className="ccc-text-indigo-600 ccc-font-semibold"> 🌎 Region:</span> {inputs.region}
                    </p>
                    <div className="ccc-grid-responsive-3 ccc-gap-4 ccc-mb-8">
                        {Object.entries(costs).map(([provider, cost]) => {
                            const isCheapest = provider === cheapest;
                            const isRecommended = provider === recommendation;
                            const cardClass = isCheapest 
                                ? 'ccc-result-card ccc-result-card-cheapest' 
                                : isRecommended && !isCheapest
                                    ? 'ccc-result-card ccc-result-card-recommended' 
                                    : 'ccc-result-card';

                            return (
                                <div key={provider} className={cardClass}>
                                    <h3 className="ccc-result-card-title ccc-flex-items">
                                        {provider}
                                        {isCheapest && <DollarSign size={16} color="#16A34A" style={{ marginLeft: '0.5rem' }} />}
                                        {isRecommended && <CheckCircle size={16} color="#4F46E5" style={{ marginLeft: '0.5rem' }} />}
                                    </h3>
                                    <p className="ccc-result-cost">${cost.total.toLocaleString()}</p>
                                    <p className="ccc-result-label">Estimated Monthly Cost</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="ccc-recommendation-box">
                        <h3 className="ccc-recommendation-title ccc-flex-items"><Truck size={20} style={{ marginRight: '0.5rem' }} /> 🧠 Recommendation: {recommendation}</h3>
                        <p className="ccc-text-sm">{recommendation} is recommended for <span className="ccc-font-semibold">{inputs.useCase}</span> due to <span className="ccc-font-semibold">{recommendationAnalysis.strength.split('. ')[0]}</span> and {recommendation === cheapest ? 'being the cheapest option.' : `its superior fit despite the slightly higher cost.`}</p>
                        <p className="ccc-text-xs ccc-mt-2">(Cheapest Provider: {cheapest} | Savings: {savings}% compared to {mostExpensive}.)</p>
                    </div>
                </div>
                    {/* Detailed Analysis */}
                <div className="ccc-space-y-6">
                    <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">🧩 Detailed Use Case Fit Analysis</h3>
                    <div className="ccc-grid-responsive-3 ccc-gap-4">{['AWS', 'Azure', 'GCP'].map(provider => renderSuitability(provider))}</div>
                </div>
                {/* Full Breakdown */}
                <div className="ccc-space-y-6">
                    <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">🧮 Detailed Cost Breakdown by Category</h3>
                    <div className="ccc-grid-responsive-3 ccc-gap-4">{['AWS', 'Azure', 'GCP'].map(provider => renderBreakdown(provider))}</div>
                </div>
            </div>
        );
    }, [results, inputs]);

    return (
        <div>
            {ResultDisplay}
            <div className="ccc-flex-controls ccc-mt-8">
                <button
                    onClick={() => setPage('configuration')}
                    className="ccc-button-secondary ccc-flex-center ccc-w-full-sm"
                >
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Edit
                </button>
                <button
                    onClick={handleReset}
                    className="ccc-button-reset ccc-flex-center ccc-w-full-sm"
                >
                    <RefreshCw size={20} style={{ marginRight: '0.5rem' }} /> Start New Comparison
                </button>
            </div>
        </div>
    );
};

export default ResultsPage;