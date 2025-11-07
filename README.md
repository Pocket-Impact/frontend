
# 🪩 Pocket Impact — Frontend
One Platform. Infinite Good.

Pocket Impact is a modular, all-in-one platform designed to help NGOs, nonprofits, and mission-driven teams manage operations, collect feedback, track progress, and amplify impact — beautifully and efficiently.

This is the frontend codebase built with Next.js and Tailwind CSS.

---

## Key Engineering Practices

### Prop Validation
- All React components use [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) for runtime prop validation. This helps catch errors after the transition from TypeScript to JavaScript.

### Centralized Error Logging
- Sentry is integrated for error logging and production debugging. See `sentry.client.config.js` and `sentry.server.config.js` for setup.
- An error boundary is used at the root level to capture and report errors.

### Code Duplication
- Shared utility functions (e.g., percent change, data normalization) are in `utils/mathUtils.js`.
- Any repeated calculations should be moved to shared modules.

### Reusable Data Fetching
- All API calls use a custom React hook: `hooks/useFetch.js`.
- This reduces boilerplate and standardizes data fetching across components.

### Accessibility
- All interactive components are being upgraded for accessibility:
	- Proper labels for all form fields and buttons
	- Visible focus states
	- ARIA roles and attributes where needed
	- Semantic HTML for structure and navigation
- Accessibility is tested with keyboard navigation and screen readers.

### Testing
- (In Progress) Add unit and integration tests for survey creation, feedback submission, and dashboard rendering using Jest and React Testing Library.

### Documentation
- This README and in-code comments are being updated to reflect the transition to JavaScript, the use of PropTypes, the new `useFetch` hook, and error logging patterns.
- Please keep documentation up to date as new patterns are introduced.

---

## 🚀 Features
- Modular architecture with Next.js App Router
- Beautiful, responsive UI built with Tailwind
- Dynamic dashboards and tool pages

## 🛠 Tech Stack
- Framework: Next.js (App Router, JavaScript)
- Styling: Tailwind CSS
- Icons: React Icons
- Linting: ESLint