import { test, expect } from '@playwright/test';
import axios from 'axios';

const BASE = 'https://reqres.in/api/users/';

async function getUser(userId) {
  const url = BASE + userId;
  const headers = {
    'x-api-key': 'reqres-free-v1'
  };

  return axios.get(url, { headers, validateStatus: () => true });
}

test.describe('Reqres API - Get User', () => {

  test('Get existing user', async () => {
    const response = await getUser(12);

    expect(response.status).toBe(200);

    const data = response.data.data;
    expect(data.id).toBe(12);
    expect(data.email).toBe('rachel.howell@reqres.in');
    expect(data.first_name).toBe('Rachel');
    expect(data.last_name).toBe('Howell');
    expect(data.avatar).toBe('https://reqres.in/img/faces/12-image.jpg');
  });

 test('Get user without permission', async () => {
  const response = await getUser(1234);
  expect(response.status).toBe(404);
});
});
