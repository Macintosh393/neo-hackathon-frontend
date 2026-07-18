import { useNavigate } from 'react-router-dom';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import useLanguageStore from '../../store/useLanguageStore.js';

function LoginPage() {
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);
	const { language, t } = useI18n();
	const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);

	const handleLogin = () => {
		setAuth({
			token: 'seeded-session-token',
			user: {
				id: '11111111-1111-1111-1111-111111111111',
				name: 'Amina Kovalenko',
				email: 'amina.kovalenko@university.edu',
				avatar: 'AK',
				role: 'Student',
				program: 'Software Engineering',
			},
		});
		navigate('/dashboard', { replace: true });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
			<div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
				<div className="mb-5 flex items-center justify-between">
					<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
						{t('app.language')}: {language === 'uk' ? 'Українська' : 'English'}
					</span>
					<button
						type="button"
						onClick={toggleLanguage}
						className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
					>
						{language === 'uk' ? 'EN' : 'UA'}
					</button>
				</div>
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
						AK
					</div>
					<div>
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
							{t('app.brand')}
						</p>
						<h1 className="mt-1 text-2xl font-semibold text-slate-900">
							{t('login.title')}
						</h1>
					</div>
				</div>
				<p className="mt-4 text-sm leading-6 text-slate-600">
					{t('login.description')}
				</p>
				<div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
					{t('login.preloaded')}:{' '}
					<span className="font-semibold text-slate-900">Amina Kovalenko</span>
				</div>
				<button
					type="button"
					onClick={handleLogin}
					className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
				>
					{t('login.button')}
				</button>
			</div>
		</div>
	);
}

export default LoginPage;
