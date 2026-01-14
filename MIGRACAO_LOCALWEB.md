# 🚀 Guia de Migração: Netlify → LocalWeb

Este guia explica como migrar o projeto do Netlify para o LocalWeb sem perder funcionalidades.

## ✅ O que funciona igual em ambos

- ✅ **Astro Content Collections** - Funciona igual
- ✅ **Autenticação customizada** (`/admin/login`) - Funciona igual
- ✅ **Estrutura de arquivos** - Funciona igual
- ✅ **Build do Astro** - Funciona igual

## ⚠️ O que precisa ser ajustado

### 1. Backend do Decap CMS

**No Netlify:**
- Usa `git-gateway` (gerenciado pelo Netlify)
- Autenticação automática via Netlify Identity

**No LocalWeb:**
- Precisa usar `git` direto
- Requer configuração de OAuth (GitHub/GitLab) ou Personal Access Token

### 2. Configuração do `config.yml`

**Para migrar, edite `public/admin/config.yml`:**

```yaml
# Comente a opção de proxy (desenvolvimento)
# backend:
#   name: proxy
#   proxy_url: http://localhost:8081/api/v1
#   branch: main

# Descomente e configure para Git direto:
backend:
  name: git
  repo: seu-usuario/seu-repo  # Seu repositório Git
  branch: main
  auth_type: implicit  # Para OAuth
  app_id: SEU_APP_ID  # ID do app OAuth
  auth_scope: repo
```

### 3. Autenticação OAuth (GitHub/GitLab)

**Opção A: GitHub OAuth (Recomendado)**

1. Crie um OAuth App no GitHub:
   - Vá em: Settings → Developer settings → OAuth Apps → New OAuth App
   - **Application name**: Elonet CMS
   - **Homepage URL**: `https://seu-site.localweb.com.br`
   - **Authorization callback URL**: `https://seu-site.localweb.com.br/admin/`
   - Copie o **Client ID**

2. Configure no `config.yml`:
   ```yaml
   backend:
     name: git
     repo: seu-usuario/seu-repo
     branch: main
     auth_type: implicit
     app_id: SEU_CLIENT_ID_AQUI
     auth_scope: repo
   ```

**Opção B: Personal Access Token (Menos seguro)**

1. Crie um Personal Access Token no GitHub:
   - Vá em: Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Gere um token com permissão `repo`

2. Configure no `config.yml`:
   ```yaml
   backend:
     name: git
     repo: seu-usuario/seu-repo
     branch: main
     auth_type: token
   ```

### 4. Netlify Identity (Removido automaticamente)

O código já está ajustado para **não carregar** o Netlify Identity quando não estiver no Netlify. Não precisa fazer nada.

## 📋 Checklist de Migração

- [ ] 1. Fazer backup do repositório
- [ ] 2. Configurar OAuth no GitHub/GitLab
- [ ] 3. Editar `public/admin/config.yml` (backend: git)
- [ ] 4. Testar build local: `npm run build`
- [ ] 5. Fazer deploy no LocalWeb
- [ ] 6. Testar acesso ao `/admin/login`
- [ ] 7. Testar criação de notícia no CMS
- [ ] 8. Verificar upload de imagens

## 🔒 Segurança

**Autenticação Customizada:**
- A página `/admin/login` funciona em qualquer servidor
- **IMPORTANTE**: Altere a senha em `src/pages/admin/login.astro` antes de ir para produção!

**Backend Git:**
- Use OAuth (mais seguro) em vez de Personal Access Token
- Limite as permissões do OAuth App apenas ao necessário

## 🆘 Problemas Comuns

### "Failed to load entries"
- Verifique se o repositório está correto no `config.yml`
- Verifique se o OAuth App está configurado corretamente

### "Upload de imagens não funciona"
- No LocalWeb, o upload funciona via Git (commit automático)
- Verifique se o OAuth tem permissão `repo` (escrita)

### "Autenticação não funciona"
- A autenticação customizada (`/admin/login`) é independente
- Ela funciona em qualquer servidor, não depende do Netlify

## 📞 Suporte

Se tiver problemas na migração, verifique:
1. Logs do LocalWeb
2. Console do navegador (F12)
3. Configuração do OAuth App

---

**Última atualização**: Janeiro 2024

