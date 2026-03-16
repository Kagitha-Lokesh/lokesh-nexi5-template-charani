# NEXI5 HRM Portal - Technical Documentation

## 1. Project Overview
NEXI5 HRM Portal is a comprehensive, enterprise-level Human Resource Management (HRM) application designed to streamline organizational operations. It provides a premium user experience with a focus on visual excellence, performance, and role-specific functionality.

**Purpose**: To provide a centralized platform for managing employee lifecycles, payroll, attendance, recruitment, and business development activities.
**Business Problem Solved**: Eliminates fragmented HR processes by consolidating multiple administrative modules into a single, cohesive, and visually stunning interface.
**Main Features**:
- Role-Based Access Control (RBAC) with 7 distinct user roles.
- Interactive dashboards for real-time analytics.
- Comprehensive Payroll and Statutory compliance management (ESI/PF/TDS).
- Lead and Deal pipeline tracking for Business Development.
- Recruitment management from hiring requests to candidate onboarding.
- Automated attendance and leave management systems.

---

## 2. System Architecture
The application follows a modern **Decoupled Frontend-First Architecture**. While it is currently a standalone React SPA, it is structured to easily integrate with a RESTful or GraphQL backend.

- **Frontend Architecture**: Component-based architecture using React 19, following Atomic Design principles for UI elements.
- **Backend Architecture**: Simulated via a centralized Data Layer (`src/datasets/`). This layer exports schema-consistent JS objects that mimic real API responses.
- **Database Architecture**: Data models are defined as consistent JSON/JS schemas within the `datasets` folder, allowing for rapid state transitions without persistent database lag during the template phase.
- **Component Interaction**:
    - **Context Providers**: Handle global state (Theming, Auth).
    - **Pages**: Orchestrate data from datasets and pass them to UI components.
    - **Layouts**: Provide structural consistency (Sidebar, Header) across all dashboard views.
- **Communication Flow**: `Components -> Pages -> Datasets`. The flow is designed to be easily swapped with `Components -> Pages -> Hooks/Services -> API` in production.

---

## 3. Technology Stack
- **Frontend Framework**: React 19 (Functional Components & Hooks)
- **Build Tool**: Vite 7 (Optimized for ultra-fast HMR and production builds)
- **Styling**: Tailwind CSS 3.4 (Utility-first styling with custom theme tokens)
- **Animations**: Framer Motion 12 (High-performance micro-interactions and page transitions)
- **Data Visualization**: Recharts 3.7 (Responsive, SVG-based charts)
- **Icons**: Lucide React (Scalable vector icons)
- **Routing**: React Router DOM 7 (Declarative, client-side routing)
- **State Management**: React Context API (Theme management) & Local State (Component-level)
- **Authentication**: LocalStorage-based JWT simulation with Role-Based filtering.
- **Deployment**: Vercel (Optimized for SPA routing via `vercel.json`)

---

## 4. Project Folder Structure
```text
src/
├── animations/    # Framer Motion variants for consistent motion design
├── assets/        # Static assets (logos, illustrations, branding)
├── components/    # UI Component Library
│   ├── auth/      # Login/Register specific components (e.g., StarCanvas)
│   ├── common/    # Shared primitives: StatusBadge, ScrollToTop, MotionCard
│   ├── dashboard/ # Module-specific components (Analytics, Tables, Forms)
│   └── landing/   # Homepage/Marketing sections (Hero, Features, Footer)
├── config/        # Application constants, Role definitions, and Sidebar configs
├── context/       # Global state providers (ThemeContext)
├── datasets/      # Centralized Data Layer - The "Engine" of the application
├── hooks/         # Custom React hooks for business logic reuse
├── layouts/       # Structural wrappers (AuthLayout, DashboardLayout)
├── pages/         # Route containers (Dashboard modules, Landing, Auth)
├── styles/        # Global CSS, Tailwind layers, and custom typography
└── main.jsx       # Application entry point
```

---

## 5. Application Workflow
1.  **App Initialization**: `main.jsx` renders `App.jsx`, initializing the `BrowserRouter` and wrapping the tree with the `ThemeContext`.
2.  **Routing Flow**: `App.jsx` defines top-level routes. Public routes (Landing, Login) are accessible to all. Dashboard routes are nested under `/dashboard` and wrapped in a `ProtectedRoute`.
3.  **Authentication Flow**:
    - User enters credentials in `AuthPage`.
    - `handleLoginSuccess` stores `isAuthenticated` and `userRole` in `localStorage`.
    - `ProtectedRoute` verifies these values before allowing access to nested routes.
4.  **Data Fetching Process**: Page components import specific data from `src/datasets/`. This simulated "fetch" happens synchronously, ensuring zero-latency UI testing.
5.  **API Communication**: Centralized in `Dashboard.jsx` and module pages, where data is mapped to UI props.
6.  **State Updates**: Local state handles form inputs and UI toggles; `ThemeContext` handles system-wide appearance changes.
7.  **UI Rendering**: React 19's concurrent rendering ensures smooth updates, supplemented by Framer Motion for entrance animations and state transitions.

---

## 6. Module / Feature Breakdown

### A. Admin Dashboard
- **Purpose**: High-level organizational oversight.
- **Key Modules**: Organization Overview, User Management, System Settings, Audit Logs.
- **Data Flow**: Aggregates metrics from all departments via `datasets/admin`.

### B. HR Head Module
- **Purpose**: Strategic HR planning and recruitment approvals.
- **Key Features**: Hiring Request approval, Interview Panel oversight, Workforce Planning.
- **User Interaction**: Reviewing recruitment pipelines and approving payroll batches.

### C. HR Accountant Module
- **Purpose**: Financial management of employee data.
- **Key Features**: Payroll processing, Salary Component setup, Statutory (ESI/PF/TDS) management, Form 16 generation.
- **API Simulation**: Uses `datasets/hraccountant` for complex taxation and payroll calculations.

### D. BDE Dashboard (Business Development)
- **Purpose**: Sales and pipeline management.
- **Key Features**: Deal Pipeline (Kanban), Revenue Forecasting, Client Requirement tracking.
- **UI Components**: Interactive funnels and deal cards.

### F. AI Assistant Module
- **Purpose**: Intelligent HR support and documentation retrieval.
- **Key Features**: Chat-based queries for leave, payroll, and attendance. Suggested questions panel.
- **UI Components**: `AIChatbot`, `ChatMessage`, `TypingIndicator`, `SuggestionList`.
- **Implementation**: Uses `datasets/aiChat` to simulate intelligent responses with Framer Motion animations.

---

## 7. UI Component Structure
The UI is built on a **Modular Primitive System**:
- **Layouts**: `DashboardLayout` provides the grid system (Header + Sidebar + MainView).
- **Navigation**: `Sidebar` is dynamically generated from `sidebarConfig.js` based on the user's role.
- **Common Primitives**:
    - `MotionCard`: A wrapper that applies standardized Framer Motion hover and entrance effects.
    - `StatusBadge`: Dynamic color-coding for status states (Active, Pending, Rejected).
    - `DataTables`: Reusable table structures for displaying dataset items.
- **Modals & Forms**: Standardized input fields and glassmorphism-styled containers for consistency.

---

## 8. Routing System
The application uses **Nested Role-Based Routing**:
- **Public Routes**: `/`, `/login`, `/register`.
- **Protected Routes**: `/dashboard/*`.
- **Role-Based Redirection**: `ProtectedRoute` checks the user's role and grants access to specific sub-routes.
- **Navigation Structure**: Handled by `react-router-dom` with `Navigate` fallbacks for invalid paths.

---

## 9. State Management
- **React State**: Used for localized UI logic (e.g., `sidebarOpen`, `formInput`).
- **Context API (`ThemeContext`)**:
    - Manages `isDarkMode` state.
    - Persists preferences to `localStorage`.
    - Dynamically applies Tailwind `dark` classes to the `html` root or layout wrappers.
- **Global Data Sharing**: Facilitated through centralized `datasets` which act as a single source of truth for the session.

---

## 10. API Integration
The "Simulated API" pattern is used for speed and consistency:
- **Request Flow**: `Page Component -> import { data } from '@/datasets/module'`
- **Axios/Fetch Readiness**: The codebase is pre-configured with directory structures that allow for easy replacement of imports with `useQuery` or `useEffect` fetch calls.
- **Error Handling**: Simulated in the UI through empty states or error-boundary-ready components.

---

## 11. Authentication & Security
- **Login System**: Validates against a mock user database in `src/config/roleData.js`.
- **Token Handling**: Uses signed-like markers in `localStorage` to persist session.
- **Authorization Roles**: Defined in `src/config/roles.js` (Admin, HR Head, etc.), ensuring users only see relevant modules.
- **Security Considerations**:
    - All dashboard routes are guarded.
    - Logout clears all sensitive markers and forces a window reload for state purging.

---

## 12. Database Design
While NoSQL-like in use, the data models follow a relational structure:
- **Employees**: `id`, `name`, `email`, `role`, `joinDate`.
- **Payroll**: `employeeId`, `basicSalary`, `deductions`, `allowances`, `netPay`.
- **Deals**: `clientName`, `value`, `stage` (Discovery, Proposal, Negotiation, Closed).
- **Attendance**: `employeeId`, `status` (Present, Absent, Leave), `timestamp`.
- **Relationships**: Linked via `id` or `employeeId` fields across different dataset files.

---

## 13. Performance Optimization
- **Lazy Loading**: Route-based code splitting ensures initial bundle size is minimized.
- **Vite Optimizations**: `manualChunks` in `vite.config.js` separates large libraries like Recharts and Framer Motion into a `vendor` bundle.
- **Memoization**: Extensive use of functional components and hooks reduces unnecessary re-renders.
- **Animations**: Using `layout` and `animate` props in Framer Motion to leverage GPU acceleration for fluid motion.

---

## 14. Deployment & Environment Setup

### Local Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Access the app at `http://localhost:5173`.

### Environment Variables
- Create a `.env` file (if needed) for API endpoints when transitioning to a live backend.

### Build Process
- `npm run build`: Generates the optimized `dist/` folder.
- `npm run preview`: Locally verify the production build.

---

## 15. Future Improvements
1.  **Backend Integration**: Connect to a Node.js/Python/Go backend for persistent data.
2.  **Real-Time Notifications**: Implement WebSockets for instant HR alerts and chat.
3.  **PDF Exports**: Add functionality to export Salary Slips and Reports directly as PDFs via `jspdf`.
4.  **PWA Support**: Transform the portal into a Progressive Web App for mobile-native behavior.
5.  **Multi-Language Support**: Integrate `i18next` for international HRM capabilities.

---
*Documentation Version: 2.0.0*
*Last Updated: 2026-03-16*
*Author: Senior Software Architect / AI Assistant*
