import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import useLanguageStore from '../../store/useLanguageStore.js';

function AppLayout() {
	const { user, clearAuth } = useAuthStore();
	const { language, t } = useI18n();
	const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);

	useEffect(() => {
		// Why: syncing the document language helps browser chrome and assistive tech use the selected locale.
		document.documentElement.lang = language;
	}, [language]);

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900">
			<header className="border-b border-slate-200 bg-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
							TM
						</div>
						<div>
							<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
								{t('app.brand')}
							</p>
							<h1 className="text-xl font-semibold text-slate-900">
								{t('app.subtitle')}
							</h1>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<nav className="hidden items-center gap-2 sm:flex">
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									`rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
								}
							>
								{t('app.overview')}
							</NavLink>
							<NavLink
								to="/calendar"
								className={({ isActive }) =>
									`rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
								}
							>
								{t('app.calendar')}
							</NavLink>
						</nav>
						<span className="text-sm text-slate-600">
							{user?.name ?? 'Amina Kovalenko'}
						</span>
						<span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 md:inline-flex">
							{user?.program ?? t('app.program')}
						</span>
						<button
							type="button"
							onClick={toggleLanguage}
							className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
						>
							{language === 'uk' ? 'EN' : 'UA'}
						</button>
						<button
							type="button"
							onClick={clearAuth}
							className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
						>
							{t('app.logout')}
						</button>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
