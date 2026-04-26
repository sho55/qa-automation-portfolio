import { test, expect } from '@playwright/test';

test('ECサイトのトップページが開けること', async ({page}) => {
    // 1.サイトにアクセス
    await page.goto('https://qa-auto-ec-site.vercel.app/');


    // 2. ページのタイトルが正しいか検証する（アサーション）
    await expect(page).toHaveTitle('オリジナルECサイト');
})

test('商品一覧でソートができること', async ({page}) => {
    // 1.サイトにアクセス
    await page.goto('https://qa-auto-ec-site.vercel.app/');

    // 3. ソートオプションを選択
    await page.getByTestId('sort-dropdown').selectOption({ label: '価格が安い順' });

    // 3秒待つ
    await page.waitForTimeout(3000);
})