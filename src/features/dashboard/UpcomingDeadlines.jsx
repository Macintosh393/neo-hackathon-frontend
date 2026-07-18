import useI18n from '../../i18n/useI18n.js';

const difficultyStyles = {
	easy: 'border-emerald-200 bg-emerald-50 text-emerald-700',
	medium: 'border-amber-200 bg-amber-50 text-amber-700',
	hard: 'border-rose-200 bg-rose-50 text-rose-700',
};

function UpcomingDeadlines({ deadlines }) {
	const { t } = useI18n();
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
						{t('deadlines.title')}
					</p>
					<h3 className="mt-2 text-xl font-semibold text-slate-900">
						{t('deadlines.subtitle')}
					</h3>
				</div>
				<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
					{deadlines.length} {t('deadlines.items')}
				</span>
			</div>

			<div className="mt-5 space-y-3">
				{deadlines.map((deadline) => (
					<div
						key={deadline.projectId}
						className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-900">{deadline.title}</p>
								<p className="mt-1 text-sm text-slate-500">
									{deadline.courseName}
								</p>
							</div>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${difficultyStyles[deadline.estimatedDifficulty]}`}
							>
								{deadline.estimatedDifficulty}
							</span>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 text-sm text-slate-600">
							<span>
								{deadline.daysLeft} {t('deadlines.daysLeft')}
							</span>
							<span>
								{deadline.progressPercentage}% {t('deadlines.planned')}
							</span>
						</div>

						<div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
							<div
								className="h-full rounded-full bg-slate-900"
								style={{ width: `${deadline.progressPercentage}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default UpcomingDeadlines;
