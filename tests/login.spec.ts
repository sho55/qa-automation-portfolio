import { test, expect } from '@playwright/test';


test('ログイン状態を保持するチェックができること', async ({ page }) => {
    // 1.ログインページにアクセス
    await page.goto('https://qa-auto-ec-site.vercel.app/login');

    // 3秒待つ
    await page.waitForTimeout(3000);

    // 2. ログインを保持する
    // チェックを入れる
    await page.getByLabel('ログイン状態を保持する').check();

    // 3秒待つ
    await page.waitForTimeout(3000);

    // チェックを外す
    await page.getByLabel('ログイン状態を保持する').uncheck();

    // 3秒待つ
    await page.waitForTimeout(3000);

    // チェックが入っているか検証する
    await page.getByLabel('ログイン状態を保持する').check();

    // 3秒待つ
    await page.waitForTimeout(3000);

    await expect(page.getByLabel('ログイン状態を保持する')).toBeChecked();
})
test.describe('ログイン機能のテスト', () => {

    // このグループ内のすべての test() が実行される「直前」に、必ずこれが実行される！
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qa-auto-ec-site.vercel.app/login');
    });

test('正しい情報でログインできること', async ({ page }) => {
    
    // 3秒待つ
    await page.waitForTimeout(3000);

    // 2. メールアドレスを入力
    await page.getByPlaceholder('メールアドレス').fill('user@example.com');
    // 3秒待つ
    await page.waitForTimeout(3000);

    // 3. パスワードを入力
    await page.getByPlaceholder('パスワード').fill('password123');
    // 3秒待つ
    await page.waitForTimeout(3000);

    // 4. ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();
    // 3秒待つ
    await page.waitForTimeout(3000);

    // 5. ログイン後のページに遷移していることを検証
    await expect(page).toHaveURL('https://qa-auto-ec-site.vercel.app/mypage');

})

test('間違ったパスワードでログインが失敗すること', async ({ page }) => {

    // 3秒待つ
    await page.waitForTimeout(3000);

    // 2. メールアドレスを入力
    await page.getByPlaceholder('メールアドレス').fill('user@example.com');
    // 3秒待つ
    await page.waitForTimeout(3000);

    // わざと間違ったパスワードを入力
    await page.getByPlaceholder('パスワード').fill('hogehoge');
    // 3秒待つ
    await page.waitForTimeout(3000);

    // 4. ログインボタンをクリック
    await page.getByRole('button', { name: 'ログイン' }).click();
    // 3秒待つ
    await page.waitForTimeout(3000);

    // スクリーンショットを撮る
    await page.screenshot({ path: '1_error-message.png' });

    // ディレクトリを指定してスクリーンショットを撮る
    await page.screenshot({ path: 'evidence/2_error-message.png', fullPage: true });

    await expect(page.getByTestId('error-message')).toContainText('メールアドレスまたはパスワードが違います');
})

})