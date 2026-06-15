# 🚀 ResAI - AI Powered Resume & Interview Preparation Platform

ResAI is a full-stack AI-powered platform designed to help candidates analyze their resume, compare it with job descriptions, and generate personalized interview preparation reports.

The platform uses Artificial Intelligence to evaluate candidate profiles, provide match scores, identify skill gaps, generate interview questions, and create structured preparation plans.

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login
- Password hashing for security
- JWT based authentication
- Protected user routes

---

### 📄 Resume & Job Description Analysis

Users can provide:
- Resume details
- Job descriptions

ResAI analyzes both and generates an AI-powered interview report.

The generated report includes:

- Candidate profile evaluation
- Resume and JD compatibility analysis
- Overall match score
- Strength analysis
- Weakness identification
- Missing skills
- Improvement suggestions
- Personalized preparation roadmap

---

### 🤖 AI Generated Interview Report

Integrated Google Gemini AI for intelligent analysis.

AI generates:

- Technical skill evaluation
- Experience relevance analysis
- Important interview topics
- Customized interview questions
- Preparation strategy

Structured AI output is maintained using predefined schemas for consistent reports.

---

### 📊 Match Score

Candidates receive a percentage based score showing:

- Resume relevance
- Required skills match
- Experience alignment
- Job readiness level

Example:

```
Match Score : 85%
```

---

### 📚 Personalized Preparation Plan

AI creates a preparation roadmap including:

- Topics to study
- Important concepts
- Areas requiring improvement
- Learning priorities

---

### 📁 Report Management Dashboard

Users can:

- View previous reports
- Open detailed analysis
- Track generated reports
- Access report history

---

### 📑 PDF Report Generation

Users can download professional interview reports as PDF files containing:

- Candidate analysis
- Match score
- AI suggestions
- Preparation plan

PDF generation is handled dynamically from backend data.

---

## 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Context API
- Axios
- SCSS
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini API
- Puppeteer (PDF Generation)

---

## Database

MongoDB is used for storing:

- User information
- Interview reports
- Generated AI analysis
- Report history

---

## Project Structure

```
ResAI
│
├── Frontend
│
│── src
│   │
│   ├── features
│   │   ├── auth
│   │   └── interview
│   │
│   ├── components
│   ├── pages
│   ├── styles
│   └── App.jsx
│
│
├── Backend
│
│── src
│   │
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middlewares
│   └── app.js
│
├── server.js
├── package.json
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/ResAI.git
```

Move into project:

```bash
cd ResAI
```

---

# Backend Setup

Move to backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Move to frontend:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Overview

## Authentication Routes

### Register User

```
POST /api/auth/register
```

Creates a new user account.

---

### Login User

```
POST /api/auth/login
```

Returns authentication token.

---

# Interview Routes

### Generate AI Report

```
POST /api/interview/generate
```

Generates complete AI interview analysis.

Input:

```json
{
  "jobDescription":"Frontend Developer role requiring React"
}
```

Response:

```json
{
  "matchScore":85,
  "strengths":[],
  "weaknesses":[],
  "preparationPlans":[]
}
```

---

### Get All Reports

```
GET /api/interview/reports
```

Returns all generated reports of logged-in user.

---

### Get Single Report

```
GET /api/interview/report/:id
```

Returns detailed interview analysis.

---

### Generate PDF

```
GET /api/interview/report/:id/pdf
```

Downloads AI generated PDF report.

---

# AI Workflow

```
User Resume + Job Description
            |
            v
    Gemini AI Analysis
            |
            v
 Structured JSON Response
            |
            v
 Save Report in MongoDB
            |
            v
 Dashboard + PDF Export
```

---

# Security Features

✔ Password Encryption  
✔ JWT Authentication  
✔ Protected APIs  
✔ Environment Variables  
✔ User Specific Reports  

---

# Future Enhancements

- Resume PDF Upload
- ATS Score Checker
- Real Interview Simulation
- Voice Based Mock Interview
- AI Chat Interviewer
- Company Specific Preparation
- Job Recommendation System

---

# Screenshots

(Add screenshots here)

```
Home Page

Dashboard

Generated Report Page
```

---

# Author

**Ayush Raj Singh**

Full Stack Developer

Skills:
- Java
- Data Structures & Algorithms
- React.js
- Node.js
- Express.js
- MongoDB

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
