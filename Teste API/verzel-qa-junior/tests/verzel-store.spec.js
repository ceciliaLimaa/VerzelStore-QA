
const { test, expect } = require('@playwright/test');

test('CT-001 - Deve acessar a Verzel Store', async ({ page }) => {
  // Acessa a loja
  await page.goto(
    'https://verzel-store.qa-test-verzel-store.workers.dev/'
  );

  // Verifica se permaneceu no endereço esperado
  await expect(page).toHaveURL(
    'https://verzel-store.qa-test-verzel-store.workers.dev/'
  );
});
