import useI18n from '../../i18n/useI18n.js';

function statusClass(status, isCompromised) {
	if (status === 'COMPLETED') {
		return 'border-emerald-200 bg-emerald-50 text-emerald-700';
	}

	if (status === 'MISSED') {
		return 'border-rose-200 bg-rose-50 text-rose-700';
	}

	if (isCompromised) {
		return 'border-amber-200 bg-amber-50 text-amber-700';
	}

	return 'border-sky-200 bg-sky-50 text-sky-700';
}

function formatTime(isoString) {
	return new Date(isoString).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
}

function TodaysAgenda({ agenda }) {
	const { t } = useI18n();
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
						{t('agenda.title')}
					</p>
					<h3 className="mt-2 text-xl font-semibold text-slate-900">
						{t('agenda.subtitle')}
					</h3>
				</div>
				<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
					{agenda.length} {t('agenda.sessions')}
				</span>
			</div>

			<div className="mt-5 space-y-3">
				{agenda.map((item) => (
					<div
						key={item.sessionId}
						className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
					>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div>
								<p className="font-semibold text-slate-900">{item.title}</p>
								<p className="mt-1 text-sm text-slate-500">{item.courseName}</p>
							</div>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusClass(item.status, item.isCompromised)}`}
							>
								{item.status}
							</span>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-600">
							<span>
								{formatTime(item.startTime)} - {formatTime(item.endTime)}
							</span>
							{item.isCompromised ? (
								<span className="max-w-[220px] truncate text-amber-700">
									{item.compromiseReason}
								</span>
							) : (
								<span className="text-slate-500">
									{t('agenda.scheduledSlot')}
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TodaysAgenda;
