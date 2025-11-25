# 🔧 Como Adicionar Registro SPF para notifications.kodano.com.br

## ⚠️ Erro Atual

```
Missing required SPF records. 
Make sure you've added the correct record into your domain provider.
```

## ✅ Solução Rápida

### Passo 1: Acesse o Painel DNS

Acesse o painel onde você gerencia o DNS do domínio `kodano.com.br`. Isso pode ser:
- Registro.br
- Cloudflare
- AWS Route 53
- GoDaddy
- Namecheap
- Outro provedor de DNS

### Passo 2: Adicione o Registro TXT para SPF

**Você precisa adicionar um registro TXT para o SUBDOMÍNIO `notifications`:**

#### Configuração dos Registros DNS:

O Resend está pedindo **3 registros** para o domínio `notifications.kodano.com.br`:

##### 1. Registro SPF (TXT) - Para Envio
- **Nome/Host:** `send.notifications` ⚠️ **Use apenas "send.notifications", NÃO o domínio completo!**
- **Tipo:** `TXT`
- **Valor/Conteúdo:** `v=spf1 include:amazonses.com ~all`
- **TTL:** `Auto` ou `3600`

##### 2. Registro MX - Para Envio (Feedback)
- **Nome/Host:** `send.notifications` ⚠️ **Use apenas "send.notifications"**
- **Tipo:** `MX`
- **Valor/Conteúdo:** `feedback-smtp.sa-east-1.amazonses.com`
- **Prioridade:** `10`
- **TTL:** `Auto` ou `3600`

##### 3. Registro MX - Para Recebimento
- **Nome/Host:** `notifications` ⚠️ **Use apenas "notifications"**
- **Tipo:** `MX`
- **Valor/Conteúdo:** `inbound-smtp.sa-east-1.amazonaws.com`
- **Prioridade:** `10`
- **TTL:** `Auto` ou `3600`

**⚠️ ATENÇÃO CRÍTICA:** 
- ✅ **Correto:** Nome = `send.notifications` → Resolve em `send.notifications.kodano.com.br`
- ✅ **Correto:** Nome = `notifications` → Resolve em `notifications.kodano.com.br`
- ❌ **Errado:** Nome = `send.notifications.kodano.com.br` → Resolve em `send.notifications.kodano.com.br.kodano.com.br` (duplicado!)

A maioria dos provedores DNS adiciona automaticamente o domínio raiz (`kodano.com.br`) ao nome que você digita. Por isso, você deve digitar apenas o subdomínio sem o domínio completo.

### Passo 3: Exemplos por Provedor

#### 📋 Registro.br

1. Acesse: https://registro.br
2. Faça login e vá em "Meus Domínios"
3. Clique em `kodano.com.br`
4. Vá em "DNS" ou "Zona DNS"

**Adicione os 3 registros:**

**Registro 1 - SPF (TXT):**
5. Clique em "Adicionar Registro"
6. Preencha:
   - **Nome:** `send.notifications` ⚠️ **Apenas "send.notifications", sem o domínio completo!**
   - **Tipo:** `TXT`
   - **Valor:** `v=spf1 include:amazonses.com ~all`
7. Se aparecer confirmação, escolha **"Sim"** para resolver em `send.notifications.kodano.com.br`
8. Salve

**Registro 2 - MX para Envio:**
9. Clique em "Adicionar Registro"
10. Preencha:
    - **Nome:** `send.notifications`
    - **Tipo:** `MX`
    - **Valor:** `feedback-smtp.sa-east-1.amazonses.com`
    - **Prioridade:** `10`
11. Salve

**Registro 3 - MX para Recebimento:**
12. Clique em "Adicionar Registro"
13. Preencha:
    - **Nome:** `notifications`
    - **Tipo:** `MX`
    - **Valor:** `inbound-smtp.sa-east-1.amazonaws.com`
    - **Prioridade:** `10`
14. Salve

#### ☁️ Cloudflare

1. Acesse: https://dash.cloudflare.com
2. Selecione o domínio `kodano.com.br`
3. Vá em "DNS" → "Records"
4. Clique em "Add record"
5. Preencha:
   - **Type:** `TXT`
   - **Name:** `notifications`
   - **Content:** `v=spf1 include:resend.com ~all`
   - **TTL:** `Auto` ou `3600`
6. Clique em "Save"

#### 🌐 AWS Route 53

1. Acesse: https://console.aws.amazon.com/route53
2. Selecione "Hosted zones"
3. Clique em `kodano.com.br`
4. Clique em "Create record"
5. Preencha:
   - **Record name:** `notifications`
   - **Record type:** `TXT`
   - **Value:** `v=spf1 include:resend.com ~all`
   - **TTL:** `3600`
6. Clique em "Create records"

#### 🎯 GoDaddy

1. Acesse: https://www.godaddy.com
2. Vá em "My Products" → "DNS"
3. Selecione `kodano.com.br`
4. Role até "Records" e clique em "Add"
5. Preencha:
   - **Type:** `TXT`
   - **Name:** `notifications`
   - **Value:** `v=spf1 include:resend.com ~all`
   - **TTL:** `1 Hour`
6. Salve

### Passo 4: Verificar se os Registros Foram Adicionados

Aguarde 5-15 minutos e verifique usando o terminal:

```bash
# Verificar SPF
dig TXT send.notifications.kodano.com.br

# Verificar MX para envio
dig MX send.notifications.kodano.com.br

# Verificar MX para recebimento
dig MX notifications.kodano.com.br
```

Você deve ver:

**SPF:**
```
send.notifications.kodano.com.br. 3600 IN TXT "v=spf1 include:amazonses.com ~all"
```

**MX Envio:**
```
send.notifications.kodano.com.br. 3600 IN MX 10 feedback-smtp.sa-east-1.amazonses.com.
```

**MX Recebimento:**
```
notifications.kodano.com.br. 3600 IN MX 10 inbound-smtp.sa-east-1.amazonaws.com.
```

Ou use uma ferramenta online:
- https://mxtoolbox.com/spf.aspx
- https://www.dnswatch.info/dns/dnslookup?la=en&host=notifications.kodano.com.br&type=TXT

### Passo 5: Verificar no Resend

1. Acesse: https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Clique em **"Verify"** ou **"Verify Domain"**
4. Aguarde alguns minutos
5. O status deve mudar para **"Verified"** ✅

## ⚠️ Erros Comuns

### ❌ Erro: Adicionar no domínio raiz em vez do subdomínio
- **Errado:** Adicionar registro TXT para `kodano.com.br`
- **Correto:** Adicionar registro TXT para `notifications.kodano.com.br` (subdomínio)

### ❌ Erro: Usar domínio completo no campo Nome
- **Errado:** Nome = `notifications.kodano.com.br` → Cria `notifications.kodano.com.br.kodano.com.br` (duplicado!)
- **Correto:** Nome = `notifications` → Cria `notifications.kodano.com.br` ✅
- **Dica:** Se o provedor perguntar se você quer resolver em `notifications.kodano.com.br`, escolha **"Sim"**

### ❌ Erro: Valor com espaços ou aspas extras
- **Errado:** `"v=spf1 include:resend.com ~all"` (com aspas)
- **Errado:** `v=spf1  include:resend.com  ~all` (com espaços extras)
- **Correto:** `v=spf1 include:resend.com ~all` (exatamente assim)

### ❌ Erro: Não aguardar propagação DNS
- DNS pode levar até 30 minutos para propagar
- Verifique usando `dig` antes de tentar verificar no Resend

### ❌ Erro: Esquecer de salvar
- Certifique-se de clicar em "Save", "Create", ou "Adicionar" após preencher o formulário

## 📋 Checklist

- [ ] Acessei o painel DNS do meu provedor
- [ ] Adicionei registro TXT SPF para `send.notifications` com valor `v=spf1 include:amazonses.com ~all`
- [ ] Adicionei registro MX para `send.notifications` apontando para `feedback-smtp.sa-east-1.amazonses.com` (prioridade 10)
- [ ] Adicionei registro MX para `notifications` apontando para `inbound-smtp.sa-east-1.amazonaws.com` (prioridade 10)
- [ ] Salvei todas as alterações
- [ ] Aguardei 15-30 minutos para propagação DNS
- [ ] Verifiquei com `dig` todos os 3 registros
- [ ] Fui ao Resend e cliquei em "Verify" novamente
- [ ] Todos os registros mostram "Verified" ✅

## 🆘 Ainda com Problemas?

1. **Verifique os logs do Resend:** https://resend.com/domains
2. **Verifique se o registro está correto:** Use `dig TXT notifications.kodano.com.br`
3. **Entre em contato com o suporte do Resend:** https://resend.com/support

## 📞 Precisa de Ajuda com DNS?

Se você não tem acesso ao painel DNS ou não sabe onde está configurado:

1. Verifique onde o domínio `kodano.com.br` está registrado
2. Verifique quem gerencia o DNS (pode ser diferente do registro)
3. Entre em contato com quem gerencia o DNS para adicionar o registro

