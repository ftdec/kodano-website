# Configurar Recebimento de Emails - kodano.com.br

## Problema Identificado

✅ Emails estão sendo **enviados** com sucesso pelo Resend  
✅ Emails chegam no Gmail pessoal (`felipe.caltabiano.castro@gmail.com`)  
❌ Emails **NÃO chegam** nas contas da Kodano (`contato@kodano.com.br`, `felipe.caltabiano@kodano.com.br`)

## Diagnóstico

O domínio `kodano.com.br` está configurado para receber emails via:
- **Google Workspace** (MX records apontam para Google)
- **Amazon SES** (também configurado)

Os emails estão sendo entregues com sucesso, mas não aparecem nas caixas de entrada da Kodano.

## Soluções Possíveis

### 1. Verificar se as Contas de Email Existem no Google Workspace

**Passo a passo:**

1. Acesse o [Google Admin Console](https://admin.google.com)
2. Vá em **Usuários**
3. Verifique se existem as contas:
   - `contato@kodano.com.br`
   - `felipe.caltabiano@kodano.com.br`

**Se as contas não existirem:**
- Crie as contas no Google Workspace
- Ou configure um alias/roteamento de email

**Se as contas existirem:**
- Verifique se estão ativas
- Verifique se não há filtros de spam configurados

### 2. Verificar Filtros de Spam no Google Workspace

1. Acesse o [Google Admin Console](https://admin.google.com)
2. Vá em **Apps** → **Google Workspace** → **Gmail**
3. Vá em **Roteamento** ou **Filtros de conteúdo**
4. Verifique se há filtros bloqueando emails de `notifications.kodano.com.br`

### 3. Verificar Spam nas Contas Individuais

Para cada conta (`contato@kodano.com.br`, `felipe.caltabiano@kodano.com.br`):

1. Faça login na conta
2. Verifique a pasta **Spam**
3. Procure por emails de `notifications.kodano.com.br`
4. Se encontrar, marque como "Não é spam"

### 4. Criar Filtro para Garantir Recebimento

Para cada conta de email da Kodano:

1. Faça login na conta
2. Vá em **Configurações** (⚙️) → **Ver todas as configurações**
3. Vá na aba **Filtros e endereços bloqueados**
4. Clique em **Criar um novo filtro**
5. No campo **De**, digite: `notifications.kodano.com.br`
6. Clique em **Criar filtro**
7. Marque as opções:
   - ✅ **Nunca enviar para Spam**
   - ✅ **Sempre marcar como importante**
   - ✅ **Adicionar estrela**
8. Clique em **Criar filtro**

### 5. Verificar Configuração de Roteamento no Google Workspace

Se você quer que emails enviados para `contato@kodano.com.br` sejam encaminhados para outro endereço:

1. Acesse o [Google Admin Console](https://admin.google.com)
2. Vá em **Apps** → **Google Workspace** → **Gmail**
3. Vá em **Roteamento**
4. Configure o roteamento para encaminhar emails de `contato@kodano.com.br` para `felipe.caltabiano.castro@gmail.com` (ou outro endereço)

### 6. Verificar Logs do Google Workspace

1. Acesse o [Google Admin Console](https://admin.google.com)
2. Vá em **Relatórios** → **Logs de auditoria** → **Email**
3. Procure por tentativas de entrega de emails para `contato@kodano.com.br`
4. Verifique se há erros ou bloqueios

### 7. Testar Recebimento Direto

Teste se as contas conseguem receber emails de outras fontes:

1. Envie um email de teste de um Gmail pessoal para `contato@kodano.com.br`
2. Verifique se chega
3. Se não chegar, o problema é na configuração do Google Workspace
4. Se chegar, o problema pode ser específico de emails do Resend

## Solução Rápida: Encaminhar para Gmail Pessoal

Se você precisa que os emails cheguem imediatamente enquanto resolve a configuração:

### Opção A: Encaminhamento no Google Workspace

1. Acesse o [Google Admin Console](https://admin.google.com)
2. Vá em **Apps** → **Google Workspace** → **Gmail**
3. Vá em **Roteamento**
4. Crie uma regra para encaminhar todos os emails de `contato@kodano.com.br` para `felipe.caltabiano.castro@gmail.com`

### Opção B: Encaminhamento Individual

Para cada conta:

1. Faça login na conta (`contato@kodano.com.br`)
2. Vá em **Configurações** → **Encaminhamento e POP/IMAP**
3. Clique em **Adicionar endereço de encaminhamento**
4. Adicione `felipe.caltabiano.castro@gmail.com`
5. Verifique o email de confirmação
6. Ative o encaminhamento

## Verificar Status de Entrega no Resend

Para verificar se os emails realmente foram entregues:

```bash
# Verificar status de um email específico
npx tsx scripts/check-email-status.mts <email-id>

# Ver emails recentes
npx tsx scripts/check-email-status.mts
```

## Próximos Passos Recomendados

1. ✅ **Verificar se as contas existem** no Google Workspace
2. ✅ **Criar filtros** para garantir que emails não vão para spam
3. ✅ **Configurar encaminhamento** temporário para Gmail pessoal (se necessário)
4. ✅ **Verificar logs** do Google Workspace para entender o que está acontecendo

## Comandos Úteis

```bash
# Verificar MX records do domínio
dig MX kodano.com.br +short

# Verificar se o domínio está configurado corretamente
dig TXT kodano.com.br | grep -i spf
dig TXT kodano.com.br | grep -i dkim

# Testar envio de email
npx tsx scripts/send-beautiful-email.mts
```

## Contato com Suporte

Se nenhuma das soluções funcionar:

1. **Google Workspace Support**: Verifique os logs de auditoria
2. **Resend Support**: Os emails estão sendo entregues, então o problema é no recebimento
3. **Provedor de DNS**: Verifique se os MX records estão corretos

## Checklist de Verificação

- [ ] Contas de email existem no Google Workspace
- [ ] Contas estão ativas e não suspensas
- [ ] Filtros de spam foram verificados
- [ ] Filtros foram criados para garantir recebimento
- [ ] Encaminhamento configurado (se necessário)
- [ ] Logs do Google Workspace verificados
- [ ] Teste de recebimento realizado

