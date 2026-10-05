# Site ZSEE-MT

Site estático para publicação no GitHub Pages e incorporação no Experience Builder.

## Página inicial

`index.html` é a versão aprovada com dois vídeos: computador acima de 760 px e celular até 760 px. Os arquivos antes incorporados foram separados para facilitar a manutenção. Preserve a estrutura das pastas para que estilos, imagens e vídeos sejam encontrados.

## Estrutura

- `index.html`: página inicial.
- `paginas/elaboracao/index.html`: base da página Elaboração do ZSEE.
- `paginas/metodologia/index.html`: base da página Metodologia.
- `paginas/cadernos/index.html`: base da página Cadernos do ZSEE.
- `paginas/mapas/index.html`: base da página Mapas Dinâmicos.
- `assets/css/site.css`: estilos e regras responsivas compartilhadas.
- `assets/js/site.js`: menu, cronologia, links dos cartões e troca dos vídeos.
- `assets/imagens/`: logo, fluxograma e capas estáticas.
- `assets/imagens/instituicoes/`: logotipos das instituições.
- `assets/videos/capa.mp4`: vídeo do computador, 1890 × 600.
- `assets/videos/capa-celular.mp4`: vídeo anterior, usado no telefone.
- `assets/documentos/`: PDFs para publicação.
- `documentacao/`: instruções de publicação e manutenção.

## Próximas páginas

As quatro páginas novas são bases com aviso de preparação. A página inicial ainda aponta para os destinos enviados do Experience Builder. Só troque esses destinos pelas páginas locais após concluir e revisar o conteúdo. Mapas Dinâmicos continua sem destino definido.

## Abrir localmente

Extraia a pasta completa e abra `index.html`. Para servir o projeto localmente, execute `python -m http.server 8000` na raiz e abra `http://localhost:8000`.

Leia `documentacao/PUBLICACAO.md` e `documentacao/MANUTENCAO.md`.
