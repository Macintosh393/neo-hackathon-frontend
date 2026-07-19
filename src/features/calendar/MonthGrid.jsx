import { format } from 'date-fns';
import DayCell from './DayCell.jsx';

/**
 * Why: the month grid should be a pure mapper over the prepared date array and hash map.
 */
function MonthGrid({
	dates,
	currentMonthDate,
	calendar = {},
	onSessionClick,
	onDayClick,
	onProjectClick,
}) {
	const isWeek = dates.length === 7;

	return (
		<div
			className="grid grid-cols-7 gap-1 sm:gap-3"
		>
			{dates.map((date) => {
				const dayKey = format(date, 'yyyy-MM-dd');
				return (
					<DayCell
						key={dayKey}
						date={date}
						currentMonthDate={currentMonthDate}
						dayData={calendar[dayKey]}
						onSessionClick={onSessionClick}
						onDayClick={onDayClick}
						onProjectClick={onProjectClick}
						isWeek={isWeek}
					/>
				);
			})}
		</div>
	);
}

export default MonthGrid;
