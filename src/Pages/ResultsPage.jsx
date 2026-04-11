// src/components/Pages/ResultsPage.jsx
import React, { useMemo } from 'react';
import { RefreshCw, DollarSign, BarChart2, CheckCircle, Truck, ArrowLeft, Cpu, HardDrive, Database, Wifi, Settings, Lightbulb, AlertTriangle, Info } from 'lucide-react';
import { useCaseFitAnalysis } from '../../utils/cloudLogic';

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

// --- Bar Chart Component ---


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

// --- Category Breakdown Cards ---
const CategoryBreakdownCards = ({ costs, billingPeriod }) => {
    const multiplier = billingPeriod === 'yearly' ? 12 : 1;
    const categories = ['Compute', 'Storage', 'Networking', 'Database', 'Services'];
    const icons = {
        Compute: { icon: '⚡', cls: 'compute' },
        Storage: { icon: '💾', cls: 'storage' },
        Networking: { icon: '🌐', cls: 'network' },
        Database: { icon: '🗄️', cls: 'database' },
        Services: { icon: '⚙️', cls: 'services' },
    };

    return (
        <div>
            <h3 className="ccc-title-lg ccc-text-gray-800 ccc-border-b ccc-pb-2">
                💳 Cost Breakdown by Category
            </h3>
            <div className="ccc-category-cards-wrapper">
                {categories.map(category => {
                    const meta = icons[category] || { icon: '📦', cls: 'compute' };
                    return (
                        <div key={category} className={`ccc-category-card ccc-category-card-${meta.cls}`}>
                            <div className={`ccc-category-card-icon ccc-category-card-icon-${meta.cls}`}>
                                {meta.icon}
                            </div>
                            <div className="ccc-category-card-title">{category}</div>
                            <div className="ccc-category-card-costs">
                                {Object.entries(costs).map(([provider, data]) => {
                                    const val = (data.breakdown[category] || 0) * multiplier;
                                    return (
                                        <div key={provider} className="ccc-category-cost-row">
                                            <span className="ccc-category-provider">{provider}</span>
                                            <span className="ccc-category-amount">${val.toFixed(2)}</span>
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

// --- Assumptions Section ---
const AssumptionsSection = () => (
    <div className="ccc-info-section">
        <h3 className="ccc-info-section-title">
            <AlertTriangle size={20} color="#f59e0b" /> Assumptions & Disclaimers
        </h3>
        <ul className="ccc-info-list">
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Pricing is based on <strong>approximate public list prices</strong> as of 2024–2025. Actual costs may differ depending on your agreement and usage pattern.</span>
            </li>
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Compute costs assume <strong>730 hours/month</strong> (24×7 operation). Real workloads may vary with auto-scaling and idle periods.</span>
            </li>
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Storage rates are based on <strong>standard SSD or cold/archive tiers</strong>. Premium storage tiers may cost more.</span>
            </li>
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Database costs include a <strong>25% multiplier for High Availability / Daily Backups</strong> when those options are enabled.</span>
            </li>
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Networking costs cover <strong>egress bandwidth only</strong>. Ingress is generally free across all three providers.</span>
            </li>
            <li>
                <span className="ccc-info-bullet ccc-info-bullet-assumption">📌</span>
                <span>Free tier credits, enterprise discounts, and negotiated pricing are <strong>not included</strong> in these estimates.</span>
            </li>
        </ul>
    </div>
);




// --- Main Results Page Component ---

const ResultsPage = ({ results, inputs, handleReset, setPage, billingPeriod, setBillingPeriod }) => {
    const ResultDisplay = useMemo(() => {
        if (!results) return null;

        const { costs, cheapest, mostExpensive, savings, recommendation } = results;
        const recommendationAnalysis = useCaseFitAnalysis(inputs.useCase, recommendation, inputs);
        const multiplier = billingPeriod === 'yearly' ? 12 : 1;
        const periodLabel = billingPeriod === 'yearly' ? 'Yearly' : 'Monthly';

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
                <h4 className="ccc-breakdown-title">
                    <ProviderLogo provider={provider} />
                    {provider} Cost Breakdown
                </h4>
                <ul className="ccc-breakdown-list">
                    {Object.entries(costs[provider].breakdown).map(([category, cost]) => (
                        <li key={category} className="ccc-breakdown-item">
                            <span className="ccc-breakdown-category">{category}:</span>
                            <span>${(cost * multiplier).toFixed(2).toLocaleString()}</span>
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
                        <BillingToggle billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
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
                                    <h3 className="ccc-result-card-title ccc-flex-items">
                                        <ProviderLogo provider={provider} />
                                        {provider}
                                    </h3>
                                    <p className="ccc-result-cost">${(cost.total * multiplier).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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



                {/* Cost Breakdown Category Cards */}
                <CategoryBreakdownCards costs={costs} billingPeriod={billingPeriod} />

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

                {/* Assumptions Section */}
                <AssumptionsSection />
            </div>
        );
    }, [results, inputs, billingPeriod]);

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