import {
	addDays,
	endOfMonth,
	format,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

/**
 * Why: the calendar UI needs a stable grid shape before any API data arrives.
 * The hook intentionally returns a 42-cell array so the month view never jumps between 5 and 6 rows.
 *
 * @param {Date} currentMonthDate
 * @returns {{ dates: Date[], startDate: string, endDate: string, monthLabel: string }}
 */
function useCalendarGrid(currentMonthDate) {
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
		monthLabel: format(currentMonthDate, 'LLLL yyyy'),
		hasOverflowIntoNextMonth: endOfMonth(currentMonthDate) < gridEnd,
	};
}

export default useCalendarGrid;
