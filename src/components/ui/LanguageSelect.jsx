import useI18n from '../../i18n/useI18n.js';
import useLanguageStore from '../../store/useLanguageStore.js';

function LanguageSelect({ className = '' }) {
	const { t } = useI18n();
	const language = useLanguageStore((state) => state.language);
	const setLanguage = useLanguageStore((state) => state.setLanguage);

	return (
		<select
			value={language}
			onChange={(event) => setLanguage(event.target.value)}
			className={`neo-input !py-2 text-sm ${className}`}
			aria-label={t('app.language')}
		>
			<option value="uk">{t('languages.uk')}</option>
			<option value="en">{t('languages.en')}</option>
		</select>
	);
}

export default LanguageSelect;
