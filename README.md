# GAMELIST — Rede social simulada de jogos

**Autor:** Vinicius Gomes Damascena

## Objetivo

Aplicação web que simula uma comunidade de jogadores: explore os jogos que estão jogando, adicione títulos à sua lista pessoal e registre sua experiência. O projeto foi desenvolvido para praticar HTML, CSS, TypeScript, tipos, funções, arrays, DOM e eventos.

## Funcionalidades

- Comunidade inicial com dez jogos e comentários fictícios.
- Cadastro com validação simples de título, categoria e preço; preço zero é aceito, e URL da capa e descrição são opcionais.
- Busca por título e filtro por categoria, que podem ser usados em conjunto.
- Painel com descrição, categoria, preço, comentários, adição à lista e exclusão confirmada do catálogo.
- Lista pessoal com alteração de estado, remoção sem excluir do catálogo e resumo por estado.
- Edição de nota, preço pago, loja e comentários pessoais com validação.
- Interface responsiva com tema escuro e fonte Poppins carregada pelo Google Fonts.

Os dados da comunidade e da lista pessoal ficam em um único array em memória e são reiniciados ao recarregar a página. Nota, preço pago e loja são pessoais e só são armazenados enquanto o jogo estiver na lista; comentários permanecem no jogo quando ele é removido. Comentários guardam autor, texto e data, sem registrar estado. O projeto não usa banco de dados, API, autenticação ou armazenamento local.

## Tecnologias

- HTML, CSS e TypeScript (módulos ES2020).
- [Poppins](https://fonts.google.com/specimen/Poppins), via Google Fonts.
- TypeScript e http-server como dependências de desenvolvimento.

## Como executar

É necessário ter Node.js e npm instalados.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Compile o TypeScript para `dist/`:
   ```bash
   npm run build
   ```
3. Inicie o servidor local:
   ```bash
   npm start
   ```
4. Acesse `http://localhost:8080` no navegador. Não abra o `index.html` diretamente, pois os módulos ES precisam de um servidor HTTP.

## Melhorias futuras

- Integrar uma API real de jogos.
- Persistir os dados entre acessos.
- Criar uma rede social com vários usuários e comentários públicos de verdade.

Link do vídeo: (adicionar)
