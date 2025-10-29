# Portfolio Website

This is a personal portfolio website built with React, TypeScript, Vite, and Firebase.

## Features

- Portfolio showcasing projects
- Real-time analytics using Firebase Firestore
- Anonymous authentication for tracking visits
- Chat functionality for visitor interactions

## Setup

### Prerequisites

- Node.js 18 or higher
- npm
- Firebase project

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/denisvlas/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory by copying `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Firebase configuration values:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the Firebase configuration values and paste them into your `.env` file

5. Start the development server:
```bash
npm run dev
```

### Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

#### GitHub Secrets Configuration

For the deployment to work properly, you need to configure the following secrets in your GitHub repository:

1. Go to your repository settings
2. Navigate to Secrets and variables > Actions
3. Add the following repository secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

These values should match your Firebase project configuration.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual deployment)

## Technology Stack

- React 19
- TypeScript
- Vite
- Firebase (Firestore, Authentication)
- React Router
- Bootstrap Icons

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
