# 🧬 DOCTORcheap

```{=html}
<p align="center">
```
`<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,50:22c55e,100:f472b6&height=220&section=header&text=DOCTORcheap&fontSize=50&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Online%20Doctor%20%26%20Medicine%20Intelligence%20Platform&descAlignY=60" />`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3500&pause=800&color=22C55E&center=true&vCenter=true&width=600&lines=Next+Generation+Healthcare+Platform;Doctor+Pharmacist+Seller+Ecosystem;Medical+Knowledge+Management+System;Built+with+Next.js+Node+and+MongoDB" />`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

# 🧠 Platform Overview

**DOCTORcheap** is a futuristic healthcare ecosystem connecting:

-   👨‍⚕️ Doctors
-   💊 Pharmacists
-   🏪 Sellers
-   🧑‍💻 Users
-   🛡 Admins

into a single **intelligent healthcare platform**.

The system enables knowledge sharing, medicine management, and secure
medical data access.

------------------------------------------------------------------------

# ⚡ Core Features

## 🔐 Role Based Security

  Role            Capability
  --------------- -------------------------------
  👑 SuperAdmin   Full system control
  🛡 Admin         Manage medical data
  👨‍⚕️ Doctor       Disease & nutrition knowledge
  💊 Pharmacist   Medicine & seller management
  🏪 Seller       Medicine distribution
  👤 User         Health information access

------------------------------------------------------------------------

# 🧭 System Architecture

``` mermaid
flowchart LR
User --> Frontend
Frontend --> API
API --> Auth
API --> MedicineService
API --> DiseaseService
API --> NutritionService
API --> UserService

MedicineService --> MongoDB
DiseaseService --> MongoDB
NutritionService --> MongoDB
UserService --> MongoDB

API --> Cloudinary
```

------------------------------------------------------------------------

# 🏗 Tech Stack

### Frontend

-   Next.js
-   React
-   TailwindCSS
-   Framer Motion
-   TypeScript

### Backend

-   Node.js
-   Express / Modular Architecture
-   JWT Authentication

### Database

-   MongoDB Atlas

### Cloud Storage

-   Cloudinary

------------------------------------------------------------------------

# 🔄 Approval Workflow

``` mermaid
flowchart TD
Register --> Pending
Pending --> SuperAdminReview
SuperAdminReview --> Approved
SuperAdminReview --> Rejected
Approved --> DashboardAccess
Rejected --> AccessDenied
```

Roles requiring approval:

-   Admin
-   Doctor
-   Pharmacist
-   Seller

Required documents:

-   NID image
-   Professional license

------------------------------------------------------------------------

# 🧑‍🤝‍🧑 Role Interaction

``` mermaid
graph TD
SuperAdmin --> Admin
SuperAdmin --> Doctor
SuperAdmin --> Pharmacist
SuperAdmin --> Seller

Admin --> DiseaseDatabase
Admin --> NutritionDatabase

Doctor --> DiseaseDatabase
Doctor --> NutritionDatabase

Pharmacist --> MedicineDatabase
Pharmacist --> SellerManagement

Seller --> MedicineDistribution
User --> MedicalInformation
```

------------------------------------------------------------------------

# 🏥 Doctor Dashboard

Doctors can:

-   Update profile
-   Add diseases
-   Bulk upload diseases via TXT
-   Add nutrition plans
-   Bulk upload nutrition data
-   View medicines
-   Edit medicine usage field

Doctors cannot modify price or composition.

------------------------------------------------------------------------

# 💊 Pharmacist Dashboard

Pharmacists can:

-   Full CRUD for medicines
-   Bulk medicine import
-   Add or edit sellers
-   Add disease records
-   Update profile

Pharmacists **cannot delete sellers**.

------------------------------------------------------------------------

# 🛡 Admin Dashboard

Admins manage platform medical information.

Capabilities:

-   Manage users
-   Manage doctors
-   Manage pharmacists
-   Manage diseases
-   Manage nutrition
-   Edit medicine data

Admins must be **approved by SuperAdmin**.

------------------------------------------------------------------------

# 👑 SuperAdmin Dashboard

SuperAdmin controls the entire system.

Capabilities:

-   Approve accounts
-   Change user roles
-   Delete users
-   Monitor system statistics

------------------------------------------------------------------------

# 💊 Medicine Database

Each medicine stores:

-   Name
-   Generic name
-   Brand
-   Dosage
-   Price
-   Composition
-   Usage
-   Side effects
-   Image
-   Medical PDF

------------------------------------------------------------------------

# ⚡ Bulk Medicine Import

Example TXT format:

    Medicine Name
    Price per piece
    Price per unit
    Composition
    Used for diseases
    Side effects

Each **6 lines = one medicine record**.

------------------------------------------------------------------------

# 🧠 Disease Knowledge

    Disease Name
    Seriousness Level
    Symptoms
    Warning Symptoms
    First Action
    Doctor Type
    Nutrition Link

------------------------------------------------------------------------

# 🍎 Nutrition Data

    Food list
    Food quantities
    Related disease
    Precautions

------------------------------------------------------------------------

# 📂 Project Structure

    DOCTORcheap
    │
    ├── client
    │   ├── app
    │   │   ├── dashboard
    │   │   │   ├── admin
    │   │   │   ├── doctor
    │   │   │   ├── pharmacist
    │   │   │   ├── superadmin
    │   │   │   ├── seller
    │   │   │   └── user
    │   │
    │   ├── components
    │   ├── hooks
    │   ├── services
    │   └── types
    │
    ├── server
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   ├── middleware
    │   └── seed

------------------------------------------------------------------------

# ⚙ Installation

Clone repository

``` bash
git clone https://github.com/yourusername/DOCTORcheap.git
```

Install dependencies

``` bash
cd client
npm install

cd ../server
npm install
```

Run development

``` bash
npm run dev
```

------------------------------------------------------------------------

# 🌍 Future Vision

-   AI symptom diagnosis
-   Telemedicine consultation
-   Medicine recommendation engine
-   AI medical chatbot
-   Pharmacy inventory integration

------------------------------------------------------------------------

# 👨‍💻 Author

**Md Mahruf Alam**

Software Engineer\
System Architect\
Problem Solver

------------------------------------------------------------------------

⭐ If you like the project, give it a star!
