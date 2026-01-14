# 🚀 Guia Completo: Deploy no Netlify

Este guia explica como tudo funciona no Netlify e como fazer o deploy corretamente.

## 📋 Resumo do que foi implementado

### ✅ Funcionalidades

1. **Sistema de Notícias**
   - Astro Content Collections (`src/content/noticias/`)
   - Páginas: `/noticias` (lista) e `/noticias/[slug]` (detalhe)
   - Card flutuante na home com última notícia
   - Suporte a Markdown com imagens

2. **Decap CMS (Admin)**
   - Interface de admin em `/admin`
   - Login customizado em `/admin/login`
   - Upload de imagens
   - Geração automática de ID e data
   - Limite de 3 tentativas de login com bloqueio

3. **Autenticação**
   - Login com variáveis de ambiente
   - Sem sessão persistente (recarrega = volta para login)
   - Proteção contra força bruta

## 🔧 Configuração para Netlify

### Passo 1: Ajustar `config.yml` para Netlify

Edite `public/admin/config.yml` e altere para:

```yaml
# Comentar a opção de proxy (desenvolvimento)
# backend:
#   name: proxy
#   proxy_url: http://localhost:8081/api/v1
#   branch: main

# Descomentar para Netlify
backend:
  name: git-gateway
  branch: main
```

### Passo 2: Configurar Variáveis de Ambiente no Netlify

1. Acesse: **Site settings → Environment variables**
2. Adicione:
   - `ADMIN_USERNAME` = `seu-usuario`
   - `ADMIN_PASSWORD` = `sua-senha-segura`

### Passo 3: Habilitar Netlify Identity e Git Gateway

1. No painel do Netlify, vá em: **Identity**
2. Clique em **Enable Identity**
3. Vá em **Identity → Settings → Services**
4. Ative o **Git Gateway**
5. Configure os usuários em **Identity → Invite users**

### Passo 4: Configurar Build Settings

No Netlify, configure:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18.x` ou superior

## 📦 O que pode commitar no Git

### ✅ Pode commitar normalmente:

- ✅ Todo o código fonte (`src/`)
- ✅ Configurações (`astro.config.mjs`, `package.json`)
- ✅ Arquivos de conteúdo (`src/content/noticias/*.md`)
- ✅ Imagens de notícias (`public/images/noticias/`)
- ✅ Configuração do CMS (`public/admin/config.yml`)
- ✅ Arquivos de documentação (`.md`)

### ❌ NÃO commitar:

- ❌ `.env` (já está no `.gitignore`)
- ❌ `node_modules/` (já está no `.gitignore`)
- ❌ `dist/` (já está no `.gitignore`)
- ❌ Credenciais hardcoded no código

## 🔄 Fluxo de Trabalho

### Desenvolvimento Local

```bash
# 1. Iniciar proxy server (terminal 1)
npm run cms:proxy

# 2. Iniciar Astro dev (terminal 2)
npm run dev

# 3. Acessar admin
http://localhost:4321/admin/login
```

### Produção (Netlify)

1. **Fazer commit normalmente:**
   ```bash
   git add .
   git commit -m "Adicionar nova notícia"
   git push origin main
   ```

2. **Netlify faz deploy automaticamente:**
   - Detecta o push
   - Executa `npm run build`
   - Publica em `dist/`

3. **Acessar admin em produção:**
   - `https://seu-site.netlify.app/admin/login`
   - Usa as variáveis de ambiente configuradas

## 📝 Checklist de Deploy no Netlify

### Antes do Deploy

- [ ] Ajustar `config.yml` para usar `git-gateway`
- [ ] Configurar variáveis de ambiente no Netlify
- [ ] Habilitar Netlify Identity
- [ ] Ativar Git Gateway
- [ ] Testar build local: `npm run build`

### Após o Deploy

- [ ] Testar acesso ao `/admin/login`
- [ ] Fazer login com credenciais do `.env` (produção)
- [ ] Testar criação de notícia
- [ ] Testar upload de imagem
- [ ] Verificar se notícias aparecem em `/noticias`

## 🔐 Segurança

### Variáveis de Ambiente

- ✅ **Desenvolvimento**: Use arquivo `.env` (não commitado)
- ✅ **Produção**: Configure no painel do Netlify
- ✅ **Nunca** commite credenciais no código

### Autenticação

- ✅ Login protegido com limite de tentativas
- ✅ Sem sessão persistente (recarrega = volta para login)
- ✅ Credenciais validadas no servidor

## 🗂️ Estrutura de Arquivos

```
elonet-website/
├── .env                    # ❌ NÃO commitar (variáveis locais)
├── .gitignore             # ✅ Commitar (já ignora .env)
├── package.json           # ✅ Commitar
├── astro.config.mjs       # ✅ Commitar
├── public/
│   ├── admin/
│   │   └── config.yml     # ✅ Commitar (ajustar para Netlify)
│   └── images/
│       └── noticias/      # ✅ Commitar (imagens das notícias)
├── src/
│   ├── content/
│   │   ├── config.ts      # ✅ Commitar
│   │   └── noticias/      # ✅ Commitar (arquivos .md)
│   ├── pages/
│   │   ├── admin.astro    # ✅ Commitar
│   │   ├── admin/
│   │   │   └── login.astro # ✅ Commitar
│   │   ├── api/
│   │   │   └── admin/
│   │   │       └── login.ts # ✅ Commitar
│   │   └── noticias.astro  # ✅ Commitar
│   └── components/         # ✅ Commitar
└── dist/                   # ❌ NÃO commitar (gerado no build)
```

## 🆘 Problemas Comuns

### "CMS não carrega no Netlify"

**Solução:**
1. Verifique se `config.yml` está usando `git-gateway`
2. Verifique se Netlify Identity está habilitado
3. Verifique se Git Gateway está ativado

### "Upload de imagens não funciona"

**Solução:**
1. Verifique se `media_folder` está correto no `config.yml`
2. Verifique permissões do repositório Git
3. Verifique se Git Gateway está configurado corretamente

### "Login não funciona"

**Solução:**
1. Verifique variáveis de ambiente no Netlify
2. Verifique se o endpoint `/api/admin/login` está acessível
3. Verifique logs do Netlify Functions (se aplicável)

### "Notícias não aparecem"

**Solução:**
1. Verifique se os arquivos `.md` estão em `src/content/noticias/`
2. Verifique se o build foi executado corretamente
3. Verifique se há erros no console do navegador

## 📚 Comandos Úteis

```bash
# Build local (testar antes de fazer deploy)
npm run build

# Preview do build
npm run preview

# Desenvolvimento local
npm run dev

# Proxy do CMS (desenvolvimento)
npm run cms:proxy
```

## 🎯 Resumo Final

### ✅ Você PODE fazer commit normalmente de:

- Todo o código fonte
- Arquivos de conteúdo (notícias)
- Configurações
- Imagens das notícias

### ⚠️ Antes de fazer deploy no Netlify:

1. Ajustar `config.yml` para `git-gateway`
2. Configurar variáveis de ambiente
3. Habilitar Netlify Identity
4. Ativar Git Gateway

### 🔒 Segurança:

- `.env` nunca é commitado (já está no `.gitignore`)
- Credenciais ficam apenas nas variáveis de ambiente do Netlify
- Login protegido com limite de tentativas

---

**Última atualização**: Janeiro 2024

