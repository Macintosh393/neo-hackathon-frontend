import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { updateUserPersona } from '../../api/project.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
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
			setLocalError(error?.message || 'Failed to save persona settings.');
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
			title="Define your study persona"
			description="These constraints shape the AI scheduler and keep the calendar realistic."
			onClose={onClose}
			closable={!mutation.isPending}
			footer={
				<div className="flex items-center justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						disabled={mutation.isPending}
						className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
					>
						Cancel
					</button>
					<button
						type="submit"
						form="persona-form"
						disabled={mutation.isPending}
						className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{mutation.isPending ? 'Saving...' : 'Save persona'}
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
						Course year
					</span>
					<input
						type="number"
						min="1"
						max="6"
						name="courseYear"
						value={form.courseYear}
						onChange={handleChange}
						className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
					/>
				</label>

				<div className="grid gap-4 sm:grid-cols-2">
					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-700">
							Preferred time
						</span>
						<select
							name="preferredTime"
							value={form.preferredTime}
							onChange={handleChange}
							className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
						>
							<option value="morning">Morning</option>
							<option value="afternoon">Afternoon</option>
							<option value="evening">Evening</option>
						</select>
					</label>

					<label className="block space-y-2">
						<span className="text-sm font-medium text-slate-700">
							Max hours per day
						</span>
						<input
							type="number"
							min="1"
							max="12"
							name="maxHoursPerDay"
							value={form.maxHoursPerDay}
							onChange={handleChange}
							className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
						/>
					</label>
				</div>

				<label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
					<input
						type="checkbox"
						name="studyOnWeekends"
						checked={form.studyOnWeekends}
						onChange={handleChange}
						className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
					/>
					<span className="text-sm font-medium text-slate-700">
						Allow weekend study sessions
					</span>
				</label>

				<div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
					{mutation.isPending ? (
						<div className="flex items-center justify-between gap-4">
							<span>Saving persona settings...</span>
							<Spinner label="Updating" />
						</div>
					) : (
						<span>
							These values will be reused by the scheduler and future calendar
							calculations.
						</span>
					)}
				</div>
			</form>
		</Modal>
	);
}

export default PersonaModal;
