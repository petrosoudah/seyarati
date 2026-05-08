<div align="center">
  <img src="./public/logo.png" alt="Seyarti Logo" width="120" style="border-radius: 12px; margin-bottom: 20px" />
  <h1>Seyarti Full-Stack Platform</h1>
  <p><strong>A Next-Gen Automotive Platform for the Jordanian Market</strong></p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</div>

<br/>

## 🚗 Overview
**Seyarati** is a dynamic, full-stack automotive dashboard designed strictly for vehicle owners in Jordan. It serves as an all-in-one hub connecting car owners with trusted local mechanics, a realtime spare parts marketplace, and cutting-edge analytical tools.

Built from the ground up prioritizing speed, beautiful dark-mode glassmorphic UI, and powerful native Express REST APIs.

## ✨ Key Features
- **Intelligent VIN Decoder API**: Users input their 17-character VIN during registration, and the backend perfectly decodes the exact Make and Model in real-time leveraging the secure **NHTSA API**.
- **Automated GPS Geocoding**: The Mechanics Directory parses browser HTML5 Geolocation coordinates seamlessly backwards into precise Jordanian cities (e.g., Amman, Zarqa, Irbid) utilizing the **OpenStreetMap Nominatim API**.
- **Local AI Mechanic NLP Engine**: A heavily robust, zero-latency natural language processor trained on our local SQLite dataset, answering real-time user maintenance questions instantly with 100% uptime.
- **Secure Mock Wallet Gateway**: Simulated Credit Card checkout environments for dispatching payments securely to independent Mechanics via the React Router layout.
- **Personalized "My Garage"**: Full vehicle tracker with chronologically persistent maintenance histories.

## 🛠️ Architecture Stack
- **Frontend App**: Vite, React 19, TypeScript, unified customized CSS architecture.
- **Backend API**: Node.js, Express.js.
- **Database Architecture**: SQLite, local persistence gracefully built to execute mock seeding on boot up (`db.js`).

## 🚀 Quick Start
Seyarti uses a powerful dual-runtime environment seamlessly integrated via `concurrently`. One command reliably boots both the REST API Backend and the Vite Dev Server entirely in sync.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/petrosoudah/seyarati.git
   cd seyarati
   ```
2. **Install all dependencies:**
   ```bash
   npm install
   ```
3. **Ignite the platform:**
   ```bash
   npm run dev
   ```

*The Vite Client will host on **Port 5173** and automatically proxy server requests accurately to the raw Express backend located on **Port 3000**.*

## 📸 Core Modules
- **`src/pages/RegisterCar.tsx`** - VIN processing & Database Insertion.
- **`src/pages/Messages.tsx`** - Mechanic messaging interfaces.
- **`src/pages/Mechanics.tsx`** - Auto-Geocoding mapping module.
- **`src/pages/Payment.tsx`** - Digital Wallet secure mock UI.
- **`server/backend.js`** - REST endpoints & the Seyarti Local AI Module.

---
<div align="center">
  <i>Developed for University Project & Portfolio</i>
</div>
