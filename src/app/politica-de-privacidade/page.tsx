"use client";

import { PolicyPage } from "@/components/policies/PolicyPage";

const sections = [
  {
    title: "Objetivo",
    content: "Esta Política de Privacidade e Proteção de Dados Pessoais (\"Política\") estabelece as diretrizes, princípios, responsabilidades e procedimentos adotados pela Kodano Tecnologia da Informação LTDA (\"Kodano\") para o tratamento de dados pessoais, em conformidade com a Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD) e demais normas aplicáveis. A Kodano reafirma seu compromisso com a privacidade, a proteção de dados pessoais, a segurança da informação e a transparência no tratamento de dados, em linha com as melhores práticas nacionais e internacionais."
  },
  {
    title: "Abrangência",
    content: [
      "Clientes Pessoa Jurídica (PJ)",
      "Sócios, administradores, representantes legais e beneficiários finais",
      "Usuários autorizados a operar a plataforma",
      "Parceiros comerciais e tecnológicos",
      "Colaboradores, prestadores de serviços e candidatos"
    ]
  },
  {
    title: "Definições",
    content: [
      "Dados Pessoais: Informação relacionada a pessoa natural identificada ou identificável.",
      "Dados Pessoais Sensíveis: Dados sobre origem racial ou étnica, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico.",
      "Titular: Pessoa natural a quem se referem os dados pessoais.",
      "Tratamento: Toda operação realizada com dados pessoais.",
      "Controlador: Pessoa responsável pelas decisões referentes ao tratamento de dados pessoais.",
      "Operador: Pessoa que realiza o tratamento de dados pessoais em nome do controlador.",
      "Encarregado (DPO): Pessoa indicada para atuar como canal de comunicação entre controlador, titulares e a Autoridade Nacional de Proteção de Dados (ANPD)."
    ]
  },
  {
    title: "Papéis no Tratamento de Dados",
    content: "A Kodano poderá atuar, conforme o contexto: como Controladora, quando define as finalidades e meios do tratamento de dados pessoais; como Operadora, quando realiza o tratamento de dados em nome de clientes ou parceiros, conforme diretrizes contratuais. As responsabilidades são exercidas de forma clara, documentada e compatível com cada papel desempenhado."
  },
  {
    title: "Princípios do Tratamento de Dados",
    content: [
      "Finalidade",
      "Adequação",
      "Necessidade",
      "Livre acesso",
      "Qualidade dos dados",
      "Transparência",
      "Segurança",
      "Prevenção",
      "Não discriminação",
      "Responsabilização e prestação de contas"
    ]
  },
  {
    title: "Tipos de Dados Pessoais Tratados",
    content: [
      "Dados cadastrais (nome, CPF, e-mail, telefone, endereço)",
      "Dados societários e empresariais",
      "Dados de identificação de beneficiários finais",
      "Dados de autenticação e acesso à plataforma",
      "Dados técnicos e operacionais (logs, IP, registros de acesso, eventos de segurança)"
    ]
  },
  {
    title: "Finalidades do Tratamento",
    content: [
      "Onboarding, cadastro e manutenção do relacionamento com clientes e parceiros",
      "Cumprimento de obrigações legais, regulatórias e contratuais",
      "Prevenção à fraude, lavagem de dinheiro e outros ilícitos",
      "Operação, segurança, estabilidade e melhoria contínua da plataforma",
      "Atendimento a solicitações dos titulares",
      "Exercício regular de direitos em processos administrativos, judiciais ou arbitrais"
    ]
  },
  {
    title: "Bases Legais para o Tratamento",
    content: [
      "Cumprimento de obrigação legal ou regulatória",
      "Execução de contrato ou de procedimentos preliminares",
      "Exercício regular de direitos",
      "Legítimo interesse, observados os direitos e liberdades dos titulares",
      "Consentimento, quando exigido"
    ]
  },
  {
    title: "Compartilhamento de Dados Pessoais",
    content: "A Kodano poderá compartilhar dados pessoais, de forma limitada e segura, com: fornecedores e parceiros tecnológicos essenciais à operação; instituições financeiras e parceiros regulados, quando necessário à prestação dos serviços; autoridades públicas, mediante obrigação legal ou regulatória. Todo compartilhamento observa critérios de necessidade, proporcionalidade e segurança da informação."
  },
  {
    title: "Transferência Internacional de Dados",
    content: "Quando aplicável, a Kodano poderá realizar transferência internacional de dados pessoais, assegurando: observância dos mecanismos legais previstos na LGPD; garantias contratuais adequadas; nível de proteção compatível com o exigido pela legislação brasileira."
  },
  {
    title: "Segurança da Informação",
    content: [
      "Políticas internas de segurança da informação",
      "Controles de acesso lógico e físico",
      "Criptografia e segregação de ambientes, quando aplicável",
      "Monitoramento e registro de acessos",
      "Treinamento periódico de colaboradores"
    ]
  },
  {
    title: "Retenção e Eliminação de Dados",
    content: "Os dados pessoais são armazenados pelo período necessário ao cumprimento das finalidades do tratamento, observadas obrigações legais, regulatórias e contratuais. Após o término do prazo aplicável, os dados são eliminados, anonimizados ou bloqueados de forma segura."
  },
  {
    title: "Direitos dos Titulares",
    content: [
      "Confirmação da existência de tratamento",
      "Acesso aos dados pessoais",
      "Correção de dados incompletos, inexatos ou desatualizados",
      "Anonimização, bloqueio ou eliminação",
      "Portabilidade, quando aplicável",
      "Revogação do consentimento"
    ]
  },
  {
    title: "Encarregado de Proteção de Dados (DPO)",
    content: "A Kodano mantém Encarregado de Proteção de Dados (DPO) designado, responsável por: atuar como canal de comunicação com titulares e a ANPD; orientar colaboradores e parceiros; monitorar a conformidade com a LGPD. As informações de contato do DPO são disponibilizadas por meios institucionais."
  },
  {
    title: "Gestão de Incidentes de Segurança",
    content: "Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a Kodano adotará medidas imediatas de contenção e mitigação e, quando aplicável, realizará comunicação à ANPD e aos titulares afetados, nos termos da LGPD."
  },
  {
    title: "Governança, Treinamento e Conscientização",
    content: [
      "Definição clara de responsabilidades",
      "Treinamento periódico de colaboradores",
      "Revisão contínua de processos e controles"
    ]
  },
  {
    title: "Atualização da Política",
    content: "Esta Política poderá ser atualizada a qualquer tempo para refletir alterações legais, regulatórias, tecnológicas ou operacionais, sendo a versão mais recente sempre disponibilizada pelos canais institucionais."
  },
  {
    title: "Disposições Finais",
    content: "A Kodano reafirma seu compromisso com a privacidade, a proteção de dados pessoais, a ética e a transparência, adotando práticas alinhadas à legislação aplicável e compatíveis com seu modelo de atuação como empresa de tecnologia."
  }
];

export default function PoliticaPrivacidadePage() {
  return (
    <PolicyPage
      title="Política de Privacidade e Proteção de Dados Pessoais (LGPD)"
      subtitle="Kodano Tecnologia da Informação LTDA"
      year="2026"
      sections={sections}
    />
  );
}

