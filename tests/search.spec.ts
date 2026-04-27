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

test.describe("商品検索 - 正常系", () => {
    test("「Tシャツ」で検索するとURLに ?q= が含まれること", async ({ page }) => {
        // 1. トップページにアクセスする
        await page.goto("https://qa-auto-ec-site.vercel.app/");

        // 3秒待つ
        await page.waitForTimeout(3000);

        // 2. 検索窓に "Tシャツ" と入力する
        await page
            .getByPlaceholder("商品を検索")
            .fill("Tシャツ");

        // 3. 検索ボタンをクリックする
        await page.getByTestId("search-button").click();

        // 3秒待つ
        await page.waitForTimeout(3000);

        // 4. URLに "?q=" が含まれることを確認する
        await expect(page).toHaveURL(/\?q=/);
    });
});