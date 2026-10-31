// Cria um jogo novo e adiciona ao catálogo.
export function adicionarJogo(jogos, dados) {
    jogos.push({ ...dados, id: Date.now(), comentarios: [] });
}
// Remove o jogo selecionado do catálogo.
export function excluirJogo(jogos, jogo) {
    const indice = jogos.indexOf(jogo);
    if (indice !== -1)
        jogos.splice(indice, 1);
}
// Atualiza o estado e limpa os dados pessoais ao retirar da lista.
export function mudarEstado(jogo, estado) {
    jogo.estado = estado;
    if (estado === "fora") {
        jogo.nota = undefined;
        jogo.precoPago = undefined;
        jogo.loja = undefined;
    }
}
// Salva os detalhes pessoais e, se houver texto, adiciona um comentário.
export function salvarDetalhes(jogo, nota, precoPago, loja, comentario) {
    jogo.nota = nota;
    jogo.precoPago = precoPago;
    jogo.loja = loja || undefined;
    const texto = comentario.trim();
    if (texto) {
        jogo.comentarios.push({
            autor: "Você",
            texto,
            data: new Date().toLocaleDateString("pt-BR"),
        });
    }
}
// Busca por título e categoria ao mesmo tempo.
export function filtrarJogos(jogos, busca, categoria) {
    const termo = busca.trim().toLowerCase();
    return jogos.filter((jogo) => jogo.titulo.toLowerCase().includes(termo) &&
        (categoria === "Todas" || jogo.categoria === categoria));
}
// Retorna somente os jogos da lista pessoal.
export function jogosDaLista(jogos) {
    return jogos.filter((jogo) => jogo.estado !== "fora");
}
// Conta quantos jogos estão no estado escolhido.
export function contarPorEstado(jogos, estado) {
    return jogos.filter((jogo) => jogo.estado === estado).length;
}
// Valida um preço não negativo; zero é permitido.
export function validarPreco(texto) {
    if (!texto.trim())
        return "Informe um preço.";
    const preco = Number(texto);
    if (!Number.isFinite(preco))
        return "Informe um valor numérico válido.";
    if (preco < 0)
        return "O preço não pode ser negativo.";
    return "";
}
// Retorna o primeiro erro do formulário de cadastro.
export function validarJogo(titulo, categoria, precoTexto) {
    if (!titulo.trim())
        return "Informe o título do jogo.";
    if (!categoria)
        return "Selecione uma categoria.";
    return validarPreco(precoTexto);
}
