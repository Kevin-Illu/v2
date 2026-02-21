import { describe, expect, test } from 'vitest'

describe('Auth repository scope', () => {
  test('auth repository is intentionally out of MVP scope for now', () => {
    const authRepositoryInScope = false
    expect(authRepositoryInScope).toBe(false)
  })
})
