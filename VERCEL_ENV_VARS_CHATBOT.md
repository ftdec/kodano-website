# Variáveis de Ambiente para Chatbot no Vercel

## 🔑 Variáveis Obrigatórias para o Chatbot

### 1. XAI_API_KEY (OBRIGATÓRIA)
**Nome:** `XAI_API_KEY`  
**Valor:** Sua chave da API do xAI (Grok)  
**Onde obter:** https://console.x.ai/  
**Ambientes:** ✅ Production, ✅ Preview, ✅ Development

**Exemplo:**
```
XAI_API_KEY=xai-sua-chave-api-aqui
```

---

### 2. SKIP_AUTH (Para desenvolvimento/teste)
**Nome:** `SKIP_AUTH`  
**Valor:** `true` (para desenvolvimento) ou `false` (para produção)  
**Ambientes:** ✅ Production, ✅ Preview, ✅ Development

**Para produção, você também precisa:**

### 3. ENDPOINTS_SECRET (Para produção)
**Nome:** `ENDPOINTS_SECRET`  
**Valor:** Uma string secreta aleatória (ex: `seu-secret-key-aqui-123`)  
**Ambientes:** ✅ Production

### 4. ALLOWED_ORIGINS (Para produção)
**Nome:** `ALLOWED_ORIGINS`  
**Valor:** `https://kodano.com.br,https://www.kodano.com.br`  
**Ambientes:** ✅ Production

---

## 📋 Como Configurar no Vercel

1. **Acesse o Vercel Dashboard:**
   - Vá para https://vercel.com/dashboard
   - Selecione seu projeto `kodano-website`

2. **Vá para Settings → Environment Variables:**
   - Clique em **Settings** no menu superior
   - Clique em **Environment Variables** no menu lateral

3. **Adicione cada variável:**
   - Clique em **Add New**
   - Digite o **Name** (ex: `XAI_API_KEY`)
   - Digite o **Value** (sua chave da API)
   - Selecione os **Environments** (Production, Preview, Development)
   - Clique em **Save**

4. **Repita para todas as variáveis necessárias**

5. **Redeploy:**
   - Após adicionar todas as variáveis, vá para **Deployments**
   - Clique nos três pontos (...) do último deployment
   - Clique em **Redeploy**

---

## ✅ Checklist de Variáveis

### Para o Chatbot funcionar:
- [ ] `XAI_API_KEY` - Chave da API do xAI (Grok)
- [ ] `SKIP_AUTH` - `true` para desenvolvimento ou `false` para produção

### Para produção (se SKIP_AUTH=false):
- [ ] `ENDPOINTS_SECRET` - Chave secreta para autenticação
- [ ] `ALLOWED_ORIGINS` - Origens permitidas (seu domínio)

### Opcionais (para funcionalidades de calendário):
- [ ] `GOOGLE_CLIENT_EMAIL` - Email da service account do Google
- [ ] `GOOGLE_PRIVATE_KEY` - Chave privada do Google
- [ ] `IMPERSONATED_USER` - Email do calendário a ser usado

---

## 🧪 Como Testar

1. **Após configurar as variáveis e fazer redeploy:**
   - Acesse seu site em produção
   - Abra o console do navegador (F12)
   - Clique no botão do chat (canto inferior direito)
   - Envie uma mensagem de teste

2. **Verifique os logs:**
   - Vá para Vercel Dashboard → Seu Projeto → Functions
   - Clique em `/api/chat`
   - Veja os logs para erros

3. **Erros comuns:**
   - `XAI_API_KEY environment variable is required` → Chave não configurada
   - `Unauthorized origin` → `ALLOWED_ORIGINS` não configurado corretamente
   - `ENDPOINTS_SECRET required` → Secret não configurado (se SKIP_AUTH=false)

---

## 🔐 Segurança

- **NUNCA** commite o `.env.local` no Git
- Use variáveis de ambiente no Vercel para produção
- Mantenha suas chaves de API seguras
- Rotacione as chaves periodicamente se necessário

---

## 📝 Exemplo Completo de Configuração

**Para Desenvolvimento/Teste:**
```
XAI_API_KEY=sua-chave-aqui
SKIP_AUTH=true
```

**Para Produção:**
```
XAI_API_KEY=sua-chave-aqui
SKIP_AUTH=false
ENDPOINTS_SECRET=uma-chave-secreta-aleatoria-muito-forte-aqui
ALLOWED_ORIGINS=https://kodano.com.br,https://www.kodano.com.br
```

---

**Pronto!** Após configurar essas variáveis e fazer o redeploy, o chatbot deve funcionar em produção! 🚀

