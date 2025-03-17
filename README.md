# 📦 rfcommerce-admin

**rfcommerce-admin** é um painel administrativo para gerenciar a aplicação de e-commerce [rfcommerce](https://github.com/raphaelf9/rfcommerce).  
Este painel permite a administração eficiente de produtos, pedidos e usuários, proporcionando uma interface amigável e funcionalidades essenciais para o gerenciamento do negócio online.

---

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript  
- **Framework:** Next.js  
- **Estilização:** Tailwind CSS  
- **Autenticação:** NextAuth.js  
- **Banco de Dados:** Prisma ORM com suporte a PostgreSQL  

---

## 📂 Estrutura do Projeto

A estrutura principal do projeto é organizada da seguinte forma:

```plaintext
rfcommerce-admin/
├── app/                # Páginas e rotas principais
├── components/         # Componentes reutilizáveis
├── hooks/              # Hooks customizados
├── lib/                # Bibliotecas e utilitários
├── prisma/             # Definições do Prisma e esquemas do banco de dados
├── public/             # Arquivos públicos estáticos
├── styles/             # Arquivos de estilização
├── .eslintrc.json      # Configurações do ESLint
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── next.config.js      # Configurações do Next.js
├── package.json        # Dependências e scripts do projeto
├── README.md           # Documentação do projeto
└── tsconfig.json       # Configurações do TypeScript
```

---

## 🛠️ Funcionalidades

- **Gerenciamento de Produtos:** Adicionar, editar, remover e listar produtos.  
- **Gerenciamento de Pedidos:** Visualizar detalhes dos pedidos e atualizar status.  
- **Gerenciamento de Usuários:** Gerenciar informações dos clientes e administradores.  
- **Autenticação Segura:** Implementação de autenticação e autorização com NextAuth.js.  
- **Interface Responsiva:** Design adaptável para diferentes dispositivos, garantindo uma experiência consistente.  

---

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/raphaelf9/rfcommerce-admin.git
   cd rfcommerce-admin
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   NEXTAUTH_SECRET=sua_chave_secreta
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm run test
# ou
yarn test
```

Certifique-se de que todos os testes estejam passando antes de enviar contribuições.

---

## 🤝 Contribuições

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir issues e pull requests.  
Por favor, siga as diretrizes de contribuição e o código de conduta do projeto.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
