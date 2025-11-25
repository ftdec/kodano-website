# 🔧 Resolver Verificação Parcial do Domínio

## ⚠️ Status Atual

O domínio `notifications.kodano.com.br` está com status **"partially failed"** (verificação parcialmente falhada).

Isso significa que:
- ✅ Alguns registros DNS estão corretos
- ❌ Alguns registros DNS estão faltando ou incorretos

## 🔍 Como Identificar o Problema

### 1. Verifique no Resend Dashboard

1. Acesse: https://resend.com/domains
2. Clique no domínio `notifications.kodano.com.br`
3. Você verá uma lista de registros DNS com status:
   - ✅ **Verified** (verificado)
   - ❌ **Failed** (falhou)
   - ⏳ **Pending** (pendente)

### 2. Identifique Qual Registro Está Falhando

Os registros que o Resend verifica são:

#### A) Registro SPF (TXT)
- **Nome:** `notifications` (resolve em `notifications.kodano.com.br`)
- **Tipo:** `TXT`
- **Valor esperado:** `v=spf1 include:resend.com ~all`

#### B) Registro DKIM (TXT)
- **Nome:** `resend._domainkey.notifications` (resolve em `resend._domainkey.notifications.kodano.com.br`)
- **Tipo:** `TXT`
- **Valor:** Uma string longa única fornecida pelo Resend

## 🔧 Soluções por Tipo de Erro

### Problema 1: SPF Falhando

**Sintomas:**
- Status mostra "SPF: Failed" ou "SPF: Missing"

**Solução:**
1. Vá ao painel DNS do seu provedor
2. Verifique se existe um registro TXT para `notifications`:
   - **Nome:** `notifications`
   - **Tipo:** `TXT`
   - **Valor:** `v=spf1 include:resend.com ~all`
3. Se não existir, adicione-o
4. Se existir mas estiver diferente, edite para o valor correto
5. Aguarde 5-15 minutos
6. Verifique com:
   ```bash
   dig TXT notifications.kodano.com.br
   ```
   Você deve ver: `"v=spf1 include:resend.com ~all"`

### Problema 2: DKIM Falhando

**Sintomas:**
- Status mostra "DKIM: Failed" ou "DKIM: Missing"

**Solução:**
1. No Resend Dashboard, copie o valor exato do registro DKIM mostrado
2. Vá ao painel DNS do seu provedor
3. Adicione um registro TXT:
   - **Nome:** `resend._domainkey.notifications` (ou apenas `resend._domainkey.notifications` dependendo do provedor)
   - **Tipo:** `TXT`
   - **Valor:** Cole o valor exato fornecido pelo Resend
4. Aguarde 5-15 minutos
5. Verifique com:
   ```bash
   dig TXT resend._domainkey.notifications.kodano.com.br
   ```
   Você deve ver o valor do DKIM

### Problema 3: Ambos Falhando

Se ambos estão falhando:
1. Adicione/edite ambos os registros conforme acima
2. Aguarde 15-30 minutos para propagação completa
3. Verifique ambos com `dig`
4. Volte ao Resend e clique em "Verify" novamente

## 📋 Checklist de Verificação

### Verificar Registros DNS Localmente

Execute estes comandos no terminal:

```bash
# Verificar SPF
dig TXT notifications.kodano.com.br

# Verificar DKIM
dig TXT resend._domainkey.notifications.kodano.com.br
```

**Resultado esperado:**

1. **SPF deve mostrar:**
   ```
   notifications.kodano.com.br. 3600 IN TXT "v=spf1 include:resend.com ~all"
   ```

2. **DKIM deve mostrar:**
   ```
   resend._domainkey.notifications.kodano.com.br. 3600 IN TXT "v=DKIM1; k=rsa; p=..."
   ```
   (O valor `p=...` será uma string longa fornecida pelo Resend)

### Verificar no Resend

1. ✅ SPF mostra "Verified"
2. ✅ DKIM mostra "Verified"
3. ✅ Status geral do domínio mostra "Verified"

## 🆘 Problemas Comuns

### "SPF record not found"
- Verifique se o registro está no subdomínio `notifications`, não no domínio raiz
- Verifique se o nome está correto: apenas `notifications` (sem o domínio completo)
- Aguarde mais tempo para propagação (até 30 minutos)

### "DKIM record not found"
- Verifique se o nome está correto: `resend._domainkey.notifications`
- Verifique se o valor está exatamente como mostrado no Resend (sem espaços extras)
- Certifique-se de que não há aspas extras no valor

### "Record exists but verification failed"
- O registro existe mas o valor está incorreto
- Compare o valor no DNS com o valor esperado no Resend
- Certifique-se de que não há espaços extras ou caracteres especiais

### Registros aparecem mas ainda mostra "Failed"
- Aguarde mais tempo (DNS pode levar até 48 horas para propagar completamente)
- Limpe o cache DNS do Resend (alguns provedores têm cache)
- Tente verificar novamente após 30 minutos

## 🔄 Passo a Passo Completo

1. **Identifique qual registro está falhando** no Resend Dashboard
2. **Copie o valor exato** do registro que está falhando do Resend
3. **Vá ao painel DNS** do seu provedor
4. **Adicione ou edite** o registro conforme necessário:
   - Use apenas o nome do subdomínio (ex: `notifications`, não `notifications.kodano.com.br`)
   - Cole o valor exato do Resend
5. **Salve** as alterações
6. **Aguarde 15-30 minutos** para propagação
7. **Verifique localmente** com `dig` para confirmar que os registros estão corretos
8. **Volte ao Resend** e clique em "Verify" novamente
9. **Aguarde alguns minutos** para o Resend verificar novamente

## 📞 Ainda com Problemas?

1. **Verifique os logs do Resend:** https://resend.com/domains
2. **Compare os valores:** Use `dig` para ver o que está no DNS vs. o que o Resend espera
3. **Entre em contato com o suporte do Resend:** https://resend.com/support
   - Informe que o domínio está "partially failed"
   - Informe quais registros estão falhando (SPF ou DKIM)
   - Informe os valores que você vê com `dig`

## 💡 Dica Final

Se você acabou de adicionar os registros:
- **Aguarde pelo menos 30 minutos** antes de verificar novamente
- DNS pode levar tempo para propagar globalmente
- Tente verificar novamente após algumas horas se ainda não funcionar

