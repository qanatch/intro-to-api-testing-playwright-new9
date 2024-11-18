import { CalculateDto } from './dto/calculate-risk-dto'
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Calculate risk score with correct data should receive code 200', async ({ request }) => {
  const requestBody = CalculateDto.createWithValidData()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',{
      data: requestBody,
    },
  )
  const responseBody = await response.json() //получаем тело ответа
  console.log('request body:', requestBody)
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())

  expect(response.status()).toBe(StatusCodes.OK)
  console.log('Status code:', response.status())

  expect.soft(responseBody.riskLevel).toBeDefined()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBeDefined()
})

test('Calculate risk score with incorrect data should receive code 400', async ({ request }) => {
  const requestBody = CalculateDto.createWithInvalidData()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',{
      data: requestBody,
    },
  )
  console.log('Status code:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Calculate risk score with empty request body should receive code 400', async ({ request }) => {
    const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
  )
  console.log('Status code:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Calculate risk score with correct data "High Risk"', async ({ request }) => {
  const requestBody = CalculateDto.createWithValidDataHighRisk()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('request body:', requestBody)
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())

  expect(response.status()).toBe(StatusCodes.OK)
  console.log('Status code:', response.status())

  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([3, 6]))
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBeDefined()
})

test('Calculate risk score with correct data "Medium Risk"', async ({ request }) => {
  const requestBody = CalculateDto.createWithValidDataMediumRisk()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('request body:', requestBody)
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())

  expect(response.status()).toBe(StatusCodes.OK)
  console.log('Status code:', response.status())

  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([6,9,12]))
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBeDefined()
})
test('Calculate risk score with correct data "Low Risk"', async ({ request }) => {
  const requestBody = CalculateDto.createWithValidDataLowRisk()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('request body:', requestBody)
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())

  expect(response.status()).toBe(StatusCodes.OK)
  console.log('Status code:', response.status())

  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskPeriods).toEqual(expect.arrayContaining([12, 18, 24,30,36]))
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBeDefined()
})