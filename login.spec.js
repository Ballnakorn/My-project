import { test, expect } from '@playwright/test';

const URL = 'http://the-internet.herokuapp.com/login';

test.describe('Login Test - The Internet', () => {

  test('Login success', async ({ page }) => {
    // Step 1: Open login page
    await page.goto(URL);

    // Verify login page
    await expect(page.locator('h2')).toHaveText('Login Page');
    await expect(page.locator('h4')).toContainText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.');


    // Step 2: Input correct username & password
    await expect(page.locator('#login')).toContainText('Username');
    await page.fill('#username', 'tomsmith');
    await expect(page.locator('#login')).toContainText('Password');
    await page.fill('#password', 'SuperSecretPassword!');

    // Step 3: Click Login
    await expect(page.locator('i')).toContainText('Login');
    await page.click('button[type="submit"]');

    // Verify login success message
    const successMessage = page.locator('#flash');
    await expect(successMessage).toContainText('You logged into a secure area!');
    await expect(page.locator('h2')).toContainText('Secure Area');
    await expect(page.locator('h4')).toContainText('Welcome to the Secure Area. When you are done click logout below.');

    // Step 4: Click Logout
    await expect(page.locator('#content')).toContainText('Logout');
    await page.click('a[href="/logout"]');

    // Verify logout message
    const logoutMessage = page.locator('#flash');
    await expect(logoutMessage).toContainText('You logged out of the secure area!');
  });

  test('Login failed - Password incorrect', async ({ page }) => {
    // Step 1: Open login page
    await page.goto(URL);

    // Verify login page
    await expect(page.locator('h2')).toHaveText('Login Page');
    await expect(page.locator('h4')).toContainText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.');


    // Step 2: Input correct username but wrong password
    await expect(page.locator('#login')).toContainText('Username');
    await page.fill('#username', 'tomsmith');
    await expect(page.locator('#login')).toContainText('Password');
    await page.fill('#password', 'Password!');

    // Step 3: Click Login
    await expect(page.locator('i')).toContainText('Login');
    await page.click('button[type="submit"]');

    // Verify error message
    const errorMessage = page.locator('#flash');
    await expect(errorMessage).toContainText('Your password is invalid!');
  });

  test('Login failed - Username not found', async ({ page }) => {
    // Step 1: Open login page
    await page.goto(URL);

    // Verify login page
    await expect(page.locator('h2')).toHaveText('Login Page');
    await expect(page.locator('h4')).toContainText('This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.');


    // Step 2: Input invalid username and password
    await expect(page.locator('#login')).toContainText('Username');
    await page.fill('#username', 'tomholland');
    await expect(page.locator('#login')).toContainText('Password');
    await page.fill('#password', 'Password!');

    // Step 3: Click Login
    await expect(page.locator('i')).toContainText('Login');
    await page.click('button[type="submit"]');

    // Verify error message
    const errorMessage = page.locator('#flash');
    await expect(errorMessage).toContainText('Your username is invalid!');
  });

});
