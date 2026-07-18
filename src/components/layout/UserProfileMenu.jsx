import { useEffect, useRef, useState } from 'react';
import { interpolate } from '../../i18n/formatters.js';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import LanguageSelect from '../ui/LanguageSelect.jsx';
import ThemeSwitch from '../ui/ThemeSwitch.jsx';

function ProfileIcon() {
	return (
		<svg
			className="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.8}
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
			/>
		</svg>
	);
}

function UserProfileMenu() {
	const { user, clearAuth } = useAuthStore();
	const { t } = useI18n();
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	const displayName =
		user?.name ||
		[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
		'User';
	const avatar = user?.avatar ?? displayName.slice(0, 2).toUpperCase();
	const program = t('app.program');
	const courseYear = user?.persona?.courseYear ?? 3;

	useEffect(() => {
		if (!open) {
			return undefined;
		}

		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open]);

	const handleLogout = () => {
		setOpen(false);
		clearAuth();
	};

	return (
		<div ref={menuRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen((current) => !current)}
				aria-expanded={open}
				aria-haspopup="true"
				aria-label={t('app.profileMenu')}
				className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
					open
						? 'border-neo-400 bg-neo-gradient text-white shadow-neo'
						: 'border-neo-200 bg-white text-neo-700 hover:border-neo-300 hover:bg-neo-50'
				}`}
			>
				<ProfileIcon />
			</button>

			{open ? (
				<div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-72 overflow-hidden rounded-2xl border border-neo-200/60 bg-white shadow-neo-lg animate-in">
					<div className="border-b border-neo-100 bg-gradient-to-br from-neo-50 to-white px-4 py-4">
						<div className="flex items-center gap-3">
							<div className="flex h-11 w-11 items-center justify-center rounded-full bg-neo-gradient text-sm font-bold text-white shadow-neo">
								{avatar}
							</div>
							<div className="min-w-0">
								<p className="truncate font-semibold text-slate-900">
									{displayName}
								</p>
								<p className="truncate text-sm text-neo-600">{program}</p>
								<p className="mt-0.5 text-xs text-slate-500">
									{interpolate(t('app.courseYearValue'), { year: courseYear })}
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-4 px-4 py-4">
						<div>
							<p className="neo-label mb-3">{t('app.settings')}</p>
							<div className="space-y-3">
								<div>
									<label className="mb-1.5 block text-sm font-medium text-slate-700">
										{t('app.language')}
									</label>
									<LanguageSelect className="w-full" />
								</div>
								<ThemeSwitch />
							</div>
						</div>

						<button
							type="button"
							onClick={handleLogout}
							className="neo-btn-secondary w-full !border-rose-200 !text-rose-700 hover:!border-rose-300 hover:!bg-rose-50"
						>
							{t('app.logout')}
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default UserProfileMenu;
