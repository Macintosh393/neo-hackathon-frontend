import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { batchImportProjects } from '../../api/project.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import { interpolate } from '../../i18n/formatters.js';
import useI18n from '../../i18n/useI18n.js';

const EMPTY_IMPORT = {
	projects: [],
};

function BatchImportModal({ open, onClose }) {
	const { t } = useI18n();
	const [fileName, setFileName] = useState('');
	const [payload, setPayload] = useState(EMPTY_IMPORT);
	const [localError, setLocalError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [isDragging, setIsDragging] = useState(false);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: batchImportProjects,
		onSuccess: (data) => {
			setSuccessMessage(data.message);
			setLocalError('');
			queryClient.invalidateQueries();
		},
		onError: (error) => {
			setLocalError(error?.message || t('import.error'));
		},
	});

	const parseImportFile = async (file) => {
		if (!file) {
			return;
		}

		setFileName(file.name);
		setLocalError('');
		setSuccessMessage('');

		try {
			const text = await file.text();
			const parsed = JSON.parse(text);

			if (!parsed || !Array.isArray(parsed.projects)) {
				throw new Error('invalid_schema');
			}

			setPayload({ projects: parsed.projects });
		} catch (error) {
			setPayload(EMPTY_IMPORT);
			if (error.message === 'invalid_schema') {
				setLocalError(t('import.invalidSchema'));
			} else {
				setLocalError(t('import.invalidJson'));
			}
		}
	};

	const handleFileChange = async (event) => {
		const [file] = event.target.files || [];
		await parseImportFile(file);
	};

	const handleDrop = async (event) => {
		event.preventDefault();
		setIsDragging(false);

		const [file] = event.dataTransfer.files || [];
		await parseImportFile(file);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLocalError('');

		if (!payload.projects.length) {
			setLocalError(t('import.uploadError'));
			return;
		}

		mutation.mutate(payload);
	};

	return (
		<Modal
			open={open}
			title={t('import.title')}
			description={t('import.description')}
			onClose={mutation.isPending ? undefined : onClose}
			closable={!mutation.isPending}
			footer={
				<div className="flex items-center justify-between gap-3">
					<div className="text-sm text-slate-500">
						{fileName
							? interpolate(t('import.selectedFile'), { name: fileName })
							: null}
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={onClose}
							disabled={mutation.isPending}
							className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{t('import.close')}
						</button>
						<button
							type="submit"
							form="batch-import-form"
							disabled={mutation.isPending}
							className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{mutation.isPending
								? t('import.generating')
								: t('import.import')}
						</button>
					</div>
				</div>
			}
		>
			<form
				id="batch-import-form"
				className="space-y-5"
				onSubmit={handleSubmit}
			>
				{localError ? (
					<p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
						{localError}
					</p>
				) : null}

				{successMessage ? (
					<p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
						{successMessage}
					</p>
				) : null}

				<div
					onDragEnter={() => setIsDragging(true)}
					onDragLeave={() => setIsDragging(false)}
					onDragOver={(event) => event.preventDefault()}
					onDrop={handleDrop}
					className={`rounded-2xl border-2 border-dashed px-5 py-8 text-center transition ${
						isDragging
							? 'border-slate-900 bg-slate-100'
							: 'border-slate-300 bg-slate-50'
					}`}
				>
					<p className="text-lg font-semibold text-slate-900">{t('import.dropTitle')}</p>
					<p className="mt-2 text-sm leading-6 text-slate-600">
						{t('import.dropHint')}
					</p>
					<div className="mt-5 flex justify-center">
						<label className="inline-flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
							<input
								type="file"
								accept="application/json,.json"
								className="hidden"
								onChange={handleFileChange}
							/>
							{t('import.chooseFile')}
						</label>
					</div>
				</div>

				{mutation.isPending ? (
					<div className="relative rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
						<div className="flex items-center justify-between gap-4">
							<span>{t('import.processing')}</span>
							<Spinner label={t('import.processingLabel')} />
						</div>
					</div>
				) : null}

				{mutation.isPending ? (
					<div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm">
						<div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-lg">
							<Spinner label={t('import.generatingLabel')} />
						</div>
					</div>
				) : null}
			</form>
		</Modal>
	);
}

export default BatchImportModal;
