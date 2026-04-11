// src/utils/cloudLogic.js

// --- Utility & Mock Data ---

export const BASE_RATES = {
    vCPU_hour: 0.03, RAM_GB_hour: 0.004, GPU_T4_hour: 0.35,
    Storage_Standard_GB: 0.02, Storage_Cold_GB: 0.005,
    DB_SQL_GB: 0.08, DB_NoSQL_GB: 0.05,
    Networking_Egress_GB: 0.09, Serverless_Invocation_Cost: 0.0000002,
};

export const PROVIDER_MULTIPLIERS = {
    AWS: { compute: 1.05, storage: 1.0, db: 1.1, net: 1.05, general: 1.0 },
    Azure: { compute: 1.0, storage: 0.95, db: 1.0, net: 1.0, general: 0.98 },
    GCP: { compute: 0.9, storage: 1.05, db: 0.95, net: 0.9, general: 0.95 },
};

export const REGION_ADJUSTMENT = { 'US-East': 1.0, 'Europe-West': 1.05, 'Asia-South': 1.15 };

export const COMMITMENT_DISCOUNTS = {
    'On-demand': 1.0, 'Reserved (1yr)': 0.75, 'Reserved (3yr)': 0.55, 'Spot/Preemptible': 0.25,
};

export const initialInputs = {
    // Page 1: Tech Stack
    frontend: 'React',
    backend: 'Node.js',
    databaseTech: 'PostgreSQL',
    devops: 'GitHub Actions',

    // Page 2: Configuration
    useCase: 'Web Hosting',
    region: 'US-East',
    vCPUs: 16,
    ramPerInstance: 4,
    numInstances: 4,
    gpuType: 'None',
    storageSize: 2000,
    storageType: 'SSD/Standard',
    dbType: 'SQL',
    dbSize: 500,
    dbBackupFrequency: 'Daily',
    networkingBandwidth: 500,
    pricingModel: 'On-demand',
    autoScaling: 'No',
    serverlessOptions: 'No',
    aiMlIntegration: 'Yes',
    multiRegion: 'No',
    highAvailability: 'Yes',
    performanceWeight: 7,
    sustainabilityFocus: 'No',
    costAlerts: 'Yes',
    migrationSuggestions: 'No',
    futureProjectionMonths: 6,
    exportReport: 'No',
};


// --- Core Calculation Logic ---

export const calculateCosts = (inputs) => {
    const {
        vCPUs, ramPerInstance, numInstances, gpuType, storageSize, storageType,
        dbType, dbSize, networkingBandwidth, pricingModel, region,
        multiRegion, highAvailability, serverlessOptions, performanceWeight, aiMlIntegration
    } = inputs;

    const totalVCPUs = vCPUs * numInstances;
    const totalRAM = ramPerInstance * numInstances;
    const gpuHours = gpuType !== 'None' ? numInstances * 730 : 0;
    const totalHours = numInstances * 730; // Hours in a month

    const results = {};

    for (const provider of ['AWS', 'Azure', 'GCP']) {
        const P = PROVIDER_MULTIPLIERS[provider];
        const R = REGION_ADJUSTMENT[region] || 1.0;
        const D = COMMITMENT_DISCOUNTS[pricingModel] || 1.0;

        const breakdown = {};
        
        // Compute Cost (vCPU + RAM + GPU)
        let baseCompute = (totalVCPUs * BASE_RATES.vCPU_hour + totalRAM * BASE_RATES.RAM_GB_hour) * totalHours;
        if (gpuType !== 'None') baseCompute += gpuHours * BASE_RATES.GPU_T4_hour;
        breakdown.Compute = baseCompute * P.compute * R * D;

        // Storage Cost
        let baseStorage = storageSize * (storageType.includes('Cold') ? BASE_RATES.Storage_Cold_GB : BASE_RATES.Storage_Standard_GB);
        breakdown.Storage = baseStorage * P.storage * R;
        
        // Database Cost (includes HA/Backup factor)
        let baseDB = dbSize * (dbType === 'SQL' ? BASE_RATES.DB_SQL_GB : BASE_RATES.DB_NoSQL_GB);
        if (highAvailability === 'Yes' || inputs.dbBackupFrequency === 'Daily') baseDB *= 1.25;
        breakdown.Database = baseDB * P.db * R;

        // Networking Cost (Egress)
        breakdown.Networking = networkingBandwidth * BASE_RATES.Networking_Egress_GB * P.net;

        // Service & Overhead Cost
        let additionalServiceCost = 0;
        if (highAvailability === 'Yes' || multiRegion === 'Yes') additionalServiceCost += 50;
        if (serverlessOptions === 'Yes') additionalServiceCost += 20;
        breakdown.Services = additionalServiceCost * P.general * R;

        // Performance Weight Adjustment (If weighted towards performance, increase cost)
        if (performanceWeight > 7) {
            const performanceMultiplier = 1 + ((performanceWeight - 7) * 0.05);
            breakdown.Compute *= performanceMultiplier;
            breakdown.Storage *= performanceMultiplier;
        }

        // AI/ML Integration adjustment
        if (aiMlIntegration === 'Yes') {
            breakdown.Compute *= 1.1; // Add 10% to compute for AI/ML features
            breakdown.Services += 25; // Add a base service fee for AI platforms
        }

        const totalMonthlyCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
        results[provider] = {
            total: parseFloat(totalMonthlyCost.toFixed(2)),
            breakdown,
        };
    }
    return results;
};

// --- Use Case Fit Analysis ---
export const useCaseFitAnalysis = (useCase, provider, inputs) => {
    let analysis;
    switch (provider) {
        case 'AWS':
            analysis = {
                strength: `Massive ecosystem (EC2, S3, RDS, Lambda). Highly mature tooling. Excellent for IoT and Enterprise Apps.`,
                weakness: `Can be complex to manage/optimize. Egress costs are often high.`,
                suitability: useCase === 'IoT' || useCase === 'Enterprise Apps' || useCase === 'Web Hosting' ? 'High' : 'Medium',
            };
            break;
        case 'Azure':
            analysis = {
                strength: `Best for enterprises already using Microsoft products (Windows Server, SQL Server). Strong Hybrid Cloud features.`,
                weakness: `Compute pricing can be less flexible than competitors. Less specialized services outside the Microsoft stack.`,
                suitability: useCase === 'Enterprise Apps' || useCase === 'Web Hosting' || useCase === 'Database Management' ? 'High' : 'Medium',
            };
            // Tech stack bonus for .NET
            if (inputs.backend === '.NET') {
                analysis.strength = `Deep .NET integration. ` + analysis.strength;
                analysis.suitability = 'High';
            }
            break;
        case 'GCP':
            analysis = {
                strength: `Strongest in Big Data (BigQuery, Dataflow) and Machine Learning (Vertex AI). Often offers the best initial compute pricing.`,
                weakness: `Smaller market share/community. Less mature global regional footprint compared to AWS/Azure.`,
                suitability: useCase === 'Big Data Analytics' || useCase === 'Machine Learning/AI' || useCase === 'Software Development' ? 'High' : 'Medium',
            };
            break;
        default:
            analysis = { strength: '', weakness: '', suitability: 'Medium' };
    }
    return analysis;
};