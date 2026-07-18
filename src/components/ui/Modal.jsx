function Modal({
	open,
	title,
	description,
	children,
	onClose,
	closable = true,
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
				aria-label="Close modal backdrop"
				onClick={handleBackdropClick}
				className="absolute inset-0 cursor-default bg-slate-950/60"
			/>
			<div className="relative z-10 flex max-h-[calc(100vh-3rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
				<div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
					<div>
						{title ? (
							<h2 className="text-xl font-semibold text-slate-900">{title}</h2>
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
							className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
						>
							Close
						</button>
					) : null}
				</div>
				<div className="overflow-y-auto px-6 py-6">{children}</div>
				{footer ? (
					<div className="border-t border-slate-200 px-6 py-4">{footer}</div>
				) : null}
			</div>
		</div>
	);
}

export default Modal;
