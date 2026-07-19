import useI18n from '../../i18n/useI18n.js';

function ProgressCircle({ percentage, label, sublabel }) {
	const { t } = useI18n();
	const radius = 54;
	const stroke = 10;
	const normalizedRadius = radius - stroke / 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="neo-card-lg">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-center sm:text-left">
				<div>
					<p className="neo-label">{label}</p>
					<p className="mt-2 text-3xl font-bold text-gradient-neo">
						{percentage}%
					</p>
					{sublabel ? (
						<p className="mt-2 text-sm leading-6 text-slate-600">{sublabel}</p>
					) : null}
				</div>

				<div className="relative h-32 w-32 shrink-0">
					<svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
						<defs>
							<linearGradient id="neoProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#5b18ee" />
								<stop offset="50%" stopColor="#7c3aed" />
								<stop offset="100%" stopColor="#9d6bff" />
							</linearGradient>
						</defs>
						<circle
							cx="60"
							cy="60"
							r={normalizedRadius}
							fill="transparent"
							stroke="#ede5ff"
							strokeWidth={stroke}
						/>
						<circle
							cx="60"
							cy="60"
							r={normalizedRadius}
							fill="transparent"
							stroke="url(#neoProgressGradient)"
							strokeWidth={stroke}
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							className="transition-all duration-700 ease-out"
						/>
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-2xl font-bold text-slate-900">
							{percentage}%
						</span>
						<span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neo-600">
							{t('progress.badge')}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProgressCircle;
