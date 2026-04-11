// src/components/Pages/ConfigurationPage.jsx
import React from 'react';
import { ArrowLeft, BarChart2, Zap, Code, Database, CheckCircle, Leaf, Cpu, HardDrive, Globe, Settings } from 'lucide-react';
import InputGroup from '../Shared/InputGroup';
import InputToggle from '../Shared/InputToggle';

const ConfigurationPage = ({ inputs, handleChange, runComparison, setPage, isLoading }) => (
    <div className="ccc-animate-fade-in ccc-max-w-7xl ccc-mx-auto">
        <div className="ccc-grid-responsive-3 ccc-gap-8">
            {/* Main Inputs */}
            <div className="ccc-col-span-2 ccc-page-card">
                <div className="ccc-config-section-header">
                    <div className="ccc-config-section-icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                        <Settings size={16} />
                    </div>
                    <h2 className="ccc-title-lg ccc-text-gray-800">Deployment Configuration</h2>
                </div>
                <p className="ccc-config-section-desc">Configure your cloud deployment parameters for accurate cost estimation.</p>

                <div className="ccc-grid-responsive-2 ccc-gap-x-8 ccc-gap-y-6">
                    {/* Use Case & Region */}
                    <InputGroup icon={<Globe size={18} color="#6366f1" />} label="Use Case" name="useCase" value={inputs.useCase} onChange={handleChange} type="select" options={['Software Development', 'Big Data Analytics', 'Machine Learning/AI', 'Web Hosting', 'Database Management', 'IoT', 'Enterprise Apps']} />
                    <InputGroup icon={<Globe size={18} color="#6366f1" />} label="Region" name="region" value={inputs.region} onChange={handleChange} type="select" options={['US-East', 'Europe-West', 'Asia-South']} />
                    
                    {/* Compute */}
                    <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="vCPUs per Instance" name="vCPUs" value={inputs.vCPUs} onChange={handleChange} type="number" min="1" step="4" />
                    <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="RAM (GB) per Instance" name="ramPerInstance" value={inputs.ramPerInstance} onChange={handleChange} type="number" min="1" step="4" />
                    
                    <div className="ccc-col-span-full">
                        <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="Number of Instances" name="numInstances" value={inputs.numInstances} onChange={handleChange} type="number" min="1" step="1" />
                    </div>

                    {/* Storage */}
                    <InputGroup icon={<HardDrive size={18} color="#10b981" />} label="Total Storage (GB)" name="storageSize" value={inputs.storageSize} onChange={handleChange} type="number" min="1" step="100" />
                    <InputGroup icon={<HardDrive size={18} color="#10b981" />} label="Storage Type" name="storageType" value={inputs.storageType} onChange={handleChange} type="select" options={['SSD/Standard', 'Cold/Archive']} />
                    
                    {/* Database */}
                    <InputGroup icon={<Database size={18} color="#3b82f6" />} label="Database Size (GB)" name="dbSize" value={inputs.dbSize} onChange={handleChange} type="number" min="1" step="100" />
                    <InputGroup icon={<Database size={18} color="#3b82f6" />} label="Database Type" name="dbType" value={inputs.dbType} onChange={handleChange} type="select" options={['SQL', 'NoSQL']} />
                    
                    {/* Networking */}
                    <div className="ccc-col-span-full">
                        <InputGroup icon={<Globe size={18} color="#f59e0b" />} label="Networking Egress (GB/month)" name="networkingBandwidth" value={inputs.networkingBandwidth} onChange={handleChange} type="number" min="1" step="100" />
                    </div>
                    
                    {/* Pricing */}
                    <div className="ccc-col-span-full">
                        <InputGroup icon={<BarChart2 size={18} color="#ec4899" />} label="Pricing Model" name="pricingModel" value={inputs.pricingModel} onChange={handleChange} type="select" options={['On-demand', 'Reserved (1yr)', 'Reserved (3yr)', 'Spot/Preemptible']} />
                    </div>
                </div>
            </div>
            
            {/* Advanced Options */}
            <div className="ccc-col-span-1 ccc-page-card">
                <div className="ccc-config-section-header">
                    <div className="ccc-config-section-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6' }}>
                        <Zap size={16} />
                    </div>
                    <h2 className="ccc-title-lg ccc-text-gray-800">Advanced Options</h2>
                </div>
                <p className="ccc-config-section-desc">Fine-tune your priorities and toggle additional services.</p>
                
                <div className="ccc-space-y-4">
                    <InputToggle label={<><Zap size={16} style={{ marginRight: '0.25rem' }} color="#CA8A04" /> Auto-scaling / Elasticity</>} name="autoScaling" checked={inputs.autoScaling === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><Code size={16} style={{ marginRight: '0.25rem' }} color="#2563EB" /> Serverless options (e.g., Lambda)</>} name="serverlessOptions" checked={inputs.serverlessOptions === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><Database size={16} style={{ marginRight: '0.25rem' }} color="#10B981" /> AI/ML Integration (e.g., specific APIs)</>} name="aiMlIntegration" checked={inputs.aiMlIntegration === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><CheckCircle size={16} style={{ marginRight: '0.25rem' }} color="#4F46E5" /> High Availability (Multi-AZ)</>} name="highAvailability" checked={inputs.highAvailability === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><Leaf size={16} style={{ marginRight: '0.25rem' }} color="#65A30D" /> Sustainability focus</>} name="sustainabilityFocus" checked={inputs.sustainabilityFocus === 'Yes'} onChange={handleChange} />
                    
                    <div style={{ paddingTop: '1rem' }}>
                        <label className="ccc-label ccc-mb-2">Performance Weight ({inputs.performanceWeight} / 10)</label>
                        <input 
                            type="range" 
                            name="performanceWeight" 
                            min="1" max="10" 
                            value={inputs.performanceWeight} 
                            onChange={handleChange} 
                            className="ccc-range-slider" 
                        />
                        <div className="ccc-range-labels"><span>Prioritize Cost</span><span>Prioritize Performance</span></div>
                    </div>
                    
                    <div style={{ paddingTop: '1rem' }}>
                        <label className="ccc-label ccc-mb-2">Future Cost Projection (Up to {inputs.futureProjectionMonths} months)</label>
                        <input 
                            type="range" 
                            name="futureProjectionMonths" 
                            min="0" max="36" 
                            step="3" 
                            value={inputs.futureProjectionMonths} 
                            onChange={handleChange} 
                            className="ccc-range-slider" 
                        />
                        <div className="ccc-range-labels"><span>0 months</span><span>36 months</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ccc-flex-controls ccc-mt-8">
            <button
                onClick={() => setPage('techStack')}
                className="ccc-button-base ccc-button-secondary ccc-flex-center ccc-w-full-sm"
            >
                <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back
            </button>
            <button
                onClick={runComparison}
                disabled={isLoading}
                className={`ccc-button-base ccc-button-primary ccc-flex-center ccc-w-full-sm ${isLoading ? 'ccc-button-disabled' : ''}`}
            >
                {isLoading ? (
                    <svg className="ccc-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="ccc-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="ccc-spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <span className="ccc-flex-center"><BarChart2 size={20} style={{ marginRight: '0.5rem' }} /> Compare Cloud Costs</span>
                )}
            </button>
        </div>
    </div>
);

export default ConfigurationPage;