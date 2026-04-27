import { test, expect} from '@playwright/test';

test('商品を検索できること', async ({ page }) => {
    await page.goto('https://qa-auto-ec-site.vercel.app/');
    
    // 3秒待つ
    await page.waitForTimeout(3000);

    await page.getByPlaceholder('商品を検索').fill('トップス');
    // 3秒待つ
    await page.waitForTimeout(3000);

    await page.getByTestId('search-button').click();

    const startTime = Date.now();
    // ← ここに待機コードを追加したい
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('検索結果')).toBeVisible();

    const searchTime = Date.now() - startTime;
    console.log(`検索処理時間: ${searchTime}ms`);
});