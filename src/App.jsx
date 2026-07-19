import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout.jsx';
import ToastContainer from './components/ui/ToastContainer.jsx';
import AuthGuard from './features/auth/AuthGuard.jsx';
import LoginPage from './features/auth/LoginPage.jsx';
import CalendarPage from './features/calendar/CalendarPage.jsx';
import DashboardPage from './features/dashboard/DashboardPage.jsx';

const queryClient = new QueryClient();

function HomeRedirect() {
	return <Navigate to="/dashboard" replace />;
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<HashRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/"
						element={
							<AuthGuard>
								<AppLayout />
							</AuthGuard>
						}
					>
						<Route index element={<HomeRedirect />} />
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="calendar" element={<CalendarPage />} />
					</Route>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</HashRouter>
			<ToastContainer />
		</QueryClientProvider>
	);
}

export default App;
