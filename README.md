# GAMELIST — Catálogo de jogos compartilhado

**Disciplina:** Tópicos Especiais em Desenvolvimento Web | **AV2N1**  
**Autor:** Vinicius Gomes Damascena

## Objetivo

Aplicação web que simula uma comunidade de jogadores onde é possível explorar os jogos que estão jogando, adicionar jogos à sua lista pessoal e registrar sua experiência. O projeto foi desenvolvido para praticar HTML, CSS, TypeScript.

## Funcionalidades

- Comunidade inicial com dez jogos e comentários fictícios.
- Cadastro com validação simples de título, categoria e preço; preço zero é aceito, e URL da capa e descrição são opcionais.
- Busca por título e filtro por categoria, que podem ser usados em conjunto.
- Painel com descrição, categoria, preço, comentários, adição à lista e exclusão confirmada do catálogo.
- Lista pessoal com alteração de estado, remoção sem excluir do catálogo e resumo por estado.
- Edição de nota, preço pago, loja e comentários pessoais com validação.
- Interface responsiva com tema escuro.

Os dados da comunidade e da lista pessoal ficam em um único array em memória e são reiniciados ao recarregar a página. Nota, preço pago e loja são pessoais e só são armazenados enquanto o jogo estiver na lista; comentários permanecem no jogo quando ele é removido. Comentários guardam autor, texto e data. O projeto não usa banco de dados, API, autenticação ou armazenamento local.

## Tecnologias

- HTML, CSS e TypeScript.
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

- Ao efetuar um comentário o status atual do jogo na biblioteca de quem comentou deve ser registrado.
- Integrar uma API real de jogos.
- Persistir os dados entre acessos (BD). 
- Refatorar o código para React (facilitar manutenção e escrita, bem como melhorar a estrutura).
- Criar uma rede social com vários usuários e comentários públicos de verdade. 

Link do vídeo: https://youtu.be/AdBU586fUL0


