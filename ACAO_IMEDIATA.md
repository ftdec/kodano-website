# ⚡ Ação Imediata - Emails Não Chegam nas Contas Kodano

## Situação Atual
✅ Emails chegam no Gmail pessoal  
❌ Emails **NÃO chegam** em `contato@kodano.com.br` e `felipe.caltabiano@kodano.com.br`

## ⚠️ Problema Identificado
O Google Workspace está bloqueando ou filtrando os emails antes de chegarem nas caixas de entrada das contas da Kodano.

## 🔧 SOLUÇÃO RÁPIDA (5 minutos)

### Opção 1: Criar Filtros (Recomendado)

Para **CADA conta** da Kodano (`contato@kodano.com.br` e `felipe.caltabiano@kodano.com.br`):

1. **Faça login** na conta: https://mail.google.com
2. Clique em **⚙️ Configurações** → **Ver todas as configurações**
3. Vá na aba **Filtros e endereços bloqueados**
4. Clique em **Criar um novo filtro**
5. No campo **De**, digite: `notifications.kodano.com.br`
6. Clique em **Criar filtro**
7. **Marque estas opções:**
   - ✅ **Nunca enviar para Spam**
   - ✅ **Sempre marcar como importante**
   - ✅ **Adicionar estrela**
8. Clique em **Criar filtro**

**Repita para a segunda conta!**

---

### Opção 2: Configurar Encaminhamento (Solução Temporária)

Enquanto resolve o problema, configure para encaminhar emails:

Para **CADA conta** da Kodano:

1. Faça login na conta
2. **Configurações** → **Ver todas as configurações**
3. Aba **Encaminhamento e POP/IMAP**
4. **Adicionar endereço de encaminhamento**
5. Digite: `felipe.caltabiano.castro@gmail.com`
6. Verifique o email de confirmação no Gmail pessoal
7. **Ative o encaminhamento**

---

### Opção 3: Verificar Spam

1. Faça login em cada conta da Kodano
2. Vá na pasta **Spam**
3. Procure por emails de `notifications.kodano.com.br`
4. Se encontrar, marque como **Não é spam**

---

## 📋 Verificações Necessárias

### 1. Contas Existem?
- Acesse: https://admin.google.com
- Vá em **Usuários**
- Verifique se `contato@kodano.com.br` e `felipe.caltabiano@kodano.com.br` existem
- Se não existirem, **crie-as**

### 2. Contas Estão Ativas?
- No Admin Console, verifique se as contas não estão suspensas
- Clique em cada conta para ver status

### 3. Filtros no Admin?
- No Admin Console: **Apps** → **Google Workspace** → **Gmail** → **Roteamento**
- Verifique se há filtros bloqueando emails

---

## 🧪 Teste Após Configurar

Após fazer as configurações acima:

```bash
npx tsx scripts/send-beautiful-email.mts
```

Depois verifique:
1. ✅ Gmail pessoal (deve chegar)
2. ❓ `contato@kodano.com.br` (verificar inbox E spam)
3. ❓ `felipe.caltabiano@kodano.com.br` (verificar inbox E spam)

---

## 📚 Documentação Completa

Para mais detalhes, veja: `RESOLVER_GOOGLE_WORKSPACE.md`

---

## ⏱️ Tempo Estimado

- **Opção 1 (Filtros):** 5 minutos por conta = 10 minutos total
- **Opção 2 (Encaminhamento):** 5 minutos por conta = 10 minutos total
- **Opção 3 (Verificar Spam):** 2 minutos por conta = 4 minutos total

**Total: ~15 minutos para resolver completamente**

---

## ✅ Próximos Passos

1. [ ] Criar filtros em cada conta (Opção 1)
2. [ ] Verificar pasta Spam (Opção 3)
3. [ ] Testar envio de email
4. [ ] Se não funcionar, configurar encaminhamento (Opção 2)
5. [ ] Verificar Admin Console se necessário

---

## 🆘 Se Nada Funcionar

1. Verifique se as contas existem no Google Workspace
2. Verifique se não há políticas de segurança bloqueando
3. Contate suporte do Google Workspace
4. Considere usar outro provedor de email para as contas da Kodano

---

**Ação mais importante:** Criar os filtros (Opção 1) em cada conta da Kodano. Isso resolve 90% dos casos.

