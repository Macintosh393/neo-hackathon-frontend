import { format, isSameMonth, isToday } from 'date-fns';
import useI18n from '../../i18n/useI18n.js';
import EventPill from './EventPill.jsx';

/**
 * Why: DayCell is the place where a single date resolves into a handful of visible rows.
 * Keeping the hash-map lookup here preserves O(1) access in the grid renderer.
 */
function DayCell({ date, currentMonthDate, dayData, onSessionClick }) {
	const { t } = useI18n();
	const isCurrentMonth = isSameMonth(date, currentMonthDate);
	const today = isToday(date);
	const sessions = dayData?.sessions ?? [];
	const deadlines = dayData?.deadlines ?? [];
	const visibleItems = [
		...sessions.map((item) => ({ ...item, itemType: 'session' })),
		...deadlines.map((item) => ({ ...item, itemType: 'deadline' })),
	].slice(0, 2);
	const extraCount = sessions.length + deadlines.length - visibleItems.length;

	return (
		<div
			className={`neo-day-cell ${
				isCurrentMonth ? 'neo-day-cell-current' : 'neo-day-cell-other'
			} ${today ? 'neo-day-cell-today' : ''}`}
		>
			<div className="mb-3 flex items-start justify-between gap-2">
				<div>
					{today ? (
						<span className="neo-badge-today">{format(date, 'd')}</span>
					) : (
						<p
							className={`text-sm font-semibold ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}
						>
							{format(date, 'd')}
						</p>
					)}
					{today ? (
						<span className="mt-1.5 inline-flex text-[10px] font-semibold uppercase tracking-[0.16em] text-neo-600">
							{t('calendar.today')}
						</span>
					) : null}
				</div>
			</div>

			<div className="space-y-1.5">
				{visibleItems.map((item) => (
					<EventPill
						key={`${item.itemType}-${item.id ?? item.projectId}-${item.title}`}
						title={item.title}
						courseName={item.courseName}
						status={item.status ?? 'SCHEDULED'}
						isCompromised={Boolean(item.isCompromised)}
						onClick={
							item.itemType === 'session' && onSessionClick
								? () => onSessionClick(item)
								: undefined
						}
					/>
				))}

				{extraCount > 0 ? (
					<div className="rounded-lg border border-dashed border-neo-200 px-2 py-1 text-[11px] font-medium text-neo-600 transition-colors hover:border-neo-300 hover:bg-neo-50/50">
						+{extraCount} {t('calendar.more')}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default DayCell;
