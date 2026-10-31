# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

# Task Manager Capstone

A responsive Task Management application built with React, TypeScript, Redux Toolkit, RTK Query, and Tailwind CSS.

The application allows users to organize projects, manage tasks, track progress, and switch between List and Kanban views.

## Features

- **Demo Login:** Simple demo authentication with protected routes.
- **Project Management:** Create, edit, and delete projects.
- **Task Management:** Create, edit, delete, and update tasks.
- **Task Status:** To do, In progress, and Done.
- **Task Priority:** Low, Medium, and High.
- **Due Dates:** Set due dates and prevent selecting past dates.
- **Overdue Tasks:** Highlight overdue tasks that are not completed.
- **Search and Filters:** Search tasks by title and filter by status and priority.
- **Sorting:** Sort tasks by due date or priority.
- **Shareable Filters:** Search, filters, and sorting are reflected in URL query parameters.
- **Kanban Board:** Drag and drop tasks between status columns.
- **Dark Mode:** Switch between light and dark themes.
- **Persistent Preferences:** Remember the selected theme and URL-based sorting preferences.
- **Responsive Design:** Layout adapts to smaller screens.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| TypeScript | Type safety and fewer runtime mistakes |
| Vite | Development server and production build |
| Redux Toolkit | Centralized state management |
| RTK Query | API requests and caching |
| React Router | Page navigation and protected routes |
| Tailwind CSS v4 | Responsive styling |
| JSON Server | Mock REST API |
| Vitest | Automated testing |
| React Testing Library | Testing React components |
| @hello-pangea/dnd | Kanban drag-and-drop functionality |

## Getting Started

### Prerequisites

- Node.js (20.19+ or 22.12+)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Sameer800596/task-manager-capstone.git
```

### 2. Open the project directory

```bash
cd task-manager-capstone
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the mock API

Open a terminal and run:

```bash
npm run api
```

The JSON Server API runs at:

`http://localhost:3001`

### 5. Start the React application

Open another terminal in the project directory and run:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Demo Login Credentials

| Field | Value |
|---|---|
| Email | demo@example.com |
| Password | Demo123! |

**Note:** This is a frontend-only demo login, not production-grade authentication.

## Screenshots

Add actual application screenshots to `docs/screenshots/` and display them below.

### Login Page

![Login Page](docs/screenshots/login.png)

### Projects Dashboard

![Projects Dashboard](docs/screenshots/projects-dashboard.png)

### Task List View

![Task List](docs/screenshots/task-list.png)

### Kanban Board

![Kanban Board](docs/screenshots/kanban-board.png)

### Dark Mode

![Dark Mode](docs/screenshots/dark-mode.png)

## Project Structure

```text
task-manager-capstone/
│
├── public/
│
├── src/
│   ├── app/
│   │   └── store.ts
│   │
│   ├── components/
│   │   ├── EditTaskForm.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskFilters.tsx
│   │   ├── TaskForm.tsx
│   │   └── ThemeManager.tsx
│   │
│   ├── features/
│   │   ├── api/
│   │   │   └── api.ts
│   │   └── theme/
│   │       └── themeSlice.ts
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ProjectsDetailsPage.tsx
│   │
│   ├── test/
│   │   └── setup.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── taskLogic.ts
│   │   └── taskLogic.test.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
│
├── docs/
│   └── screenshots/
│
├── db.json
├── package.json
├── tsconfig.json
└── README.md
```

## Main Technical Choices and Why

### 1. React with TypeScript

React makes it easier to build reusable UI components. TypeScript provides static type checking and helps catch mistakes during development.

### 2. Redux Toolkit

Redux Toolkit manages shared application state, such as the selected theme. It provides a structured way to manage state across components.

### 3. RTK Query

RTK Query handles API requests, loading states, caching, and automatic data updates after mutations. It reduces the need to manually manage API-related state.

### 4. React Router

React Router manages navigation between pages. Protected routes prevent users from accessing project pages without logging in.

### 5. URL Search Parameters

Search, filters, and sorting are stored in URL query parameters. This makes filtered task views shareable and allows users to retain their current view when refreshing the page.

### 6. Tailwind CSS

Tailwind CSS allows responsive styling directly through utility classes and supports the application's light and dark themes.

### 7. JSON Server

JSON Server provides a simple mock REST API for development without requiring a separate custom backend.

### 8. Automated Testing

Vitest and React Testing Library are used to test task logic, form validation, and UI interactions.

## Running Tests

Run all automated tests:

```bash
npm run test:run
```

Run tests in watch mode:

```bash
npm run test
```

## Build and Code Quality

Production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Deployment

**Live Application:** [Add deployed application URL here]

**GitHub Repository:**  
https://github.com/Sameer800596/task-manager-capstone

Note: The frontend currently uses a local JSON Server API at `http://localhost:3001`. For public deployment, the API must also be hosted and the frontend API base URL configured to use the deployed backend.

## What I Would Improve With More Time

If I had more time, I would:

1. Implement proper backend authentication with secure password handling and authorization.
2. Replace JSON Server with a production database and a dedicated backend API.
3. Add user-specific projects and tasks so different users can manage their own data.
4. Improve error handling with clearer notifications and retry options.
5. Add more comprehensive integration and end-to-end tests.
6. Improve accessibility, keyboard navigation, and screen-reader support.
7. Add task reminders and notifications for upcoming deadlines.
8. Improve the Kanban experience with task reordering and smoother drag-and-drop interactions.

---

**Built as a React and TypeScript Task Manager Capstone Project.**
