"use client";

import { PolicyPage } from "@/components/policies/PolicyPage";

const sections = [
  {
    title: "Objetivo",
    content: "Esta Política de Segurança da Informação e Cibersegurança (\"Política\") estabelece os princípios, diretrizes e controles adotados pela Kodano Tecnologia da Informação LTDA (\"Kodano\") para proteger informações, dados, sistemas e ativos tecnológicos contra acessos não autorizados, incidentes de segurança, vazamentos, perdas, alterações indevidas e indisponibilidade. A Kodano reafirma seu compromisso com a confidencialidade, integridade e disponibilidade da informação, alinhando-se às melhores práticas de mercado e padrões reconhecidos de segurança da informação."
  },
  {
    title: "Abrangência",
    content: [
      "Dados e informações sob responsabilidade da Kodano",
      "Sistemas, aplicações, APIs e infraestrutura tecnológica",
      "Colaboradores, sócios, administradores e prestadores de serviços",
      "Parceiros tecnológicos e fornecedores, quando aplicável"
    ]
  },
  {
    title: "Princípios de Segurança da Informação",
    content: [
      "Confidencialidade: Proteção de informações contra acessos não autorizados",
      "Integridade: Garantia de exatidão e completude das informações",
      "Disponibilidade: Acesso à informação sempre que necessário",
      "Rastreabilidade: Registro e auditoria de acessos e operações",
      "Segregação de funções: Minimização de riscos operacionais"
    ]
  },
  {
    title: "Governança de Segurança da Informação",
    content: "A Kodano mantém estrutura de governança para segurança da informação, com responsabilidades atribuídas à Diretoria Executiva e às áreas de Tecnologia, Compliance e Jurídico, conforme aplicável. As políticas, normas e procedimentos de segurança são revisados periodicamente e comunicados às partes envolvidas."
  },
  {
    title: "Classificação da Informação",
    content: [
      "Pública",
      "Uso Interno",
      "Confidencial",
      "Restrita"
    ]
  },
  {
    title: "Controle de Acesso",
    content: [
      "Autenticação individual e intransferível",
      "Gestão de credenciais e permissões",
      "Revisão periódica de acessos",
      "Revogação imediata de acessos em desligamentos ou mudanças de função"
    ]
  },
  {
    title: "Segurança de Sistemas e Infraestrutura",
    content: [
      "Ambientes segregados (produção, homologação e desenvolvimento)",
      "Monitoramento contínuo de sistemas e aplicações",
      "Atualizações e correções de segurança (patch management)",
      "Proteção contra vulnerabilidades conhecidas",
      "Uso de serviços de nuvem com padrões elevados de segurança"
    ]
  },
  {
    title: "Segurança no Desenvolvimento de Software",
    content: [
      "Adoção de boas práticas de desenvolvimento seguro",
      "Revisões de código",
      "Testes de segurança e validações",
      "Controle de versões e mudanças",
      "Segregação de ambientes"
    ]
  },
  {
    title: "Proteção de Dados e Criptografia",
    content: [
      "Criptografia de dados em trânsito",
      "Criptografia de dados em repouso",
      "Mascaramento e anonimização, quando pertinente"
    ]
  },
  {
    title: "Monitoramento e Registro de Eventos (Logs)",
    content: [
      "Logs de acesso",
      "Logs de autenticação",
      "Registros de operações críticas",
      "Eventos de segurança"
    ]
  },
  {
    title: "Gestão de Incidentes de Segurança",
    content: [
      "Identificação e registro do incidente",
      "Avaliação de impacto e risco",
      "Adoção de medidas de contenção e mitigação",
      "Comunicação interna adequada",
      "Comunicação a parceiros, autoridades e titulares, quando aplicável"
    ]
  },
  {
    title: "Continuidade de Negócios e Recuperação de Desastres",
    content: [
      "Procedimentos de backup periódico",
      "Planos de recuperação de desastres",
      "Testes periódicos de disponibilidade dos sistemas"
    ]
  },
  {
    title: "Gestão de Fornecedores e Terceiros",
    content: [
      "Atender a requisitos mínimos de segurança da informação",
      "Assinar cláusulas contratuais de confidencialidade e segurança",
      "Estar sujeitos a avaliações periódicas de risco"
    ]
  },
  {
    title: "Conscientização e Treinamento",
    content: [
      "Treinamentos periódicos",
      "Orientações internas",
      "Divulgação de boas práticas"
    ]
  },
  {
    title: "Auditoria e Monitoramento de Conformidade",
    content: [
      "Monitoramento contínuo",
      "Avaliações internas",
      "Auditorias periódicas, quando aplicável"
    ]
  },
  {
    title: "Medidas Disciplinares",
    content: "O descumprimento desta Política poderá resultar em medidas administrativas internas, incluindo advertências, suspensão de acessos ou outras sanções cabíveis, conforme a gravidade."
  },
  {
    title: "Revisão e Atualização",
    content: "Esta Política será revisada periodicamente ou sempre que houver alterações relevantes no ambiente tecnológico, regulatório ou operacional."
  },
  {
    title: "Disposições Finais",
    content: "A Kodano reafirma seu compromisso com a segurança da informação, a proteção de dados e a resiliência de seus sistemas, adotando práticas compatíveis com seu modelo de atuação como empresa de tecnologia e alinhadas às melhores práticas de mercado."
  }
];

export default function PoliticaSegurancaInformacaoPage() {
  return (
    <PolicyPage
      title="Política de Segurança da Informação e Cibersegurança"
      subtitle="Kodano Tecnologia da Informação LTDA"
      year="2025"
      sections={sections}
    />
  );
}

