import useToastStore from '../../store/useToastStore.js';

const typeStyles = {
	success: 'border-emerald-200 bg-emerald-50 text-emerald-800 shadow-emerald-100',
	error: 'border-rose-200 bg-rose-50 text-rose-800 shadow-rose-100',
	info: 'border-neo-200 bg-neo-50 text-neo-800 shadow-neo-lg/10',
};

/**
 * ToastContainer component renders active toast notifications with styling in the bottom-right corner.
 *
 * @returns {React.JSX.Element|null} The container element.
 */
function ToastContainer() {
	const toasts = useToastStore((state) => state.toasts);
	const removeToast = useToastStore((state) => state.removeToast);

	if (toasts.length === 0) return null;

	return (
		<div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-sm font-semibold shadow-md transition-all duration-300 animate-in ${typeStyles[toast.type]}`}
				>
					<p className="flex-1 pr-2">{toast.message}</p>
					<button
						type="button"
						onClick={() => removeToast(toast.id)}
						className="hover:opacity-70 active:scale-95 transition-opacity shrink-0"
						aria-label="Close notification"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			))}
		</div>
	);
}

export default ToastContainer;
