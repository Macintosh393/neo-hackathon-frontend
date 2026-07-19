import useI18n from '../../i18n/useI18n.js';
import { translateStatus } from '../../i18n/formatters.js';

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

	return 'border-neo-200 bg-neo-50 text-neo-700';
}

function formatTime(isoString, language) {
	return new Date(isoString).toLocaleTimeString(
		language === 'uk' ? 'uk-UA' : 'en-US',
		{
			hour: '2-digit',
			minute: '2-digit',
		},
	);
}

function TodaysAgenda({ agenda, onSessionClick }) {
	const { t, language } = useI18n();
	return (
		<div className="neo-card-lg">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="neo-label">{t('agenda.title')}</p>
					<h3 className="mt-2 text-xl font-bold text-slate-900">
						{t('agenda.subtitle')}
					</h3>
				</div>
				<span className="neo-badge">
					{agenda.length} {t('agenda.sessions')}
				</span>
			</div>

			<div className="mt-5 space-y-3">
				{agenda.map((item) => (
					<div
						key={item.sessionId}
						onClick={() => onSessionClick?.(item)}
						className="neo-list-item group cursor-pointer transition-all hover:border-neo-300 hover:shadow-neo/5"
					>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div>
								<p className="font-semibold text-slate-900 transition-colors group-hover:text-neo-700">
									{item.title}
								</p>
								<p className="mt-1 text-sm text-slate-500">{item.courseName}</p>
							</div>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusClass(item.status, item.isCompromised)}`}
							>
								{translateStatus(t, item.status)}
							</span>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-600">
							<span className="font-medium text-neo-600">
								{formatTime(item.startTime, language)} -{' '}
								{formatTime(item.endTime, language)}
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
