
## Execution Plan: API-First & Component-Driven UI Development
You must build the frontend iteratively, following a strict feature-sliced approach. Do not build UI components without first defining how they get their data.

### Phase 0: API Contracts & Client Generation
1. Read the provided `swagger.json` file to understand all routes, request payloads, and response schemas.
2. Initialize `axios` instance in `src/api/axios.js`.
3. Create API service functions for each endpoint based strictly on `swagger.json`. Use JSDoc to type the expected payloads and responses based on the Swagger schemas so your IDE provides autocomplete.

### Phase 1: Environment Setup & Routing Skeleton
1. Initialize Vite (React), install `react-router-dom`, `zustand`, `@tanstack/react-query`, `axios`, `date-fns`, and `tailwindcss`.
2. Configure Tailwind and set up global CSS.
3. Build the routing skeleton (`App.jsx` and `AppLayout.jsx`):
   - Define `/login`, `/`, and `/dashboard` routes.
   - Implement a basic `<AuthGuard>` that checks for authentication.

### Phase 2: Global State & Mocking (Crucial Step)
1. Setup `useAuthStore` (Zustand) to manage `user` and `token` state.
2. Setup React Query `<QueryClientProvider>`.
3. Configure Axios interceptors: automatically attach the Auth token to headers, and handle 401 errors by clearing the token and redirecting to `/login`.
4. (Optional but recommended) Set up API mocks (e.g., using MSW - Mock Service Worker) or hardcode mock responses in the Axios services temporarily, using the exact schemas from `swagger.json`, so you can build the UI without a running backend.

### Phase 3: The Onboarding Funnel (Auth -> Persona -> Import)
1. Build `<LoginPage>` with a fake Google OAuth button (which simulates receiving a token for now).
2. Build `<PersonaModal>`. Implement form state. Use React Query `useMutation` to call `PUT /api/users/persona`.
3. Build `<BatchImportModal>`. Implement file parsing/drag-and-drop. Use React Query `useMutation` for `POST /api/projects/batch-import`.
4. **CRITICAL:** Implement strict Loading States (`isPending`). The Batch Import modal MUST block the UI with a spinner while the AI generates the schedule.

### Phase 4: Core Feature - Calendar Grid
1. Implement the mathematical hook `useCalendarGrid(currentMonthDate)` using `date-fns` to generate a flat array of 35 (or 42) `Date` objects representing the grid view.
2. Use React Query to fetch `GET /api/calendar/view?startDate=...&endDate=...`.
3. Build dumb UI components: `<CalendarHeader>`, `<MonthGrid>`, `<DayCell>`, and `<EventPill>`.
4. Wire them together: The `MonthGrid` iterates over the 35 dates, passes the date to `DayCell`, which looks up its events in the fetched API Hash Map and renders `EventPill`s. Handle overflow UI ("+N more").

### Phase 5: Dashboard Feature
1. Build the `<DashboardPage>`.
2. Use React Query to fetch `GET /api/dashboard`.
3. Implement data visualization components:
   - `<ProgressCircle>` for `overallProgress`.
   - `<CourseList>` for `coursesProgress`.
   - `<UpcomingDeadlines>` and `<TodaysAgenda>` using lists and cards.

### Phase 6: Interactions & Drag-and-Drop (Optional MVP target)
1. Add interactivity to the Calendar: Allow clicking on a `StudySession` pill to open a details modal.
2. Implement a toggle or button to mark a session as `COMPLETED`. Wire this to a `PUT /api/sessions/:id` mutation and invalidate the React Query cache so the UI updates instantly.

### Phase 7: End-to-End Polish & Integration
1. Remove all mocks. Point `axios` baseURL to `http://localhost:3000`.
2. Add global error handling (e.g., a Toast notification system) to catch API errors gracefully.
3. Verify the layout is responsive and cleanly structured with Tailwind.
