import { create } from 'zustand';

const seededUser = {
	id: '11111111-1111-1111-1111-111111111111',
	name: 'Аміна Коваленко',
	email: 'amina.kovalenko@university.edu',
	avatar: 'АК',
	role: 'Student',
	program: 'software-engineering',
	persona: {
		courseYear: 3,
		preferredTime: 'evening',
		studyOnWeekends: true,
		maxHoursPerDay: 4,
	},
};

const useAuthStore = create((set) => ({
	token: 'seeded-session-token',
	user: seededUser,
	setAuth: ({ token, user }) => set({ token, user }),
	clearAuth: () => set({ token: null, user: null }),
}));

export default useAuthStore;
