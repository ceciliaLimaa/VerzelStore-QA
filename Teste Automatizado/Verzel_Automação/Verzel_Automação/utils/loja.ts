import { expect, type Page } from '@playwright/test';

/** Localiza o cartão da vitrine pelo nome do produto, sem depender do número de cartões. */
export async function adicionarProduto(page: Page, nome: string, vezes: number): Promise<void> {
  const titulo = page.getByText(nome, { exact: true }).first();
  const cartao = titulo.locator(
    'xpath=ancestor::*[.//button[contains(normalize-space(.), "Adicionar ao carrinho")]][1]'
  );
  const adicionar = cartao.getByRole('button', { name: /Adicionar ao carrinho/i });
  for (let i = 0; i < vezes; i++) {
    await expect(adicionar).toBeEnabled();
    await adicionar.click();
  }
}

/** Lê o valor exibido ao lado de um rótulo no bloco <dl class="resumo-valores">. */
export function valorNoResumo(page: Page, rotulo: 'Subtotal' | 'Desconto' | 'Frete') {
  return page.locator('dl.resumo-valores > div')
    .filter({ has: page.locator('dt').getByText(rotulo, { exact: true }) })
    .locator('dd');
}
