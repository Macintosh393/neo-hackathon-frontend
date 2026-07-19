import {
	addDays,
	endOfMonth,
	format,
	startOfMonth,
	startOfWeek,
} from 'date-fns';
import { getDateFnsLocale } from '../../i18n/formatters.js';

/**
 * Why: the calendar UI needs a stable grid shape before any API data arrives.
 * The hook intentionally returns a 42-cell array so the month view never jumps between 5 and 6 rows.
 *
 * @param {Date} currentMonthDate
 * @param {string} [language='uk']
 * @returns {{ dates: Date[], startDate: string, endDate: string, monthLabel: string }}
 */
function useCalendarGrid(
	currentMonthDate,
	language = 'uk',
	viewMode = 'month',
) {
	const locale = getDateFnsLocale(language);
	if (viewMode === 'week') {
		const gridStart = startOfWeek(currentMonthDate, { weekStartsOn: 1 });
		const dates = Array.from({ length: 7 }, (_, index) =>
			addDays(gridStart, index),
		);
		const gridEnd = addDays(gridStart, 6);
		return {
			dates,
			startDate: format(gridStart, 'yyyy-MM-dd'),
			endDate: format(gridEnd, 'yyyy-MM-dd'),
			monthLabel: `${format(gridStart, 'd LLL', { locale })} - ${format(gridEnd, 'd LLL yyyy', { locale })}`,
		};
	}

	const gridStart = startOfWeek(startOfMonth(currentMonthDate), {
		weekStartsOn: 1,
	});
	const dates = Array.from({ length: 42 }, (_, index) =>
		addDays(gridStart, index),
	);
	const gridEnd = addDays(gridStart, 41);

	return {
		dates,
		startDate: format(gridStart, 'yyyy-MM-dd'),
		endDate: format(gridEnd, 'yyyy-MM-dd'),
		monthLabel: format(currentMonthDate, 'LLLL yyyy', { locale }),
		hasOverflowIntoNextMonth: endOfMonth(currentMonthDate) < gridEnd,
	};
}

export default useCalendarGrid;
