"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Server,
  AlertTriangle,
  CheckCircle2,
  Globe,
} from "lucide-react";

const certifications = [
  {
    name: "PCI DSS",
    description: "Certificação de segurança para pagamentos",
    status: "Certificado",
  },
  {
    name: "ISO 27001",
    description: "Gestão de segurança da informação",
    status: "Certificado",
  },
  {
    name: "LGPD Compliant",
    description: "Total conformidade com LGPD brasileira",
    status: "Conforme",
  },
  {
    name: "SOC 2 Type II",
    description: "Auditoria de controles de segurança",
    status: "Em processo",
  },
];

const features = [
  {
    icon: Lock,
    title: "Criptografia ponta a ponta",
    description:
      "Todos os dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256).",
  },
  {
    icon: Shield,
    title: "Proteção contra fraudes",
    description:
      "Machine learning avançado detecta e previne transações fraudulentas em tempo real.",
  },
  {
    icon: Eye,
    title: "Monitoramento 24/7",
    description:
      "Nossa equipe de segurança monitora a plataforma continuamente em busca de ameaças.",
  },
  {
    icon: FileCheck,
    title: "Auditorias regulares",
    description:
      "Auditorias de segurança internas e externas trimestralmente.",
  },
  {
    icon: Server,
    title: "Infraestrutura redundante",
    description:
      "Múltiplos data centers com backup automático e disaster recovery.",
  },
  {
    icon: AlertTriangle,
    title: "Detecção de anomalias",
    description:
      "Sistemas automatizados identificam comportamentos suspeitos instantaneamente.",
  },
];

const practices = [
  "Tokenização de dados de cartão",
  "3D Secure 2.0 automático",
  "Autenticação de dois fatores (2FA)",
  "Controle de acesso baseado em funções",
  "Logs de auditoria completos",
  "Análise de vulnerabilidades",
  "Testes de penetração periódicos",
  "Política de divulgação responsável",
  "Treinamento de segurança do time",
  "Resposta a incidentes 24/7",
];

export default function SegurancaPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6">
              Segurança{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002A35] via-[#004A5A] to-[#002A35] bg-[length:200%_100%] animate-gradient">
                de nível bancário
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Protegemos seus dados e transações com os mais altos padrões de
              segurança da indústria.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              Certificações e compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="border-border text-center">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-12 w-12 text-accent mx-auto mb-4" />
                    <Badge className="mb-3" variant="secondary">
                      {cert.status}
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              Como protegemos seus dados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-border hover:border-accent transition-all"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex p-3 rounded-lg bg-accent/10 mb-4">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              Práticas de segurança
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practices.map((practice, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-foreground">{practice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-12 text-center">
              Infraestrutura global
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border text-center">
                <CardContent className="pt-6">
                  <Server className="h-12 w-12 text-accent mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    5
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    Data Centers
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Distribuídos globalmente
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border text-center">
                <CardContent className="pt-6">
                  <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">
                    0
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">
                    Violações de dados
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Desde nossa fundação
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-border">
              <CardHeader>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-4">
                  Divulgação responsável
                </h2>
                <p className="text-lg text-muted-foreground">
                  Encontrou uma vulnerabilidade de segurança? Temos um programa
                  de bug bounty ativo.
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-accent/5 p-6 rounded-lg">
                  <p className="text-foreground mb-4">
                    Entre em contato com nossa equipe de segurança:
                  </p>
                  <code className="text-accent font-mono">
                    security@kodano.com
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Respondemos a todas as submissões em até 24 horas e oferecemos
                  recompensas para vulnerabilidades válidas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
