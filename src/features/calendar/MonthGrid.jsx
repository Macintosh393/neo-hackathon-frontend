import { format } from 'date-fns';
import DayCell from './DayCell.jsx';

/**
 * Why: the month grid should be a pure mapper over the prepared date array and hash map.
 */
function MonthGrid({ dates, currentMonthDate, calendar = {}, onSessionClick }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
			{dates.map((date) => {
				const dayKey = format(date, 'yyyy-MM-dd');
				return (
					<DayCell
						key={dayKey}
						date={date}
						currentMonthDate={currentMonthDate}
						dayData={calendar[dayKey]}
						onSessionClick={onSessionClick}
					/>
				);
			})}
		</div>
	);
}

export default MonthGrid;
