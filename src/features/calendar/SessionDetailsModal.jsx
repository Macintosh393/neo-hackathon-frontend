import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';

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
}) {
	const isOpen = Boolean(session);
	const isCompleted = session?.status === 'COMPLETED';

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			title={t('calendar.sessionModalTitle')}
			description={t('calendar.sessionModalDescription')}
			footer={
				<div className="flex flex-wrap items-center justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
					>
						{t('calendar.close')}
					</button>
					<button
						type="button"
						onClick={onMarkCompleted}
						disabled={isCompleted || isPending}
						className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
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
					<div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
						<p className="text-sm font-medium text-slate-500">
							{t('calendar.sessionTitle')}
						</p>
						<p className="mt-1 text-base font-semibold text-slate-900">
							{session.title}
						</p>
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="rounded-xl border border-slate-200 px-4 py-3">
							<p className="text-sm font-medium text-slate-500">
								{t('calendar.sessionCourse')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{session.courseName}
							</p>
						</div>
						<div className="rounded-xl border border-slate-200 px-4 py-3">
							<p className="text-sm font-medium text-slate-500">
								{t('calendar.sessionStatus')}
							</p>
							<p className="mt-1 text-sm font-semibold text-slate-900">
								{session.status}
							</p>
						</div>
					</div>
					<div className="rounded-xl border border-slate-200 px-4 py-3">
						<p className="text-sm font-medium text-slate-500">
							{t('calendar.sessionTime')}
						</p>
						<p className="mt-1 text-sm font-semibold text-slate-900">
							{formatSessionTime(session.startTime, language)} -{' '}
							{formatSessionTime(session.endTime, language)}
						</p>
					</div>
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
