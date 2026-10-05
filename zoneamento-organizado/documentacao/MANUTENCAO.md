# Manutenção e continuidade

## Onde editar

| Alteração | Arquivo |
| --- | --- |
| Texto da apresentação, cronologia, instituições e rodapé | index.html |
| Cores, fontes, tamanhos e layout responsivo | assets/css/site.css |
| Links dos quatro cartões principais | Objeto links no início de assets/js/site.js |
| Links do cabeçalho | Elementos do menu em index.html |
| Vídeo do computador | assets/videos/capa.mp4 |
| Vídeo do telefone | assets/videos/capa-celular.mp4 |
| Capas estáticas | assets/imagens/capa.jpg e capa-celular.jpg |
| Logo e fluxograma | assets/imagens/logo.png e fluxograma.png |
| Conteúdo das próximas páginas | paginas/<nome>/index.html |

## Caminhos relativos

Na página inicial, os recursos usam `assets/...`. Nas páginas dentro de `paginas/<nome>/`, use `../../assets/...`. No CSS, as imagens usam `../imagens/...`, pois o CSS está em assets/css.

Ao concluir as páginas, pode preencher os destinos locais no objeto links com `paginas/elaboracao/`, `paginas/metodologia/`, `paginas/cadernos/` e `paginas/mapas/`. Os cartões atualmente abrem os destinos em outra aba; esse comportamento está em site.js. Enquanto os conteúdos estiverem incompletos, mantenha os links atuais.

## Vídeos

O computador usa o vídeo de 1890 × 600 sem cortes. O celular conserva o enquadramento aprovado. Para trocar o vídeo, substitua o arquivo correspondente e atualize também sua imagem estática. Se a proporção do vídeo do computador mudar, revise a regra `.hero` de aspect-ratio no final do CSS.

## Antes de entregar a manutenção

- Registre a pessoa ou equipe responsável e como obter acesso ao repositório, sem escrever senhas.
- Liste em um documento as páginas prontas, pendentes e links externos.
- Confirme se links que contêm draft=true devem ser substituídos pelos endereços publicados.
- Teste links, cronologia, menu e vídeos no computador e no celular.
- Faça commits com mensagens que expliquem a alteração, por exemplo `Atualizar texto da metodologia`.

## Estado desta entrega

Página inicial preservada; estrutura de quatro páginas preparada com aviso de conteúdo em preparação. JavaScript e caminhos locais conferidos. Não houve publicação ou alteração do repositório remoto nesta entrega.
