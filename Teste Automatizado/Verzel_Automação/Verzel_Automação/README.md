# Verzel Store — Playwright QA

Projeto com **exatamente 3 testes automatizados**: dois testes de frontend e um teste de API.

## Requisitos
- Node.js 20+ instalado.
- VS Code (opcional) e internet para acessar a loja.

## Executar no Windows PowerShell
Abra esta pasta no terminal e rode, um comando de cada vez:

```powershell
npm.cmd install
npx.cmd playwright install chromium
npx.cmd playwright test --headed
npx.cmd playwright show-report
```

Para executar apenas um cenário:

```powershell
npx.cmd playwright test -g "CT-CC"
npx.cmd playwright test -g "CT-CF"
npx.cmd playwright test -g "API-005"
```

## Casos implementados
1. `CT-CC-001/002`: adiciona 2 unidades de Mochila Urbana 20L, valida o indicador da vitrine e o `<output>` da quantidade no carrinho.
2. `CT-CF-002 / CT-CD-001`: 2 mochilas (R$ 200,00), cupom `BEMVINDO10`, desconto R$ 20,00, frete grátis e total R$ 180,00.
3. `API-005`: envia 6 unidades de P002 e espera `422 QUANTIDADE_MAXIMA_EXCEDIDA`.

## Evidências e advertências
- O teste API-005 deverá **falhar caso a API continue retornando 200**, como ocorreu nos testes manuais. **Não altere o esperado para 200 só para aprovar.**
- A documentação e as imagens de DevTools fornecidas fundamentam os seletores `output[aria-label="Quantidade de ..."]`, `[data-valor="desconto"]`, `dl.resumo-valores` e `.resumo-total`. Os elementos da vitrine e do campo de cupom ainda não foram inspecionados diretamente no HTML; caso falhem, revise-os pelo Playwright Inspector (`npx.cmd playwright codegen <URL>`).
- O cenário de frete R$ 200,00 também pode falhar por divergência da aplicação — não mascarar a falha.
- Os testes não foram executados contra o site nesta geração. A validação de execução precisa ocorrer no computador do QA.
- Relatório HTML: pasta `playwright-report/`. Screenshots, vídeos e traces de falhas: `test-results/`.

## Correção da validação do desconto (10/10/2026)
O trace do frontend exibiu `-R$ 20,00` no campo `[data-valor="desconto"]`.
A asserção antiga esperava `R$ 20,00` (sem sinal) e gerava timeout.
A nova asserção `toHaveText(/^-\s*R\$\s*20,00$/)` exige desconto negativo de R$ 20,00 e tolera espaços.
O valor de frete esperado segue **Grátis** e o total esperado segue **R$ 180,00**.
Se o teste falhar ao conferir o frete, isso poderá registrar o defeito funcional já observado, sem alterar o resultado esperado.

### Explicação linha a linha do cenário de cupom/frete
1. `test(...)`: identifica o cenário automatizado.
2. `page.goto('/')`: abre a vitrine em uma sessão limpa.
3. `adicionarProduto(..., 2)`: adiciona duas Mochilas Urbanas 20L (R$ 100 cada).
4. `page.goto('/carrinho')`: navega para o carrinho mantendo a mesma aba.
5. `expect(valorNoResumo(..., 'Subtotal'))`: verifica o subtotal de R$ 200,00 antes do cupom.
6. `getByLabel('Cupom de desconto')`: procura o campo pelo rótulo acessível.
7. `count()` e alternativa `input.first()`: usa um seletor auxiliar se o rótulo não for encontrado.
8. `fill('BEMVINDO10')`: informa o cupom.
9. `getByRole('button', ...).click()`: aplica o cupom.
10. `locator('[data-valor="desconto"]')`: localiza o valor do desconto confirmado no DevTools.
11. `toHaveText(/^-\s*R\$\s*20,00$/)`: exige exatamente o desconto negativo R$ 20,00.
12. `valorNoResumo(..., 'Frete')`: encontra o valor de frete no resumo.
13. `toContainText('Grátis')`: exige frete grátis no limite de R$ 200,00.
14. `locator('.resumo-total')`: localiza a linha de valor total.
15. `toContainText('R$ 180,00')`: verifica o valor final esperado.
