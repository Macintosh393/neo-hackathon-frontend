import useI18n from '../../i18n/useI18n.js';
import { translateDifficulty } from '../../i18n/formatters.js';

const difficultyStyles = {
	easy: 'border-emerald-200 bg-emerald-50 text-emerald-700',
	medium: 'border-amber-200 bg-amber-50 text-amber-700',
	hard: 'border-rose-200 bg-rose-50 text-rose-700',
};

/**
 * Helper to determine CSS classes for urgency badge based on days left until deadline.
 *
 * @param {number} daysLeft - Number of days remaining.
 * @returns {string} Tailwind CSS class string.
 */
function getUrgencyStyles(daysLeft) {
	if (daysLeft < 3) {
		return 'border-rose-200 bg-rose-50 text-rose-700';
	}
	if (daysLeft < 7) {
		return 'border-amber-200 bg-amber-50 text-amber-700';
	}
	return 'border-slate-200 bg-slate-50 text-slate-600';
}

/**
 * Renders a list of upcoming deadlines with difficulty badges, progress bars, and urgency status badges.
 *
 * @param {Object} props
 * @param {Object[]} props.deadlines - List of upcoming deadlines.
 */
function UpcomingDeadlines({ deadlines, onProjectClick }) {
	const { t } = useI18n();
	return (
		<div className="neo-card-lg">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="neo-label">{t('deadlines.title')}</p>
					<h3 className="mt-2 text-xl font-bold text-slate-900">
						{t('deadlines.subtitle')}
					</h3>
				</div>
				<span className="neo-badge">
					{deadlines.length} {t('deadlines.items')}
				</span>
			</div>

			<div className="mt-5 space-y-3">
				{deadlines.map((deadline) => (
					<div
						key={deadline.projectId}
						onClick={() => onProjectClick?.(deadline.projectId)}
						className="neo-list-item group cursor-pointer transition-all hover:border-neo-300 hover:shadow-neo/5"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-900 transition-colors group-hover:text-neo-700">
									{deadline.title}
								</p>
								<p className="mt-1 text-sm text-slate-500">
									{deadline.courseName}
								</p>
							</div>
							<span
								className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${difficultyStyles[deadline.estimatedDifficulty]}`}
							>
								{translateDifficulty(t, deadline.estimatedDifficulty)}
							</span>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4 text-sm">
							<span
								className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getUrgencyStyles(deadline.daysLeft)}`}
							>
								{deadline.daysLeft} {t('deadlines.daysLeft')}
							</span>
							<span className="text-slate-500">
								{deadline.progressPercentage}% {t('deadlines.planned')}
							</span>
						</div>

						<div className="neo-progress-track mt-3">
							<div
								className="neo-progress-fill"
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
