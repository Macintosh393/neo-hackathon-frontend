import { create } from 'zustand';

const STORAGE_KEY = 'ai-time-manager-theme';

function getInitialTheme() {
	if (typeof window === 'undefined') {
		return 'light';
	}

	const storedTheme = window.localStorage.getItem(STORAGE_KEY);
	return storedTheme === 'dark' ? 'dark' : 'light';
}

const useThemeStore = create((set, get) => ({
	theme: getInitialTheme(),
	setTheme: (theme) => {
		const nextTheme = theme === 'dark' ? 'dark' : 'light';
		set({ theme: nextTheme });

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, nextTheme);
		}
	},
	toggleTheme: () => {
		const nextTheme = get().theme === 'light' ? 'dark' : 'light';
		get().setTheme(nextTheme);
	},
}));

export default useThemeStore;
