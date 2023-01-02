// import type { Config } from "jest";

// export default async (): Promise<Config> => {
//   return {
//     verbose: true,
//   };
// };

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  coverageDirectory: "./coverage",
};
