# 🔐 Como Verificar o Domínio notifications.kodano.com.br no Resend

## ⚠️ Problema Atual

O domínio `notifications.kodano.com.br` não está verificado no Resend, causando o erro:
```
The notifications.kodano.com.br domain is not verified. 
Please, add and verify your domain on https://resend.com/domains
```

## ✅ Solução Passo a Passo

### 1. Acesse o Dashboard do Resend

1. Vá para: https://resend.com/domains
2. Faça login na sua conta Resend

### 2. Adicione o Domínio

1. Clique em **"Add Domain"** ou **"Add New Domain"**
2. Digite: `notifications.kodano.com.br`
3. Clique em **"Add"** ou **"Continue"**

### 3. Configure os Registros DNS

O Resend vai mostrar os registros DNS que você precisa adicionar. Você precisará adicionar:

#### Registro SPF (TXT) ⚠️ OBRIGATÓRIO

**IMPORTANTE:** Este é o registro que está faltando e causando o erro!

1. **No painel DNS do seu provedor**, adicione um registro TXT:

   **Para subdomínio `notifications.kodano.com.br`:**
   - **Nome/Host:** `notifications` ⚠️ **Use APENAS "notifications", não o domínio completo!**
   - **Tipo:** `TXT`
   - **Valor:** `v=spf1 include:resend.com ~all`
   - **TTL:** `3600` (ou padrão)

   **⚠️ ATENÇÃO CRÍTICA:**
   - ✅ **Correto:** Nome = `notifications` → Resolve em `notifications.kodano.com.br`
   - ❌ **Errado:** Nome = `notifications.kodano.com.br` → Resolve em `notifications.kodano.com.br.kodano.com.br` (duplicado!)
   
   A maioria dos provedores DNS (especialmente Registro.br) adiciona automaticamente o domínio raiz ao nome. Por isso, digite apenas `notifications`.
   
   Se aparecer uma confirmação perguntando se você quer resolver em `notifications.kodano.com.br`, escolha **"Sim"**.

   **Exemplos por provedor:**
   
   - **Registro.br / Cloudflare:**
     - Nome: `notifications`
     - Tipo: `TXT`
     - Conteúdo: `v=spf1 include:resend.com ~all`
   
   - **AWS Route 53:**
     - Name: `notifications.kodano.com.br`
     - Type: `TXT`
     - Value: `v=spf1 include:resend.com ~all`
   
   - **GoDaddy / Namecheap:**
     - Host: `notifications`
     - Type: `TXT`
     - Value: `v=spf1 include:resend.com ~all`

   **⚠️ ATENÇÃO:** 
   - O valor deve ser EXATAMENTE `v=spf1 include:resend.com ~all` (sem espaços extras)
   - Se você já tem um registro SPF para `kodano.com.br`, você precisa adicionar um NOVO registro para o subdomínio `notifications`
   - Não edite o registro SPF do domínio raiz, crie um novo para o subdomínio

#### Registro DKIM (TXT)
- **Nome/Host:** `resend._domainkey.notifications.kodano.com.br`
- **Tipo:** `TXT`
- **Valor:** Será uma string longa fornecida pelo Resend
- **TTL:** `3600` (ou o padrão)

### 4. Onde Adicionar os Registros DNS

Você precisa adicionar esses registros no painel DNS do seu provedor de domínio (onde você gerencia `kodano.com.br`).

**Provedores comuns:**
- **Registro.br** (se o domínio está registrado lá)
- **Cloudflare**
- **AWS Route 53**
- **Google Domains**
- **Namecheap**
- **GoDaddy**

### 5. Aguarde a Propagação DNS

Após adicionar os registros:
- Aguarde **5-15 minutos** para a propagação DNS
- Você pode verificar se os registros estão corretos usando:
  ```bash
  # Verificar SPF
  dig TXT notifications.kodano.com.br
  
  # Verificar DKIM
  dig TXT resend._domainkey.notifications.kodano.com.br
  ```

### 6. Verifique no Resend

1. Volte para https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Clique em **"Verify"** ou **"Verify Domain"**
4. Aguarde alguns minutos
5. O status deve mudar para **"Verified"** ✅

## 🔄 Solução Temporária (Enquanto Verifica)

Enquanto o domínio não está verificado, o sistema automaticamente usa `onboarding@resend.dev` como fallback. Os emails serão enviados, mas virão do domínio de teste do Resend.

**Para usar temporariamente o domínio de teste manualmente:**

1. Vá para Vercel Dashboard → Seu Projeto → Settings → Environment Variables
2. Altere `RESEND_FROM_EMAIL` de `noreply@notifications.kodano.com.br` para `onboarding@resend.dev`
3. Faça redeploy da aplicação

## 📋 Checklist de Verificação

- [ ] Domínio `notifications.kodano.com.br` adicionado no Resend
- [ ] Registro SPF adicionado no DNS
- [ ] Registro DKIM adicionado no DNS
- [ ] Aguardou 5-15 minutos para propagação
- [ ] Clicou em "Verify" no Resend
- [ ] Status mostra "Verified" ✅
- [ ] Testou enviar um email após verificação

## 🆘 Problemas Comuns

### "Domain not found" após adicionar registros
- Aguarde mais tempo (até 30 minutos)
- Verifique se os registros foram adicionados corretamente
- Certifique-se de que está usando o subdomínio `notifications.kodano.com.br`, não o domínio raiz

### Registros DNS não aparecem
- Verifique se você está adicionando no provedor DNS correto
- Alguns provedores precisam de um ponto (`.`) no final do valor
- Verifique se não há espaços extras nos valores

### "Verification failed"
- Verifique se os valores dos registros estão exatamente como mostrado no Resend
- Certifique-se de que o TTL não está muito alto (use 3600 ou menos)
- Aguarde mais tempo e tente verificar novamente

### "Missing required SPF records" ⚠️ ERRO ATUAL

**Este é o erro que você está recebendo!**

**Solução:**
1. Vá para o painel DNS onde você gerencia `kodano.com.br`
2. Adicione um registro TXT para o subdomínio `notifications`:
   - **Nome:** `notifications` (ou `notifications.kodano.com.br`)
   - **Tipo:** `TXT`
   - **Valor:** `v=spf1 include:resend.com ~all`
3. Salve e aguarde 5-15 minutos
4. Verifique se o registro foi propagado:
   ```bash
   dig TXT notifications.kodano.com.br
   ```
   Você deve ver: `"v=spf1 include:resend.com ~all"`
5. Volte ao Resend e clique em "Verify" novamente

**Erros comuns:**
- ❌ Adicionar o registro no domínio raiz (`kodano.com.br`) em vez do subdomínio
- ❌ Valor com espaços extras ou aspas
- ❌ Esquecer de salvar as alterações no DNS
- ❌ Não aguardar a propagação DNS (pode levar até 30 minutos)

### "Partially failed" ⚠️ VERIFICAÇÃO PARCIAL

**Status:** O domínio está parcialmente verificado - alguns registros estão corretos, outros não.

**Como resolver:**
1. Acesse https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Veja quais registros mostram:
   - ✅ **Verified** (está correto)
   - ❌ **Failed** (precisa corrigir)
   - ⏳ **Pending** (aguardando propagação)
4. Para cada registro que está "Failed":
   - Verifique o valor esperado no Resend
   - Compare com o que está no seu DNS (use `dig` para verificar)
   - Corrija ou adicione o registro conforme necessário
5. Aguarde 15-30 minutos após corrigir
6. Clique em "Verify" novamente no Resend

**Verifique localmente:**
```bash
# Verificar SPF
dig TXT notifications.kodano.com.br

# Verificar DKIM
dig TXT resend._domainkey.notifications.kodano.com.br
```

**Veja o guia completo:** `RESOLVER_VERIFICACAO_PARCIAL.md`

## 📞 Precisa de Ajuda?

Se continuar com problemas:
1. Verifique os logs do Resend em https://resend.com/emails
2. Verifique os logs do Vercel em Functions → `/api/contact`
3. Entre em contato com o suporte do Resend: https://resend.com/support

