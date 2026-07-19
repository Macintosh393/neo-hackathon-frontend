import useI18n from '../../i18n/useI18n.js';
import useLanguageStore from '../../store/useLanguageStore.js';
import Select from './Select.jsx';

function LanguageSelect({ className = '' }) {
	const { t } = useI18n();
	const language = useLanguageStore((state) => state.language);
	const setLanguage = useLanguageStore((state) => state.setLanguage);

	const options = [
		{ value: 'uk', label: t('languages.uk') },
		{ value: 'en', label: t('languages.en') },
	];

	return (
		<Select
			value={language}
			onChange={setLanguage}
			options={options}
			className={className}
			ariaLabel={t('app.language')}
		/>
	);
}

export default LanguageSelect;
