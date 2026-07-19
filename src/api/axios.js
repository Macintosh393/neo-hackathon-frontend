import axios from 'axios';
import useAuthStore from '../store/useAuthStore.js';
import useToastStore from '../store/useToastStore.js';

// Why: Use environment variables so we can easily point to different backend environments (local, staging, prod)
const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

function attachBearerToken(config, token) {
	if (!config.headers) {
		config.headers = {};
	}

	// Why: Axios may expose headers as a plain object or as AxiosHeaders depending on the version.
	if (typeof config.headers.set === 'function') {
		config.headers.set('Authorization', `Bearer ${token}`);
		return;
	}

	config.headers.Authorization = `Bearer ${token}`;
}

// Why: Rely on React Router / AuthGuard to perform the redirection
// based on the updated Zustand state instead of forcefully reloading the SPA.

apiClient.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;

	if (token) {
		attachBearerToken(config, token);
	}

	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		const errorMessage =
			error?.response?.data?.message ||
			error?.message ||
			'An unexpected error occurred';

		if (status === 401) {
			// Why: a 401 means our auth state is no longer valid, so we clear it.
			// The <AuthGuard> component will automatically redirect the user to /login.
			useAuthStore.getState().clearAuth();
		} else {
			// Why: show an error toast globally for all other API errors
			useToastStore.getState().addToast(errorMessage, 'error');
		}

		return Promise.reject(error);
	},
);

export default apiClient;
