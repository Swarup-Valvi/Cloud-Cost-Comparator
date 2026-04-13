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
                    <InputGroup icon={<Globe size={18} color="#6366f1" />} label="Region" name="region" value={inputs.region} onChange={handleChange} type="select" options={['US-East', 'Europe-West', 'Asia-South', 'Mumbai']} />
                    
                    {/* Compute & GPU */}
                    <div className="ccc-col-span-full">
                        <div className="ccc-flex-items ccc-justify-between">
                            <h4 className="ccc-text-xs ccc-font-bold ccc-text-gray-400">COMPUTE (NIST: IaaS)</h4>
                            <div className="ccc-flex-items ccc-gap-2">
                                <span className={inputs.architecture === 'Arm' ? 'ccc-text-indigo-600 ccc-font-bold' : ''}>Arm</span>
                                <InputToggle name="architecture" checked={inputs.architecture === 'Arm'} onChange={(e) => handleChange({ target: { name: 'architecture', value: e.target.checked ? 'Arm' : 'x86_64' } })} />
                                <span className={inputs.architecture === 'x86_64' ? 'ccc-text-indigo-600 ccc-font-bold' : ''}>x86</span>
                            </div>
                        </div>
                    </div>
                    <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="vCPUs / Instance" name="vCPUs" value={inputs.vCPUs} onChange={handleChange} type="number" min="1" step="4" />
                    <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="RAM (GB) / Instance" name="ramPerInstance" value={inputs.ramPerInstance} onChange={handleChange} type="number" min="1" step="4" />
                    <InputGroup icon={<Zap size={18} color="#f59e0b" />} label="GPU Type" name="gpuType" value={inputs.gpuType} onChange={handleChange} type="select" options={['None', 'T4', 'V100', 'A100']} />
                    <InputGroup icon={<Cpu size={18} color="#8b5cf6" />} label="Quantity" name="numInstances" value={inputs.numInstances} onChange={handleChange} type="number" min="1" step="1" />

                    {/* Storage */}
                    <div className="ccc-col-span-full">
                        <h4 className="ccc-text-xs ccc-font-bold ccc-text-gray-400">STORAGE (NIST: IaaS)</h4>
                    </div>
                    <InputGroup icon={<HardDrive size={18} color="#10b981" />} label="Block Storage (GB)" name="storageSize" value={inputs.storageSize} onChange={handleChange} type="number" min="1" step="100" />
                    <InputGroup icon={<HardDrive size={18} color="#10b981" />} label="Object Storage (GB)" name="objectStorageSize" value={inputs.objectStorageSize} onChange={handleChange} type="number" min="1" step="100" />
                    
                    {/* Database */}
                    <div className="ccc-col-span-full">
                        <h4 className="ccc-text-xs ccc-font-bold ccc-text-gray-400">DATABASE (NIST: PaaS)</h4>
                    </div>
                    <InputGroup icon={<Database size={18} color="#3b82f6" />} label="DB Size (GB)" name="dbSize" value={inputs.dbSize} onChange={handleChange} type="number" min="1" step="100" />
                    <div className="ccc-flex-items" style={{ gap: '1rem' }}>
                        <InputGroup icon={<Database size={18} color="#3b82f6" />} label="DB Type" name="dbType" value={inputs.dbType} onChange={handleChange} type="select" options={['SQL', 'NoSQL']} />
                        <InputToggle label="Managed" name="isManagedDB" checked={inputs.isManagedDB === 'Yes'} onChange={handleChange} />
                    </div>
                    
                    {/* Networking */}
                    <div className="ccc-col-span-full">
                        <h4 className="ccc-text-xs ccc-font-bold ccc-text-gray-400">NETWORKING (NIST: IaaS)</h4>
                    </div>
                    <InputGroup icon={<Globe size={18} color="#f59e0b" />} label="Egress (GB/mo)" name="networkingBandwidth" value={inputs.networkingBandwidth} onChange={handleChange} type="number" min="1" step="100" />
                    {inputs.region === 'Mumbai' && (
                        <InputGroup icon={<Globe size={18} color="#ef4444" />} label="Mumbai -> World" name="egressMumbaiToWorld" value={inputs.egressMumbaiToWorld} onChange={handleChange} type="number" min="0" step="10" />
                    )}

                    {/* LLM Estimator */}
                    {inputs.aiMlIntegration === 'Yes' && (
                        <div className="ccc-col-span-full ccc-serverless-group" style={{ borderColor: '#ec4899', background: 'rgba(236, 72, 153, 0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <h4 className="ccc-text-xs ccc-font-bold ccc-text-pink-600 ccc-mb-3">LLM TOKEN ESTIMATOR (NIST: SaaS)</h4>
                            <div className="ccc-grid-responsive-2 ccc-gap-4">
                                <InputGroup icon={<Settings size={16} />} label="Daily Messages" name="dailyMessages" value={inputs.dailyMessages} onChange={handleChange} type="number" />
                                <InputGroup icon={<Settings size={16} />} label="Tokens / Msg" name="avgTokensPerMessage" value={inputs.avgTokensPerMessage} onChange={handleChange} type="number" />
                                <div className="ccc-col-span-full">
                                    <InputGroup icon={<Settings size={16} />} label="Model Class" name="llmModel" value={inputs.llmModel} onChange={handleChange} type="select" options={['GPT-4 class', 'GPT-3.5 / Gemini class']} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Pricing */}
                    <div className="ccc-col-span-full">
                        <InputGroup icon={<BarChart2 size={18} color="#ec4899" />} label="Pricing Model" name="pricingModel" value={inputs.pricingModel} onChange={handleChange} type="select" options={['On-demand', 'Reserved (1yr)', 'Reserved (3yr)', 'Spot/Preemptible']} />
                    </div>

                    {/* Serverless Details */}
                    {inputs.serverlessOptions === 'Yes' && (
                        <div className="ccc-col-span-full ccc-serverless-group">
                             <h4 className="ccc-text-xs ccc-font-bold ccc-text-indigo-600 ccc-mb-3">SERVERLESS (NIST: PaaS)</h4>
                             <div className="ccc-grid-responsive-2 ccc-gap-4">
                                <InputGroup icon={<Code size={18} color="#6366f1" />} label="Monthly Requests" name="serverlessRequests" value={inputs.serverlessRequests} onChange={handleChange} type="number" min="0" step="100000" />
                                <InputGroup icon={<Code size={18} color="#6366f1" />} label="Avg Duration (ms)" name="serverlessDurationMs" value={inputs.serverlessDurationMs} onChange={handleChange} type="number" min="1" step="50" />
                             </div>
                        </div>
                    )}
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
                    <InputToggle label={<><Code size={16} style={{ marginRight: '0.25rem' }} color="#2563EB" /> Serverless features</>} name="serverlessOptions" checked={inputs.serverlessOptions === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><Database size={16} style={{ marginRight: '0.25rem' }} color="#10B981" /> AI/ML Integration (LLM)</>} name="aiMlIntegration" checked={inputs.aiMlIntegration === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><CheckCircle size={16} style={{ marginRight: '0.25rem' }} color="#4F46E5" /> High Availability</>} name="highAvailability" checked={inputs.highAvailability === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><Leaf size={16} style={{ marginRight: '0.25rem' }} color="#65A30D" /> Free Tier Only</>} name="freeTierOnly" checked={inputs.freeTierOnly === 'Yes'} onChange={handleChange} />
                    <InputToggle label={<><CheckCircle size={16} style={{ marginRight: '0.4rem' }} color="#10B981" /> Security & Compliance Bundle</>} name="securityBundle" checked={inputs.securityBundle === 'Yes'} onChange={handleChange} />
                    
                    
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
                        <label className="ccc-label ccc-mb-2">Cost Projection ({inputs.futureProjectionMonths} months)</label>
                        <input 
                            type="range" 
                            name="futureProjectionMonths" 
                            min="1" max="60" 
                            step="1" 
                            value={inputs.futureProjectionMonths} 
                            onChange={handleChange} 
                            className="ccc-range-slider" 
                        />
                        <div className="ccc-range-labels"><span>1 mo</span><span>60 mo</span></div>
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