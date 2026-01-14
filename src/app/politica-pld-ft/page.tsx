"use client";

import { PolicyPage } from "@/components/policies/PolicyPage";

const sections = [
  {
    title: "Objetivo",
    content: "Esta Política estabelece as diretrizes adotadas pela Kodano Tecnologia da Informação Ltda (\"Kodano\") para prevenir, mitigar e cooperar no combate à lavagem de dinheiro e ao financiamento do terrorismo, de forma compatível com seu modelo de atuação como empresa de tecnologia."
  },
  {
    title: "Escopo e Aplicabilidade",
    content: "Esta política aplica-se a sócios, administradores, colaboradores, prestadores de serviços e parceiros tecnológicos da Kodano. O documento refere-se exclusivamente às atividades tecnológicas e operacionais desempenhadas pela Kodano, sendo complementar — e não substitutivo — às políticas de PLD/FT de parceiros financeiros regulados com os quais a Kodano venha a se integrar."
  },
  {
    title: "Base Legal e Normativa",
    content: [
      "Lei nº 9.613, de 3 de março de 1998 (Lei de Prevenção à Lavagem de Dinheiro)",
      "Recomendações do Grupo de Ação Financeira Internacional (GAFI/FATF)",
      "Normas e orientações emitidas por autoridades regulatórias brasileiras, quando aplicáveis aos parceiros regulados da Kodano",
      "Lei nº 13.709, de 14 de agosto de 2018 (Lei Geral de Proteção de Dados – LGPD), no que se refere ao tratamento de dados pessoais para fins de prevenção a ilícitos",
      "Princípios de abordagem baseada em risco (Risk-Based Approach)"
    ]
  },
  {
    title: "Definições",
    content: [
      "Lavagem de Dinheiro: Conjunto de operações destinadas a ocultar ou dissimular a origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes de infração penal.",
      "Financiamento do Terrorismo: Provisão, coleta ou movimentação de recursos com a finalidade de apoiar atos terroristas ou organizações terroristas.",
      "KYC (Know Your Customer): Procedimentos de identificação e verificação de clientes.",
      "KYB (Know Your Business): Procedimentos de identificação e verificação de pessoas jurídicas.",
      "Beneficiário Final: Pessoa natural que, em última instância, possui, controla ou exerce influência significativa sobre uma pessoa jurídica.",
      "Pessoa Politicamente Exposta (PPE): Pessoa que exerce ou exerceu função pública relevante, conforme definição legal.",
      "Parceiro Financeiro Regulado: Instituição autorizada ou regulada pelos órgãos competentes, responsável pela execução de atividades financeiras.",
      "Abordagem Baseada em Risco: Metodologia que direciona controles e monitoramentos conforme o nível de risco identificado."
    ]
  },
  {
    title: "Modelo de Negócio e Arranjos com Parceiros Regulados",
    content: "A Kodano atua como empresa de tecnologia (SaaS), sendo responsável pelo desenvolvimento, operação e manutenção de soluções de orquestração tecnológica de pagamentos e serviços financeiros, por meio de integrações sistêmicas com instituições financeiras e de pagamento devidamente reguladas. A Kodano não atua como instituição financeira, não executa atividades próprias de instituições autorizadas e não realiza custódia ou liquidação de recursos por conta própria. A atuação da Kodano ocorre de forma estritamente tecnológica e operacional, por meio de integrações via APIs e sistemas, podendo iniciar, processar ou orquestrar instruções operacionais, sempre sob governança, autorização e controle do parceiro financeiro regulado."
  },
  {
    title: "Abordagem Baseada em Risco",
    content: [
      "Perfil dos clientes corporativos atendidos",
      "Natureza e complexidade das operações",
      "Setores econômicos envolvidos",
      "Jurisdições impactadas",
      "Exposição indireta a riscos financeiros"
    ]
  },
  {
    title: "Classificação de Risco de Clientes e Operações",
    content: [
      "Baixo Risco: Clientes com perfil tradicional, atividades econômicas tradicionais, operações predominantemente nacionais e histórico compatível com o uso da plataforma.",
      "Médio Risco: Clientes com volumes mais elevados, operações complexas ou setores que demandem maior atenção, sem indícios relevantes de irregularidade.",
      "Alto Risco: Situações que envolvam estruturas societárias complexas, jurisdições sensíveis, padrões atípicos de uso ou outros fatores que justifiquem monitoramento reforçado."
    ]
  },
  {
    title: "Procedimentos de KYC/KYB",
    content: [
      "Coleta de informações societárias básicas",
      "Identificação declaratória de beneficiários finais",
      "Avaliação de aderência do cliente ao modelo de negócio",
      "Análise preliminar de risco reputacional"
    ]
  },
  {
    title: "Procedimentos de Diligência Inicial",
    content: [
      "Coleta e validação de informações cadastrais do cliente",
      "Verificação de coerência entre a atividade declarada e o uso esperado da plataforma",
      "Avaliação de fontes públicas e bases disponíveis",
      "Identificação e declaração do beneficiário final",
      "Declaração formal quanto à inexistência de sanções ou restrições conhecidas"
    ]
  },
  {
    title: "Monitoramento e Alertas",
    content: [
      "Consistência das transações processadas",
      "Identificação de padrões atípicos de uso da plataforma",
      "Detecção de comportamentos anômalos sob a ótica tecnológica"
    ]
  },
  {
    title: "Monitoramento Contínuo de Operações",
    content: [
      "Evolução de volumes transacionados",
      "Frequência e recorrência das operações",
      "Alterações relevantes no comportamento de uso da plataforma",
      "Inclusão de novos produtos, fluxos ou funcionalidades"
    ]
  },
  {
    title: "Escalonamento e Comunicação Interna",
    content: [
      "Registro interno do evento identificado",
      "Avaliação preliminar pelo responsável designado",
      "Comunicação ao parceiro financeiro regulado, quando aplicável",
      "Adoção de medidas tecnológicas cabíveis, como limitação, suspensão ou encerramento do acesso à plataforma"
    ]
  },
  {
    title: "Comunicação de Operações Suspeitas",
    content: "Sempre que identificados indícios relevantes, a Kodano comunicará o parceiro financeiro regulado, responsável pelo reporte às autoridades competentes, conforme legislação aplicável."
  },
  {
    title: "Registro e Retenção de Dados",
    content: "A Kodano mantém registros relacionados a processos de onboarding, monitoramento, incidentes e comunicações relevantes, observando prazos mínimos de retenção exigidos pela legislação aplicável ou acordados contratualmente com parceiros regulados. Os registros são armazenados de forma segura, com controles de acesso adequados."
  },
  {
    title: "Governança",
    content: "A Kodano mantém responsável interno designado para temas de compliance e PLD/FT, atuando como ponto focal com parceiros regulados e assegurando a aplicação desta política."
  },
  {
    title: "Limites de Atuação",
    content: [
      "Não exerce atividades privativas de instituições financeiras",
      "Não executa decisões regulatórias finais",
      "Não realiza reportes diretos a autoridades como o COAF",
      "Atua de forma cooperativa com parceiros financeiros regulados, que permanecem responsáveis pelas obrigações regulatórias aplicáveis"
    ]
  },
  {
    title: "Treinamento e Conscientização",
    content: "Os colaboradores envolvidos em atividades sensíveis recebem treinamento e orientação compatíveis com suas funções e responsabilidades."
  },
  {
    title: "Medidas Disciplinares",
    content: [
      "Advertência",
      "Suspensão de acessos",
      "Encerramento de relacionamento contratual",
      "Outras medidas cabíveis, conforme políticas internas e legislação aplicável"
    ]
  },
  {
    title: "Revisão",
    content: "Esta política será revisada anualmente ou sempre que houver alterações relevantes no modelo de negócio, parcerias ou ambiente regulatório."
  },
  {
    title: "Disposições Finais",
    content: "A Kodano reafirma seu compromisso com ética, transparência e conformidade, atuando de forma cooperativa com parceiros financeiros regulados, dentro dos limites de sua atuação como empresa de tecnologia."
  },
  {
    title: "Declaração Final",
    content: "A Kodano reafirma seu compromisso com a integridade, ética e prevenção de ilícitos, adotando postura proativa e responsável no desenvolvimento e operação de suas soluções tecnológicas, em cooperação com parceiros financeiros e em conformidade com a legislação aplicável."
  }
];

export default function PoliticaPLDFTPage() {
  return (
    <PolicyPage
      title="Política de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo (PLD/FT)"
      subtitle="Kodano Tecnologia da Informação LTDA"
      year="2025"
      sections={sections}
    />
  );
}

