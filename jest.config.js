import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@lottiefiles/dotlottie-react$":
      "<rootDir>/__mocks__/@lottiefiles/dotlottie-react.js",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.js",
    "^next/image$": "<rootDir>/__mocks__/next/image.js",
    "^react-icons$": "<rootDir>/__mocks__/react-icons.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg|lottie)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testMatch: [
    "<rootDir>/__tests__/**/*.(test|spec).(js|jsx)",
    "<rootDir>/components/**/*.(test|spec).(js|jsx)",
    "<rootDir>/stores/**/*.(test|spec).(js|jsx)",
  ],
};

export default createJestConfig(config);
