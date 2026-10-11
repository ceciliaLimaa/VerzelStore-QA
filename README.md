# Teste Técnico QA Júnior | Verzel Store

Olá! Este repositório reúne meu trabalho no teste técnico para a vaga de **QA Júnior da Verzel**.

A proposta foi testar a Verzel Store, uma loja fictícia, verificando o funcionamento do carrinho, a finalização de compras, a aplicação de cupons e as regras de frete. Além da interface, também realizei validações de API para comparar os resultados recebidos com o comportamento esperado.

Procurei dar atenção especial ao caminho que o cliente percorre até concluir a compra, incluindo situações em que descontos, quantidades ou frete podem causar dúvidas.

## Índice

- [O que foi realizado](#o-que-foi-realizado)
- [Onde encontrar cada entrega](#onde-encontrar-cada-entrega)
- [Como executar os testes automatizados](#como-executar-os-testes-automatizados)
- [Resultados dos testes](#resultados-dos-testes)
- [Bugs encontrados](#bugs-encontrados)
- [Observações finais](#observações-finais)

## O que foi realizado

- **Cenários de teste:** elaboração de cenários funcionais em Gherkin, considerando carrinho, checkout, confirmação de pedido, frete e cupons.
- **Testes manuais e exploratórios:** execução dos cenários pela interface e registro de resultados e evidências.
- **Testes de API:** validação de requisições e respostas no Postman, incluindo carrinho, cupons, frete, pedidos, dados do cliente e erros HTTP.
- **Registro de defeitos:** documentação dos problemas observados, com passos para reprodução e capturas de tela.
- **Automação:** projeto de testes com Playwright, organizado nas pastas `tests/` e `utils/`.

## Onde encontrar cada entrega

As entregas foram separadas por tipo de teste para facilitar a consulta:

| Entrega | Onde encontrar |
| --- | --- |
| Cenários de teste | [`Cenarios%20de%20Teste/](https://github.com/ceciliaLimaa/VerzelStore-QA/blob/main/Cenarios%20de%20Teste/Cen%C3%A1rios%20de%20Testes.pdf`] — documento com os cenários funcionais escritos em Gherkin. |
| Execução dos testes manuais, exploratórios e de API | [`Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/`]— planilha com os resultados registrados. |
| Relatório de bugs | [`Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/](https://github.com/ceciliaLimaa/VerzelStore-QA/blob/main/Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/Execu%C3%A7%C3%A3oTestes%20-%20Vazel%20API%20e%20Front.xlsm`] — aba `Bugs` da planilha, com os defeitos e referências às evidências. |
| Evidências | [`Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/](https://github.com/ceciliaLimaa/VerzelStore-QA/blob/main/Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/Execu%C3%A7%C3%A3oTestes%20-%20Vazel%20API%20e%20Front.xlsm`] — referências disponíveis na coluna `Evidencias` da planilha. |
| Testes de API | [`API%20de%20teste/verzel-qa-junior/](https://github.com/ceciliaLimaa/VerzelStore-QA/tree/main/Teste%20API`] — arquivos da entrega de API. A extensão e o nome do arquivo de coleção ainda precisam ser conferidos. |
| Automação com Playwright | [`Teste%20Automatizado/Verzel_Automa%C3%A7%C3%A3o/](https://github.com/ceciliaLimaa/VerzelStore-QA/tree/main/Teste%20API`] — projeto de automação, incluindo `tests/`, `utils/`, `package.json` e `playwright.config.ts`, conforme a estrutura local apresentada. |
| Configuração e dependências | [`Teste%20Automatizado/Verzel_Automa%C3%A7%C3%A3o/`] — arquivos `playwright.config.ts` e `package.json`. |

## Como executar os testes automatizados

A automação utiliza **Playwright**. Para reproduzir a execução em outro computador, é necessário ter o projeto completo e instalar suas dependências.

### 1. Acessar o projeto

Acesse o [repositório VerzelStore-QA](https://github.com/ceciliaLimaa/VerzelStore-QA) e escolha **Code → Download ZIP**. Depois, extraia o arquivo.

Se preferir usar o Git, execute:

```bash
git clone https://github.com/ceciliaLimaa/VerzelStore-QA.git
```

Esse comando cria uma cópia do repositório no seu computador.

### 2. Preparar o ambiente

Instale **Node.js** e, se optar pela clonagem, **Git**. O terminal pode ser o do VS Code ou o terminal do seu sistema.

**Versões mínimas e dependências:** precisam ser conferidas no `package.json`, que ainda não foi disponibilizado para leitura.

### 3. Abrir a pasta correta

Depois de clonar ou extrair o repositório, abra a pasta do projeto no VS Code. No terminal, entre na pasta da automação:

```bash
cd "VerzelStore-QA/Teste Automatizado/Verzel_Automação"
```

Esse exemplo parte da pasta onde o repositório foi clonado. Se você já estiver dentro de `VerzelStore-QA`, use apenas `cd "Teste Automatizado/Verzel_Automação"`.

A pasta correta deve conter `package.json` e `playwright.config.ts`. É nela que os comandos da automação devem ser executados.

### 4. Instalar dependências, navegador e executar os testes

Para executar os testes automatizados, é necessário ter o **Node.js e o npm** instalados.

**1. Baixar o projeto**

No GitHub, clique em **Code → Download ZIP**, extraia os arquivos e abra a pasta do projeto no VS Code.

**2. Acessar a pasta da automação**

No terminal, entre na pasta que contém o arquivo `package.json`.

**3. Instalar as dependências**

```bash
npm install
```

**4. Instalar o navegador Chromium**

```bash
npx playwright install chromium
```

**5. Executar todos os testes**

```bash
npx playwright test
```

Para acompanhar a execução com o navegador aberto:

```bash
npx playwright test --headed
```

**6. Visualizar o relatório**

```bash
npx playwright show-report
```

O relatório HTML apresenta os resultados, os detalhes das falhas e as evidências geradas durante a execução.

### Resultados da execução

| Teste | Resultado |
|---|---|
| CT-CC-001/002 — Adicionar produto e validar quantidade | Aprovado |
| CT-CF-002 / CT-CD-001 — Aplicar cupom e validar frete | Reprovado — BUG-CF-001 |
| API-005 — Validar limite máximo de unidades | Reprovado — BUG-API-005 |

**Observação:** os dois testes reprovados identificaram comportamentos divergentes das regras documentadas. As validações foram mantidas para demonstrar os defeitos encontrados.

**Windows/PowerShell:** caso os comandos `npm` e `npx` apresentem bloqueio de execução, utilize `npm.cmd` e `npx.cmd` nos respectivos comandos.

### ## Testes de API

Os testes de API foram realizados no **Postman**, com foco na validação dos produtos, carrinho de compras, cupons de desconto, frete, pedidos e tratamentos de erros.

A coleção utilizada está disponível no repositório:

📁 [VerzelStore-QA.postman_collection.json](https://github.com/ceciliaLimaa/VerzelStore-QA/blob/main/Teste%20API/VerzelStore-QA.postman_collection.json)

### Como executar os testes no Postman

**1. Baixar a coleção**

- Acesse o arquivo da coleção pelo link acima.
- Clique em **Download raw file** para baixar o arquivo `.json`.

**2. Importar no Postman**

- Abra o [Postman](https://www.postman.com/downloads/).
- Clique em **Import**.
- Selecione o arquivo `VerzelStore-QA.postman_collection.json`.
- Confirme a importação.

**3. Configurar a URL da API**

A API utilizada nos testes está disponível em:

```text
https://verzel-store.qa-test-verzel-store.workers.dev
```

Caso as requisições utilizem uma variável de ambiente, configure-a no Postman com essa URL. Se os endereços já estiverem completos nas requisições, não será necessário alterar nada.

**4. Executar os testes**

- Abra a coleção `VerzelStore-QA`.
- Selecione a requisição que deseja testar.
- Confira o método HTTP, a URL e o corpo da requisição, quando aplicável.
- Clique em **Send**.
- Verifique o código de status HTTP e o JSON retornado.
- Confira a aba **Test Results**, caso a requisição possua scripts de validação.

**5. Executar a coleção completa**

Para executar as requisições em conjunto:

- Clique nos três pontos (`...`) ao lado da coleção.
- Selecione **Run collection**.
- Escolha as requisições que deseja executar.
- Clique em **Run VerzelStore-QA**.
- Confira os resultados apresentados pelo Postman.

### Endpoints utilizados

| Método | Endpoint | Objetivo |
|---|---|---|
| GET | `/api/produtos` | Consultar os produtos disponíveis |
| GET | `/api/produtos/{id}` | Consultar um produto pelo ID |
| POST | `/api/carrinho/calcular` | Validar subtotal, frete, descontos e total |
| POST | `/api/pedidos` | Validar a criação de pedidos e os dados enviados |

### Resultados e evidências

Os resultados das execuções, os cenários aprovados e reprovados e os bugs identificados estão documentados na **planilha de execução de testes** disponível neste repositório.

Algumas requisições apresentam divergências em relação à documentação da aplicação

## Resultados dos testes

A planilha de execução disponibilizada reúne **62 registros**, com os seguintes resultados:

| Tipo de teste | Aprovados | Reprovados | Total |
| --- | ---: | ---: | ---: |
| Interface (execução manual registrada) | 28 | 1 | 29 |
| API (execução registrada na planilha) | 30 | 3 | 33 |
| **Total** | **58** | **4** | **62** |

Os cenários reprovados registrados foram:

- **CT-CF-001:** frete cobrado para subtotal de R$ 200,00.
- **API-005:** API aceita quantidade acima do limite de cinco unidades do mesmo produto.
- **API-017.8:** divergência no tratamento de cupom com espaços internos, conforme o registro de execução; o comportamento esperado precisa ser reconciliado com os cenários documentados.
- **API-021:** cobrança de frete em situação registrada como elegível ao frete grátis.

## Bugs encontrados

Os quatro registros estão documentados na aba **`Bugs`** da planilha disponível em [`Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/`]():

| Bug | Cenário relacionado | Severidade registrada |
| --- | --- | --- |
| `BUG-CF-001` | `CT-CF-001` | Crítica |
| `BUG-API-005` | `API-005` | Alta |
| `BUG-API-017.8` | `API-017.8` | Alta |
| `BUG-API-021` | `API-021` | Crítica |

Para consultar um defeito, abra a aba `Bugs`, localize o **Bug ID** e veja a descrição, os passos de reprodução e o link em `https://github.com/ceciliaLimaa/VerzelStore-QA/blob/main/Execu%C3%A7%C3%A3o%20de%20teste%20e%20Bugs/Execu%C3%A7%C3%A3oTestes%20-%20Vazel%20API%20e%20Front.xlsm`.

## Observações finais

Meu objetivo foi entender as regras da loja, testar as funcionalidades mais importantes para a compra e comparar o resultado observado com o esperado. Quando encontrei divergências, registrei as informações de forma que outra pessoa consiga entender o problema, consultar a evidência e reproduzir o teste.

## Uso de Inteligência Artificial

A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento deste projeto.

Os cenários de teste foram criados por mim, a partir da análise das funcionalidades e regras de negócio da Verzel Store. Utilizei IA para organizar os cenários, melhorar a escrita, padronizar a documentação e sugerir possíveis situações que eu poderia não ter considerado.
Também utilizei IA para me auxiliar na criação e nos ajustes dos testes automatizados com Playwright.
A análise da aplicação, a definição dos cenários, a execução dos testes e a identificação dos bugs foram realizadas por mim, utilizando a IA como apoio para melhorar a organização e a qualidade da entrega.
