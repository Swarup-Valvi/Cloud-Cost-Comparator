# ☁️ Cloud Cost Comparator (NIST-Aligned Advisor)

A professional-grade **MERN stack** decision-support system that optimizes cloud resource allocation across AWS, Azure, and GCP. This platform evolves beyond simple price calculation to offer **FinOps-driven** insights, including sustainability tracking, hardware architecture optimization, and NIST-aligned service mapping.

---

## 🚀 Professional Features

### 🔹 Core Functionality
- **Real-Time API Integration:** Fetches "literal" pricing data directly from the **Azure Retail Prices API** and proxy-authenticated endpoints.
- **Multi-Cloud IaaS & PaaS Comparison:** Dynamic side-by-side analysis of VMs, GPUs, and Serverless functions.
- **Mumbai Region Optimizer:** Specialized cost-performance mapping for local data centers (`ap-south-1`, `asia-south1`, `southindia`).

### 🔹 Advanced Cloud Logic
- **NIST Service Mapping:** Automatic labeling of resources as **IaaS**, **PaaS**, or **SaaS** based on the NIST Cloud Reference Architecture.
- **Green Computing Score:** A regional **Carbon Footprint Badge** (A+ to C) ranking providers by environmental impact.
- **Hardware Architecture Toggle:** Real-time cost simulation for **Arm (Graviton/Ampere) vs. x86**, reflecting the ~20% efficiency gains of modern RISC processors.
- **LLM Token Estimator:** SaaS-tier pricing for Gen-AI workloads based on input/output tokens and model class.

### 🔹 Enterprise Readiness
- **USD/INR Currency Switcher:** Instant recalculation across all cards and future projections using live exchange rates.
- **Security & Compliance Bundle:** Toggle-based flat-rate estimation for production-ready enterprise monitoring and logging.
- **Historical Price Trends:** MongoDB-backed visualization of cloud cost fluctuations over time.

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | High-performance SPA with complex state management |
| **Styling** | Custom Utility CSS | Performance-first, handcrafted responsive styles |
| **Backend** | Node.js & Express | Proxy API handling, data normalization, and security |
| **Database** | MongoDB & Mongoose | Historical price persistence and regional metadata |
| **APIs** | Azure Retail Prices API | Live infrastructure cost sourcing |

---

## 🛠️ Project Architecture

```bash
cloud-cost-comparator/
├── backend/                # Node.js Server
│   ├── controllers/        # Pricing & API logic
│   ├── models/             # Mongoose schemas (Price History, Regions)
│   ├── routes/             # API Endpoints (/api/prices, /api/carbon)
│   └── server.js           # Entry point
├── src/                    # React Frontend
│   ├── components/         # Atomic UI units (Cards, Toggles, Badges)
│   ├── pages/              # ConfigurationPage, ResultsPage, AdvisorDashboard
│   ├── styles/             # custom.css (Utility-first styling)
│   └── App.jsx             # Main logic & state switcher
└── package.json
```

---

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Swarup-Valvi/Cloud-Cost-Comparator.git

# Setup Backend
cd backend
npm install
npm start

# Setup Frontend
cd ../
npm install
npm run dev
```

---

## 🎓 Academic Context
This project was developed at **KJ Somaiya School of Engineering** to demonstrate proficiency in:
- **Cloud Service Models:** Practical implementation of IaaS, PaaS, and SaaS differentiation.
- **Green Computing:** Integration of sustainability metrics in software architecture.
- **Full-Stack Development:** Scalable MERN architecture with real-world API dependencies.

**Authors:** Swarup Valvi (16010423103)  
Tanay Sawant (16010423104)  
Manthan Rondhe (16010424808)  

---

## 🪪 License
Distributed under the MIT License. See `LICENSE` for more information.

---