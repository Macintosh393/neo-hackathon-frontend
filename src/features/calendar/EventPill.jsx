function getPillClasses(status, isCompromised) {
	if (status === 'COMPLETED') {
		return 'border-emerald-200 bg-emerald-50 text-emerald-700';
	}

	if (status === 'MISSED') {
		return 'border-rose-200 bg-rose-50 text-rose-700';
	}

	if (isCompromised) {
		return 'border-amber-200 bg-amber-50 text-amber-700';
	}

	return 'border-sky-200 bg-sky-50 text-sky-700';
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
			className={`${isInteractive ? 'w-full cursor-pointer transition hover:shadow' : 'w-full'} rounded-lg border px-2 py-1 text-left text-[11px] leading-4 shadow-sm ${getPillClasses(status, isCompromised)}`}
		>
			<p className="font-semibold truncate">{title}</p>
			<p className="truncate opacity-80">{courseName}</p>
		</Component>
	);
}

export default EventPill;
