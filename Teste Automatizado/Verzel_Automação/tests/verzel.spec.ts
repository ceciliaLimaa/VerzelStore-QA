import { test, expect } from '@playwright/test';
import { adicionarProduto, valorNoResumo } from '../utils/loja';

// CT-CC-001 / CT-CC-002 — interação real com a interface
// O carrinho da Verzel guarda o estado apenas na aba atual; cada teste usa uma aba limpa.
test('CT-CC-001/002 | Frontend | adicionar produto e validar quantidade', async ({ page }) => {
  await page.goto('/');
  await adicionarProduto(page, 'Mochila Urbana 20L', 2);

  // Indicador do produto na vitrine, conforme interface apresentada.
  await expect(page.getByText('2 no carrinho', { exact: true })).toBeVisible();

  await page.goto('/carrinho');
  // DevTools da loja confirmou que a quantidade está em <output>, não em <input>.
  await expect(page.locator('output[aria-label="Quantidade de Mochila Urbana 20L"]'))
    .toHaveText('2');
  await expect(page.locator('.item-carrinho').filter({ hasText: 'Mochila Urbana 20L' }))
    .toContainText('R$ 200,00');
});

// CT-CF-002 / CT-CD-001 — valida regra de frete a partir do subtotal antes do cupom
test('CT-CF-002 / CT-CD-001 | Frontend | aplicar cupom e validar desconto e frete', async ({ page }) => {
  await page.goto('/');
  await adicionarProduto(page, 'Mochila Urbana 20L', 2);
  await page.goto('/carrinho');

  await expect(valorNoResumo(page, 'Subtotal')).toHaveText('R$ 200,00');

  // O screenshot mostra somente o campo de cupom no carrinho; seletor prioritário por rótulo.
  const cupomPorRotulo = page.getByLabel('Cupom de desconto', { exact: true });
  const cupom = (await cupomPorRotulo.count()) > 0
    ? cupomPorRotulo
    : page.locator('input').first();
  await cupom.fill('BEMVINDO10');
  await page.getByRole('button', { name: /Aplicar cupom/i }).click();

  // O HTML usa data-valor="desconto" e a interface exibe o desconto negativo: -R$ 20,00.
  // Aceitamos espaços opcionais, mas exigimos o sinal - e o valor exato de 20,00.
  await expect(page.locator('[data-valor="desconto"]'))
    .toHaveText(/^-\s*R\$\s*20,00$/);
  await expect(valorNoResumo(page, 'Frete')).toContainText('Grátis');
  await expect(page.locator('.resumo-total')).toContainText('R$ 180,00');
});

// API-005 — espera o comportamento documentado, mesmo que exponha um bug real
test('API-005 | API | rejeitar 6 unidades do mesmo produto', async ({ request }) => {
  const response = await request.post('/api/carrinho/calcular', {
    data: { itens: [{ produtoId: 'P002', quantidade: 6 }] },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  expect(response.status(), `Resposta recebida: ${JSON.stringify(body)}`).toBe(422);
  expect(body.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
});
