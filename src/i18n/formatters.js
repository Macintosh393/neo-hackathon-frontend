import { enUS, uk } from 'date-fns/locale';

export function getDateFnsLocale(language) {
	return language === 'uk' ? uk : enUS;
}

export function translateStatus(t, status) {
	return t(`status.${status}`, status);
}

export function translateDifficulty(t, difficulty) {
	return t(`difficulty.${difficulty}`, difficulty);
}

export function interpolate(template, values = {}) {
	return Object.entries(values).reduce(
		(result, [key, value]) => result.replaceAll(`{{${key}}}`, String(value)),
		template,
	);
}
