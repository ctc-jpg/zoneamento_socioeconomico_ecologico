# Publicar e organizar o repositório existente

Repositório: https://github.com/ctc-jpg/zoneamento_socioeconomico_ecologico

1. Extraia o ZIP. Abra a pasta `zoneamento-organizado`.
2. Abra o repositório no GitHub, aba Code.
3. Escolha Add file → Upload files.
4. Arraste o **conteúdo** da pasta: `index.html`, `README.md`, `assets`, `paginas` e `documentacao`. Não envie apenas o ZIP nem a pasta externa como uma subpasta.
5. Confira que o `index.html` ficará na raiz do repositório. Se ele já existe, o upload substituirá essa página inicial.
6. Use a mensagem `Organizar site ZSEE-MT para manutenção e novas páginas` e clique em Commit changes. Se o GitHub limitar a quantidade de arquivos, faça o envio em lotes, preservando as pastas.
7. Em Settings → Pages, configure Deploy from a branch, branch main e /(root). Se já estiver configurado assim, mantenha.
8. Aguarde o deploy na aba Actions e abra a URL indicada em Settings → Pages. O endereço esperado é https://ctc-jpg.github.io/zoneamento_socioeconomico_ecologico/.
9. Confira a página inicial, menu e vídeos no computador e celular. Use essa URL no widget Embutir do Experience Builder.

## Arquivos antigos

O upload não apaga arquivos que já estavam no repositório. Antes de remover HTMLs ou pastas antigos, verifique se algum widget do Experience Builder ou outro site usa seus endereços. Um arquivo antigo pode continuar publicado em seu endereço mesmo que a página inicial nova não o utilize. Faça a limpeza só após atualizar os links e testar.

## Novas páginas

Após concluir cada página, os endereços serão:

- .../paginas/elaboracao/
- .../paginas/metodologia/
- .../paginas/cadernos/
- .../paginas/mapas/

Use sempre o endereço publicado do GitHub Pages, não github.com/.../blob/....
