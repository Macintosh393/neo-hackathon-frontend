function getDeadlineClasses(difficulty) {
	if (difficulty === 'hard') {
		return 'border-rose-300 bg-rose-100 text-rose-800 hover:border-rose-400 hover:shadow-rose-100';
	}
	if (difficulty === 'medium') {
		return 'border-amber-300 bg-amber-100 text-amber-800 hover:border-amber-400 hover:shadow-amber-100';
	}
	return 'border-indigo-300 bg-indigo-100 text-indigo-800 hover:border-indigo-400 hover:shadow-indigo-100';
}

/**
 * Why: Deadlines are visually distinct from regular study sessions.
 * This component is purely presentational to ensure O(1) performance in grid rendering.
 */
function DeadlinePill({ title, courseName, estimatedDifficulty, onClick }) {
	const isInteractive = typeof onClick === 'function';
	const Component = isInteractive ? 'button' : 'div';

	return (
		<Component
			type={isInteractive ? 'button' : undefined}
			onClick={onClick}
			className={`neo-event-pill neo-deadline-pill border-2 ${getDeadlineClasses(estimatedDifficulty)} ${isInteractive ? 'neo-event-pill-interactive' : ''}`}
		>
			<p className="truncate font-bold uppercase text-[8px] tracking-wider mb-0.5 hidden sm:block">Deadline</p>
			<p className="truncate font-semibold">{title}</p>
			<p className="truncate opacity-75 hidden sm:block">{courseName}</p>
		</Component>
	);
}

export default DeadlinePill;
