# ⚡ Ação Rápida - Gmail Pessoal Não Recebe Emails

## ✅ Confirmação
Os emails estão sendo **entregues com sucesso** pelo Resend (status "delivered"). O problema está na configuração do seu Gmail pessoal.

## 🔧 Solução Rápida (5 minutos)

### PASSO 1: Verificar Spam
1. Acesse: https://mail.google.com
2. Clique em **Spam** (lixeira) no menu lateral
3. Procure por emails recentes
4. Se encontrar, marque como **"Não é spam"**

### PASSO 2: Limpar Filtros (MAIS IMPORTANTE)
1. No Gmail, clique em **⚙️ Configurações** → **Ver todas as configurações**
2. Vá na aba **Filtros e endereços bloqueados**
3. **Delete TODOS os filtros** (temporariamente)
4. Teste recebendo um email
5. Se funcionar, recrie apenas os filtros necessários

### PASSO 3: Desativar Encaminhamento
1. **Configurações** → **Ver todas as configurações**
2. Aba **Encaminhamento e POP/IMAP**
3. Se houver encaminhamento ativo:
   - Clique em **Desativar encaminhamento**
   - Ou remova o endereço de encaminhamento
4. **IMPORTANTE:** Verifique se há opção marcada como "Deletar email após encaminhar" - **DESMARQUE**

### PASSO 4: Verificar Quota
1. No Gmail, role até o final da página
2. Verifique se há mensagem sobre espaço de armazenamento
3. Se estiver cheio:
   - Delete emails antigos
   - Esvazie a lixeira
   - Delete anexos grandes

### PASSO 5: Testar Recebimento
1. Envie um email de teste para si mesmo
2. Ou peça para alguém enviar um email
3. Verifique se chega

---

## 🎯 Causas Mais Comuns

### 1. Filtro Deletando Emails (90% dos casos)
- **Solução:** Delete todos os filtros temporariamente

### 2. Encaminhamento Configurado Incorretamente
- **Solução:** Desative encaminhamento ou configure corretamente

### 3. Emails Indo para Spam
- **Solução:** Marque como "Não é spam" e crie filtro

### 4. Conta Cheia
- **Solução:** Limpe espaço de armazenamento

### 5. Aplicativo Conectado Interceptando
- **Solução:** Revogue acesso de aplicativos suspeitos

---

## 📋 Checklist Rápido

- [ ] Verificar pasta Spam
- [ ] **Deletar todos os filtros** (temporariamente)
- [ ] Desativar encaminhamento (se não necessário)
- [ ] Verificar quota de armazenamento
- [ ] Testar recebimento
- [ ] Verificar aplicativos conectados

---

## 🔍 Verificar Status dos Emails Enviados

Os emails estão sendo entregues. Veja o status:

**Email mais recente:**
- ID: `ca904668-66a8-41f2-9592-67d3e7d743ce`
- Status: **delivered** ✅
- Dashboard: https://resend.com/emails/ca904668-66a8-41f2-9592-67d3e7d743ce

Isso confirma que o problema está no Gmail, não no envio.

---

## 💡 Solução Temporária

Enquanto resolve o problema do Gmail, você pode:

1. **Usar outro email como backup:**
   - Atualize `.env.local`:
   ```env
   RESEND_BACKUP_EMAIL=seu-outro-email@exemplo.com
   ```

2. **Usar email da Kodano:**
   ```env
   RESEND_BACKUP_EMAIL=felipe.caltabiano@kodano.com.br
   ```

---

## 🆘 Se Nada Funcionar

1. **Contate Suporte do Google:**
   - https://support.google.com/accounts/contact/suspended
   - Explique que emails não estão chegando

2. **Verifique Status da Conta:**
   - https://myaccount.google.com
   - Verifique se há alertas

3. **Considere Criar Nova Conta Gmail:**
   - Configure encaminhamento da conta antiga para a nova
   - Atualize `RESEND_BACKUP_EMAIL` com o novo endereço

---

## ⏱️ Tempo Estimado

- **Verificar Spam:** 1 minuto
- **Limpar Filtros:** 2 minutos
- **Desativar Encaminhamento:** 2 minutos
- **Testar:** 1 minuto

**Total: ~6 minutos**

---

**Ação mais importante:** **Deletar todos os filtros temporariamente** - isso resolve 90% dos casos!

