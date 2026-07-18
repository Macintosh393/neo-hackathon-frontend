import { create } from 'zustand';

const seededUser = {
	id: '11111111-1111-1111-1111-111111111111',
	name: 'Amina Kovalenko',
	email: 'amina.kovalenko@university.edu',
	avatar: 'AK',
	role: 'Student',
	program: 'Software Engineering',
};

const useAuthStore = create((set) => ({
	token: 'seeded-session-token',
	user: seededUser,
	setAuth: ({ token, user }) => set({ token, user }),
	clearAuth: () => set({ token: null, user: null }),
}));

export default useAuthStore;
