# 🔧 Gmail Pessoal Não Recebe Emails - Troubleshooting

## Problema
Seu Gmail pessoal (`felipe.caltabiano.castro@gmail.com`) não está recebendo nenhum email.

## Diagnóstico Rápido

### 1. Verificar se a Conta Está Ativa

1. Acesse: https://mail.google.com
2. Tente fazer login
3. Se não conseguir fazer login:
   - Verifique se a conta não foi suspensa
   - Verifique se não foi hackeada
   - Tente recuperar a conta: https://accounts.google.com/signin/recovery

### 2. Verificar Filtros e Bloqueios

1. No Gmail, clique em **⚙️ Configurações** → **Ver todas as configurações**
2. Vá na aba **Filtros e endereços bloqueados**
3. Verifique se há filtros que:
   - Estão deletando emails automaticamente
   - Estão arquivando emails
   - Estão marcando como lido e arquivando
4. **Desative ou delete filtros suspeitos**

### 3. Verificar Pasta de Spam

1. No Gmail, vá na pasta **Spam** (lixeira)
2. Verifique se há emails lá
3. Se encontrar emails importantes:
   - Marque como "Não é spam"
   - Verifique se não há um filtro enviando tudo para spam

### 4. Verificar Encaminhamento

1. **Configurações** → **Ver todas as configurações**
2. Aba **Encaminhamento e POP/IMAP**
3. Verifique se há encaminhamento configurado que:
   - Está encaminhando TODOS os emails para outro endereço
   - Está deletando emails após encaminhar
4. **Desative encaminhamento** se não for necessário

### 5. Verificar Roteamento de Email

1. **Configurações** → **Ver todas as configurações**
2. Aba **Contas e importação**
3. Verifique se há contas de email de outros provedores configuradas
4. Verifique se há configuração de "Verificar email de outras contas"
5. Desative temporariamente para testar

### 6. Verificar Largura de Banda/Quota

1. No Gmail, role até o final da página
2. Verifique se há mensagem sobre espaço de armazenamento
3. Se a conta estiver cheia:
   - Delete emails antigos
   - Esvazie a lixeira
   - Delete anexos grandes

### 7. Verificar Configurações de Segurança

1. Acesse: https://myaccount.google.com/security
2. Verifique se há alertas de segurança
3. Verifique se a conta não foi comprometida
4. Verifique se não há bloqueios de login

### 8. Verificar Filtros de Conteúdo

1. **Configurações** → **Ver todas as configurações**
2. Aba **Filtros**
3. Verifique se há filtros muito agressivos
4. Desative filtros temporariamente para testar

---

## Soluções Específicas

### Solução 1: Limpar Filtros

1. **Configurações** → **Filtros e endereços bloqueados**
2. Delete TODOS os filtros
3. Teste recebendo um email
4. Se funcionar, recrie apenas os filtros necessários

### Solução 2: Desativar Encaminhamento

1. **Configurações** → **Encaminhamento e POP/IMAP**
2. Se houver encaminhamento ativo:
   - Clique em **Desativar encaminhamento**
   - Ou remova o endereço de encaminhamento
3. Teste recebendo um email

### Solução 3: Verificar "Importar emails"

1. **Configurações** → **Contas e importação**
2. Vá em **Importar emails e contatos**
3. Verifique se há importação ativa que possa estar causando problemas
4. Desative temporariamente

### Solução 4: Limpar Cache e Cookies

1. Limpe o cache do navegador
2. Limpe cookies do Gmail
3. Faça logout e login novamente
4. Teste em modo anônimo/privado

### Solução 5: Verificar Aplicativos Conectados

1. Acesse: https://myaccount.google.com/permissions
2. Verifique aplicativos conectados à conta
3. Revogue acesso de aplicativos suspeitos
4. Alguns apps podem estar interceptando emails

---

## Teste de Recebimento

### Teste 1: Enviar Email para Si Mesmo

1. Envie um email de outro endereço para `felipe.caltabiano.castro@gmail.com`
2. Ou use o próprio Gmail para enviar para si mesmo
3. Verifique se chega

### Teste 2: Verificar com Resend

```bash
npx tsx scripts/send-beautiful-email.mts
```

Depois verifique:
- Inbox
- Spam
- Todas as pastas

### Teste 3: Verificar Status no Resend

```bash
npx tsx scripts/check-email-status.mts
```

Verifique se os emails mostram status "delivered"

---

## Problemas Comuns

### Problema 1: Emails Vão Direto para Spam

**Solução:**
1. Marque como "Não é spam"
2. Crie filtro para nunca enviar para spam
3. Adicione remetentes à lista de contatos

### Problema 2: Emails São Deletados Automaticamente

**Solução:**
1. Verifique filtros que deletam emails
2. Verifique regras de encaminhamento
3. Verifique aplicativos conectados

### Problema 3: Conta Suspensa ou Bloqueada

**Solução:**
1. Acesse: https://accounts.google.com/signin/recovery
2. Siga o processo de recuperação
3. Verifique se há violações de política

### Problema 4: Quota de Armazenamento Cheia

**Solução:**
1. Delete emails antigos
2. Esvazie lixeira
3. Delete anexos grandes
4. Use Google Drive para arquivos grandes

---

## Checklist de Verificação

- [ ] Conta está ativa e acessível
- [ ] Filtros verificados e limpos
- [ ] Pasta Spam verificada
- [ ] Encaminhamento desativado (se não necessário)
- [ ] Roteamento de email verificado
- [ ] Quota de armazenamento verificada
- [ ] Configurações de segurança verificadas
- [ ] Aplicativos conectados verificados
- [ ] Teste de envio realizado
- [ ] Cache e cookies limpos

---

## Ação Imediata (5 minutos)

1. **Acesse o Gmail**: https://mail.google.com
2. **Verifique Spam**: Veja se há emails lá
3. **Desative filtros**: Configurações → Filtros → Delete todos temporariamente
4. **Desative encaminhamento**: Se houver, desative temporariamente
5. **Teste**: Envie um email de teste para si mesmo

---

## Se Nada Funcionar

1. **Contate Suporte do Google**:
   - https://support.google.com/accounts/contact/suspended
   - Explique o problema detalhadamente

2. **Verifique Status da Conta**:
   - https://myaccount.google.com
   - Verifique se há alertas ou problemas

3. **Considere Criar Nova Conta**:
   - Se a conta estiver completamente inacessível
   - Configure encaminhamento da conta antiga para a nova

---

## Configuração Temporária: Usar Outro Email

Enquanto resolve o problema do Gmail, você pode:

1. **Atualizar variáveis de ambiente** para usar outro email:
   ```env
   RESEND_BACKUP_EMAIL=seu-outro-email@exemplo.com
   ```

2. **Usar email da Kodano temporariamente**:
   ```env
   RESEND_BACKUP_EMAIL=felipe.caltabiano@kodano.com.br
   ```

---

## Próximos Passos

1. Siga o checklist acima
2. Teste recebendo um email
3. Se funcionar, reative configurações uma por uma para identificar o problema
4. Se não funcionar, contate suporte do Google

---

**Importante:** Se o problema persistir, pode ser necessário criar uma nova conta Gmail ou usar outro provedor de email temporariamente.

