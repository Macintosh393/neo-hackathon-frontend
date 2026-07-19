import { create } from 'zustand';

/**
 * @typedef {'success'|'error'|'info'} ToastType
 *
 * @typedef {Object} Toast
 * @property {number} id - Unique timestamp identifier.
 * @property {string} message - Message text.
 * @property {ToastType} type - Notification type.
 */

const useToastStore = create((set) => ({
	toasts: [],
	/**
	 * Trigger a new toast notification.
	 * @param {string} message - Message to display.
	 * @param {ToastType} [type='info'] - Type of toast.
	 * @param {number} [duration=3000] - Visibility duration in milliseconds.
	 */
	addToast: (message, type = 'info', duration = 3000) => {
		const id = Date.now();
		set((state) => ({
			toasts: [...state.toasts, { id, message, type }],
		}));
		setTimeout(() => {
			set((state) => ({
				toasts: state.toasts.filter((t) => t.id !== id),
			}));
		}, duration);
	},
	/**
	 * Remove a toast manually by ID.
	 * @param {number} id - Toast ID.
	 */
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		})),
}));

export default useToastStore;
