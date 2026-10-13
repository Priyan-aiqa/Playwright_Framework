import { test, expect } from '@playwright/test';

test('Test the Get menthod ', async ({ request }) => { 
    const response  = await request.get("https://petstore.swagger.io/v2/pet/9223372000001093001");
    console.log(response);
    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log(data);
} );