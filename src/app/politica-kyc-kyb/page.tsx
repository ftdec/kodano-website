"use client";

import { PolicyPage } from "@/components/policies/PolicyPage";

const sections = [
  {
    title: "Objetivo",
    content: "Esta Política de KYC/KYB estabelece as diretrizes, procedimentos e controles adotados pela Kodano Tecnologia da Informação LTDA (\"Kodano\") para identificação, verificação, validação e monitoramento de seus clientes, parceiros e usuários, em conformidade com a legislação aplicável, boas práticas de mercado e padrões de governança corporativa. A Política tem como finalidade mitigar riscos relacionados à lavagem de dinheiro, financiamento do terrorismo, fraudes, ilícitos financeiros e riscos reputacionais, de forma compatível com a atuação da Kodano como empresa de tecnologia."
  },
  {
    title: "Abrangência",
    content: [
      "Clientes Pessoa Jurídica (PJ) atendidos pela Kodano",
      "Sócios, administradores, representantes legais e beneficiários finais dos clientes",
      "Usuários autorizados a operar a plataforma",
      "Parceiros comerciais e tecnológicos, quando aplicável"
    ]
  },
  {
    title: "Princípios Gerais",
    content: [
      "Conhecimento efetivo dos clientes",
      "Identificação de beneficiários finais",
      "Verificação de atividade econômica",
      "Avaliação de risco proporcional ao perfil e às operações do cliente",
      "Atualização contínua das informações cadastrais",
      "Transparência, rastreabilidade e auditabilidade dos processos",
      "Segregação de responsabilidades e controles compatíveis com o modelo tecnológico"
    ]
  },
  {
    title: "Perfil de Clientes Atendidos",
    content: "A Kodano atende predominantemente clientes Pessoa Jurídica, formalmente constituídos, que operam de forma lícita e compatível com o uso de soluções tecnológicas de pagamentos e serviços financeiros. De forma geral, o perfil inclui empresas que realizam operações de ticket médio elevado, com menor volume de transações, atuando em segmentos de serviços, bens de alto valor e operações premium. A Kodano não atende: pessoas físicas como clientes finais; atividades ilícitas ou incompatíveis com seu modelo de negócio; empresas sem estrutura societária ou documentação válida."
  },
  {
    title: "Processo de KYC – Pessoa Jurídica (KYB)",
    content: "No onboarding, são coletadas informações cadastrais e documentação exigida para validação.",
    subsections: [
      {
        title: "Coleta de Informações Cadastrais",
        content: [
          "Razão social, nome fantasia e CNPJ",
          "Endereço da sede e canais de contato oficiais",
          "Objeto social e CNAE",
          "Estrutura societária completa",
          "Identificação dos administradores e representantes legais",
          "Identificação dos beneficiários finais"
        ]
      },
      {
        title: "Documentação Exigida",
        content: [
          "Contrato social e alterações",
          "Cartão CNPJ",
          "Documentos de identificação dos sócios e administradores",
          "Comprovante de endereço",
          "Declaração de beneficiário final",
          "Informações bancárias vinculadas à operação"
        ]
      },
      {
        title: "Beneficiário Final",
        content: "A Kodano identifica e valida o beneficiário final, entendido como a pessoa natural que, direta ou indiretamente: detém participação relevante no capital social, ou exerce controle ou influência significativa sobre a pessoa jurídica. Estruturas societárias complexas são analisadas até a identificação do último CPF controlante."
      }
    ]
  },
  {
    title: "KYC de Pessoas Físicas Relacionadas",
    content: [
      "Nome completo",
      "CPF",
      "Documento oficial com foto",
      "Comprovante de endereço",
      "Verificação em listas restritivas e bases públicas"
    ]
  },
  {
    title: "Classificação de Risco",
    content: [
      "Atividade econômica",
      "Estrutura societária",
      "Volume financeiro esperado",
      "Jurisdição",
      "Histórico operacional",
      "Exposição política"
    ]
  },
  {
    title: "Pessoas Politicamente Expostas (PEP / PPE)",
    content: "A Kodano identifica se sócios, administradores ou beneficiários finais são Pessoas Politicamente Expostas, conforme definição legal. Nos casos identificados, são aplicados: controles adicionais; aprovação reforçada; monitoramento contínuo."
  },
  {
    title: "Validação e Verificação das Informações",
    content: "As informações coletadas são: verificadas em bases públicas e privadas; confrontadas com listas restritivas e sancionatórias; avaliadas por processos manuais e automatizados. A Kodano poderá utilizar fornecedores especializados para apoio à verificação."
  },
  {
    title: "Atualização Cadastral (KYC Contínuo)",
    content: "Os dados cadastrais devem ser mantidos atualizados, sendo obrigatória a comunicação de alterações relevantes, incluindo: mudanças societárias; alterações na atividade econômica; modificações no padrão operacional. A Kodano poderá solicitar revalidação cadastral periodicamente."
  },
  {
    title: "Monitoramento e Tratamento de Inconsistências",
    content: [
      "Solicitação de esclarecimentos",
      "Suspensão temporária da operação",
      "Encerramento do relacionamento contratual"
    ]
  },
  {
    title: "Integração com a Política de PLD/FT",
    content: "Esta Política de KYC/KYB é complementar à Política de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo (PLD/FT) da Kodano, servindo como base para avaliação de risco, monitoramento e tomada de decisão."
  },
  {
    title: "Armazenamento e Proteção de Dados",
    content: "As informações são armazenadas de forma segura, com acesso restrito, em conformidade com a legislação de proteção de dados pessoais (LGPD)."
  },
  {
    title: "Governança e Responsabilidades",
    content: "A responsabilidade pela implementação, manutenção e cumprimento desta Política é da Diretoria da Kodano, com apoio das áreas Jurídica, Compliance e Tecnologia, conforme aplicável."
  },
  {
    title: "Medidas Administrativas",
    content: "O descumprimento desta Política poderá resultar na aplicação de medidas administrativas internas, incluindo advertências, suspensão de acessos ou encerramento de relacionamento com clientes e parceiros, conforme a gravidade do caso."
  },
  {
    title: "Revisão e Atualização",
    content: "Esta Política poderá ser revisada a qualquer tempo para refletir mudanças regulatórias, operacionais ou de mercado, independentemente de aviso prévio."
  },
  {
    title: "Disposições Finais",
    content: "A Kodano reafirma seu compromisso com ética, integridade, transparência e conformidade, adotando práticas de KYC/KYB compatíveis com seu modelo de atuação como empresa de tecnologia integrada a parceiros regulados."
  }
];

export default function PoliticaKYCKYBPage() {
  return (
    <PolicyPage
      title="Política de KYC/KYB"
      subtitle="Know Your Customer / Know Your Business — Kodano Tecnologia da Informação LTDA"
      year="2025"
      sections={sections}
    />
  );
}

