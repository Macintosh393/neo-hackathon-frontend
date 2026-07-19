import useI18n from '../../i18n/useI18n.js';

function CalendarHeader({
	monthLabel,
	onPreviousMonth,
	onNextMonth,
	viewMode = 'month',
	onToggleView,
	onGoToToday,
}) {
	const { t } = useI18n();
	return (
		<div className="neo-card-lg flex items-center justify-between gap-4 px-4 py-3">
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onGoToToday}
					className="neo-btn-secondary !rounded-full !py-2 !px-3.5 !text-sm font-semibold"
				>
					{t('calendar.today')}
				</button>

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
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19l-7-7 7-7"
						/>
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
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			<div className="text-center">
				<p className="neo-label">{t('calendar.title')}</p>
				<h2 className="mt-1 text-2xl font-bold text-slate-900">{monthLabel}</h2>
			</div>

			<div className="flex items-center gap-2">
				<select
					aria-label="View mode"
					value={viewMode}
					onChange={(e) => onToggleView?.(e.target.value)}
					className="neo-input w-36"
				>
					<option value="week">{t('calendar.viewWeek')}</option>
					<option value="month">{t('calendar.viewMonth')}</option>
				</select>
			</div>
		</div>
	);
}

export default CalendarHeader;
