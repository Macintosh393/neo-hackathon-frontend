import useI18n from '../../i18n/useI18n.js';

function ProgressCircle({ percentage, label, sublabel }) {
	const { t } = useI18n();
	const radius = 54;
	const stroke = 10;
	const normalizedRadius = radius - stroke / 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
						{label}
					</p>
					<p className="mt-2 text-3xl font-semibold text-slate-900">
						{percentage}%
					</p>
					{sublabel ? (
						<p className="mt-2 text-sm leading-6 text-slate-600">{sublabel}</p>
					) : null}
				</div>

				<div className="relative h-32 w-32 shrink-0">
					<svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
						<circle
							cx="60"
							cy="60"
							r={normalizedRadius}
							fill="transparent"
							stroke="#e2e8f0"
							strokeWidth={stroke}
						/>
						<circle
							cx="60"
							cy="60"
							r={normalizedRadius}
							fill="transparent"
							stroke="#0f172a"
							strokeWidth={stroke}
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-2xl font-semibold text-slate-900">
							{percentage}%
						</span>
						<span className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
							{t('progress.badge')}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgressCircle;
