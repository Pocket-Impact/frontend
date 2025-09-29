export const useParams = jest.fn(() => ({ id: "test-id" }));
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}));
export const usePathname = jest.fn(() => "/feedback/dashboard");
