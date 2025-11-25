# 🔧 Adicionar Registros DNS Faltantes

## 📋 Situação Atual

Você já tem alguns registros DNS configurados, mas faltam **3 registros** que o Resend está pedindo:

### ✅ Registros que JÁ EXISTEM:
- ✅ TXT `notifications` com SPF (mas precisa ser atualizado)
- ✅ TXT `resend._domainkey.notifications` (DKIM - está correto)

### ❌ Registros que FALTAM:
1. ❌ TXT `send.notifications` com SPF correto
2. ❌ MX `send.notifications` para feedback
3. ❌ MX `notifications` para recebimento

---

## 🔧 Passo a Passo para Adicionar

### Registro 1: SPF para send.notifications

1. No painel DNS (GoDaddy/Registro.br), clique em **"Adicionar Registro"** ou **"Add Record"**
2. Preencha:
   - **Tipo:** `TXT`
   - **Nome:** `send.notifications` ⚠️ **Apenas isso, sem o domínio completo!**
   - **Dados/Valor:** `v=spf1 include:amazonses.com ~all`
   - **TTL:** `1 hora` ou `3600`
3. Salve

**⚠️ IMPORTANTE:** Este é diferente do registro `notifications` que você já tem. Você precisa de DOIS registros SPF:
- Um para `notifications` (já existe, mas pode manter)
- Um NOVO para `send.notifications` (este que você está adicionando agora)

---

### Registro 2: MX para send.notifications (Feedback)

1. Clique em **"Adicionar Registro"** ou **"Add Record"**
2. Preencha:
   - **Tipo:** `MX`
   - **Nome:** `send.notifications` ⚠️ **Apenas isso, sem o domínio completo!**
   - **Dados/Valor:** `feedback-smtp.sa-east-1.amazonses.com`
   - **Prioridade:** `10`
   - **TTL:** `1 hora` ou `3600`
3. Salve

---

### Registro 3: MX para notifications (Recebimento)

1. Clique em **"Adicionar Registro"** ou **"Add Record"**
2. Preencha:
   - **Tipo:** `MX`
   - **Nome:** `notifications` ⚠️ **Apenas isso, sem o domínio completo!**
   - **Dados/Valor:** `inbound-smtp.sa-east-1.amazonaws.com`
   - **Prioridade:** `10`
   - **TTL:** `1 hora` ou `3600`
3. Salve

**⚠️ ATENÇÃO:** Você já tem registros MX para `@` (domínio raiz) apontando para Google. Este novo registro MX é para o SUBDOMÍNIO `notifications`, então não vai conflitar.

---

## ✅ Após Adicionar os 3 Registros

### Verificação Local (aguarde 15-30 minutos):

```bash
# Verificar SPF para send.notifications
dig TXT send.notifications.kodano.com.br

# Verificar MX para send.notifications
dig MX send.notifications.kodano.com.br

# Verificar MX para notifications
dig MX notifications.kodano.com.br
```

**Resultados esperados:**

1. **SPF:**
   ```
   send.notifications.kodano.com.br. 3600 IN TXT "v=spf1 include:amazonses.com ~all"
   ```

2. **MX Envio:**
   ```
   send.notifications.kodano.com.br. 3600 IN MX 10 feedback-smtp.sa-east-1.amazonses.com.
   ```

3. **MX Recebimento:**
   ```
   notifications.kodano.com.br. 3600 IN MX 10 inbound-smtp.sa-east-1.amazonaws.com.
   ```

### Verificar no Resend:

1. Acesse: https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Aguarde 15-30 minutos após adicionar os registros
4. Clique em **"Verify"** ou **"Verify Domain"**
5. Aguarde alguns minutos
6. Os status devem mudar de **"Pending"** para **"Verified"** ✅

---

## 📋 Checklist Final

- [ ] Adicionei TXT `send.notifications` com valor `v=spf1 include:amazonses.com ~all`
- [ ] Adicionei MX `send.notifications` apontando para `feedback-smtp.sa-east-1.amazonses.com` (prioridade 10)
- [ ] Adicionei MX `notifications` apontando para `inbound-smtp.sa-east-1.amazonaws.com` (prioridade 10)
- [ ] Salvei todos os registros
- [ ] Aguardei 15-30 minutos
- [ ] Verifiquei com `dig` que os registros estão corretos
- [ ] Fui ao Resend e cliquei em "Verify"
- [ ] Todos os registros mostram "Verified" ✅

---

## ⚠️ Observações Importantes

1. **Não exclua os registros existentes** - especialmente os MX do Google e o DKIM que já está funcionando
2. **Os novos registros são para SUBDOMÍNIOS** - não vão conflitar com os registros do domínio raiz (`@`)
3. **Aguarde a propagação DNS** - pode levar até 30 minutos
4. **O registro SPF antigo** (`notifications` com `include:resend.com`) pode ser mantido ou removido depois - o importante é ter o novo para `send.notifications`

---

## 🆘 Ainda com Problemas?

Se após adicionar os 3 registros e aguardar 30 minutos ainda estiver "Pending":

1. Verifique se os registros foram salvos corretamente no painel DNS
2. Use `dig` para confirmar que estão propagados
3. Entre em contato com o suporte do Resend: https://resend.com/support

