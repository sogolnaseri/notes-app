#  Notes App
A clean and responsive full-stack Notes App built with Next.js, TypeScript, Material UI, and localStorage. This project showcases best practices in modern React development, including authentication, state management, form validation, and CI/CD.

## 🚀 Live Demo
🔗 [Notes App - Live App](https://notes-app-eight-coral.vercel.app/login)  

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


## 📥 Getting Started

```sh
git clone https://github.com/sogolnaseri/notes-app.git
cd notes-app
npm install
npm run dev

```
Visit: http://localhost:3000

---

## 🔐 Login Credentials
Use one of the mock users defined in `utils/mockUsers.ts`:

```sh
{ username: "admin", password: "password" }
{ username: "sara",  password: "123456" }
{ username: "alex", password: "abc123" }

```

---

## ✨ App Flow
1 - Login Page - Authenticates users using mock data  
2 - Home Page - Lists notes for the current user  
3 - Add Note - Opens modal to create a new note  
4 - Edit Note - Navigate to `/note/:id` to edit or delete  

---

## ✅ Running Tests
```sh
npm test
```
- Tests are located in `src/__tests__`   
- CI automatically runs tests on push via GitHub Actions  

---

## ⚙️ CI/CD with GitHub Actions + Vercel
### GitHub Actions 
- `.github/workflows/ci.yml` runs tests on every push or PR to main

### Vercel Deployment
- Connected to GitHub
- Auto-deploys on push to `main`
- Custom build: uses `/src/app/page.tsx` as the entry point

