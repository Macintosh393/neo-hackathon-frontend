function CloseIcon() {
	return (
		<svg
			className="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
			aria-hidden="true"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
}

function Modal({
	open,
	title,
	description,
	children,
	onClose,
	closable = true,
	closeLabel = 'Close',
	footer,
}) {
	if (!open) {
		return null;
	}

	const handleBackdropClick = () => {
		if (closable && onClose) {
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
			<button
				type="button"
				aria-label={closeLabel}
				onClick={handleBackdropClick}
				className="absolute inset-0 cursor-default bg-neo-950/60 backdrop-blur-sm"
			/>
			<div className="relative z-10 flex max-h-[calc(100vh-3rem)] w-full max-w-2xl animate-in flex-col overflow-hidden rounded-2xl border border-neo-200/30 bg-white shadow-neo-lg">
				<div className="flex items-start justify-between border-b border-neo-100 bg-gradient-to-r from-neo-50/50 to-white px-6 py-5">
					<div className="pr-4">
						{title ? (
							<h2 className="text-xl font-bold text-slate-900">{title}</h2>
						) : null}
						{description ? (
							<p className="mt-1 text-sm leading-6 text-slate-600">
								{description}
							</p>
						) : null}
					</div>
					{closable ? (
						<button
							type="button"
							onClick={onClose}
							aria-label={closeLabel}
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-neo-50 hover:text-neo-700"
						>
							<CloseIcon />
						</button>
					) : null}
				</div>
				<div className="overflow-y-auto px-6 py-6">{children}</div>
				{footer ? (
					<div className="border-t border-neo-100 bg-neo-50/30 px-6 py-4">
						{footer}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Modal;
