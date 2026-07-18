import useI18n from '../../i18n/useI18n.js';
import useThemeStore from '../../store/useThemeStore.js';

function ThemeSwitch() {
	const { t } = useI18n();
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);
	const isDark = theme === 'dark';

	return (
		<div className="flex items-center justify-between gap-3">
			<span className="text-sm font-medium text-slate-700">{t('app.theme')}</span>
			<button
				type="button"
				role="switch"
				aria-checked={isDark}
				onClick={toggleTheme}
				className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
					isDark ? 'bg-neo-600' : 'bg-neo-200'
				}`}
			>
				<span
					className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
						isDark ? 'translate-x-6' : 'translate-x-1'
					}`}
				/>
				<span className="sr-only">
					{isDark ? t('app.themeDark') : t('app.themeLight')}
				</span>
			</button>
		</div>
	);
}

export default ThemeSwitch;
