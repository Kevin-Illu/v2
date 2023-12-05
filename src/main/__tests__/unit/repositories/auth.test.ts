import { describe, expect, test } from 'vitest'
import { AuthRepository } from './../../../src/repositories/auth'

import { DataBase } from '../../globalConfig'

import { userMock } from '../../mocks'

describe('Auth Repository', () => {
  const repo = new AuthRepository(DataBase)

  test('registers a new user', async () => {
    const registrationResult = await repo.register(userMock)

    expect(registrationResult).toBe(true)
  })

  test('gets user information', async () => {
    // Registrar el usuario mock para simular que ya existe
    await repo.register(userMock)

    const result = await repo.getUser(userMock.id)
    expect(result).toEqual(userMock)
  })
})
