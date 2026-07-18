function Spinner({ label = 'Loading' }) {
	return (
		<div className="flex items-center gap-3 text-sm font-medium text-neo-600">
			<span className="h-5 w-5 animate-spin rounded-full border-2 border-neo-200 border-t-neo-600" />
			<span>{label}</span>
		</div>
	);
}

export default Spinner;
