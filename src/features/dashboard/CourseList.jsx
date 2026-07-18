import useI18n from '../../i18n/useI18n.js';

function CourseList({ courses }) {
	const { t } = useI18n();
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
						{t('courses.title')}
					</p>
					<h3 className="mt-2 text-xl font-semibold text-slate-900">
						{t('courses.subtitle')}
					</h3>
				</div>
				<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
					{courses.length} {t('courses.countSuffix')}
				</span>
			</div>

			<div className="mt-5 space-y-4">
				{courses.map((course) => (
					<div
						key={course.courseId}
						className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
					>
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="font-semibold text-slate-900">
									{course.courseName}
								</p>
								<p className="mt-1 text-sm text-slate-500">
									{course.completedProjects}/{course.totalProjects}{' '}
									{t('courses.completed')}
								</p>
							</div>
							<span className="text-sm font-semibold text-slate-900">
								{course.percentage}%
							</span>
						</div>

						<div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
							<div
								className="h-full rounded-full bg-slate-900"
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
