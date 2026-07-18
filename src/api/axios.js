import axios from 'axios';
import useAuthStore from '../store/useAuthStore.js';

// Why: keeping the backend base URL in one place lets us flip from mocks to real requests later without touching every feature.
const apiClient = axios.create({
	baseURL: 'http://localhost:3000',
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

function redirectToLogin() {
	if (typeof window === 'undefined') {
		return;
	}

	// Why: on a 401 the user should be moved out of the protected shell immediately, not after a stale screen lingers.
	if (window.location.pathname !== '/login') {
		window.location.assign('/login');
	}
}

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

		if (status === 401) {
			// Why: a 401 means our auth state is no longer valid, so we clear it before redirecting.
			useAuthStore.getState().clearAuth();
			redirectToLogin();
		}

		return Promise.reject(error);
	},
);

export default apiClient;
