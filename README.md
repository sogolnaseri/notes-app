#  Notes App
A simple, responsive Notes App built with Next.js, TypeScript, MUI, and localStorage. This app allows users to securely log in, create, edit, and delete personal notes.

## 🚀 Live Demo
🔗 [Notes App - Live Website](notes-app-eight-coral.vercel.app)  

---
## Features

- **User login with mock authentication**
- **Personalized notes using `localStorage`**
- **Create, edit, and delete notes**
- **Form validation with live feedback**
- **Responsive and mobile-friendly UI**
- **Built with App Router and `use client` components**
- **CI/CD with GitHub Actions + Vercel**
---

## 🛠️ Tech Stack

- **Next.js 15 (App Router)** 
- **TypeScript**
- **MUI (Material UI)**
- **localStorage (per-user notes)**
- **GitHub Actions for CI**
- **Deployment:** Vercel

---
## Project Structure
```sh
src/
├── app/
│   ├── login/
│   ├── logout/
│   ├── note/[id]/
│   └── page.tsx        ← homepage
├── components/         ← reusable components
├── context/            ← AuthContext
├── types/              ← TypeScript interfaces
├── utils/              ← validation, localStorage, mock users
└── __tests__/          ← test files
```


## 📥 Installation Guide

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/sogolnaseri/news-aggregator.git
cd notes-app

```
### **2️⃣ Install Dependencies**
```sh
npm install

```
### **3️⃣ Run the Code**
```sh
npm run dev
```
---
## How To Test
```sh
npm test

```



