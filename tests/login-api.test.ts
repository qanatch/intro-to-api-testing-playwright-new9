import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/LoginDto'
import { StatusCodes } from 'http-status-codes'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const jwt = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody).toMatch(jwt)
    console.log('response body:', await response.text())
    console.log('Request URL:', `${serviceURL}${loginPath}`)
    console.log('Request Body:', requestBody)
    console.log('Response Status:', response.status())
    console.log('Response Body:', responseBody)
  })

  test('login with incorrect data', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()

    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })

  test('login with incorrect HTTP method', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.get(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })
})
