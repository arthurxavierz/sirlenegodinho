# Sirlene Godinho 22310

Site institucional da campanha de Sirlene Godinho, candidata a deputada estadual por Minas Gerais (PL).

**Stack:** HTML + CSS + JS puros. Sem build step, sem dependências, sem backend.

## Estrutura

```
netlify.toml          configuração de deploy (headers, cache, URLs limpas, 404)
dist/                 diretório publicado
├── index.html        página inicial
├── sobre.html        apresentação e propósito da candidatura
├── pautas.html       compromissos e prioridades
├── comunicacao.html  canais, grupo e contato
├── 404.html          página de erro
├── robots.txt        liberação para buscadores
├── sitemap.xml       mapa do site
├── styles.css        identidade visual, responsividade e animações
├── script.js         menu mobile, interações e SITE_CONFIG
├── analytics.js      Google Analytics 4 (inativo até preencher o ID)
└── assets/           imagens, favicon, ícones e imagem de compartilhamento
```

## Rodar localmente

Não precisa instalar nada. Abra `dist/index.html` com a extensão **Live Server** do VS Code, ou:

```bash
npx serve dist
```

O `npx serve` resolve as URLs limpas (`/pautas` serve `/pautas.html`), igual ao Netlify.

## Configuração da campanha

Tudo o que precisa ser preenchido está no topo de `dist/script.js`:

```js
const SITE_CONFIG = {
  whatsappGroupUrl: '',  // link chat.whatsapp.com do grupo oficial
  whatsappNumber: ''     // 55 + DDD + número, só dígitos. Ex.: '5534999999999'
};
```

Com `whatsappGroupUrl` vazio, o botão de grupo continua levando ao Instagram oficial e
o aviso de "link em breve" fica visível. Ao preencher, o botão passa a levar direto
para o grupo e o aviso é removido automaticamente.

O Google Analytics fica desligado (nenhum cookie criado) até colar o ID em
`dist/analytics.js`.

## Cache-busting

CSS e JS são chamados com `?v=<hash>` no HTML. **Sempre que alterar `styles.css`,
`script.js` ou `analytics.js`, troque o hash nas referências** de todas as páginas,
senão o navegador serve o arquivo antigo.

## Deploy

Ver [DEPLOY.md](DEPLOY.md).
