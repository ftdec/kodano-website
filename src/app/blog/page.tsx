import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights sobre pagamentos, segurança, compliance e tendências do mercado de alto valor.",
};

export default function BlogPage() {
  // Placeholder posts - estrutura pronta para CMS
  const posts = [
    {
      slug: "fraude-alto-valor",
      title: "Por que transações de alto valor são alvos de fraude sofisticada",
      excerpt: "Entenda como fraudadores operam em verticais premium e quais são as vulnerabilidades mais exploradas.",
      category: "Segurança",
      date: "Em breve",
      readTime: "5 min",
    },
    {
      slug: "verificacao-identidade-pagamentos",
      title: "Verificação de identidade no fluxo de pagamento: prós e contras",
      excerpt: "Análise técnica das diferentes abordagens para confirmar quem está pagando antes da aprovação.",
      category: "Tecnologia",
      date: "Em breve",
      readTime: "7 min",
    },
    {
      slug: "chargebacks-turismo",
      title: "Chargebacks no turismo: como agências de viagem podem se proteger",
      excerpt: "Estratégias práticas para reduzir contestações em vendas de pacotes de alto valor.",
      category: "Segmentos",
      date: "Em breve",
      readTime: "6 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass glass-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold">Kodano</span>
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-all"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-radial" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Insights sobre{" "}
                <span className="gradient-text">pagamentos</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Conteúdo sobre segurança, compliance, tecnologia e tendências 
                do mercado de transações de alto valor.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Em construção</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Estamos preparando conteúdo relevante para você. 
                Enquanto isso, confira os artigos que estão por vir.
              </p>
            </div>
          </div>
        </section>

        {/* Posts Preview */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-8">Próximos artigos</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 gradient-radial" />
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Quer ser avisado quando publicarmos?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Entre em contato e cadastre-se para receber novidades.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Entrar em Contato
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kodano
          </p>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Voltar ao início
          </Link>
        </div>
      </footer>
    </div>
  );
}

