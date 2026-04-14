// src/components/Pages/ResultsPage.jsx
import React, { useMemo } from 'react';
import { RefreshCw, DollarSign, BarChart2, CheckCircle, Truck, ArrowLeft, Cpu, HardDrive, Database, Wifi, Settings, Lightbulb, AlertTriangle, Info, Leaf } from 'lucide-react';
import { useCaseFitAnalysis, NIST_MODELS } from '../../utils/cloudLogic';

// --- Provider Logo Component ---
const ProviderLogo = ({ provider, size = 'default' }) => {
    const logos = {
        AWS: { emoji: '☁️', className: 'ccc-provider-logo-aws', label: 'AWS' },
        Azure: { emoji: '🔷', className: 'ccc-provider-logo-azure', label: 'Azure' },
        GCP: { emoji: '🌐', className: 'ccc-provider-logo-gcp', label: 'GCP' },
    };
    const logo = logos[provider] || logos.AWS;
    return (
        <div className={`ccc-provider-logo ${logo.className} ${size === 'lg' ? 'ccc-provider-logo-lg' : ''}`}>
            {logo.emoji}
        </div>
    );
};

// --- Billing Period Toggle ---
const BillingToggle = ({ billingPeriod, setBillingPeriod }) => (
    <div className="ccc-billing-toggle">
        <button
            className={`ccc-billing-toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingPeriod('monthly')}
        >
            Monthly
        </button>
        <button
            className={`ccc-billing-toggle-btn ${billingPeriod === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingPeriod('yearly')}
        >
            Yearly
        </button>
    </div>
);

// --- Carbon Score Badge ---
const CarbonScoreBadge = ({ score }) => {
    const colors = {
        'A+': '#059669', 'A': '#10b981', 'B+': '#34d399', 'B': '#fbbf24', 'C': '#f87171'
    };
    return (
        <div className="ccc-carbon-badge" style={{ backgroundColor: colors[score] || '#fbbf24' }}>
            <Leaf size={12} style={{ marginRight: '0.25rem' }} />
            Carbon: {score}
        </div>
    );
};

// --- Currency Toggle ---
const CurrencyToggle = ({ currency, setCurrency }) => (
    <div className="ccc-billing-toggle ccc-ml-4">
        <button
            className={`ccc-billing-toggle-btn ${currency === 'USD' ? 'active' : ''}`}
            onClick={() => setCurrency('USD')}
        >
            $ USD
        </button>
        <button
            className={`ccc-billing-toggle-btn ${currency === 'INR' ? 'active' : ''}`}
            onClick={() => setCurrency('INR')}
        >
            ₹ INR
        </button>
    </div>
);

// --- Category Breakdown Cards ---
const CategoryBreakdownCards = ({ costs, billingPeriod, currency, exchangeRate }) => {
    const multiplier = (billingPeriod === 'yearly' ? 12 : 1) * (currency === 'INR' ? exchangeRate : 1);
    const categories = ['Compute', 'Storage', 'Networking', 'Database', 'Serverless', 'Services'];
    const icons = {
        Compute: { icon: '⚡', cls: 'compute' },
        Storage: { icon: '💾', cls: 'storage' },
        Networking: { icon: '🌐', cls: 'network' },
        Database: { icon: '🗄️', cls: 'database' },
        Serverless: { icon: 'λ', cls: 'serverless' },
        Services: { icon: '⚙️', cls: 'services' },
    };

    return (
        <div>
            <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">
                💳 Monthly Cost Breakdown by Category (NIST Models)
            </h3>
            <div className="ccc-category-cards-wrapper">
                {categories.map(category => {
                    const meta = icons[category] || { icon: '📦', cls: 'compute' };
                    const nist = NIST_MODELS[category] || 'IaaS';
                    return (
                        <div key={category} className={`ccc-category-card ccc-category-card-${meta.cls}`}>
                            <div className="ccc-flex-items ccc-justify-between ccc-mb-3">
                                <div className={`ccc-category-card-icon ccc-category-card-icon-${meta.cls}`}>
                                    {meta.icon}
                                </div>
                                <span className="ccc-nist-tag">{nist}</span>
                            </div>
                            <div className="ccc-category-card-title">{category}</div>
                            <div className="ccc-category-card-costs">
                                {Object.entries(costs).map(([provider, data]) => {
                                    const val = (data.breakdown[category] || 0) * multiplier;
                                    return (
                                        <div key={provider} className="ccc-category-cost-row">
                                            <span className="ccc-category-provider">{provider}</span>
                                            <span className="ccc-category-amount">{currency === 'INR' ? '₹' : '$'}{val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Use Case Suggestions ---
const UseCaseSuggestions = ({ recommendation, useCase }) => {
    const suggestions = [
        { label: 'Best for Startups', icon: '🚀', cls: 'startup', provider: 'GCP', reason: 'Free tier credits & competitive pricing' },
        { label: 'Best for AI/ML', icon: '🧠', cls: 'aiml', provider: 'GCP', reason: 'Vertex AI, TPUs, BigQuery ML' },
        { label: 'Best for Enterprise', icon: '🏢', cls: 'enterprise', provider: 'Azure', reason: 'Hybrid cloud, Microsoft integration' },
        { label: 'Best for Low Budget', icon: '💰', cls: 'budget', provider: 'GCP', reason: 'Sustained-use discounts, preemptible VMs' },
    ];

    return (
        <div>
            <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2 ccc-mb-4">
                💡 Quick Recommendations
            </h3>
            <div className="ccc-usecase-suggestions">
                {suggestions.map((s, i) => (
                    <div key={i} className={`ccc-usecase-badge ccc-usecase-badge-${s.cls}`}>
                        <span className="ccc-usecase-badge-icon">{s.icon}</span>
                        <span>{s.label}: <strong>{s.provider}</strong></span>
                    </div>
                ))}
            </div>
        </div>
    );
};




// --- Latency Checker Component ---
const LatencyChecker = ({ latencies, region }) => {
    if (!latencies) return null;
    
    const providers = ['AWS', 'Azure', 'GCP'];
    const maxLatency = Math.max(...Object.values(latencies));
    
    return (
        <div className="ccc-latency-section">
            <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2 ccc-mb-4">
                ⚡ Multi-Cloud Latency Checker ({region})
            </h3>
            <div className="ccc-latency-grid">
                {providers.map(p => (
                    <div key={p} className="ccc-latency-item">
                        <div className="ccc-latency-label">
                            <ProviderLogo provider={p} size="sm" />
                            <span>{p}</span>
                        </div>
                        <div className="ccc-latency-bar-container">
                            <div 
                                className={`ccc-latency-bar ccc-latency-bar-${p.toLowerCase()}`} 
                                style={{ width: `${(latencies[p] / maxLatency) * 100}%` }}
                            ></div>
                        </div>
                        <span className="ccc-latency-value">{latencies[p]}ms</span>
                    </div>
                ))}
            </div>
            <p className="ccc-text-xs ccc-text-gray-500 ccc-mt-2">Real-time latency ping from Mumbai edge nodes to regional data centers.</p>
        </div>
    );
};

// --- Price History Graph ---
const PriceHistoryGraph = ({ history, currency, exchangeRate }) => {
    if (!history || history.length === 0) return null;

    // Process history data for visualization
    const providers = ['AWS', 'Azure', 'GCP'];
    const last10 = history.slice(-30); // Last 10 comparisons
    
    const curMultiplier = currency === 'INR' ? exchangeRate : 1;
    const curSymbol = currency === 'INR' ? '₹' : '$';
    const maxCost = Math.max(...last10.map(h => h.totalCost * curMultiplier));

    return (
        <div className="ccc-history-section">
            <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2 ccc-mb-4">
                📈 Price History (Real-time Fluctuations)
            </h3>
            <div className="ccc-history-chart">
                {last10.map((h, i) => (
                    <div key={i} className="ccc-history-point-wrapper">
                        <div 
                            className={`ccc-history-point ccc-history-point-${h.provider.toLowerCase()}`}
                            style={{ 
                                height: `${((h.totalCost * curMultiplier) / maxCost) * 150}px`,
                                left: `${(i / last10.length) * 100}%`
                            }}
                            title={`${h.provider}: ${curSymbol}${(h.totalCost * curMultiplier).toFixed(2)} at ${new Date(h.timestamp).toLocaleTimeString()}`}
                        ></div>
                    </div>
                ))}
            </div>
            <div className="ccc-flex-items ccc-justify-center ccc-mt-4 ccc-gap-4">
                {providers.map(p => (
                    <div key={p} className="ccc-flex-items ccc-text-xs">
                        <div className={`ccc-history-legend-dot ccc-history-legend-dot-${p.toLowerCase()}`}></div>
                        <span>{p}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ResultsPage = ({ results, inputs, handleReset, setPage, billingPeriod, setBillingPeriod, currency, setCurrency, exchangeRate, history, latencies }) => {
    const ResultDisplay = useMemo(() => {
        if (!results) return null;

        const { costs, cheapest, mostExpensive, savings, recommendation } = results;
        const recommendationAnalysis = useCaseFitAnalysis(inputs.useCase, recommendation, inputs);
        
        const baseMultiplier = billingPeriod === 'yearly' ? 12 : 1;
        const curMultiplier = currency === 'INR' ? exchangeRate : 1;
        const multiplier = baseMultiplier * curMultiplier;
        
        const periodLabel = billingPeriod === 'yearly' ? 'Yearly' : 'Monthly';
        const curSymbol = currency === 'INR' ? '₹' : '$';

        // Calculate future projection (includes currency conversion)
        const projectionFactor = inputs.futureProjectionMonths;
        const projectedCosts = Object.fromEntries(
            Object.entries(costs).map(([provider, data]) => [
                provider,
                (data.total * projectionFactor * curMultiplier).toFixed(2)
            ])
        );

        const renderBreakdown = (provider) => (
            <div key={provider} className="ccc-breakdown-card">
                <h4 className="ccc-breakdown-title">
                    <ProviderLogo provider={provider} />
                    {provider} Cost Breakdown
                </h4>
                <ul className="ccc-breakdown-list">
                    {Object.entries(costs[provider].breakdown).map(([category, cost]) => (
                        <li key={category} className="ccc-breakdown-item">
                            <span className="ccc-breakdown-category">{category}:</span>
                            <span>{curSymbol}{(cost * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </li>
                    ))}
                    <li className="ccc-breakdown-projected">
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Projected {projectionFactor} Mo:</span>
                        <span className="ccc-projected-cost">{curSymbol}{parseFloat(projectedCosts[provider]).toLocaleString()}</span>
                    </li>
                </ul>
            </div>
        );

        const renderSuitability = (provider) => {
            const fit = useCaseFitAnalysis(inputs.useCase, provider, inputs);
            const suitabilityClass = fit.suitability === 'High' ? 'ccc-text-indigo-600' : 'ccc-text-yellow-600';
            return (
                <div key={provider} className="ccc-suitability-card">
                    <div className="ccc-flex-items ccc-mb-2">
                        <ProviderLogo provider={provider} />
                        <h4 className="ccc-suitability-title" style={{ marginBottom: 0 }}>{provider}</h4>
                    </div>
                    <p className={`ccc-suitability-label ${suitabilityClass}`}>
                        Suitability: {fit.suitability === 'High' ? '🟢' : '🟡'} {fit.suitability}
                    </p>
                    <p className="ccc-suitability-text"><span className="ccc-text-green-600 ccc-font-medium">Strengths:</span> {fit.strength}</p>
                    <p className="ccc-suitability-text ccc-mt-1"><span className="ccc-text-red-600 ccc-font-medium">Weaknesses:</span> {fit.weakness}</p>
                </div>
            );
        };

        return (
            <div className="ccc-space-y-8 ccc-animate-fade-in ccc-max-w-7xl ccc-mx-auto">
                {/* Summary Panel */}
                <div className="ccc-summary-panel">
                    <div className="ccc-flex-items ccc-mb-4" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div className="ccc-flex-items">
                            <BarChart2 size={24} color="#6366f1" style={{ marginRight: '0.75rem' }} />
                            <h2 className="ccc-title-2xl ccc-font-extrabold ccc-text-gray-900">Cost Comparison Summary</h2>
                        </div>
                        <div className="ccc-flex-items">
                            <BillingToggle billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
                            <CurrencyToggle currency={currency} setCurrency={setCurrency} />
                        </div>
                    </div>
                    <p className="ccc-text-lg ccc-text-gray-600 ccc-mb-6">
                        <span className="ccc-text-indigo-600 ccc-font-semibold">🔍 Stack:</span> {inputs.backend} on {inputs.databaseTech} |
                        <span className="ccc-text-indigo-600 ccc-font-semibold"> 🌎 Region:</span> {inputs.region}
                    </p>

                    {/* Provider Cost Cards */}
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
                                    <div className="ccc-flex-items ccc-justify-between ccc-mb-2">
                                        <h3 className="ccc-result-card-title ccc-flex-items" style={{ margin: 0 }}>
                                            <ProviderLogo provider={provider} />
                                            {provider}
                                        </h3>
                                        <div className="ccc-flex-items ccc-gap-2">
                                            {inputs.architecture === 'Arm' && <span className="ccc-nist-tag" style={{ background: '#6366f1', color: 'white' }}>Arm</span>}
                                            <CarbonScoreBadge score={results.costs[provider].carbonScore} />
                                        </div>
                                    </div>
                                    <p className="ccc-result-cost">{curSymbol}{(cost.total * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    <p className="ccc-result-label">Estimated {periodLabel} Cost</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Recommendation Box */}
                    <div className="ccc-recommendation-box">
                        <h3 className="ccc-recommendation-title ccc-flex-items"><Truck size={20} style={{ marginRight: '0.5rem' }} /> 🧠 Recommendation: {recommendation}</h3>
                        <p className="ccc-text-sm">{recommendation} is recommended for <span className="ccc-font-semibold">{inputs.useCase}</span> due to <span className="ccc-font-semibold">{recommendationAnalysis.strength.split('. ')[0]}</span> and {recommendation === cheapest ? 'being the cheapest option.' : `its superior fit despite the slightly higher cost.`}</p>
                        <p className="ccc-text-xs ccc-mt-2">(Cheapest Provider: {cheapest} | Savings: {savings}% compared to {mostExpensive}.)</p>
                    </div>
                </div>

                {/* Performance & Price Analysis Grid */}
                <div className="ccc-grid-responsive-2 ccc-gap-8">
                     <LatencyChecker latencies={latencies} region={inputs.region} />
                     <PriceHistoryGraph history={history} currency={currency} exchangeRate={exchangeRate} />
                </div>

                {/* Cost Breakdown Category Cards */}
                <CategoryBreakdownCards costs={costs} billingPeriod={billingPeriod} currency={currency} exchangeRate={exchangeRate} />


                {/* Use-Case Suggestions */}
                <UseCaseSuggestions recommendation={recommendation} useCase={inputs.useCase} />

                {/* Detailed Analysis */}
                <div className="ccc-space-y-6">
                    <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">🧩 Detailed Use Case Fit Analysis</h3>
                    <div className="ccc-grid-responsive-3 ccc-gap-4">{['AWS', 'Azure', 'GCP'].map(provider => renderSuitability(provider))}</div>
                </div>

                {/* Full Breakdown */}
                <div className="ccc-space-y-6">
                    <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">🧮 Detailed Cost Breakdown by Provider</h3>
                    <div className="ccc-grid-responsive-3 ccc-gap-4">{['AWS', 'Azure', 'GCP'].map(provider => renderBreakdown(provider))}</div>
                </div>
            </div>
        );
    }, [results, inputs, billingPeriod, currency, exchangeRate]);

    return (
        <div>
            {ResultDisplay}
            <div className="ccc-flex-controls ccc-mt-8">
                <button
                    onClick={() => setPage('configuration')}
                    className="ccc-button-base ccc-button-secondary ccc-flex-center ccc-w-full-sm"
                >
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Edit
                </button>
                <button
                    onClick={handleReset}
                    className="ccc-button-base ccc-button-reset ccc-flex-center ccc-w-full-sm"
                >
                    <RefreshCw size={20} style={{ marginRight: '0.5rem' }} /> Start New Comparison
                </button>
            </div>
        </div>
    );
};

export default ResultsPage;