# 🧪 Unit & Integration Testing Guide

This project uses **Jest** and **React Testing Library** for unit and integration tests.  
Tests are written for key features: survey creation, feedback submission, and dashboard rendering.

---

## 📂 Test File Structure

All tests are located in the `__tests__` folder:

- `__tests__/Survey.test.jsx` — Survey creation and submission
- `__tests__/Feedback.test.jsx` — Feedback form validation and submission
- `__tests__/Dashboard.test.jsx` — Dashboard rendering and statistics

---

## 🧩 Unit Tests

Unit tests check individual components and functions in isolation.

**Example: Survey Creation**

```jsx
// __tests__/Survey.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackForm from "../app/(surveys)/surveys/unique/[id]/page";

test("renders survey title and questions", async () => {
  render(<FeedbackForm />);
  expect(await screen.findByText(/Survey form/i)).toBeInTheDocument();
});
```

---

## 🔗 Integration Tests

Integration tests check how components work together and simulate user flows.

**Example: Feedback Submission**

```jsx
// __tests__/Feedback.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/(feedbacks)/feedbacks/[id]/page";

test("submits feedback and shows success", async () => {
  render(<Page />);
  fireEvent.click(screen.getByText(/Select category/i));
  fireEvent.click(screen.getByText(/product/i));
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "Great!" } });
  fireEvent.click(screen.getByText(/Submit answer/i));
  expect(await screen.findByText(/Feedback submitted successfully/i)).toBeInTheDocument();
});
```

---

## ⚙️ Jest & Testing Library Setup

**Install dependencies:**

```sh
npm install --save-dev jest @testing-library/react
```

**Jest config (`jest.config.cjs`):**

```js
const nextJest = require("next/jest.js");
const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/"
  ],
};

module.exports = createJestConfig(config);
```

**TypeScript config (`tsconfig.json`):**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 🏃 Running Tests

```sh
npm test
```
or
```sh
npx jest
```

---

## 📚 References

- [Next.js: Testing with Jest](https://nextjs.org/docs/pages/building-your-application/configuring/testing)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)

---

**Unit and integration tests ensure your app’s core features work as expected. For more examples, see the
