import useI18n from '../../i18n/useI18n.js';

function CalendarHeader({ monthLabel, onPreviousMonth, onNextMonth }) {
	const { t } = useI18n();
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
			<div>
				<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
					{t('calendar.title')}
				</p>
				<h2 className="mt-2 text-3xl font-semibold text-slate-900">
					{monthLabel}
				</h2>
			</div>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onPreviousMonth}
					className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
				>
					{t('calendar.previous')}
				</button>
				<button
					type="button"
					onClick={onNextMonth}
					className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
				>
					{t('calendar.next')}
				</button>
			</div>
		</div>
	);
}

export default CalendarHeader;
