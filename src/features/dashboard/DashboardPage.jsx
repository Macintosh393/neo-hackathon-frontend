import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getDashboardStats } from '../../api/dashboard.api.js';
import { updateSession } from '../../api/session.api.js';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';
import useToastStore from '../../store/useToastStore.js';
import CourseList from './CourseList.jsx';
import ProgressCircle from './ProgressCircle.jsx';
import TodaysAgenda from './TodaysAgenda.jsx';
import UpcomingDeadlines from './UpcomingDeadlines.jsx';
import ProjectDetailsModal from '../calendar/ProjectDetailsModal.jsx';
import SessionDetailsModal from '../calendar/SessionDetailsModal.jsx';

function DashboardPage() {
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);
	const queryClient = useQueryClient();
	const user = useAuthStore((state) => state.user);
	const { t, language } = useI18n();

	const updateSessionMutation = useMutation({
		mutationFn: ({ id, payload }) => updateSession(id, payload),
		onSuccess: (updatedSession) => {
			setSelectedSession({
				...updatedSession,
				id: updatedSession.id || updatedSession.sessionId,
			});
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
			queryClient.invalidateQueries({ queryKey: ['calendar-view'] });
			useToastStore.getState().addToast(t('calendar.sessionUpdated'), 'success');
		},
	});

	const handleMarkCompleted = () => {
		if (!selectedSession || selectedSession.status === 'COMPLETED') {
			return;
		}

		updateSessionMutation.mutate({
			id: selectedSession.id,
			payload: {
				status: 'COMPLETED',
			},
		});
	};

	const handleSessionClick = (item) => {
		setSelectedSession({
			...item,
			id: item.sessionId || item.id,
		});
	};
	const query = useQuery({
		queryKey: ['dashboard', language],
		queryFn: () => getDashboardStats(language),
	});

	const data = query.data;

	const displayName =
		user?.name || [user?.firstName, user?.lastName].filter(Boolean).join(' ');

	return (
		<section className="space-y-6">
			<div className="neo-card-lg relative overflow-hidden">
				<div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-neo-200/30 blur-2xl" />
				<div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-2xl">
						<p className="neo-label">{t('dashboard.title')}</p>
						<h2 className="mt-2 text-3xl font-bold text-slate-900">
							{t('dashboard.greeting')}
							{displayName ? (
								<span className="text-gradient-neo">
									, {displayName.trim().split(' ')[0]}
								</span>
							) : (
								''
							)}
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
							{t('dashboard.description')}
						</p>
					</div>

					<div className="flex items-center gap-3">
						<span className="neo-badge">{t('dashboard.statusMonth')}</span>
						<span className="neo-badge border-neo-300/60 bg-neo-gradient text-white">
							{t('dashboard.statusReady')}
						</span>
					</div>
				</div>
			</div>

			{query.isLoading ? (
				<div className="neo-card-lg border-dashed text-center text-neo-600">
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
							<div className="neo-stat-card">
								<p className="neo-label">{t('dashboard.projects')}</p>
								<p className="mt-3 text-2xl font-bold text-slate-900">
									{data.overallProgress.completedProjects}/
									{data.overallProgress.totalProjects}
								</p>
							</div>
							<div className="neo-stat-card">
								<p className="neo-label">{t('dashboard.sessions')}</p>
								<p className="mt-3 text-2xl font-bold text-gradient-neo">
									{data.overallProgress.completedSessions}/
									{data.overallProgress.totalSessions}
								</p>
							</div>
							<div className="neo-stat-card">
								<p className="neo-label">{t('dashboard.completion')}</p>
								<p className="mt-3 text-2xl font-bold text-gradient-neo">
									{data.overallProgress.percentage}%
								</p>
							</div>
						</div>

						<CourseList courses={data.coursesProgress} />
					</div>

					<div className="space-y-6">
						<UpcomingDeadlines
							deadlines={data.upcomingDeadlines}
							onProjectClick={setSelectedProjectId}
						/>
						<TodaysAgenda
							agenda={data.todaysAgenda}
							onSessionClick={handleSessionClick}
						/>
					</div>
				</div>
			) : null}

			<ProjectDetailsModal
				projectId={selectedProjectId}
				onClose={() => setSelectedProjectId(null)}
				onSessionClick={(session) => {
					setSelectedProjectId(null);
					setSelectedSession(session);
				}}
			/>

			<SessionDetailsModal
				session={selectedSession}
				language={language}
				t={t}
				isPending={updateSessionMutation.isPending}
				onClose={() => setSelectedSession(null)}
				onMarkCompleted={handleMarkCompleted}
				onProjectClick={(projectId) => {
					setSelectedSession(null);
					setSelectedProjectId(projectId);
				}}
			/>
		</section>
	);
}

export default DashboardPage;
