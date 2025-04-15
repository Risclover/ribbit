module.exports = {
  rootDir: "./",
  collectCoverage: true,
  coverageDirectory: "coverage",

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    // First, catch any .png, .jpg, etc.
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",

    // Then catch .css
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",

    // Lastly, the alias
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    fetch: global.fetch,
  },
};
