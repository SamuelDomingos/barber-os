# 💈 Barber-OS: Gestão Integrada para Barbearias Modernas

## Abstract (Resumo Técnico)

O projeto Barber-OS aborda o desafio da gestão ineficiente e da experiência do cliente fragmentada em barbearias, um problema comum no setor de serviços de beleza. A lacuna específica que o projeto visa preencher é a falta de uma plataforma unificada que integre funcionalidades de agendamento online, gestão de catálogo de serviços/produtos, administração de equipe e clientes, e personalização da experiência do usuário para múltiplas barbearias. A solução proposta é um sistema web robusto e multi-tenant, desenvolvido com Next.js, que oferece um painel administrativo completo para proprietários e barbeiros, e um portal público personalizável para clientes realizarem agendamentos. A metodologia principal emprega uma arquitetura full-stack com API Routes do Next.js, um ORM Prisma para interações com PostgreSQL, e NextAuth.js para autenticação segura. O frontend é construído com React e Shadcn UI, garantindo uma interface moderna e responsiva. Os resultados esperados incluem a otimização das operações internas da barbearia, a melhoria da satisfação do cliente através de agendamentos facilitados e uma experiência de usuário consistente, e a capacidade de escalar para atender a múltiplas unidades de barbearias de forma independente e personalizável. A contribuição central do Barber-OS reside em sua abordagem integrada e personalizável, oferecendo uma ferramenta completa que capacita barbearias a modernizar sua operação e aprimorar o relacionamento com seus clientes.

## Badges Abrangentes

![License](https://img.shields.io/github/license/SamuelDomingos/barber-os?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/SamuelDomingos/barber-os?style=for-the-badge)
![Pull Requests](https://img.shields.io/github/issues-pr/SamuelDomingos/barber-os?style=for-the-badge)
![Top Language](https://img.shields.io/github/languages/top/SamuelDomingos/barber-os?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/SamuelDomingos/barber-os?style=for-the-badge)
![Contributors](https://img.shields.io/github/contributors/SamuelDomingos/barber-os?style=for-the-badge)

## Sumário
*   [Introdução e Motivação](#introdução-e-motivação)
*   [Arquitetura do Sistema](#arquitetura-do-sistema)
    *   [Decisões Arquiteturais Chave](#decisões-arquiteturais-chave)
*   [Decisões de Design Chave](#decisões-de-design-chave)
*   [✨ Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
*   [📂 Estrutura Detalhada do Código-Fonte](#-estrutura-detalhada-do-código-fonte)
*   [📋 Pré-requisitos Avançados](#-pré-requisitos-avançados)
*   [🚀 Guia de Instalação e Configuração Avançada](#-guia-de-instalação-e-configuração-avançada)
*   [⚙️ Uso Avançado e Exemplos](#%EF%B8%8F-uso-avançado-e-exemplos)
*   [🔧 API Reference](#-api-reference-se-aplicável)
*   [🧪 Estratégia de Testes e Qualidade de Código](#-estratégia-de-testes-e-qualidade-de-código)
*   [🚢 Deployment Detalhado e Escalabilidade](#-deployment-detalhado-e-escalabilidade)
*   [🤝 Contribuição (Nível Avançado)](#-contribuição-nível-avançado)
*   [📜 Licença e Aspectos Legais](#-licença-e-aspectos-legais)
*   [📚 Publicações, Artigos e Citações](#-publicações-artigos-e-citações-se-aplicável)
*   [👥 Equipe Principal e Colaboradores Chave](#-equipe-principal-e-colaboradores-chave)
*   [🗺️ Roadmap Detalhado e Visão de Longo Prazo](#%EF%B8%8F-roadmap-detalhado-e-visão-de-longo-prazo)
*   [❓ FAQ (Perguntas Frequentes)](#-faq-perguntas-frequentes)
*   [📞 Contato e Suporte](#-contato-e-suporte)

## Introdução e Motivação

O setor de barbearias e salões de beleza, embora tradicional, enfrenta desafios crescentes na gestão de operações diárias e na otimização da experiência do cliente. A coordenação manual de agendamentos, o controle de estoque de produtos, a gestão da equipe de barbeiros e a manutenção de um catálogo de serviços atualizado consomem tempo valioso e são propensas a erros. Além disso, a ausência de uma plataforma digital integrada para clientes resulta em perda de oportunidades de engajamento e conveniência, elementos cruciais no mercado atual.

Soluções existentes frequentemente carecem de flexibilidade, são excessivamente genéricas ou exigem múltiplos sistemas para cobrir todas as necessidades de uma barbearia. Isso leva a custos operacionais elevados, lacunas na comunicação e uma visão fragmentada do negócio. O Barber-OS surge como uma resposta a essas deficiências, propondo uma plataforma unificada e intuitiva que centraliza todas as operações críticas de uma barbearia.

A proposta de valor única do Barber-OS reside em sua arquitetura multi-tenant, permitindo que múltiplas barbearias operem de forma independente dentro do mesmo sistema, cada uma com sua própria URL (`/[slug]`) e tema visual personalizado. Isso oferece uma solução escalável e adaptável para redes de barbearias ou para o crescimento futuro de uma única unidade. Os principais diferenciais incluem um sistema de agendamento avançado com visualização de calendário rica, um módulo de catálogo flexível para serviços, produtos e pacotes, e dashboards informativos para insights de negócio.

A motivação central para o desenvolvimento do Barber-OS é capacitar proprietários e gerentes de barbearias a modernizar suas operações, reduzir a carga administrativa e focar no que realmente importa: oferecer um serviço excepcional aos seus clientes. Os objetivos de longo prazo incluem a expansão das funcionalidades para incluir integrações de pagamento, sistemas de fidelidade, e análises preditivas, visando um impacto transformador na eficiência e rentabilidade do setor.

## Arquitetura do Sistema

O Barber-OS adota uma arquitetura full-stack baseada no framework Next.js, que permite o desenvolvimento de funcionalidades de frontend e backend (API Routes) em um único projeto. Essa escolha simplifica o deployment e a manutenção, ao mesmo tempo em que oferece alta performance e escalabilidade.

### Decisões Arquiteturais Chave

1.  **Next.js App Router (Full-Stack Monorepo):**
    *   **Justificativa:** A escolha do App Router do Next.js permite consolidar o frontend (React) e o backend (API Routes) em uma única codebase. Isso simplifica o gerenciamento de dependências, o deployment e a consistência de tipos entre frontend e backend (com TypeScript). A renderização no servidor (SSR/RSC) e a geração de sites estáticos (SSG) oferecem benefícios de performance, SEO e experiência do usuário.
    *   **Trade-offs:** Pode levar a um monólito mais denso em comparação com microserviços, mas para um MVP e um sistema com escopo inicial bem definido, os ganhos em agilidade de desenvolvimento e simplicidade superam a complexidade adicional de uma arquitetura distribuída.

2.  **Arquitetura Multi-tenant Baseada em `[slug]`:**
    *   **Justificativa:** Cada barbearia possui uma URL única (`/[slug]`) e pode ter configurações e temas visuais distintos. Essa abordagem permite que o sistema escale para atender a várias barbearias de forma isolada, mas dentro da mesma aplicação, otimizando recursos e manutenção.
    *   **Trade-offs:** Exige um gerenciamento cuidadoso do contexto do `slug` em todas as camadas da aplicação (frontend, API, banco de dados) para garantir que os dados sejam corretamente isolados por barbearia.

3.  **Prisma ORM com PostgreSQL:**
    *   **Justificativa:** O Prisma oferece uma camada de abstração de banco de dados robusta e type-safe, essencial para um projeto TypeScript. Ele simplifica as operações de CRUD, migrações e modelagem de dados, reduzindo a chance de erros e acelerando o desenvolvimento. PostgreSQL foi escolhido por sua robustez, escalabilidade e suporte a recursos avançados.
    *   **Trade-offs:** Adiciona uma dependência e uma curva de aprendizado para desenvolvedores não familiarizados com Prisma.

4.  **NextAuth.js para Autenticação:**
    *   **Justificativa:** Uma solução completa para autenticação, oferecendo suporte a múltiplos provedores e estratégias (neste caso, `CredentialsProvider`). Ele gerencia sessões, tokens JWT e segurança de forma eficaz, minimizando o esforço de implementação de autenticação do zero.
    *   **Trade-offs:** A customização profunda pode ser complexa e exige compreensão dos fluxos de JWT e sessões.

5.  **Serviços de Negócio Modulares (`app/api/.../services`):**
    *   **Justificativa:** A lógica de negócio é encapsulada em módulos de serviço separados (ex: `appointment/services/index.service.ts`), promovendo a separação de preocupações (Separation of Concerns - SoC) e a reutilização de código. Isso facilita a manutenção, teste e escalabilidade da lógica de negócio.
    *   **Trade-offs:** Aumenta o número de arquivos e a complexidade da estrutura de diretórios, mas os benefícios de organização e modularidade compensam.

## Decisões de Design Chave

1.  **TypeScript First:**
    *   **Requisito:** Robustez, manutenção e escalabilidade.
    *   **Escolha:** Todo o projeto é desenvolvido em TypeScript.
    *   **Justificativa:** Garante type-safety em todas as camadas da aplicação (frontend, API, ORM), detectando erros em tempo de desenvolvimento, melhorando a legibilidade e facilitando a refatoração e a colaboração em equipe.

2.  **Shadcn UI e Tailwind CSS:**
    *   **Requisito:** Interface de usuário moderna, responsiva e altamente personalizável.
    *   **Escolha:** Utilização do Tailwind CSS para estilização e componentes Shadcn UI (construídos sobre Radix UI e Tailwind) para a biblioteca de componentes.
    *   **Justificativa:** Tailwind permite um desenvolvimento rápido e flexível de UI com classes utilitárias. Shadcn UI oferece componentes acessíveis e personalizáveis que se integram perfeitamente com Tailwind, evitando a sobrecarga de bibliotecas de componentes tradicionais. A personalização de temas (`styles/themes`) é facilitada por essa combinação.

3.  **Validação de Formulários com React Hook Form e Zod:**
    *   **Requisito:** Validação de dados robusta e experiência de usuário otimizada em formulários.
    *   **Escolha:** `react-hook-form` para gerenciamento de formulários e `zod` para validação de esquemas.
    *   **Justificativa:** `react-hook-form` minimiza re-renderizações e simplifica a lógica de formulários. Zod oferece uma API intuitiva e type-safe para definir esquemas de validação, que podem ser reutilizados tanto no frontend quanto no backend.

4.  **Componente de Calendário Avançado (`components/calendar`):**
    *   **Requisito:** Um sistema de agendamento visualmente rico e interativo para administradores e barbeiros.
    *   **Escolha:** Desenvolvimento de um componente de calendário customizado com suporte a múltiplas visualizações (mês, semana, dia, agenda) e funcionalidades de Drag-and-Drop (DND) para reagendamento.
    *   **Justificativa:** Soluções de calendário prontas muitas vezes não atendem aos requisitos específicos de um sistema de agendamento de barbearia (intervalos de slots, horários de trabalho, visualização de barbeiros). O desenvolvimento customizado permite controle total sobre a UX e a integração com a lógica de negócio.

5.  **Sistema de Upload de Imagens:**
    *   **Requisito:** Capacidade de associar imagens a itens de catálogo e avatares de usuários.
    *   **Escolha:** Implementação de um serviço de upload de arquivos (`lib/upload.ts`) que gerencia o armazenamento de imagens no diretório `public/uploads`.
    *   **Justificativa:** Embora simples, essa abordagem atende à necessidade inicial sem a complexidade de serviços de armazenamento em nuvem (como S3), mantendo a flexibilidade para futuras integrações.

## ✨ Funcionalidades Detalhadas

O Barber-OS oferece um conjunto abrangente de funcionalidades, divididas entre o painel administrativo/barbeiro e o portal do cliente.

### 1. Sistema de Autenticação e Autorização
*   **Propósito:** Gerenciar o acesso seguro ao sistema e diferenciar permissões de usuário.
*   **Casos de Uso:**
    *   **Registro de Admin:** O primeiro passo para uma nova barbearia se juntar à plataforma, criando a conta do proprietário/administrador.
    *   **Registro de Cliente:** Clientes podem criar suas contas para agendar serviços.
    *   **Registro de Barbeiro:** Administradores podem cadastrar novos barbeiros na equipe, concedendo-lhes acesso ao painel privado.
    *   **Login Seguro:** Usuários (Admin, Barbeiro, Cliente) podem acessar suas respectivas interfaces com credenciais.
    *   **Middleware de Proteção:** Rotas privadas são protegidas por um middleware que verifica a autenticação e a autorização do usuário.

### 2. Onboarding da Barbearia (Apenas Admin)
*   **Propósito:** Guiar o administrador na configuração inicial da barbearia.
*   **Casos de Uso:**
    *   **Definição de Dados da Barbearia:** O admin informa o nome, slug (URL pública), e detalhes de localização.
    *   **Configuração de Horários de Funcionamento:** Define os dias e horários em que a barbearia estará aberta.
    *   **Seleção de Tema Visual:** Escolhe um tema para a página pública da barbearia, personalizando a experiência do cliente.

### 3. Dashboard (Admin/Barbeiro)
*   **Propósito:** Oferecer uma visão geral rápida e insights sobre as operações da barbearia.
*   **Casos de Uso:**
    *   **Visão de Agendamentos do Dia:** Barbeiros e administradores podem ver os agendamentos pendentes e confirmados para o dia atual.
    *   **Faturamento Diário:** Acompanhamento do desempenho financeiro.
    *   **Controle de Estoque Baixo:** Alertas sobre produtos com estoque crítico.
    *   **Novos Clientes:** Monitoramento do crescimento da base de clientes.
    *   **Ocupação dos Barbeiros:** Visualização do status de cada barbeiro (livre, ocupado, em andamento).

### 4. Gestão de Agendamentos
*   **Propósito:** Facilitar a criação, visualização e gerenciamento de agendamentos.
*   **Casos de Uso (Admin/Barbeiro):**
    *   **Visualização em Calendário:** Ver agendamentos em diferentes layouts (mês, semana, dia, agenda) com filtros por barbeiro.
    *   **Criação de Agendamentos:** Agendar serviços para clientes, selecionando data, hora, barbeiro e serviços.
    *   **Edição e Cancelamento:** Modificar detalhes de um agendamento ou cancelá-lo.
    *   **Atualização de Status:** Mudar o status do agendamento (Pendente, Confirmado, Em Andamento, Concluído, Cancelado).
    *   **Drag-and-Drop:** Arrastar e soltar agendamentos no calendário para reagendar (funcionalidade avançada do componente de calendário).
*   **Casos de Uso (Cliente - Portal Público):**
    *   **Seleção de Serviços:** Navegar pelo catálogo e adicionar serviços ao "carrinho" de agendamento.
    *   **Escolha de Barbeiro:** Selecionar um barbeiro preferencial (opcional).
    *   **Seleção de Data e Hora:** Escolher horários disponíveis com base na configuração da barbearia e na agenda dos barbeiros.
    *   **Confirmação de Agendamento:** Finalizar o agendamento e receber uma confirmação.

### 5. Gestão de Catálogo
*   **Propósito:** Gerenciar todos os serviços, produtos e pacotes oferecidos pela barbearia.
*   **Casos de Uso:**
    *   **CRUD de Itens:** Criar, visualizar, editar e desativar serviços, produtos e pacotes.
    *   **Detalhes do Item:** Definir nome, descrição, preço, duração (para serviços), categoria e imagem.
    *   **Status Ativo/Inativo:** Controlar a visibilidade dos itens no portal do cliente.
    *   **Filtros e Busca:** Encontrar itens rapidamente por tipo, status e nome.
    *   **Upload de Imagem:** Adicionar imagens aos itens do catálogo.

### 6. Gestão de Clientes
*   **Propósito:** Manter um registro dos clientes da barbearia e suas informações de contato.
*   **Casos de Uso:**
    *   **Listagem de Clientes:** Visualizar todos os clientes que agendaram na barbearia.
    *   **Busca por Nome/Email:** Encontrar clientes específicos.
    *   **Estatísticas de Clientes:** Ver o total de clientes, novos clientes no mês e clientes recorrentes.

### 7. Gestão de Equipe (Barbeiros)
*   **Propósito:** Cadastrar e gerenciar os barbeiros da equipe.
*   **Casos de Uso:**
    *   **Cadastro de Barbeiro:** Adicionar novos barbeiros com nome, email, telefone, senha e avatar.
    *   **Edição de Dados:** Atualizar as informações de um barbeiro existente.
    *   **Desativação de Barbeiro:** Remover um barbeiro da equipe (desativando sua conta).
    *   **Visualização de Barbeiros:** Ver a lista de barbeiros com seus status (ativo/inativo) e informações básicas.

### 8. Configurações da Barbearia
*   **Propósito:** Personalizar as regras de agendamento e funcionamento da barbearia.
*   **Casos de Uso:**
    *   **Intervalo de Slots:** Definir a granularidade dos horários de agendamento (ex: 15, 30 minutos).
    *   **Horário Visível:** Configurar o intervalo de tempo exibido no calendário.
    *   **Horários de Funcionamento por Dia:** Definir os horários de abertura e fechamento para cada dia da semana.

### 9. Portal Público da Barbearia (`/[slug]`)
*   **Propósito:** Oferecer uma vitrine online para a barbearia e um canal para agendamentos de clientes.
*   **Casos de Uso:**
    *   **Visualização de Informações:** Clientes podem ver o nome, endereço e horários de funcionamento da barbearia.
    *   **Catálogo de Serviços:** Navegar pelos serviços ativos da barbearia, organizados por categoria.
    *   **Agendamento Online:** Iniciar o processo de agendamento diretamente pela página da barbearia.
    *   **Mapa de Localização:** Visualizar a localização da barbearia em um mapa interativo (Leaflet).
    *   **Theming Personalizado:** A página se adapta ao tema escolhido pelo administrador.


## 🚀 Guia de Instalação e Configuração Avançada

Para configurar e executar o projeto Barber-OS em seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

*   **Node.js**: v20.x ou superior (versão testada: 20.x)
*   **Gerenciador de Pacotes**: `npm` (geralmente vem com Node.js), `yarn`, `pnpm` ou `bun`. O projeto usa `npm` por padrão, mas `package.json` é compatível.
*   **Git**: Para clonar o repositório.
*   **PostgreSQL**: Um servidor de banco de dados PostgreSQL em execução.
*   **Editor de Código**: Visual Studio Code (recomendado) ou similar.

### 1. Clonar o Repositório

Abra seu terminal e execute o comando:

```bash
git clone https://github.com/SamuelDomingos/barber-os.git
cd barber-os
```

### 2. Instalar Dependências

Com o repositório clonado, instale as dependências do projeto:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (copiando `.env.example`) e preencha as variáveis de ambiente necessárias.

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Variáveis de ambiente para o Next.js e NextAuth.js

# URL de conexão com o banco de dados PostgreSQL.
# Exemplo: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://user:password@localhost:5432/barber_os_db?schema=public"

# Chave secreta para NextAuth.js. Gere uma string aleatória longa.
# Use 'openssl rand -base64 32' no terminal Linux/macOS ou um gerador online.
NEXTAUTH_SECRET="your_nextauth_secret_key_here"

# URL base do seu aplicativo. Necessário para callbacks de autenticação.
# Em desenvolvimento: http://localhost:3000
NEXTAUTH_URL="http://localhost:3000"

# URL para acesso a arquivos de upload.
# Em desenvolvimento, pode ser a mesma URL do app.
NEXT_PUBLIC_UPLOAD_URL="http://localhost:3000"
```

**Detalhes das Variáveis:**
*   `DATABASE_URL`: Essencial para a conexão do Prisma com o banco de dados. Certifique-se de que o usuário e a senha tenham permissões adequadas.
*   `NEXTAUTH_SECRET`: Uma chave secreta criptográfica usada pelo NextAuth.js para assinar tokens e proteger sessões. **É crucial que seja uma string longa e aleatória e que não seja compartilhada.**
*   `NEXTAUTH_URL`: A URL onde sua aplicação Next.js está rodando. Usada pelo NextAuth.js para redirecionamentos e callbacks.
*   `NEXT_PUBLIC_UPLOAD_URL`: URL base para acessar os arquivos de upload (imagens de catálogo, avatares) armazenados publicamente.

### 4. Configurar o Banco de Dados (Prisma)

Primeiro, gere o cliente Prisma com base no seu `schema.prisma`:

```bash
npx prisma generate
```

Em seguida, aplique as migrações do banco de dados para criar as tabelas necessárias:

```bash
npx prisma migrate dev --name init
```
*   `--name init`: Você pode substituir `init` por um nome descritivo para sua primeira migração. O comando irá criar as tabelas e aplicar quaisquer alterações pendentes no seu `schema.prisma`.

### 5. Iniciar o Servidor de Desenvolvimento

Agora você pode iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

A aplicação estará disponível em `http://localhost:3000`.

### 6. Acessar o Painel Administrativo

Para acessar o painel administrativo, você precisará primeiro registrar um usuário administrador e configurar uma barbearia através do fluxo de onboarding.

1.  Acesse `http://localhost:3000/auth`.
2.  Registre-se como um novo usuário.
3.  Após o registro, você será redirecionado para o fluxo de onboarding (`http://localhost:3000/auth/onboarding`).
4.  Siga os passos para criar sua barbearia, definir seu `slug` (ex: `minha-barbearia`), localização e tema.
5.  Após o onboarding, você será redirecionado para o painel administrativo da sua barbearia em `http://localhost:3000/minha-barbearia/dashboard`.

## ⚙️ Uso Avançado e Exemplos

O Barber-OS foi projetado para ser intuitivo, mas algumas funcionalidades podem ser exploradas de maneiras mais avançadas.

### 1. Personalização de Temas

A barbearia pública (`/[slug]`) pode ter seu tema visual personalizado. Os temas estão localizados em `styles/themes/`. Para adicionar um novo tema:
*   Crie um novo arquivo `.css` em `styles/themes/` (ex: `styles/themes/dark-elegance.css`).
*   Defina variáveis CSS para as cores e estilos desejados.
*   No fluxo de onboarding ou nas configurações da barbearia, o administrador pode selecionar o nome do tema (ex: `dark-elegance`). O `ThemeWrapper` em `app/[slug]/layout.tsx` aplicará o tema dinamicamente.

### 2. Gerenciamento de Imagens

O projeto utiliza um sistema de upload de imagens para avatares de barbeiros e imagens de itens de catálogo.
*   As imagens são armazenadas em `public/uploads/`.
*   A URL para acesso é configurada via `NEXT_PUBLIC_UPLOAD_URL`.
*   Ao editar ou criar um item de catálogo ou barbeiro, utilize o componente `FormImageUpload` ou o input de arquivo correspondente para fazer o upload. O `useImageUpload` hook gerencia a pré-visualização e o envio do arquivo.

### 3. Agendamento com Drag-and-Drop (DND) no Calendário

No painel de agendamentos (`/[slug]/(private)/appointments`), o componente de calendário customizado suporta operações de arrastar e soltar.
*   **Reagendar:** Clique e arraste um agendamento existente para um novo slot de tempo ou dia. Isso atualiza automaticamente a data e hora do agendamento no backend.
*   **Criação Rápida:** Embora não explicitamente implementado para criar do zero via DND, a arquitetura do componente permite extensões futuras para criar agendamentos arrastando itens de uma lista para o calendário.

### 4. Filtragem e Busca Dinâmica

As listas de catálogo e clientes no painel administrativo suportam busca e filtragem dinâmica via parâmetros de URL.
*   **Exemplo de Catálogo:**
    *   `http://localhost:3000/minha-barbearia/catalog?search=corte&type=SERVICE&active=true`
    *   Isso buscará serviços com "corte" no nome, que sejam do tipo "SERVICE" e estejam ativos.
*   O `useUrlParams` hook (`hooks/useUrlParams.ts`) e `useSearch` hook (`hooks/use-Search.ts`) são utilizados para gerenciar esses parâmetros de forma reativa, atualizando a URL e recarregando os dados sem um full page refresh.

## 🔧 API Reference (Interna)

O Barber-OS utiliza API Routes do Next.js para a comunicação entre o frontend e o backend. Essas APIs são internas e não destinadas a consumo público externo direto. Abaixo, uma visão geral dos principais grupos de endpoints e suas operações.

**Base URL:** `/api`

### 1. Autenticação (`/api/auth`)

*   **POST `/api/auth/register/barberShop`**: Registra um novo usuário administrador e cria uma nova barbearia.
    *   **Body:** `{ name, email, password, phone, ...barbershopData }`
    *   **Response:** `{ user }`
*   **POST `/api/auth/register/client`**: Registra um novo usuário cliente.
    *   **Body:** `{ name, email, password, phone }`
    *   **Response:** `{ user }`
*   **POST `/api/auth/register/onboarding`**: Completa o processo de onboarding para um admin recém-registrado, criando a barbearia, localização e tema.
    *   **Body:** `{ name, slug, style, country, state, city, address, numberAddress, postalCode, maxDistancia }`
    *   **Response:** `{ onBoarding }`
*   **GET/POST `/api/auth/[...nextauth]`**: Endpoints padrão do NextAuth.js para login, logout, callbacks, etc.

### 2. Agendamentos (`/api/appointment`)

*   **GET `/api/appointment?barbershopId={id}&page={num}&limit={num}`**: Lista agendamentos para uma barbearia específica.
    *   **Query:** `barbershopId` (obrigatório), `page`, `limit`.
    *   **Response:** `{ data: [], total, page, limit }`
*   **POST `/api/appointment`**: Cria um novo agendamento.
    *   **Body:** `{ origin (client/barbershop), barbershopId, clientId, barberId (opcional), date, notes (opcional), color, items: [{ catalogItemId }] }`
    *   **Response:** `{ appointment }`
*   **GET `/api/appointment/{id}`**: Obtém detalhes de um agendamento específico.
    *   **Path:** `id` do agendamento.
    *   **Response:** `{ appointment }`
*   **PUT `/api/appointment/{id}`**: Atualiza um agendamento existente.
    *   **Path:** `id` do agendamento.
    *   **Body:** `{ date, notes, color, clientId, barberId, items: [{ catalogItemId }] }` (parcial)
    *   **Response:** `{ appointment }`
*   **PATCH `/api/appointment/{id}/status`**: Atualiza o status de um agendamento.
    *   **Path:** `id` do agendamento.
    *   **Body:** `{ status: "CONFIRMED" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELED" }`
    *   **Response:** `{ appointment }`
*   **DELETE `/api/appointment/{id}`**: Cancela um agendamento.
    *   **Path:** `id` do agendamento.
    *   **Response:** `{ message: "Agendamento cancelado" }`

### 3. Catálogo (`/api/catalog`)

*   **POST `/api/catalog`**: Cria um novo item no catálogo (serviço, produto ou pacote).
    *   **Body (FormData):** `name`, `description`, `price`, `active`, `type`, `barbershopId`, `image` (File), `duration` (para SERVICE), `category`, `items` (para PACKAGE).
    *   **Response:** `{ item }`
*   **GET `/api/catalog/listServices?barbershopId={id}&search={query}`**: Lista serviços ativos para uma barbearia, com opção de busca.
    *   **Query:** `barbershopId` (obrigatório), `search` (opcional).
    *   **Response:** `[{ id, name, price, ... }]`
*   **GET `/api/catalog/{id}`**: Obtém detalhes de um item do catálogo.
    *   **Path:** `id` do item.
    *   **Response:** `{ item }`
*   **PUT `/api/catalog/{id}`**: Atualiza um item do catálogo.
    *   **Path:** `id` do item.
    *   **Body (FormData):** `name`, `description`, `price`, `active`, `image` (File), `duration`, `stock`, `category`, `items`.
    *   **Response:** `{ item }`
*   **DELETE `/api/catalog/{id}`**: Desativa um item do catálogo.
    *   **Path:** `id` do item.
    *   **Response:** `{ message: "Item desativado" }`

### 4. Clientes (`/api/client`)

*   **GET `/api/client/listClients?barbershopId={id}&page={num}&search={query}`**: Lista clientes de uma barbearia.
    *   **Query:** `barbershopId` (obrigatório), `page`, `search`.
    *   **Response:** `{ data: [], total, page, limit }`

### 5. Configuração de Agendamento (`/api/configAppointment`)

*   **GET `/api/configAppointment?barbershopId={id}`**: Obtém as configurações de agendamento e horários de trabalho de uma barbearia.
    *   **Query:** `barbershopId` (obrigatório).
    *   **Response:** `{ config, workingHours }`
*   **POST `/api/configAppointment`**: Cria as configurações de agendamento e horários de trabalho para uma barbearia.
    *   **Body:** `{ barbershopId, config: {...}, workingHours: [...] }`
    *   **Response:** `{ configAppointment }`
*   **PUT `/api/configAppointment`**: Atualiza as configurações de agendamento e horários de trabalho.
    *   **Body:** `{ barbershopId, config: {...}, workingHours: [...] }`
    *   **Response:** `{ configAppointment }`

### 6. Dashboard (`/api/dashboard`)

*   **GET `/api/dashboard?barbershopId={id}`**: Obtém dados para o dashboard de uma barbearia.
    *   **Query:** `barbershopId` (obrigatório).
    *   **Response:** `{ stats, appointments, barbers }`

### 7. Equipe (`/api/team`)

*   **POST `/api/team`**: Cadastra um novo barbeiro.
    *   **Body (FormData):** `name`, `email`, `phone`, `password`, `role` (BARBER), `barbershopId`, `avatar` (File).
    *   **Response:** `{ user }`
*   **GET `/api/team/listBarbers?barbershopId={id}&search={query}`**: Lista barbeiros de uma barbearia, com opção de busca.
    *   **Query:** `barbershopId` (obrigatório), `search` (opcional).
    *   **Response:** `{ data: [], total, page, limit }`
*   **PUT `/api/team/{id}`**: Atualiza os dados de um barbeiro.
    *   **Path:** `id` do barbeiro.
    *   **Body (FormData):** `name`, `email`, `phone`, `avatar` (File).
    *   **Response:** `{ user }`
*   **DELETE `/api/team/{id}`**: Desativa um barbeiro.
    *   **Path:** `id` do barbeiro.
    *   **Response:** `{ message: "Barbeiro desativado" }`

## 🧪 Estratégia de Testes e Qualidade de Código

A qualidade do código e a confiabilidade do sistema são prioridades no Barber-OS. A estratégia de testes e controle de qualidade é baseada nos seguintes pilares:

1.  **TypeScript:** A linguagem TypeScript é utilizada em todo o projeto para garantir a segurança de tipos em tempo de desenvolvimento. Isso previne uma vasta categoria de bugs e melhora a manutenibilidade do código.
2.  **ESLint:** Configurado com `@eslint/config-next` e regras personalizadas, o ESLint é usado para aplicar padrões de estilo de código, identificar problemas de sintaxe e potenciais erros lógicos. A execução do `npm run lint` garante que o código esteja em conformidade.
3.  **Validação de Esquemas (Zod):** Todos os dados de entrada (formulários no frontend, payloads de API no backend) são validados usando Zod. Isso garante que os dados estejam no formato esperado antes de serem processados pela lógica de negócio ou persistidos no banco de dados.
4.  **Testes Unitários (Sugestão):** Embora não haja uma suíte de testes unitários explícita nos arquivos fornecidos, a arquitetura modular com serviços de negócio bem definidos (`app/api/.../services`) é ideal para a implementação de testes unitários.
    *   **Ferramentas Sugeridas:** Jest para JavaScript/TypeScript, com React Testing Library para componentes React.
    *   **Cobertura:** Foco em testar a lógica central dos serviços, funções utilitárias e componentes isolados.
5.  **Testes de Integração (Sugestão):** Testes de integração seriam cruciais para verificar a interação entre os API Routes, os serviços de negócio e o banco de dados.
    *   **Ferramentas Sugeridas:** Supertest para API Routes, ou testes baseados em Prisma para operações de banco de dados.
    *   **Cobertura:** Verificação de fluxos de ponta a ponta para criação de agendamentos, gestão de catálogo, autenticação, etc.
6.  **Integração Contínua (CI/CD - Sugestão):** Para manter a qualidade do código e automatizar o processo de teste e build, a integração de um pipeline de CI/CD (ex: GitHub Actions, Vercel Integrations) seria altamente benéfica.
    *   **Políticas:** Execução automática de `npm run lint` e da suíte de testes em cada Pull Request para garantir que apenas código validado seja mesclado.
    *   **Deployment:** Automação do deployment para ambientes de staging ou produção após a aprovação e mesclagem.

## 🚢 Deployment Detalhado e Escalabilidade

O Barber-OS, sendo um projeto Next.js, é otimizado para deployment em plataformas modernas e escaláveis.

### Plataforma de Deployment

A plataforma recomendada e mais alinhada com o ecossistema Next.js é a **Vercel**.
*   **Vercel:** A Vercel, criadora do Next.js, oferece um ambiente de deployment sem servidor (serverless) que lida automaticamente com escalabilidade, CDN, SSL e outras otimizações. O deployment é simplificado através da integração com repositórios Git (GitHub, GitLab, Bitbucket), onde cada push para a branch principal (ou um PR) pode disparar um novo build e deployment.

### Processo de Deployment (Vercel)

1.  **Conectar Repositório:** Conecte seu repositório GitHub (https://github.com/SamuelDomingos/barber-os) à Vercel.
2.  **Configurar Projeto:** A Vercel detectará automaticamente que é um projeto Next.js.
3.  **Variáveis de Ambiente:** Configure as variáveis de ambiente (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_UPLOAD_URL`) diretamente no painel da Vercel para o ambiente de produção.
4.  **Build e Deploy:** A Vercel fará o build do projeto (executando `npm run build`) e o deploy, gerando uma URL pública.

### Considerações de Escalabilidade

*   **Next.js Serverless Functions:** As API Routes do Next.js são implantadas como funções serverless, o que significa que escalam automaticamente com a demanda, sem a necessidade de gerenciar servidores.
*   **Banco de Dados PostgreSQL:** O PostgreSQL é um banco de dados relacional robusto e escalável. Para ambientes de produção de alta demanda, é essencial utilizar um serviço de banco de dados gerenciado (ex: AWS RDS, Google Cloud SQL, ElephantSQL) que oferece backups automáticos, replicação e escalabilidade.
*   **Armazenamento de Imagens:** Atualmente, as imagens são armazenadas no diretório `public/uploads`. Para alta escalabilidade e resiliência em produção, seria recomendado migrar para um serviço de armazenamento de objetos em nuvem (ex: AWS S3, Google Cloud Storage, Cloudinary) e usar uma CDN para entrega de conteúdo.
*   **Balanceamento de Carga:** A Vercel e outros provedores de nuvem gerenciam o balanceamento de carga automaticamente para funções serverless e assets estáticos.
*   **Monitoramento e Logging:** Implementar ferramentas de monitoramento de performance (APM) e logging centralizado (ex: Sentry, Datadog, ELK Stack) é crucial para diagnosticar problemas e otimizar a aplicação em produção.

## 🤝 Contribuição (Nível Avançado)

Agradecemos o seu interesse em contribuir com o Barber-OS! Suas contribuições são essenciais para o crescimento e aprimoramento do projeto. Siga estas diretrizes para garantir um processo de colaboração suave e eficaz.

### Como Contribuir

1.  **Fork o Repositório:**
    *   Vá para a página do repositório no GitHub: https://github.com/SamuelDomingos/barber-os
    *   Clique no botão "Fork" no canto superior direito.

2.  **Clone seu Fork:**
    *   Clone o repositório do seu fork para sua máquina local:
        ```bash
        git clone https://github.com/SEU_USUARIO/barber-os.git
        cd barber-os
        ```

3.  **Crie uma Branch:**
    *   Crie uma nova branch para sua feature ou correção. Utilize um nome descritivo:
        ```bash
        git checkout -b feature/minha-nova-funcionalidade
        # ou
        git checkout -b fix/correcao-de-bug-x
        ```

4.  **Configurar Ambiente de Desenvolvimento:**
    *   Certifique-se de ter todos os [Pré-requisitos Avançados](#-pré-requisitos-avançados) instalados.
    *   Siga o [Guia de Instalação e Configuração Avançada](#-guia-de-instalação-e-configuração-avançada) para configurar o projeto localmente.

5.  **Desenvolva sua Contribuição:**
    *   Implemente sua feature ou correção.
    *   Certifique-se de seguir as [Convenções de Estilo de Código](#convenções-de-estilo-de-código).
    *   Adicione ou atualize testes (se aplicável) para cobrir suas alterações.
    *   Atualize a documentação (se necessário) para refletir suas mudanças.

6.  **Commit suas Alterações:**
    *   Commit suas alterações com mensagens claras e concisas, seguindo as [Convenções de Commit](#convenções-de-commit).
        ```bash
        git add .
        git commit -m "feat: adiciona nova funcionalidade X"
        ```

7.  **Push para seu Fork:**
    *   Envie suas alterações para o seu fork no GitHub:
        ```bash
        git push origin feature/minha-nova-funcionalidade
        ```

8.  **Abra um Pull Request (PR):**
    *   Vá para a página do seu fork no GitHub.
    *   Clique em "Compare & pull request" ou navegue até a seção de Pull Requests.
    *   Descreva sua contribuição detalhadamente, explicando o problema que ela resolve ou a funcionalidade que adiciona.
    *   Vincule a quaisquer issues relevantes (ex: `Closes #123`).

### Modelo de Branching

Utilizamos um modelo de branching baseado no **GitHub Flow**:
*   A branch `main` é sempre deployável.
*   Novas funcionalidades e correções de bugs são desenvolvidas em branches separadas, derivadas de `main`.
*   Após a conclusão, as branches são mescladas em `main` via Pull Request.

### Convenções de Commit

Por favor, siga as [Convenções de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/) para suas mensagens de commit. Isso ajuda a gerar changelogs e a entender o histórico do projeto.

Exemplos:
*   `feat: adiciona funcionalidade de agendamento online`
*   `fix: corrige erro de validação no formulário de login`
*   `docs: atualiza seção de instalação no README`
*   `chore: atualiza dependências do projeto`
*   `refactor: otimiza lógica de busca de catálogo`

### Guia de Estilo de Código

*   **ESLint:** O projeto utiliza ESLint para manter a consistência do estilo de código. Certifique-se de que suas alterações passem nas verificações do linter.
    ```bash
    npm run lint
    ```
*   **Prettier (Sugestão):** Embora não explicitamente configurado nos scripts, o uso de um formatador como Prettier é altamente recomendado para garantir a consistência de formatação.
*   **TypeScript:** Siga as boas práticas de TypeScript para tipagem forte e clara.

### Processo de Code Review

Todos os Pull Requests serão revisados pelos mantenedores do projeto. Este processo visa garantir a qualidade, a consistência e a conformidade com as diretrizes do projeto. Esteja preparado para:
*   Receber feedback e sugestões.
*   Fazer ajustes e melhorias em seu código.
*   Discutir as decisões de design e implementação.

Encorajamos a abertura e a colaboração durante o processo de revisão!

## 📜 Licença e Aspectos Legais

Este projeto está atualmente sem uma licença explícita definida nos arquivos fornecidos. Recomenda-se que o autor adicione um arquivo `LICENSE` na raiz do repositório, especificando a licença sob a qual o projeto é distribuído.

**Sugestão de Licença:** Para projetos de código aberto como este, a licença **MIT** é uma escolha popular devido à sua permissividade, permitindo que outros usem, modifiquem e distribuam o código livremente, desde que a notificação de direitos autorais e a própria licença sejam incluídas.

## 📚 Publicações, Artigos e Citações

Não aplicável a este projeto neste momento.

## 👥 Equipe Principal e Colaboradores Chave

O desenvolvimento e a manutenção do Barber-OS são liderados por:

*   **Samuel Domingos** - Autor Principal e Mantenedor
    *   [LinkedIn](https://www.linkedin.com/in/samuel-domingos-304b461a8/)

## 🗺️ Roadmap Detalhado e Visão de Longo Prazo

O Barber-OS está em constante evolução, com planos ambiciosos para expandir suas funcionalidades e aprimorar a experiência do usuário. Abaixo está um roadmap detalhado das metas futuras:

### Curto Prazo (Próximos 3-6 meses)

*   **Integração de Pagamentos Online:**
    *   Permitir que clientes paguem por serviços e produtos diretamente no momento do agendamento ou após a conclusão.
    *   Integração com gateways de pagamento populares (ex: Stripe, Mercado Pago, PagSeguro).
*   **Notificações Automáticas:**
    *   Implementar notificações por e-mail e/ou SMS para confirmações de agendamento, lembretes, cancelamentos e promoções.
    *   Notificações para barbeiros sobre novos agendamentos ou alterações.
*   **Feedback e Avaliações de Clientes:**
    *   Sistema para clientes avaliarem barbeiros e serviços após o agendamento.
    *   Exibição de avaliações no perfil público da barbearia e dos barbeiros.
*   **Otimização de Performance e SEO:**
    *   Melhorias contínuas na performance de carregamento das páginas.
    *   Otimização para motores de busca para as páginas públicas das barbearias.

### Médio Prazo (Próximos 6-12 meses)

*   **Sistema de Fidelidade e Pontos:**
    *   Implementar um programa de fidelidade para recompensar clientes recorrentes.
    *   Gerenciamento de pontos e resgate de recompensas.
*   **Gestão de Estoque Avançada:**
    *   Rastreamento detalhado do estoque de produtos (entrada, saída, ajuste).
    *   Alertas automáticos para reabastecimento.
    *   Relatórios de vendas de produtos.
*   **Módulo Financeiro Completo:**
    *   Geração de relatórios financeiros detalhados (lucratividade, despesas, fluxo de caixa).
    *   Gestão de comissões para barbeiros.
*   **Gestão de Feriados e Exceções:**
    *   Capacidade de configurar feriados e dias de folga específicos para a barbearia ou para barbeiros individuais.

### Longo Prazo (12+ meses)

*   **Aplicativo Móvel Nativo (iOS/Android):**
    *   Desenvolvimento de aplicativos móveis nativos para clientes e administradores/barbeiros, oferecendo uma experiência otimizada.
*   **Análises e Insights Avançados:**
    *   Dashboards com métricas de negócio mais sofisticadas (taxa de retenção de clientes, valor de vida do cliente, horários de pico).
    *   Integração com ferramentas de Business Intelligence.
*   **Integração com Redes Sociais:**
    *   Compartilhamento de agendamentos e promoções diretamente para redes sociais.
    *   Login social (Google, Facebook).
*   **Expansão para Outros Segmentos:**
    *   Adaptar o sistema para atender a outros tipos de negócios baseados em agendamento (ex: salões de beleza, estúdios de tatuagem, clínicas).

### Desafios e Áreas de Pesquisa Futura

*   **Otimização de Algoritmos de Agendamento:** Melhorar a inteligência do sistema para sugerir os melhores horários e barbeiros com base em fatores como histórico do cliente, tempo de serviço e disponibilidade.
*   **Personalização de IA:** Explorar o uso de IA para recomendar serviços e produtos aos clientes com base em seus dados e preferências.
*   **Arquitetura Distribuída:** Avaliar a migração para uma arquitetura de microserviços para suportar um crescimento exponencial e equipes de desenvolvimento maiores, caso a complexidade do monorepo se torne um gargalo.

## ❓ FAQ (Perguntas Frequentes)

**1. Como faço para registrar minha barbearia no sistema?**
   *   Primeiro, acesse a página de autenticação (`/auth`) e registre-se como um novo usuário. Após o registro, você será automaticamente direcionado para o fluxo de onboarding (`/auth/onboarding`), onde poderá configurar os detalhes da sua barbearia, localização e tema.

**2. Esqueci minha senha. Como posso recuperá-la?**
   *   Atualmente, a funcionalidade de recuperação de senha não está implementada. Em caso de perda de senha, será necessário entrar em contato com o suporte para redefinição manual. Esta é uma funcionalidade planejada para o roadmap de curto prazo.

**3. Posso personalizar o tema da página pública da minha barbearia?**
   *   Sim! Durante o onboarding ou nas configurações da sua barbearia no painel administrativo, você pode escolher um tema pré-definido. Desenvolvedores podem adicionar novos temas criando arquivos CSS em `styles/themes/`.

**4. Onde as imagens de catálogo e avatares são armazenadas?**
   *   As imagens são armazenadas localmente no diretório `public/uploads/` do projeto. Para ambientes de produção com alta demanda, recomenda-se configurar um serviço de armazenamento de objetos em nuvem (ex: AWS S3) e atualizar a variável `NEXT_PUBLIC_UPLOAD_URL` de acordo.

**5. Como faço para adicionar um novo barbeiro à minha equipe?**
   *   No painel administrativo da sua barbearia, navegue até a seção "Equipe". Lá, você encontrará a opção para cadastrar novos barbeiros, preenchendo seus dados e atribuindo-lhes o papel de "BARBER".

**6. Posso usar este projeto para um salão de beleza ou outro tipo de negócio?**
   *   Embora o projeto tenha sido desenvolvido com foco em barbearias, sua arquitetura modular e funcionalidades de agendamento e catálogo podem ser adaptadas para outros negócios baseados em agendamento com algumas modificações.

**7. Quais são os requisitos mínimos para hospedar o Barber-OS?**
   *   Você precisará de um ambiente Node.js (v20+), um servidor PostgreSQL e um gerenciador de pacotes (npm, yarn, pnpm ou bun). Para deployment em produção, plataformas como Vercel são altamente recomendadas.

## 📞 Contato e Suporte

Para dúvidas, sugestões, relatórios de bugs ou discussões sobre o projeto, utilize os seguintes canais:

*   **Issues do GitHub:** Para relatar bugs, propor novas funcionalidades ou discutir problemas específicos do projeto, por favor, abra uma issue no repositório:
    *   [Abrir uma Issue](https://github.com/SamuelDomingos/barber-os/issues)
*   **Pull Requests do GitHub:** Se você desenvolveu uma nova funcionalidade ou correção, sinta-se à vontade para abrir um Pull Request:
    *   [Abrir um Pull Request](https://github.com/SamuelDomingos/barber-os/pulls)
*   **Contato com o Autor:** Para questões mais gerais ou colaborações, você pode entrar em contato com o autor principal:
    *   **Samuel Domingos:** [LinkedIn](https://www.linkedin.com/in/samuel-domingos-304b461a8/)