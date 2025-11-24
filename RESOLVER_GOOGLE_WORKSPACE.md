# 🔧 Resolver Problema de Recebimento - Google Workspace Kodano

## Problema
✅ Emails chegam no Gmail pessoal (`felipe.caltabiano.castro@gmail.com`)  
❌ Emails **NÃO chegam** nas contas da Kodano (`contato@kodano.com.br`, `felipe.caltabiano@kodano.com.br`)

## Diagnóstico
Os emails estão sendo **entregues com sucesso** pelo Resend (status "delivered"), mas o Google Workspace está bloqueando ou filtrando os emails antes de chegarem nas caixas de entrada.

## Solução Passo a Passo

### PASSO 1: Verificar se as Contas Existem

1. Acesse: https://admin.google.com
2. Faça login com uma conta de administrador do Google Workspace
3. Vá em **Usuários** (menu lateral esquerdo)
4. Procure por:
   - `contato@kodano.com.br`
   - `felipe.caltabiano@kodano.com.br`

**Se as contas NÃO existirem:**
- Clique em **Adicionar usuário** ou **Criar usuário**
- Crie as contas necessárias
- Aguarde alguns minutos para propagação

**Se as contas existirem:**
- Verifique se estão **Ativas** (não suspensas)
- Clique em cada conta para ver detalhes
- Verifique se não há restrições

---

### PASSO 2: Verificar Filtros de Spam no Admin

1. No Google Admin Console, vá em **Apps** → **Google Workspace** → **Gmail**
2. Clique em **Roteamento** (ou **Routing**)
3. Procure por regras que possam estar:
   - Bloqueando emails de `notifications.kodano.com.br`
   - Enviando emails para spam
   - Deletando emails

4. Vá em **Filtros de conteúdo** (ou **Content compliance**)
5. Verifique se há filtros bloqueando emails

---

### PASSO 3: Verificar Spam nas Contas Individuais

Para **cada conta** (`contato@kodano.com.br`, `felipe.caltabiano@kodano.com.br`):

1. Faça login na conta (https://mail.google.com)
2. Vá na pasta **Spam** (lixeira)
3. Procure por emails de `notifications.kodano.com.br`
4. Se encontrar:
   - Abra o email
   - Clique em **Não é spam** (ou **Not spam**)
   - Marque o remetente como confiável

---

### PASSO 4: Criar Filtro para Garantir Recebimento (IMPORTANTE)

Para **cada conta** da Kodano:

1. Faça login na conta: https://mail.google.com
2. Clique no ícone de **Configurações** (⚙️) no canto superior direito
3. Clique em **Ver todas as configurações**
4. Vá na aba **Filtros e endereços bloqueados**
5. Clique em **Criar um novo filtro**
6. No campo **De**, digite exatamente: `notifications.kodano.com.br`
7. Clique em **Criar filtro**
8. **Marque TODAS estas opções:**
   - ✅ **Nunca enviar para Spam**
   - ✅ **Sempre marcar como importante**
   - ✅ **Adicionar estrela**
   - ✅ **Aplicar o rótulo:** (opcional, crie um rótulo "Kodano" se quiser)
   - ✅ **Nunca marcar como lida**
9. Clique em **Criar filtro**

**Repita este processo para CADA conta da Kodano!**

---

### PASSO 5: Verificar Configurações de Roteamento

1. No Google Admin Console, vá em **Apps** → **Google Workspace** → **Gmail**
2. Clique em **Roteamento** (ou **Routing**)
3. Verifique se há regras que redirecionam emails
4. Se houver regras, verifique se não estão bloqueando emails

---

### PASSO 6: Verificar Logs de Auditoria

1. No Google Admin Console, vá em **Relatórios** → **Logs de auditoria**
2. Selecione **Email** como tipo de log
3. Procure por tentativas de entrega para:
   - `contato@kodano.com.br`
   - `felipe.caltabiano@kodano.com.br`
4. Verifique se há erros ou bloqueios registrados

---

### PASSO 7: Testar Recebimento Direto

1. Envie um email de teste de um Gmail pessoal para `contato@kodano.com.br`
2. Verifique se chega
3. Se **não chegar**, o problema é na configuração básica do Google Workspace
4. Se **chegar**, o problema é específico com emails do Resend

---

### PASSO 8: Configurar Encaminhamento Temporário (Solução Rápida)

Enquanto resolve o problema, configure encaminhamento:

Para cada conta da Kodano:

1. Faça login na conta
2. Vá em **Configurações** → **Ver todas as configurações**
3. Vá na aba **Encaminhamento e POP/IMAP**
4. Clique em **Adicionar endereço de encaminhamento**
5. Digite: `felipe.caltabiano.castro@gmail.com`
6. Clique em **Próximo**
7. Verifique o email de confirmação no Gmail pessoal
8. Volte para a conta da Kodano e **ative o encaminhamento**
9. Opcionalmente, marque **Manter cópia do Gmail na caixa de entrada**

---

### PASSO 9: Verificar MX Records

Verifique se os MX records estão corretos:

```bash
dig MX kodano.com.br +short
```

Deve mostrar registros do Google (aspmx.l.google.com, etc.)

Se não mostrar, você precisa configurar os MX records no seu provedor de DNS.

---

## Solução Alternativa: Usar BCC ao Invés de TO

Se nada funcionar, podemos modificar o código para usar BCC para o Gmail pessoal, mantendo os emails da Kodano como destinatários principais. Isso pode ajudar a evitar filtragem.

---

## Checklist de Verificação

- [ ] Contas existem no Google Workspace
- [ ] Contas estão ativas (não suspensas)
- [ ] Filtros criados em cada conta (Passo 4)
- [ ] Pasta Spam verificada
- [ ] Logs de auditoria verificados
- [ ] Teste de recebimento direto realizado
- [ ] Encaminhamento configurado (se necessário)

---

## Se Nada Funcionar

1. **Contate o Suporte do Google Workspace**
   - Explique que emails de `notifications.kodano.com.br` não estão chegando
   - Forneça os IDs dos emails do Resend para investigação

2. **Verifique se há políticas de segurança**
   - No Admin Console, vá em **Segurança** → **Regras de segurança**
   - Verifique se há políticas bloqueando emails externos

3. **Considere usar um serviço de email diferente**
   - Se o Google Workspace continuar bloqueando, pode ser necessário usar outro provedor

---

## Teste Rápido

Após fazer as configurações, teste enviando um email:

```bash
npx tsx scripts/send-beautiful-email.mts
```

Depois verifique:
1. Gmail pessoal (deve chegar)
2. contato@kodano.com.br (verificar inbox e spam)
3. felipe.caltabiano@kodano.com.br (verificar inbox e spam)

---

## Status Atual

✅ **Envio funcionando** - Resend está entregando emails com sucesso  
✅ **Gmail pessoal recebe** - Confirma que emails estão sendo enviados  
❌ **Contas Kodano não recebem** - Problema no Google Workspace

**Ação necessária:** Seguir os passos acima, especialmente o **PASSO 4** (criar filtros).

