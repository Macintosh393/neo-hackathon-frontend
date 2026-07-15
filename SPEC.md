# Frontend Product Specification: AI Time-Manager (SPEC.md)

## 1. Product Vision & Client Overview

Name: AI Time-Manager (Client App)Target Audience: Software Engineering and IT students.Core Experience: A lightning-fast, visually calming Single Page Application (SPA) that transforms chaotic academic deadlines into a structured, manageable timeline. The UI must reduce cognitive load—prioritizing clarity, progressive disclosure, and highly visual progress tracking (like Notion or Linear) over dense, cluttered lists.Final State Goal: A responsive React application utilizing modular architecture, robust global/server state management, and strict separation between pure UI components and business logic features.

## 2. Final State & MVP Scope

The frontend client must deliver the following core user journeys:
1. Seamless Authentication: Google OAuth login flow protecting private routes.
2. Frictionless Onboarding (The Funnel):
    - Persona Capture: A clean modal to define study habits (max hours, preferred time, weekends).
    - Batch Import: A drag-and-drop zone for uploading unstructured JSON project data.
    - Generation State: A blocking, visually engaging loading screen while the AI backend decomposes and schedules the tasks.
3. The Calendar View (Core Workspace): A dynamic 35-day (or 42-day) grid view displaying AI-generated study sessions as pills. Must handle UI overflow gracefully (e.g., "+3 more").
4. The Dashboard (Progress Visualization): A heavily visual page relying on circular and linear progress bars to show overall completion, per-course progress, and upcoming deadlines.
5. Interactive Management: Ability to mark study sessions as COMPLETED or MISSED, instantly updating the UI and triggering backend recalculations.

## 3. High-Level Architecture (Feature-Sliced Design)

The application is built with React (Vite) using pure JavaScript (no TypeScript, but strict JSDoc). It strictly follows Feature-Sliced Design to prevent "spaghetti code"
- .src/components/ui/ (Dumb Components): Reusable, stateless UI primitives (Buttons, Modals, ProgressBars, Spinners). They only accept props and emit events. They NEVER access global state or make API calls.
- src/features/ (Smart Components): Grouped by business domain (e.g., auth, onboarding, calendar, dashboard). These components wire together UI primitives, interact with global state, and execute API calls.
- State Management Strategy:
    - Global Client State: Managed by Zustand (e.g., user profile, token, UI theme).
    - Server State (API Cache): Managed exclusively by React Query (TanStack Query). Provides built-in caching, isPending loading states, and automatic UI refetching upon mutations.

## 4. Core UI Mechanics & UX Flows

### 4.1. The AI Generation UX (Batch Import)

- When a user uploads a project JSON file, the system triggers a heavy backend process (Gemini AI parsing + Google Calendar syncing).
- UX Constraint: The UI must block the user from interacting with the app during this process.
- Implementation: Display a full-screen or un-closable modal with an engaging loading state (e.g., "AI is analyzing your deadlines...", "Syncing with Google Calendar..."). Must utilize React Query's isPending state tied to the POST /api/projects/batch-import mutation.

### 4.2. The Calendar Grid Engine

- The calendar is not a static table; it requires complex mathematical rendering.
- Date Math Constraint: NEVER use native JavaScript Date mutation methods. ALL date calculations must use date-fns.
- The Hook: A custom hook (useCalendarGrid) must calculate the grid mathematically: finding the start of the week for the 1st of the month, and generating a flat array of exactly 35 or 42 Date objects representing the cells.
- Data Binding: The frontend fetches the calendar data as a Hash Map (grouped by YYYY-MM-DD). Each DayCell component simply looks up its specific date string in the Hash Map to render EventPills, ensuring $O(1)$ lookup time for rendering.

### 4.3. Dashboard Visualization Rules

- The dashboard is the motivational core of the app.
- Heavy Progress Bar Usage:
    - Overall Progress: Must be a prominent Hero element (e.g., a large circular progress ring).
    - Course Progress: Displayed as grid cards. Every card MUST contain a linear progress bar indicating completion percentage.
- Status Indicators: Use color-coded badges to indicate urgency for deadlines (e.g., Red for < 3 days, Yellow for < 7 days, Gray for safe).

### 4.4. Error Handling & Resilience

- API Interceptors: An Axios interceptor must globally catch 401 Unauthorized errors, automatically clear the Zustand auth state, and redirect to the /login route.
- Graceful Failures: If an API call fails (e.g., Gemini timeout), the UI must display a user-friendly Toast notification or Error boundary, never a blank white screen.

## 5. Design System Constraints

- Styling: Exclusively Tailwind CSS. Custom CSS files are prohibited.
- Conditional Classes: Use clsx or tailwind-merge to handle dynamic styling (e.g., highlighting "Today" in the calendar grid).
- Vibe: Minimalist, clean, high contrast. Use rounded corners (rounded-lg), subtle shadows (shadow-sm), and a cohesive primary color (e.g., Indigo or Emerald).
