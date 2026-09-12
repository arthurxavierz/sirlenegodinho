# Deploy — Sirlene Godinho 22310

O site é estático e não grava nada, então roda em qualquer hospedagem de arquivos.

**Fase de protótipo (atual):** GitHub → **Cloudflare Pages**. Grátis, sem consumo de
créditos de build, domínio `.pages.dev` já com HTTPS.

**Fase de produção (quando o site for aprovado):** GitHub → **Netlify** → Cloudflare DNS,
o padrão Achilles Media. O `netlify.toml` já está pronto no repositório, nada a refazer.

Domínio provisório (opcional): `sirlenegodinho.achillesmedia.com.br`
Domínio definitivo (quando validado): `sirlenegodinho.com.br`

---

## 1. GitHub

```bash
git remote add origin https://github.com/arthurxavierz/sirlenegodinho.git
git push -u origin main
```

Repositório: https://github.com/arthurxavierz/sirlenegodinho (público, para o Pages
funcionar no plano grátis).

---

## 2. Cloudflare Pages (protótipo)

1. Dashboard Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
2. Selecione o repositório `sirlenegodinho` e autorize se for a primeira vez.
3. Configuração de build:
   - Framework preset: **None**
   - Build command: *(vazio)*
   - Build output directory: **`dist`**
   - Root directory: `/`
4. **Save and Deploy**. Em menos de um minuto o site sai em
   `<nome-do-projeto>.pages.dev`.
5. Em **Settings → General → Project name**, use `sirlene-godinho-22310`
   (fica `sirlene-godinho-22310.pages.dev`).

Cada push no `main` gera um deploy novo automaticamente, e cada branch ganha uma URL
de preview própria.

O que o Cloudflare Pages entrega sem configuração:
- **URLs limpas:** `/pautas` serve `/pautas.html` (e `/pautas.html` redireciona para
  `/pautas`). Todos os links do site já usam a forma limpa.
- **404:** o `dist/404.html` é usado automaticamente.
- **Headers de segurança e cache:** vêm do `dist/_headers` (mesmo arquivo que o
  Netlify também entende, então serve nas duas fases).

### Domínio próprio no Pages (opcional nesta fase)

No projeto: **Custom domains → Set up a custom domain** →
`sirlenegodinho.achillesmedia.com.br`. Como a zona já está na Cloudflare, o registro
DNS é criado sozinho e o certificado sai em poucos minutos. Aqui o **proxy laranja
pode ficar ligado**, diferente do Netlify.

---

## 3. Netlify (produção)

1. **Add new site → Import an existing project → GitHub** → selecione o repositório.
2. As configurações de build vêm do `netlify.toml` — não altere no painel:
   - Build command: *(vazio)*
   - Publish directory: `dist`
3. Deploy. O site sobe em `<nome-aleatorio>.netlify.app`.
4. **Site settings → General → Site name:** renomeie para `sirlene-godinho-22310`
   (fica `sirlene-godinho-22310.netlify.app` — use esse nome no CNAME abaixo).

O `netlify.toml` já entrega headers de segurança, cache imutável em `/assets/*`,
revalidação de HTML/CSS/JS, URLs limpas e o `404.html`.

### Cloudflare (DNS apontando para o Netlify)

Na zona `achillesmedia.com.br`:

| Tipo  | Nome             | Conteúdo                            | Proxy                 |
|-------|------------------|-------------------------------------|-----------------------|
| CNAME | `sirlenegodinho` | `sirlene-godinho-22310.netlify.app` | **DNS only** ☁️ cinza |

> **Importante:** com o Netlify o proxy tem que ficar **desligado** (nuvem cinza). Com
> o proxy laranja, o Netlify não consegue emitir/renovar o certificado Let's Encrypt e
> o site cai em erro de SSL. O Netlify já entrega CDN e HTTPS próprios. Essa restrição
> não existe no Cloudflare Pages.

Depois, no Netlify: **Domain management → Add a domain** →
`sirlenegodinho.achillesmedia.com.br` → aguarde o certificado → **Force HTTPS**.

### Migrando do Pages para o Netlify

1. Suba o site no Netlify (passos acima) e confira a URL `.netlify.app`.
2. No Cloudflare Pages, remova o custom domain do projeto (se tiver configurado um).
3. Troque o registro DNS para o CNAME do Netlify, com o proxy **cinza**.
4. Pode deixar o projeto do Pages vivo em `.pages.dev` como ambiente de homologação.

---

## 4. Quando comprar o domínio definitivo

1. Aponte `sirlenegodinho.com.br` para o Cloudflare (nameservers no registro.br).
2. Na zona nova, crie:
   - `CNAME  www  sirlene-godinho-22310.netlify.app`  (DNS only)
   - `CNAME  @    sirlene-godinho-22310.netlify.app`  (DNS only — o Cloudflare
     resolve o CNAME flattening na raiz automaticamente)
3. No Netlify, defina `sirlenegodinho.com.br` como **primary domain** e mantenha o
   subdomínio provisório como alias (o Netlify redireciona sozinho).
4. **No código, troque o domínio de uma vez só:**
   ```bash
   grep -rl "sirlenegodinho.achillesmedia.com.br" dist/ | \
     xargs sed -i 's|sirlenegodinho.achillesmedia.com.br|sirlenegodinho.com.br|g'
   ```
   Isso atualiza `canonical`, `og:url`, `og:image`, `robots.txt` e `sitemap.xml`.

> Enquanto o site estiver só em `.pages.dev`, o `canonical` e as tags Open Graph
> apontam para o domínio provisório. Para protótipo não tem problema, mas não divulgue
> o link `.pages.dev` em rede social antes de acertar o domínio, senão o preview do
> compartilhamento busca a imagem no endereço errado.

---

## Pendências antes de divulgar

- [ ] Preencher `SITE_CONFIG.whatsappGroupUrl` em `dist/script.js` com o link oficial do grupo.
- [ ] Preencher `GA_MEASUREMENT_ID` em `dist/analytics.js` (property GA4 deste site).
- [ ] **Fotos oficiais:** o retrato usado no hero, nas páginas internas e na imagem de
      compartilhamento (`assets/sirlene-retrato.jpg`) foi extraído de um print do
      Instagram, tratado e ampliado — resolve, mas está no limite de nitidez.
      Substituir por retrato oficial em alta (de preferência recortado sem fundo) e
      regerar a `og-sirlene-godinho.jpg` a partir dele.
- [ ] Validar a biografia e as pautas com a candidata.
- [ ] Inserir CNPJ e demais dados obrigatórios da campanha no rodapé (campo já
      reservado em todas as páginas).
