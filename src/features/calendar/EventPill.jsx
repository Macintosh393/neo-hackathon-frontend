function getPillClasses(status, isCompromised) {
	if (status === 'COMPLETED') {
		return 'border-emerald-200/80 bg-gradient-to-r from-emerald-50 to-emerald-50/50 text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100';
	}

	if (status === 'MISSED') {
		return 'border-rose-200/80 bg-gradient-to-r from-rose-50 to-rose-50/50 text-rose-700 hover:border-rose-300 hover:shadow-rose-100';
	}

	if (isCompromised) {
		return 'border-amber-200/80 bg-gradient-to-r from-amber-50 to-amber-50/50 text-amber-700 hover:border-amber-300 hover:shadow-amber-100';
	}

	return 'border-neo-200/80 bg-gradient-to-r from-neo-50 to-white text-neo-700 hover:border-neo-300 hover:shadow-neo/20';
}

/**
 * Why: the event pill should remain purely presentational so calendar rendering stays cheap and predictable.
 */

function EventPill({ title, courseName, status, isCompromised, onClick }) {
	const isInteractive = typeof onClick === 'function';
	const Component = isInteractive ? 'button' : 'div';

	return (
		<Component
			type={isInteractive ? 'button' : undefined}
			onClick={onClick}
			className={`neo-event-pill ${getPillClasses(status, isCompromised)} ${isInteractive ? 'neo-event-pill-interactive' : ''}`}
		>
			<p className="truncate font-semibold">{title}</p>
			<p className="truncate opacity-75">{courseName}</p>
		</Component>
	);
}

export default EventPill;
