# ☁️ Cloud Cost Comparator

A modern web app built with **React + Vite** that helps users **compare cloud service pricing** across major providers like AWS, Azure, and Google Cloud.  
This tool enables developers, startups, and enterprises to estimate cloud infrastructure costs efficiently and make smarter budgeting decisions.

---

## 🚀 Features

- 🔍 **Compare Cloud Costs** across multiple providers (AWS, Azure, GCP)
- ⚙️ **Custom configuration input** for CPU, RAM, Storage, and Bandwidth
- 📊 **Instant cost breakdown** with recommendations
- 🎯 **Best provider suggestion** (Cheapest / Most suitable)
- 💾 **Fully responsive UI** (mobile + desktop)
- 💅 **Custom CSS styling** (Tailwind replaced with handcrafted utility classes)
- ⚡ Built using **Vite** for super-fast dev and build times

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) |
| Styling | Custom CSS (Tailwind-like utility replacements) |
| Backend (optional) | Node.js / Express (for API integration) |
| Deployment | Vercel / Netlify / Render |

---

## 🛠️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/cloud-cost-comparator.git
cd cloud-cost-comparator
```

```bash
2️⃣ Install Dependencies
npm install
```
```bash
3️⃣ Run the Development Server
npm run dev
```

The app will run at:
```bash
http://localhost:5173/
```
```bash
4️⃣ Build for Production
npm run build
```


🎨 Custom CSS Notes

Tailwind classes have been manually replaced with corresponding .ccc-* utility classes for full control and independence from Tailwind.
All custom styles are located in:

/src/styles/custom.css


-These classes handle:

-Centering layouts (.ccc-main-container)

-Typography & spacing

-Buttons, cards, and grid responsiveness

-Form inputs and toggles

-Animations (fade-in, spinner)

-Step indicators & results panel design

Example usage:
```bash
<div class="ccc-main-container">
  <div class="ccc-page-card ccc-animate-fade-in">
    <h1 class="ccc-title-4xl">Cloud Cost Comparator</h1>
  </div>
</div>

```

Folder Structure
```bash
cloud-cost-comparator/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── styles/
│   │   └── custom.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

💡 Future Enhancements

🧮 Real-time cloud pricing API integration (Infracost / AWS Pricing API)

📈 Visual comparison charts

🔐 User authentication for saved configurations

💾 Export as PDF / CSV

🧠 AI-driven cost optimization suggestions


**Author:** Rakesh T (Rocky)  
👨‍💻 B.Tech in Artificial Intelligence & Data Science  
📫 [rakeshthangaraj89@gmail.com](mailto:rakeshthangaraj89@gmail.com)

🚀 Passionate about Web Tech, Cloud, and GenAI-powered solutions.

🪪 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.
