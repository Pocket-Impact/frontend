import "@testing-library/jest-dom";
// eslint-disable-next-line no-undef
jest.mock("node-fetch", () => jest.fn());

// eslint-disable-next-line no-undef
global.fetch = jest.fn();
