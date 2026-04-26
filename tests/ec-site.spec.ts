import { test, expect } from '@playwright/test';

test('ECサイトのトップページが開けること', async ({page}) => {
    // 1.サイトにアクセス
    await page.goto('https://qa-auto-ec-site.vercel.app/');


    // 2. ページのタイトルが正しいか検証する（アサーション）
    await expect(page).toHaveTitle('オリジナルECサイト');
})