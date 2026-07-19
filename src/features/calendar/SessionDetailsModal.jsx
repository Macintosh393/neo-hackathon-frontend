import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../api/project.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { translateStatus } from '../../i18n/formatters.js';

function formatSessionTime(value, language) {
	if (!value) {
		return '—';
	}

	return new Date(value).toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', {
		hour: '2-digit',
		minute: '2-digit',
		day: '2-digit',
		month: 'short',
	});
}

function SessionDetailsModal({
	session,
	language,
	t,
	isPending,
	onClose,
	onMarkCompleted,
	onProjectClick,
}) {
	const isOpen = Boolean(session);
	const isCompleted = session?.status === 'COMPLETED';

	const { data: project } = useQuery({
		queryKey: ['project', session?.projectId],
		queryFn: () => getProject(session.projectId),
		enabled: Boolean(session?.projectId),
		staleTime: 5 * 60 * 1000,
	});

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			closeLabel={t('common.closeModal')}
			title={t('calendar.sessionModalTitle')}
			footer={
				<div className="flex flex-wrap items-center justify-end gap-3">
					<button
						type="button"
						onClick={onMarkCompleted}
						disabled={isCompleted || isPending}
						className="neo-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isPending
							? t('calendar.updatingSession')
							: t('calendar.markCompleted')}
					</button>
				</div>
			}
		>
			{session ? (
				<div className="space-y-4">
					{/* Session title */}
					<div className="rounded-xl border border-neo-100 bg-gradient-to-br from-neo-50 to-white px-4 py-3">
						<p className="text-sm font-medium text-neo-600">
							{t('calendar.sessionTitle')}
						</p>
						<p className="mt-1 text-base font-bold text-slate-900">
							{session.title}
						</p>
					</div>

					{/* Project — fetched by projectId, shown right below title */}
					{session.projectId ? (
						<button
							type="button"
							onClick={() => {
								onClose();
								onProjectClick?.(session.projectId);
							}}
							className="w-full rounded-xl border border-neo-100 px-4 py-3 text-left transition-colors hover:border-neo-300 hover:bg-neo-50/50"
						>
							<p className="text-sm font-medium text-neo-600">
								{t('calendar.sessionProject')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{project ? project.title : '…'}
							</p>
						</button>
					) : null}

					{/* Course & Status */}
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-xl border border-neo-100 px-4 py-3 transition-colors hover:border-neo-200 hover:bg-neo-50/30">
							<p className="text-sm font-medium text-neo-600">
								{t('calendar.sessionCourse')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{session.courseName}
							</p>
						</div>
						<div className="rounded-xl border border-neo-100 px-4 py-3 transition-colors hover:border-neo-200 hover:bg-neo-50/30">
							<p className="text-sm font-medium text-neo-600">
								{t('calendar.sessionStatus')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{translateStatus(t, session.status)}
							</p>
						</div>
					</div>

					{/* Time */}
					<div className="rounded-xl border border-neo-100 px-4 py-3">
						<p className="text-sm font-medium text-neo-600">
							{t('calendar.sessionTime')}
						</p>
						<p className="mt-1 text-sm font-semibold text-slate-900">
							{formatSessionTime(session.startTime, language)} -{' '}
							{formatSessionTime(session.endTime, language)}
						</p>
					</div>

					{/* Compromise warning */}
					{session.isCompromised && session.compromiseReason ? (
						<div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
							<p className="font-semibold">{t('calendar.compromiseLabel')}</p>
							<p className="mt-1">{session.compromiseReason}</p>
						</div>
					) : null}

					{isPending ? <Spinner label={t('calendar.updatingSession')} /> : null}
				</div>
			) : null}
		</Modal>
	);
}

export default SessionDetailsModal;
