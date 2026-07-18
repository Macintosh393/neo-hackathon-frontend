import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { batchImportProjects } from '../../api/project.api.js';
import Modal from '../../components/ui/Modal.jsx';
import Spinner from '../../components/ui/Spinner.jsx';

const EMPTY_IMPORT = {
	projects: [],
};

function BatchImportModal({ open, onClose }) {
	const [fileName, setFileName] = useState('');
	const [payload, setPayload] = useState(EMPTY_IMPORT);
	const [localError, setLocalError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [isDragging, setIsDragging] = useState(false);

	const mutation = useMutation({
		mutationFn: batchImportProjects,
		onSuccess: (data) => {
			setSuccessMessage(data.message);
			setLocalError('');
		},
		onError: (error) => {
			setLocalError(error?.message || 'Failed to import projects.');
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
				throw new Error('JSON must contain a projects array.');
			}

			setPayload({ projects: parsed.projects });
		} catch (error) {
			setPayload(EMPTY_IMPORT);
			setLocalError(error?.message || 'Invalid JSON file.');
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
			setLocalError('Upload a valid JSON file before importing.');
			return;
		}

		mutation.mutate(payload);
	};

	return (
		<Modal
			open={open}
			title="Import projects"
			description="Drop a JSON file with a projects array and let the scheduler generate the study plan."
			onClose={mutation.isPending ? undefined : onClose}
			closable={!mutation.isPending}
			footer={
				<div className="flex items-center justify-between gap-3">
					<div className="text-sm text-slate-500">
						{fileName
							? `Selected file: ${fileName}`
							: 'Expected schema: { projects: [...] }'}
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={onClose}
							disabled={mutation.isPending}
							className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
						>
							Close
						</button>
						<button
							type="submit"
							form="batch-import-form"
							disabled={mutation.isPending}
							className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{mutation.isPending
								? 'Generating schedule...'
								: 'Import projects'}
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
					<p className="text-lg font-semibold text-slate-900">Drop JSON here</p>
					<p className="mt-2 text-sm leading-6 text-slate-600">
						The file must contain a top-level{' '}
						<span className="font-mono">projects</span> array that matches the
						swagger schema.
					</p>
					<div className="mt-5 flex justify-center">
						<label className="inline-flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
							<input
								type="file"
								accept="application/json,.json"
								className="hidden"
								onChange={handleFileChange}
							/>
							Choose JSON file
						</label>
					</div>
				</div>

				<div className="relative rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
					{mutation.isPending ? (
						<div className="flex items-center justify-between gap-4">
							<span>AI is parsing and scheduling your projects...</span>
							<Spinner label="Processing" />
						</div>
					) : (
						<span>
							This step is intentionally blocking because the backend will later
							run AI breakdown + scheduling here.
						</span>
					)}
				</div>

				{mutation.isPending ? (
					<div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-sm">
						<div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-lg">
							<Spinner label="Generating schedule" />
						</div>
					</div>
				) : null}
			</form>
		</Modal>
	);
}

export default BatchImportModal;
