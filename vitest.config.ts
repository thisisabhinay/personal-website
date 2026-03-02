import { defineConfig } from "vitest/config";

// Default config
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
    globalSetup: ["tests/helpers/global-setup.ts"],
    setupFiles: ["tests/helpers/setup.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/lib/**"],
    },
  },
});
