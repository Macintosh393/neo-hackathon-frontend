import { format, isSameMonth, isToday } from 'date-fns';
import { useState } from 'react';
import useI18n from '../../i18n/useI18n.js';
import EventPill from './EventPill.jsx';
import DeadlinePill from './DeadlinePill.jsx';
/**
 * Why: DayCell is the place where a single date resolves into a handful of visible rows.
 * Keeping the hash-map lookup here preserves O(1) access in the grid renderer.
 */
function DayCell({
	date,
	currentMonthDate,
	dayData,
	onSessionClick,
	onDayClick,
	isWeek = false,
}) {
	const { t } = useI18n();
	const isCurrentMonth = isSameMonth(date, currentMonthDate);
	const today = isToday(date);
	const sessions = dayData?.sessions ?? [];
	const deadlines = dayData?.deadlines ?? [];
	const allItems = [
		...sessions.map((item) => ({ ...item, itemType: 'session' })),
		...deadlines.map((item) => ({ ...item, itemType: 'deadline' })),
	];

	const visibleItems = isWeek ? allItems : allItems.slice(0, 2);
	const extraCount = allItems.length - visibleItems.length;
	const extraItems = [
		...sessions.map((item) => ({ ...item, itemType: 'session' })),
		...deadlines.map((item) => ({ ...item, itemType: 'deadline' })),
	].slice(2);
	const [showExtras, setShowExtras] = useState(false);

	return (
		<div
			className={`neo-day-cell ${
				isCurrentMonth ? 'neo-day-cell-current' : 'neo-day-cell-other'
			} ${today ? 'neo-day-cell-today' : ''}`}
		>
			<div className="mb-3 flex items-start justify-between gap-2">
				<div
					onClick={() => onDayClick?.(date, dayData)}
					className="cursor-pointer"
				>
					{today ? (
						<span className="neo-badge-today">{format(date, 'd')}</span>
					) : (
						<p
							className={`text-sm font-semibold ${isCurrentMonth ? 'text-slate-900' : 'text-slate-400'}`}
						>
							{format(date, 'd')}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-1.5">
				{visibleItems.map((item) =>
					item.itemType === 'deadline' ? (
						<DeadlinePill
							key={`${item.itemType}-${item.projectId}-${item.title}`}
							title={item.title}
							courseName={item.courseName}
							estimatedDifficulty={item.estimatedDifficulty}
						/>
					) : (
						<EventPill
							key={`${item.itemType}-${item.id ?? item.projectId}-${item.title}`}
							title={item.title}
							courseName={item.courseName}
							status={item.status ?? 'SCHEDULED'}
							isCompromised={Boolean(item.isCompromised)}
							onClick={onSessionClick ? () => onSessionClick(item) : undefined}
						/>
					)
				)}

				{extraCount > 0 ? (
					<div
						className="relative"
						onMouseEnter={() => setShowExtras(true)}
						onMouseLeave={() => setShowExtras(false)}
					>
						<div className="rounded-lg border border-dashed border-neo-200 px-2 py-1 text-[11px] font-medium text-neo-600 transition-colors hover:border-neo-300 hover:bg-neo-50/50">
							+{extraCount} {t('calendar.more')}
						</div>
						{showExtras ? (
							<div className="absolute left-0 top-full z-40 w-64 rounded-lg border border-neo-200 bg-white p-3 shadow-lg space-y-1.5">
								{extraItems.map((item, idx) => (
									<EventPill
										key={`${item.itemType}-${item.id ?? item.projectId}-${item.title}-${idx}`}
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
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default DayCell;
