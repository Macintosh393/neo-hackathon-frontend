import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu.jsx';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import PersonaModal from '../../features/onboarding/PersonaModal.jsx';
import BatchImportModal from '../../features/onboarding/BatchImportModal.jsx';

function AppLayout() {
	const { language, t } = useI18n();
	const user = useAuthStore((state) => state.user);
	const [showBatchImport, setShowBatchImport] = useState(false);

	useEffect(() => {
		// Why: syncing the document language helps browser chrome and assistive tech use the selected locale.
		document.documentElement.lang = language;
	}, [language]);

	return (
		<div className="neo-page">
			<header className="neo-header sticky top-0 z-40">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neo-gradient text-sm font-bold text-white shadow-neo">
							NV
						</div>
						<div className="hidden sm:block">
							<p className="neo-label">{t('app.brand')}</p>
							<h1 className="text-lg font-bold text-slate-900">
								{t('app.subtitle')}
							</h1>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<nav className="flex items-center gap-1">
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									isActive ? 'neo-nav-link-active' : 'neo-nav-link'
								}
							>
								{t('app.overview')}
							</NavLink>
							<NavLink
								to="/calendar"
								className={({ isActive }) =>
									isActive ? 'neo-nav-link-active' : 'neo-nav-link'
								}
							>
								{t('app.calendar')}
							</NavLink>
						</nav>

						<div className="ml-2 border-l border-neo-200/60 pl-2">
							<UserProfileMenu />
						</div>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-6xl animate-in px-4 py-8 sm:px-6 lg:px-8">
				<Outlet />
			</main>

			{user && !user.persona ? (
				<PersonaModal
					open={true}
					onClose={() => setShowBatchImport(true)}
				/>
			) : null}

			<BatchImportModal
				open={showBatchImport}
				onClose={() => setShowBatchImport(false)}
			/>
		</div>
	);
}

export default AppLayout;
