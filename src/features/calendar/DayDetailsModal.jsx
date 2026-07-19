import Modal from '../../components/ui/Modal.jsx';
import EventPill from './EventPill.jsx';

function DayDetailsModal({ open, onClose, date, dayData, t, language, onSessionClick }) {
	const isOpen = Boolean(open);
	const items = [];
	if (dayData) {
		(dayData.sessions || []).forEach((s) =>
			items.push({ ...s, itemType: 'session' }),
		);
		(dayData.deadlines || []).forEach((d) =>
			items.push({ ...d, itemType: 'deadline' }),
		);
	}

	const getFormattedDate = (dateStr) => {
		if (!dateStr) return '';
		const [year, month, day] = dateStr.split('-').map(Number);
		const d = new Date(year, month - 1, day);
		return d.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			closeLabel={t('common.closeModal')}
			title={getFormattedDate(date)}
		>
			{items.length ? (
				<div className="space-y-3">
					{items.map((item) => (
						<EventPill
							key={`${item.itemType}-${item.id ?? item.projectId}-${item.title}`}
							title={item.title}
							courseName={item.courseName}
							status={item.status}
							isCompromised={item.isCompromised}
							onClick={
								item.itemType === 'session'
									? () => onSessionClick(item)
									: undefined
							}
						/>
					))}
				</div>
			) : (
				<p className="text-sm text-neo-600">{t('calendar.loading')}</p>
			)}
		</Modal>
	);
}

export default DayDetailsModal;
