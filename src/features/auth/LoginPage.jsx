import { useNavigate } from 'react-router-dom';
import LanguageSelect from '../../components/ui/LanguageSelect.jsx';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';

function LoginPage() {
	const navigate = useNavigate();
	const setAuth = useAuthStore((state) => state.setAuth);
	const { t } = useI18n();

	const handleLogin = () => {
		setAuth({
			token: 'seeded-session-token',
			user: {
				id: '11111111-1111-1111-1111-111111111111',
				name: 'Аміна Коваленко',
				email: 'amina.kovalenko@university.edu',
				avatar: 'АК',
				role: 'Student',
				program: 'software-engineering',
				persona: {
					courseYear: 3,
					preferredTime: 'evening',
					studyOnWeekends: true,
					maxHoursPerDay: 4,
				},
			},
		});
		navigate('/dashboard', { replace: true });
	};

	return (
		<div className="neo-hero-gradient neo-grid-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-neo-500/20 blur-3xl animate-pulse-soft" />
				<div className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-neo-400/15 blur-3xl animate-pulse-soft" />
			</div>

			<div className="relative w-full max-w-md animate-in">
				<div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-neo-lg backdrop-blur-xl">
					<div className="mb-5">
						<label className="mb-1.5 block text-sm font-medium text-slate-700">
							{t('app.language')}
						</label>
						<LanguageSelect className="w-full" />
					</div>

					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neo-gradient text-sm font-bold text-white shadow-neo">
							NV
						</div>
						<div>
							<p className="neo-label">Neoversity</p>
							<h1 className="mt-0.5 text-2xl font-bold text-slate-900">
								{t('login.title')}
							</h1>
						</div>
					</div>

					<p className="mt-4 text-sm leading-6 text-slate-600">
						{t('login.description')}
					</p>

					<div className="mt-6 rounded-2xl border border-neo-100 bg-gradient-to-br from-neo-50 to-white px-4 py-3 text-sm text-slate-600">
						{t('login.preloaded')}:{' '}
						<span className="font-semibold text-neo-700">Аміна Коваленко</span>
					</div>

					<button
						type="button"
						onClick={handleLogin}
						className="neo-btn-primary mt-6 w-full !py-3.5"
					>
						{t('login.button')}
					</button>
				</div>

				<p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/50">
					{t('app.footerTagline')}
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
