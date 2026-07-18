import { useMemo } from 'react';
import useLanguageStore from '../store/useLanguageStore.js';
import translations from './translations.js';

function readPath(source, path) {
	return path.split('.').reduce((value, key) => value?.[key], source);
}

function useI18n() {
	const language = useLanguageStore((state) => state.language);

	const dictionary = translations[language] ?? translations.uk;

	const t = useMemo(
		() => (key, fallback) => {
			const value = readPath(dictionary, key);
			return value ?? fallback ?? key;
		},
		[dictionary],
	);

	return { language, t, dictionary };
}

export default useI18n;
