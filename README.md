# Neoversity Hackathon Frontend

This is the frontend client for the Neoversity Hackathon project. It is a modern, responsive web application built to help students manage their study schedules, track deadlines, and automatically schedule study sessions using AI.

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with LocalStorage persistence)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Authentication**: [@react-oauth/google](https://github.com/MomenSherif/react-oauth) (Google OAuth 2.0)
- **Calendar Engine**: [FullCalendar](https://fullcalendar.io/)
- **Internationalization (i18n)**: [i18next](https://www.i18next.com/) (Ukrainian & English support)

## ⚖️ Note for Judges / Evaluators

### 1. Application Access (Google OAuth)
If you would like to test the application, **you must first be added to the Google test users list**. 

Because this application integrates with Google OAuth and the Google Calendar API, public access requires a full app verification process by Google. Since verification can take weeks, the app currently operates in "test mode."
* **Action required:** Please provide the exact email addresses you plan to use for logging in so I can manually grant you access.

### 2. Data Cleanup
After you are done testing the application, it is highly recommended to delete your data:
1. Open the **Profile** pop-up.
2. Click **"Delete data"**.

*This action completely clears your data from the server's database and removes any study session events that the app created in your Google Calendar.*

### 3. Test Data
If you want to test the data upload feature, you can use the provided test file. 
* **File:** `batch-import-test-data.json` (located in both repositories).
* This file contains ready-to-upload test data and serves as an example of the JSON schema the website expects.

## 📁 Project Structure

The project follows a feature-based architecture for better scalability and maintainability:

```text
src/
├── api/             # Axios instance and API call wrappers (auth, user, dashboard, calendar)
├── components/      # Reusable UI components (buttons, modals, layout, language/theme switches)
├── features/        # Feature-specific modules
│   ├── auth/        # Login page and OAuth logic
│   ├── calendar/    # FullCalendar integration and session management
│   ├── dashboard/   # Dashboard widgets (progress, upcoming deadlines, etc.)
│   └── onboarding/  # Persona selection and JSON batch import modals
├── i18n/            # Localization configuration and translation files
├── store/           # Zustand global state (useAuthStore)
├── App.jsx          # Root application component and routing setup
└── main.jsx         # React DOM entry point and global providers
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- A running instance of the [Neo-Hackathon Backend](https://github.com/macintosh393/neo-hackathon-backend)

### 1. Clone the repository
```bash
git clone https://github.com/macintosh393/neo-hackathon-frontend.git
cd neo-hackathon-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory. You can copy the provided example:
```bash
cp .env.example .env
```
Ensure your `.env` contains the following:
```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```
*(Note: If testing Google Login locally, ensure `http://localhost:5173` is added to your Google Cloud Console Authorized JavaScript Origins).*

### 4. Start the development server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📖 How to Use

1. **Log In**: Start by logging in using your Google account. Ensure you grant the required **Google Calendar** permissions when prompted.
2. **Onboarding**: Upon first login, you will be prompted to set your "Persona" (e.g., your major and course year).
3. **Batch Import**: After setting your persona, you can upload a JSON file containing your syllabus or project deadlines. The backend AI will process this and automatically generate study sessions in your Google Calendar!
4. **Dashboard**: View your overall progress, upcoming tasks, and today's schedule at a glance.
5. **Calendar**: Navigate to the Calendar tab to see a detailed view of your study sessions.
