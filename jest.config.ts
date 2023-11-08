/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  roots: ['./src/main', './src/renderer'],
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/main/src/__test__/**/*.test.ts'],
      transform: {
        '^.+\\.ts$': 'ts-jest' // Indica que se usará ts-jest para transformar los archivos TypeScript
      }
    },
    {
      displayName: 'renderer',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/renderer/src/__test__/**/*.test.ts'], // Indica los archivos de prueba que se ejecutarán en el navegador
      transform: {
        '^.+\\.ts$': 'ts-jest' // Indica que se usará ts-jest para transformar los archivos TypeScript
      }
    }
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
}

export default config
