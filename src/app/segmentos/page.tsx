import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Plane, Building2, Briefcase, AlertTriangle, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Segmentos",
  description: "Soluções Kodano para verticais de alto valor: automotivo, turismo premium, imobiliário e serviços especializados.",
};

export default function SegmentosPage() {
  const segments = [
    {
      id: "automotivo",
      icon: Car,
      title: "Automotivo",
      scenario: "Concessionárias, locadoras e oficinas que operam com valores elevados em vendas, manutenção e serviços. Transações podem variar de R$5.000 a R$500.000+.",
      risk: "Fraudadores utilizam cartões roubados ou identidades falsas para adquirir veículos ou pagar serviços premium. Chargebacks representam perda total do bem ou serviço prestado.",
      solution: "Verificação de identidade proporcional ao valor. Para tickets acima de R$10.000, biometria facial vinculada ao documento. Para valores extremos, verificação documental completa.",
      results: [
        "Redução de 95% em fraudes de alto valor",
        "Evidências para 100% das contestações",
        "Aprovação segura mesmo em vendas remotas",
        "Integração com DMS e sistemas de gestão",
      ],
    },
    {
      id: "turismo",
      icon: Plane,
      title: "Turismo Premium",
      scenario: "Agências especializadas em viagens sob medida, cruzeiros de luxo e experiências exclusivas. Ticket médio de R$20.000 a R$200.000 por pacote.",
      risk: "Fraudes em turismo têm alta taxa de sucesso devido à natureza do serviço: pagamento antecipado, entrega futura, difícil reversão. Chargebacks após a viagem são comuns.",
      solution: "Verificação no momento da reserva, antes do pagamento. Confirmação de que o titular do cartão é realmente quem está contratando o serviço.",
      results: [
        "Zero chargebacks em transações verificadas",
        "Venda remota com segurança presencial",
        "Documentação completa para contestações",
        "Fluxo de verificação white-label",
      ],
    },
    {
      id: "imobiliario",
      icon: Building2,
      title: "Imobiliário",
      scenario: "Imobiliárias, administradoras e incorporadoras que recebem pagamentos de locação, sinais e parcelas de alto valor. Transações de R$10.000 a R$1.000.000+.",
      risk: "Fraude imobiliária é sofisticada: documentos falsos, identidades roubadas, golpes de locação. Prejuízos envolvem não apenas o valor, mas também questões jurídicas complexas.",
      solution: "Verificação KYC completa para contratos de alto valor. Confirmação de identidade, validação documental e prova de consentimento armazenada.",
      results: [
        "Compliance com regulamentações do setor",
        "Prova de identidade em 100% dos contratos",
        "Redução de inadimplência por fraude",
        "Integração com sistemas imobiliários",
      ],
    },
    {
      id: "servicos",
      icon: Briefcase,
      title: "Serviços de Alto Valor",
      scenario: "Consultorias, escritórios de advocacia, clínicas especializadas e prestadores de serviços premium. Honorários de R$5.000 a R$500.000.",
      risk: "Serviços profissionais frequentemente recebem via cartão para honorários elevados. Contestações após a prestação do serviço são difíceis de defender sem evidências adequadas.",
      solution: "Verificação no momento do pagamento com documentação que comprova a autorização do titular. Evidências vinculadas ao contrato de prestação de serviço.",
      results: [
        "Defesa robusta em contestações",
        "Evidências admissíveis juridicamente",
        "Redução de litígios relacionados a pagamento",
        "Processo de pagamento profissional",
      ],
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
              Agendar Demo
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
                Segmentos
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6 leading-tight">
                Soluções para{" "}
                <span className="gradient-text">alto valor</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Verticais que operam com tickets elevados exigem segurança proporcional. 
                Cada segmento tem seus riscos específicos — e suas soluções.
              </p>
            </div>
          </div>
        </section>

        {/* Segments */}
        {segments.map((segment, index) => (
          <section
            key={segment.id}
            id={segment.id}
            className={`py-24 lg:py-32 relative scroll-mt-20 ${
              index % 2 === 1 ? "bg-gradient-to-b from-transparent via-card/50 to-transparent" : ""
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Left column */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <segment.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold">{segment.title}</h2>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-xs text-blue-400">1</span>
                        </span>
                        Cenário
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{segment.scenario}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Risco
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{segment.risk}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Como a Kodano resolve
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{segment.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="lg:pt-20">
                  <div className="p-8 rounded-2xl bg-card border border-white/5">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Resultados Esperados
                    </h3>
                    <ul className="space-y-4">
                      {segment.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <Link
                        href="/contato"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        Falar sobre {segment.title.toLowerCase()}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 gradient-radial" />
          
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Seu segmento não está listado?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              A Kodano atende qualquer vertical que opere com tickets elevados. 
              Fale com nosso time para entender como podemos ajudar.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary-hover transition-all group"
            >
              Conversar com Especialista
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

