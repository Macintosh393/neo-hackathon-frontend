import useI18n from '../../i18n/useI18n.js';

function CourseList({ courses }) {
	const { t } = useI18n();
	return (
		<div className="neo-card-lg">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="neo-label">{t('courses.title')}</p>
					<h3 className="mt-2 text-xl font-bold text-slate-900">
						{t('courses.subtitle')}
					</h3>
				</div>
				<span className="neo-badge">
					{courses.length} {t('courses.countSuffix')}
				</span>
			</div>

			<div className="mt-5 space-y-3">
				{courses.map((course) => (
					<div key={course.courseId} className="neo-list-item group">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-900 transition-colors group-hover:text-neo-700">
									{course.courseName}
								</p>
								<p className="mt-1 text-sm text-slate-500">
									{course.completedProjects}/{course.totalProjects}{' '}
									{t('courses.completed')}
								</p>
							</div>
							<span className="text-sm font-bold text-neo-600">
								{course.percentage}%
							</span>
						</div>

						<div className="neo-progress-track mt-3">
							<div
								className="neo-progress-fill"
								style={{ width: `${course.percentage}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CourseList;
