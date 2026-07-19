import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { updateUserPersona } from '../../api/user.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import useI18n from '../../i18n/useI18n.js';
import useAuthStore from '../../store/useAuthStore.js';

const DEFAULT_FORM = {
	courseYear: 3,
	preferredTime: 'evening',
	studyOnWeekends: true,
	maxHoursPerDay: 4,
};

function PersonaModal({ open, onClose }) {
	const user = useAuthStore((state) => state.user);
	const token = useAuthStore((state) => state.token);
	const setAuth = useAuthStore((state) => state.setAuth);
	const { t } = useI18n();

	const [form, setForm] = useState(() =>
		user?.persona ? { ...DEFAULT_FORM, ...user.persona } : DEFAULT_FORM,
	);
	const [localError, setLocalError] = useState('');

	const mutation = useMutation({
		mutationFn: updateUserPersona,
		onSuccess: (updatedUser) => {
			// Why: the persona update should keep the same token alive while refreshing the user profile.
			setAuth({ token, user: updatedUser });
			onClose?.();
		},
		onError: (error) => {
			setLocalError(error?.message || t('persona.error'));
		},
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;

		setForm((current) => ({
			...current,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLocalError('');

		mutation.mutate({
			courseYear: Number(form.courseYear),
			preferredTime: form.preferredTime,
			studyOnWeekends: Boolean(form.studyOnWeekends),
			maxHoursPerDay: Number(form.maxHoursPerDay),
		});
	};

	return (
		<Modal
			open={open}
			title={t('persona.title')}
			description={t('persona.description')}
			onClose={onClose}
			closable={!mutation.isPending}
			footer={
				<div className="flex items-center justify-end gap-3">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onClose();
						}}
						disabled={mutation.isPending}
						className="neo-btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
					>
						{t('persona.cancel')}
					</button>
					<button
						type="submit"
						form="persona-form"
						disabled={mutation.isPending}
						className="neo-btn-primary disabled:cursor-not-allowed disabled:opacity-60"
					>
						{mutation.isPending ? t('persona.saving') : t('persona.save')}
					</button>
				</div>
			}
		>
			<form id="persona-form" className="space-y-5" onSubmit={handleSubmit}>
				{localError ? (
					<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
						{localError}
					</p>
				) : null}

				<label className="block space-y-2">
					<span className="text-sm font-medium text-slate-700">
						{t('persona.courseYear')}
					</span>
					<input
						type="number"
						min="1"
						max="6"
						name="courseYear"
						value={form.courseYear}
						onChange={handleChange}
						className="neo-input"
					/>
				</label>

				<div className="grid gap-4 sm:grid-cols-2">
					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-700">
							{t('persona.preferredTime')}
						</span>
						<select
							name="preferredTime"
							value={form.preferredTime}
							onChange={handleChange}
							className="neo-input"
						>
							<option value="morning">{t('persona.timeMorning')}</option>
							<option value="afternoon">{t('persona.timeAfternoon')}</option>
							<option value="evening">{t('persona.timeEvening')}</option>
						</select>
					</label>

					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-700">
							{t('persona.maxHoursPerDay')}
						</span>
						<input
							type="number"
							min="1"
							max="12"
							name="maxHoursPerDay"
							value={form.maxHoursPerDay}
							onChange={handleChange}
							className="neo-input"
						/>
					</label>
				</div>

				<label className="flex items-center gap-3 rounded-xl border border-neo-100 bg-neo-50/50 px-4 py-3 transition-colors hover:border-neo-200">
					<input
						type="checkbox"
						name="studyOnWeekends"
						checked={form.studyOnWeekends}
						onChange={handleChange}
						className="h-4 w-4 rounded border-neo-300 text-neo-600 focus:ring-neo-400"
					/>
					<span className="text-sm font-medium text-slate-700">
						{t('persona.studyOnWeekends')}
					</span>
				</label>

				{mutation.isPending ? (
					<div className="rounded-xl border border-neo-100 bg-neo-50/50 px-4 py-3 text-sm text-slate-600">
						<div className="flex items-center justify-between gap-4">
							<span>{t('persona.savingHint')}</span>
							<Spinner label={t('common.updating')} />
						</div>
					</div>
				) : null}
			</form>
		</Modal>
	);
}

export default PersonaModal;
