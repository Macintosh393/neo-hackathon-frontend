import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../api/project.api.js';
import { getCourses } from '../../api/course.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { translateDifficulty, translateStatus } from '../../i18n/formatters.js';
import useI18n from '../../i18n/useI18n.js';

const statusClasses = {
	COMPLETED: 'border-emerald-200 bg-emerald-50 text-emerald-700',
	MISSED: 'border-rose-200 bg-rose-50 text-rose-700',
	SCHEDULED: 'border-neo-200 bg-neo-50 text-neo-700',
};

function formatDeadlineDate(value, language) {
	if (!value) return '—';
	return new Date(value).toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

function formatSessionTime(value, language) {
	if (!value) return '—';
	return new Date(value).toLocaleString(language === 'uk' ? 'uk-UA' : 'en-US', {
		hour: '2-digit',
		minute: '2-digit',
		day: '2-digit',
		month: 'short',
	});
}

function ProjectDetailsModal({ projectId, onClose, onSessionClick }) {
	const { t, language } = useI18n();

	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId, language],
		queryFn: () => getProject(projectId),
		enabled: Boolean(projectId),
	});

	const { data: courses } = useQuery({
		queryKey: ['courses'],
		queryFn: getCourses,
	});

	const isOpen = Boolean(projectId);
	const courseName = data?.courseName || courses?.find((c) => c.id === data?.courseId)?.name || '—';

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			closeLabel={t('common.closeModal')}
			title={t('project.modalTitle')}
		>
			{isLoading ? (
				<div className="flex justify-center py-6">
					<Spinner label={t('common.loading')} />
				</div>
			) : null}

			{isError ? (
				<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
					{t('calendar.error')}
				</p>
			) : null}

			{data ? (
				<div className="space-y-5 animate-in">
					{/* Title Card */}
					<div className="rounded-xl border border-neo-100 bg-gradient-to-br from-neo-50 to-white px-4 py-3">
						<p className="text-xs font-semibold uppercase tracking-wider text-neo-600">
							{t('project.title')}
						</p>
						<p className="mt-1 text-base font-bold text-slate-900">
							{data.title}
						</p>
					</div>

					{/* Course & Difficulty Grid */}
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-xl border border-neo-100 px-4 py-3 transition-colors hover:border-neo-200 hover:bg-neo-50/30">
							<p className="text-xs font-semibold uppercase tracking-wider text-neo-600">
								{t('project.course')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{courseName}
							</p>
						</div>
						<div className="rounded-xl border border-neo-100 px-4 py-3 transition-colors hover:border-neo-200 hover:bg-neo-50/30">
							<p className="text-xs font-semibold uppercase tracking-wider text-neo-600">
								{t('project.difficulty')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{translateDifficulty(t, data.estimatedDifficulty)}
							</p>
						</div>
					</div>

					{/* Deadline & Description */}
					<div className="rounded-xl border border-neo-100 px-4 py-3">
						<p className="text-xs font-semibold uppercase tracking-wider text-neo-600">
							{t('project.deadline')}
						</p>
						<p className="mt-1 text-sm font-semibold text-slate-900">
							{formatDeadlineDate(data.deadline, language)}
						</p>
					</div>

					<div className="rounded-xl border border-neo-100 px-4 py-3">
						<p className="text-xs font-semibold uppercase tracking-wider text-neo-600">
							{t('project.description')}
						</p>
						<p className="mt-1 text-sm leading-relaxed text-slate-600">
							{data.description || t('project.noDescription')}
						</p>
					</div>

					{/* Nested Sessions */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
							{t('project.sessions')}
						</h4>
						{data.sessions && data.sessions.length > 0 ? (
							<div className="space-y-2 max-h-60 overflow-y-auto pr-1">
								{data.sessions.map((session) => (
									<button
										key={session.id}
										type="button"
										onClick={() => {
											onClose();
											onSessionClick?.({
												...session,
												courseName: courseName,
												projectId: projectId,
											});
										}}
										className="w-full rounded-xl border border-neo-100 bg-white px-4 py-3 text-left transition-colors hover:border-neo-300 hover:bg-neo-50/50 space-y-2"
									>
										<div>
											<p className="font-semibold text-slate-900 text-sm">
												{session.title}
											</p>
											<p className="mt-0.5 text-xs text-slate-500">
												{formatSessionTime(session.startTime, language)} - {formatSessionTime(session.endTime, language)}
											</p>
										</div>
										<div>
											<span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusClasses[session.status] || statusClasses.SCHEDULED}`}>
												{translateStatus(t, session.status)}
											</span>
										</div>
									</button>
								))}
							</div>
						) : (
							<p className="text-sm text-slate-500 italic">
								{t('project.noSessions')}
							</p>
						)}
					</div>
				</div>
			) : null}
		</Modal>
	);
}

export default ProjectDetailsModal;
