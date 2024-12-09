import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
//PUT
test('check PUT request with correct data and API key data should receive code 200', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('check PUT request with incorrect orderId should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 8,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 12,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/12', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check PUT request with empty orderId should receive code 405', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    // id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('check PUT request with not numeric orderId should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 'asd',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/asd', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check PUT request with invalid API key should receive code 401', async ({ request }) => {
  const requestHeadersInvalid = { api_key: '123456789012345' }

  const requestBody = {
    status: 'OPEN',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: '8',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeadersInvalid,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('check PUT request with incorrect body  should receive code 400', async ({ request }) => {
  const requestBody = {
    status: '123',
    courierId: 10,
    customerName: 'Alex',
    customerPhone: 'string',
    comment: 'update',
    id: 8,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/8', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
//DELETE

test('check DELETE request with valid order ID and API key should receive code 204', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('check DELETE request with ID outside valid and API key should receive code 400', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/101', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check DELETE request with empty ID and valid API key should receive code 405', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('check DELETE request with not numeric ID and valid API key should receive code 400', async ({
  request,
}) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/asd', {
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('check DELETE request with invalid API key should receive code 401', async ({ request }) => {
  const requestHeadersInvalid = { api_key: '123456789012345' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/8', {
    headers: requestHeadersInvalid,
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

//GET

test('check GET request to authenticate user with valid username and password should receive code 200 and return apiKey', async ({
  request,
}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=Alex&password=8888',
  )

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(await response.json()).toHaveProperty('apiKey')
})
test('check GET request to authenticate user with empty username or/and password should receive code 500', async ({
  request,
}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username&password',
  )

  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  //expect(await response.json()).toHaveProperty('apiKey')
})
