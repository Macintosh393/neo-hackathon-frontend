import { create } from 'zustand';

const STORAGE_KEY = 'ai-time-manager-language';

function getInitialLanguage() {
	if (typeof window === 'undefined') {
		return 'uk';
	}

	const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
	return storedLanguage === 'en' ? 'en' : 'uk';
}

const useLanguageStore = create((set, get) => ({
	language: getInitialLanguage(),
	setLanguage: (language) => {
		const nextLanguage = language === 'en' ? 'en' : 'uk';
		set({ language: nextLanguage });

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(STORAGE_KEY, nextLanguage);
		}
	},
	toggleLanguage: () => {
		const nextLanguage = get().language === 'uk' ? 'en' : 'uk';
		get().setLanguage(nextLanguage);
	},
}));

export default useLanguageStore;
