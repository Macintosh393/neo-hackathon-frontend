import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../../api/calendar.api.js';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import CourseList from './CourseList.jsx';
import ProgressCircle from './ProgressCircle.jsx';
import TodaysAgenda from './TodaysAgenda.jsx';
import UpcomingDeadlines from './UpcomingDeadlines.jsx';

function DashboardPage() {
	const user = useAuthStore((state) => state.user);
	const { t } = useI18n();
	const query = useQuery({
		queryKey: ['dashboard'],
		queryFn: getDashboard,
	});

	const data = query.data;

	return (
		<section className="space-y-6">
			<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-2xl">
						<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
							{t('dashboard.title')}
						</p>
						<h2 className="mt-2 text-3xl font-semibold text-slate-900">
							{t('dashboard.greeting')}
							{user?.name ? `, ${user.name}` : ''}
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
							{t('dashboard.description')}
						</p>
					</div>

					<div className="flex items-center gap-3">
						<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
							{t('dashboard.statusMonth')}
						</span>
						<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
							{t('dashboard.statusReady')}
						</span>
					</div>
				</div>
			</div>

			{query.isLoading ? (
				<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
					{t('dashboard.loading')}
				</div>
			) : null}

			{query.isError ? (
				<div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">
					{t('dashboard.error')}
				</div>
			) : null}

			{data ? (
				<div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
					<div className="space-y-6">
						<ProgressCircle
							percentage={data.overallProgress.percentage}
							label={t('dashboard.overallProgress')}
							sublabel={`${data.overallProgress.completedProjects}/${data.overallProgress.totalProjects} ${t('dashboard.projectsComplete')} ${t('dashboard.and')} ${data.overallProgress.completedSessions}/${data.overallProgress.totalSessions} ${t('dashboard.sessionsComplete')}`}
						/>

						<div className="grid gap-4 md:grid-cols-3">
							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
									{t('dashboard.projects')}
								</p>
								<p className="mt-3 text-2xl font-semibold text-slate-900">
									{data.overallProgress.completedProjects}/
									{data.overallProgress.totalProjects}
								</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
									{t('dashboard.sessions')}
								</p>
								<p className="mt-3 text-2xl font-semibold text-slate-900">
									{data.overallProgress.completedSessions}/
									{data.overallProgress.totalSessions}
								</p>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
									{t('dashboard.completion')}
								</p>
								<p className="mt-3 text-2xl font-semibold text-slate-900">
									{data.overallProgress.percentage}%
								</p>
							</div>
						</div>

						<CourseList courses={data.coursesProgress} />
					</div>

					<div className="space-y-6">
						<UpcomingDeadlines deadlines={data.upcomingDeadlines} />
						<TodaysAgenda agenda={data.todaysAgenda} />
					</div>
				</div>
			) : null}
		</section>
	);
}

export default DashboardPage;
