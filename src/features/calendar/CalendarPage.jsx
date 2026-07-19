import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addMonths, addWeeks, format, subMonths, subWeeks } from 'date-fns';
import { useState } from 'react';
import { getCalendarView } from '../../api/calendar.api.js';
import { updateSession } from '../../api/session.api.js';
import useI18n from '../../i18n/useI18n.js';
import CalendarHeader from './CalendarHeader.jsx';
import DayDetailsModal from './DayDetailsModal.jsx';
import MonthGrid from './MonthGrid.jsx';
import SessionDetailsModal from './SessionDetailsModal.jsx';
import useCalendarGrid from './useCalendarGrid.js';

function CalendarPage() {
	const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
	const [selectedSession, setSelectedSession] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [viewMode, setViewMode] = useState('month');
	const queryClient = useQueryClient();
	const { t, language } = useI18n();
	const grid = useCalendarGrid(currentMonthDate, language, viewMode);

	const query = useQuery({
		queryKey: ['calendar-view', grid.startDate, grid.endDate, language],
		queryFn: () => getCalendarView(grid.startDate, grid.endDate, language),
	});

	const updateSessionMutation = useMutation({
		mutationFn: ({ id, payload }) => updateSession(id, payload),
		onSuccess: (updatedSession) => {
			setSelectedSession(updatedSession);
			queryClient.invalidateQueries({ queryKey: ['calendar-view'] });
			queryClient.invalidateQueries({ queryKey: ['dashboard'] });
		},
	});

	const calendar = query.data?.calendar ?? {};
	const totalItems = Object.values(calendar).reduce(
		(sum, bucket) => sum + bucket.sessions.length + bucket.deadlines.length,
		0,
	);

	const handleMarkCompleted = () => {
		if (!selectedSession || selectedSession.status === 'COMPLETED') {
			return;
		}

		updateSessionMutation.mutate({
			id: selectedSession.id,
			payload: {
				status: 'COMPLETED',
			},
		});
	};

	function formatDate(date) {
		try {
			return format(date, 'yyyy-MM-dd');
		} catch {
			return date ? String(date) : null;
		}
	}

	return (
		<section className="space-y-6">
			<CalendarHeader
				monthLabel={grid.monthLabel}
				onPreviousMonth={() =>
					setCurrentMonthDate((current) =>
						viewMode === 'week' ? subWeeks(current, 1) : subMonths(current, 1),
					)
				}
				onNextMonth={() =>
					setCurrentMonthDate((current) =>
						viewMode === 'week' ? addWeeks(current, 1) : addMonths(current, 1),
					)
				}
				viewMode={viewMode}
				onToggleView={(mode) => setViewMode(mode)}
				onGoToToday={() => setCurrentMonthDate(new Date())}
			/>

			<div className="neo-card-lg neo-grid-bg">
				<div className="mb-4 grid grid-cols-7 gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-neo-600/70">
					{t('calendar.weekdays').map((label) => (
						<div key={label}>{label}</div>
					))}
				</div>

				{query.isLoading ? (
					<div className="rounded-xl border border-dashed border-neo-200 bg-neo-50/50 px-6 py-12 text-center text-neo-600">
						{t('calendar.loading')}
					</div>
				) : null}

				{query.isError ? (
					<div className="rounded-xl border border-rose-200 bg-rose-50 px-6 py-12 text-center text-sm text-rose-700">
						{t('calendar.error')}
					</div>
				) : null}

				{query.data ? (
					<MonthGrid
						dates={grid.dates}
						currentMonthDate={currentMonthDate}
						calendar={calendar}
						onSessionClick={setSelectedSession}
						onDayClick={(date, dayData) =>
							setSelectedDay({ date: formatDate(date), dayData })
						}
					/>
				) : null}
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<div className="neo-stat-card">
					<p className="neo-label">{t('calendar.gridRange')}</p>
					<p className="mt-3 text-lg font-bold text-slate-900">
						{grid.startDate} → {grid.endDate}
					</p>
				</div>
				<div className="neo-stat-card">
					<p className="neo-label">{t('calendar.daysInView')}</p>
					<p className="mt-3 text-lg font-bold text-gradient-neo">
						{query.data?.view.totalDays ?? 42}
					</p>
				</div>
				<div className="neo-stat-card">
					<p className="neo-label">{t('calendar.renderedItems')}</p>
					<p className="mt-3 text-lg font-bold text-gradient-neo">
						{totalItems}
					</p>
				</div>
			</div>

			<SessionDetailsModal
				session={selectedSession}
				language={language}
				t={t}
				isPending={updateSessionMutation.isPending}
				onClose={() => setSelectedSession(null)}
				onMarkCompleted={handleMarkCompleted}
			/>

			<DayDetailsModal
				open={Boolean(selectedDay)}
				onClose={() => setSelectedDay(null)}
				date={selectedDay?.date}
				dayData={selectedDay?.dayData}
				t={t}
				language={language}
				onSessionClick={(session) => {
					setSelectedSession(session);
					setSelectedDay(null);
				}}
			/>
		</section>
	);
}

export default CalendarPage;
