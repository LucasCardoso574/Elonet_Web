# 🔐 Configuração de Variáveis de Ambiente - Admin Login

Este guia explica como configurar as variáveis de ambiente para o sistema de login do admin.

## 📋 O que foi implementado

✅ **Endpoint API** (`/api/admin/login`) que valida credenciais usando variáveis de ambiente  
✅ **Login seguro** - Credenciais nunca ficam expostas no código do cliente  
✅ **Fallback** - Se variáveis não existirem, usa valores padrão (apenas desenvolvimento)

## 🚀 Como usar

### 1. Desenvolvimento Local

**Opção A: Criar arquivo `.env` (Recomendado)**

1. Crie um arquivo `.env` na raiz do projeto:
   ```bash
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=sua-senha-segura-aqui
   ```

2. O arquivo `.env` já está no `.gitignore` (não será commitado)

3. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

**Opção B: Usar valores padrão**

- Se não criar o `.env`, o sistema usa valores padrão:
  - Usuário: `admin`
  - Senha: `elonet2024`

⚠️ **ATENÇÃO**: Altere a senha padrão antes de usar em produção!

### 2. Produção (Netlify)

1. Acesse: **Site settings → Environment variables**
2. Adicione as variáveis:
   - `ADMIN_USERNAME` = `seu-usuario`
   - `ADMIN_PASSWORD` = `sua-senha-segura`

3. Faça um novo deploy

### 3. Produção (LocalWeb)

1. Acesse o painel do LocalWeb
2. Vá em **Configurações → Variáveis de Ambiente**
3. Adicione as variáveis:
   - `ADMIN_USERNAME` = `seu-usuario`
   - `ADMIN_PASSWORD` = `sua-senha-segura`

4. Reinicie o servidor

## 🔒 Segurança

### ✅ Boas Práticas

- ✅ Use senhas fortes (mínimo 12 caracteres)
- ✅ Use variáveis de ambiente em produção
- ✅ Nunca commite o arquivo `.env`
- ✅ Altere as credenciais padrão antes de ir para produção

### ❌ O que NÃO fazer

- ❌ Não commite credenciais no código
- ❌ Não use senhas fracas
- ❌ Não compartilhe o arquivo `.env`

## 📝 Estrutura dos Arquivos

```
elonet-website/
├── .env                    # Variáveis de ambiente (NÃO commitado)
├── .env.example           # Exemplo de variáveis (pode commitar)
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   └── login.astro # Página de login
│   │   └── api/
│   │       └── admin/
│   │           └── login.ts # Endpoint de validação
```

## 🧪 Testando

1. **Teste com variáveis de ambiente:**
   ```bash
   # Criar .env
   echo "ADMIN_USERNAME=teste" > .env
   echo "ADMIN_PASSWORD=teste123" >> .env
   
   # Reiniciar servidor
   npm run dev
   ```

2. **Acesse:** `http://localhost:4321/admin/login`
3. **Use as credenciais** configuradas no `.env`

## 🆘 Troubleshooting

### "Erro ao conectar com o servidor"
- Verifique se o servidor está rodando
- Verifique se o endpoint `/api/admin/login` está acessível

### "Login não funciona"
- Verifique se as variáveis de ambiente estão configuradas
- Verifique o console do navegador (F12) para erros
- Verifique os logs do servidor

### "Variáveis não são lidas"
- Reinicie o servidor após criar/editar o `.env`
- Verifique se o arquivo está na raiz do projeto
- Verifique se as variáveis estão no formato correto (sem espaços)

## 📚 Referências

- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

**Última atualização**: Janeiro 2024

