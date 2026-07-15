```
time-manager-frontend/
├── public/
├── src/
│   ├── api/                   # Налаштування Axios та API клієнти
│   │   ├── axios.js           # Інстанс Axios з перехоплювачами (interceptors) для токенів
│   │   ├── calendar.api.js    # Запити до /api/calendar/...
│   │   └── project.api.js     # Запити до /api/projects/...
│   │
│   ├── components/            # Спільні (тупі) UI компоненти
│   │   ├── ui/                # Базові елементи
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Spinner.jsx
│   │   └── layout/            # Каркас сторінки
│   │       ├── AppLayout.jsx  # Верхнє меню + <Outlet />
│   │       └── Navbar.jsx
│   │
│   ├── features/              # Бізнес-логіка, розбита по фічах (РОЗУМНІ компоненти)
│   │   ├── auth/
│   │   │   ├── AuthGuard.jsx  # Редирект на логін, якщо немає токена
│   │   │   └── LoginPage.jsx
│   │   ├── onboarding/
│   │   │   ├── PersonaModal.jsx
│   │   │   └── BatchImportModal.jsx
│   │   ├── calendar/          # Усе, що стосується сітки 
│   │   │   ├── CalendarPage.jsx
│   │   │   ├── MonthGrid.jsx
│   │   │   ├── DayCell.jsx
│   │   │   ├── EventPill.jsx
│   │   │   └── useCalendarGrid.js # Хук, який генерує 35 днів через date-fns
│   │   └── dashboard/
│   │       ├── DashboardPage.jsx
│   │       ├── ProgressCircle.jsx
│   │       └── UpcomingDeadlines.jsx
│   │
│   ├── store/                 # Глобальний стан
│   │   └── useAuthStore.js    # Zustand store для збереження user/tokens
│   │
│   ├── utils/                 # Допоміжні функції
│   │   ├── dateHelpers.js     # Обгортки навколо date-fns
│   │   └── constants.js       # Кольори предметів, енуми статусів
│   │
│   ├── App.jsx                # Налаштування провайдерів (React Query, Router)
│   └── main.jsx               # Точка входу, рендер у DOM
├── tailwind.config.js
└── package.json
```