import useI18n from '../../i18n/useI18n.js';

function CalendarHeader({ monthLabel, onPreviousMonth, onNextMonth }) {
	const { t } = useI18n();
	return (
		<div className="neo-card-lg flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<p className="neo-label">{t('calendar.title')}</p>
				<h2 className="mt-2 text-3xl font-bold text-slate-900">
					<span className="text-gradient-neo">{monthLabel}</span>
				</h2>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onPreviousMonth}
					className="neo-btn-secondary flex h-10 w-10 items-center justify-center !p-0"
					aria-label={t('calendar.previous')}
				>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button
					type="button"
					onClick={onNextMonth}
					className="neo-btn-secondary flex h-10 w-10 items-center justify-center !p-0"
					aria-label={t('calendar.next')}
				>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default CalendarHeader;
