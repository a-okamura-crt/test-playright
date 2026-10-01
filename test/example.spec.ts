import { test, expect } from '@playwright/test';

const testPagePath = "http://localhost:5173/"

test("ボタン画面検証", async ({page})=>{
  // 対象ページを表示
  await page.goto(testPagePath)

  // 初期状態検証
  await expect(page).toHaveScreenshot('target-section.png');

  // 追加ボタン押下時
  await page.locator("id=add-count").click();
  await expect(page).toHaveScreenshot('add-button.png');

  // 減算ボタン押下時
  await page.locator("id=down-count").click();
  await expect(page).toHaveScreenshot('down-button.png');

  // 減算ボタン押下時（エラー表示）
  await page.locator("id=down-count").click();
  await expect(page).toHaveScreenshot('down-button-minus.png');
})


test("インプット画面検証", async ({page})=>{
  // 対象ページを表示
  await page.goto(testPagePath)
  await page.locator("id=moveInput").click();

  // 初期状態検証
  await expect(page).toHaveScreenshot('input-init.png');

  // 入力欄要素取得
  const input = await page.locator("id=first-input")

  // 半角文字列入力
  await input.fill("aaaaa")
  await expect(page).toHaveScreenshot('input-hankaku.png');

  // 全角文字列入力
  await input.fill("aあ")
  await expect(page).toHaveScreenshot('input-zenkaku.png');
})