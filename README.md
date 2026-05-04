[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fcRde9Vj)
# Crypto App Clone - React & Tailwind CSS Assignment

## Overview

This repository contains a demo crypto app built with **React.js** and **Tailwind CSS**. The project includes a frontend with live crypto pricing and a sample backend ready for JWT authentication.

---

## Getting Started

After accepting this assignment, follow these steps:

### 1. Clone Your Repository

```bash
git clone <your-repository-url>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Run the Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:4000`.

---

### Technical Requirements

- [ ] Use **React Router** for client-side navigation
- [ ] Use **functional components** with React hooks
- [ ] Create **reusable components** (Button, Card, CryptoRow, etc.)
- [ ] Use **Tailwind CSS** for all styling (no external CSS frameworks)
- [ ] Implement **responsive design** (mobile, tablet, desktop)
- [ ] Use **React state management** (useState, useContext, or similar)
- [ ] Follow **proper file structure** and naming conventions
- [ ] Write **clean, readable code** with appropriate comments

---

## Project Structure

```
src/
├── assets/          # Images, icons, and other static files
├── components/      # Reusable React components
│   ├── common/      # Shared components (Button, Card, Input, etc.)
│   ├── layout/      # Layout components (Navbar, Footer, Sidebar)
│   └── crypto/      # Crypto-specific components (CryptoCard, PriceChart)
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── AssetDetail.jsx
│   ├── Learn.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── data/            # Mock data and constants
├── hooks/           # Custom React hooks (optional)
├── App.jsx          # Main application with routing
├── App.css          # Global styles (if needed)
├── main.jsx         # Application entry point
└── index.css        # Tailwind CSS imports
```

---

## Design Reference

Visit [coinbase.com](https://www.coinbase.com/) 

- Overall layout and structure across all pages
- Consistent color scheme and typography
- Navigation flow between pages
- Responsive behavior on all screen sizes
- User interface patterns and interactions

---

## Helpful Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Heroicons](https://heroicons.com/) - Free SVG icons
- [reacticons](https://react-icons.github.io/react-icons/) - Free SVG icons

---

## Deployment on Netlify

Before deploying, do not use `coinbase` in the site domain or public-facing metadata.

- Change the Netlify site name to something neutral like `yourname-crypto-app`.
- Use a site title such as `Crypto App | Student Project`.
- Keep the app messaging as a demo project and not a real trading service.
- Do not use real credentials, personal information, or payment data on the demo site.

You must deploy your completed project on **Netlify**.
