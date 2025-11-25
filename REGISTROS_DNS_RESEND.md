# 📋 Registros DNS para notifications.kodano.com.br no Resend

## ⚠️ Status Atual: PENDING

Todos os registros estão pendentes. Você precisa adicionar **3 registros DNS** no seu provedor DNS.

---

## 📝 Registros que Precisam ser Adicionados

### 1. SPF (TXT) - Para Envio ✅ OBRIGATÓRIO

**Configuração:**
- **Tipo:** `TXT`
- **Nome/Host:** `send.notifications` (apenas isso, sem o domínio completo!)
- **Valor:** `v=spf1 include:amazonses.com ~all`
- **TTL:** `Auto` ou `3600`
- **Prioridade:** (não aplicável para TXT)

**O que faz:** Autoriza o Resend (via Amazon SES) a enviar emails em nome do seu domínio.

---

### 2. MX - Para Envio (Feedback) ✅ OBRIGATÓRIO

**Configuração:**
- **Tipo:** `MX`
- **Nome/Host:** `send.notifications` (apenas isso, sem o domínio completo!)
- **Valor:** `feedback-smtp.sa-east-1.amazonses.com`
- **Prioridade:** `10`
- **TTL:** `Auto` ou `3600`

**O que faz:** Permite receber feedback de bounces e complaints do Amazon SES.

---

### 3. MX - Para Recebimento ✅ OBRIGATÓRIO

**Configuração:**
- **Tipo:** `MX`
- **Nome/Host:** `notifications` (apenas isso, sem o domínio completo!)
- **Valor:** `inbound-smtp.sa-east-1.amazonaws.com`
- **Prioridade:** `10`
- **TTL:** `Auto` ou `3600`

**O que faz:** Permite receber emails no domínio notifications.kodano.com.br.

---

## 🔧 Como Adicionar no Registro.br

### Passo 1: Acesse o Painel DNS

1. Acesse: https://registro.br
2. Faça login
3. Vá em "Meus Domínios"
4. Clique em `kodano.com.br`
5. Vá em "DNS" ou "Zona DNS"

### Passo 2: Adicionar Registro SPF

1. Clique em "Adicionar Registro"
2. Preencha:
   - **Nome:** `send.notifications`
   - **Tipo:** `TXT`
   - **Conteúdo:** `v=spf1 include:amazonses.com ~all`
3. Se aparecer confirmação perguntando se você quer resolver em `send.notifications.kodano.com.br`, escolha **"Sim"**
4. Clique em "Salvar" ou "Adicionar"

### Passo 3: Adicionar MX para Envio

1. Clique em "Adicionar Registro"
2. Preencha:
   - **Nome:** `send.notifications`
   - **Tipo:** `MX`
   - **Conteúdo:** `feedback-smtp.sa-east-1.amazonses.com`
   - **Prioridade:** `10`
3. Se aparecer confirmação, escolha **"Sim"**
4. Clique em "Salvar" ou "Adicionar"

### Passo 4: Adicionar MX para Recebimento

1. Clique em "Adicionar Registro"
2. Preencha:
   - **Nome:** `notifications`
   - **Tipo:** `MX`
   - **Conteúdo:** `inbound-smtp.sa-east-1.amazonaws.com`
   - **Prioridade:** `10`
3. Se aparecer confirmação perguntando se você quer resolver em `notifications.kodano.com.br`, escolha **"Sim"**
4. Clique em "Salvar" ou "Adicionar"

---

## ✅ Verificação

Aguarde **15-30 minutos** após adicionar os registros e verifique:

```bash
# Verificar SPF
dig TXT send.notifications.kodano.com.br

# Verificar MX Envio
dig MX send.notifications.kodano.com.br

# Verificar MX Recebimento
dig MX notifications.kodano.com.br
```

**Resultados esperados:**

1. **SPF deve mostrar:**
   ```
   send.notifications.kodano.com.br. 3600 IN TXT "v=spf1 include:amazonses.com ~all"
   ```

2. **MX Envio deve mostrar:**
   ```
   send.notifications.kodano.com.br. 3600 IN MX 10 feedback-smtp.sa-east-1.amazonses.com.
   ```

3. **MX Recebimento deve mostrar:**
   ```
   notifications.kodano.com.br. 3600 IN MX 10 inbound-smtp.sa-east-1.amazonaws.com.
   ```

---

## 🔄 Verificar no Resend

1. Acesse: https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Aguarde alguns minutos após adicionar os registros
4. Clique em **"Verify"** ou **"Verify Domain"**
5. Aguarde alguns minutos
6. Os status devem mudar de **"Pending"** para **"Verified"** ✅

---

## ⚠️ Erros Comuns

### ❌ Erro: Usar domínio completo no nome
- **Errado:** Nome = `send.notifications.kodano.com.br`
- **Correto:** Nome = `send.notifications`

### ❌ Erro: Valor SPF incorreto
- **Errado:** `v=spf1 include:resend.com ~all`
- **Correto:** `v=spf1 include:amazonses.com ~all`

### ❌ Erro: Prioridade MX incorreta
- **Errado:** Prioridade = `0` ou deixar em branco
- **Correto:** Prioridade = `10`

### ❌ Erro: Não aguardar propagação
- DNS pode levar até 30 minutos para propagar
- Verifique com `dig` antes de tentar verificar no Resend

---

## 📞 Ainda com Problemas?

1. **Verifique os registros DNS:** Use `dig` para confirmar que estão corretos
2. **Aguarde mais tempo:** DNS pode levar até 48 horas para propagar completamente
3. **Entre em contato com o suporte do Resend:** https://resend.com/support
   - Informe que os registros estão "Pending"
   - Informe quais registros você adicionou
   - Informe os resultados do `dig`

