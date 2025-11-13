# Guia de Deploy - kodano.com.br

## Opção 1: Vercel (Recomendado para Next.js)

### Passo 1: Criar conta na Vercel
1. Acesse https://vercel.com
2. Faça login com sua conta GitHub (mesma do repositório)

### Passo 2: Conectar o repositório
1. No dashboard da Vercel, clique em "Add New Project"
2. Selecione o repositório `ftdec/kodano-website`
3. Configure:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

### Passo 3: Configurar variáveis de ambiente
No painel do projeto na Vercel, vá em Settings > Environment Variables e adicione:
```
NEXT_PUBLIC_SITE_URL=https://kodano.com.br
```

### Passo 4: Fazer o primeiro deploy
1. Clique em "Deploy"
2. Aguarde o build completar (geralmente 2-3 minutos)

### Passo 5: Configurar domínio personalizado
1. No projeto na Vercel, vá em Settings > Domains
2. Adicione o domínio: `kodano.com.br`
3. Adicione também: `www.kodano.com.br` (opcional, mas recomendado)
4. A Vercel fornecerá instruções de DNS

### Passo 6: Configurar DNS no seu provedor de domínio
No seu provedor de domínio (Registro.br, GoDaddy, etc.), configure:

**Para kodano.com.br:**
- Tipo: `A`
- Nome: `@` ou deixe em branco
- Valor: `76.76.21.21` (IP da Vercel - verifique na Vercel se mudou)

**Para www.kodano.com.br:**
- Tipo: `CNAME`
- Nome: `www`
- Valor: `cname.vercel-dns.com` (ou o valor fornecido pela Vercel)

**Ou use os registros DNS fornecidos pela Vercel** (mais fácil):
- A Vercel mostra exatamente quais registros DNS você precisa adicionar

### Passo 7: Aguardar propagação DNS
- Pode levar de alguns minutos até 48 horas
- Geralmente funciona em 1-2 horas

### Passo 8: Atualizar configuração do site
Após o DNS propagar, atualize o arquivo `src/app/layout.tsx`:
```typescript
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kodano.com.br')
```

E adicione a variável de ambiente na Vercel:
```
NEXT_PUBLIC_SITE_URL=https://kodano.com.br
```

---

## Opção 2: Netlify

### Passo 1: Criar conta na Netlify
1. Acesse https://netlify.com
2. Faça login com GitHub

### Passo 2: Conectar repositório
1. "Add new site" > "Import an existing project"
2. Selecione o repositório GitHub
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Passo 3: Configurar domínio
1. Site settings > Domain management
2. Add custom domain: `kodano.com.br`
3. Configure DNS conforme instruções da Netlify

---

## Opção 3: Servidor próprio (VPS)

### Requisitos
- Node.js 18+ instalado
- PM2 para gerenciar processos
- Nginx como reverse proxy

### Passo 1: Build do projeto
```bash
npm run build
```

### Passo 2: Instalar PM2
```bash
npm install -g pm2
```

### Passo 3: Iniciar aplicação
```bash
pm2 start npm --name "kodano-website" -- start
pm2 save
pm2 startup
```

### Passo 4: Configurar Nginx
Crie arquivo `/etc/nginx/sites-available/kodano.com.br`:
```nginx
server {
    listen 80;
    server_name kodano.com.br www.kodano.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Passo 5: Habilitar SSL com Let's Encrypt
```bash
sudo certbot --nginx -d kodano.com.br -d www.kodano.com.br
```

---

## Checklist pós-deploy

- [ ] Site carrega corretamente em https://kodano.com.br
- [ ] SSL/HTTPS está funcionando (certificado válido)
- [ ] Todas as rotas funcionam (/produtos, /precos, etc.)
- [ ] Imagens e assets carregam corretamente
- [ ] Formulários funcionam (se houver)
- [ ] SEO está configurado (meta tags, sitemap, robots.txt)
- [ ] Analytics configurado (se usar)
- [ ] Monitoramento de erros configurado

---

## Comandos úteis

### Build local para testar
```bash
npm run build
npm start
```

### Verificar build
```bash
npm run build
# Verifica se há erros antes de fazer deploy
```

### Logs na Vercel
- Dashboard > Deployments > Clique no deployment > Logs

---

## Suporte

- Documentação Vercel: https://vercel.com/docs
- Documentação Next.js: https://nextjs.org/docs/deployment
- Suporte Vercel: https://vercel.com/support

