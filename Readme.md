# cera-challenge-back-end
> API em **Node.js + Express** seguindo a **Clean / Hexagonal Architecture (Ports & Adapters)**, persistindo dados em **MongoDB**.

---

## 📁 Estrutura de pastas

```text
cera-challenge-back-end/
├─ .env.example             # Variáveis de ambiente de exemplo
├─ docker/
│  ├─ Dockerfile            # Build da API
│  └─ docker-compose.yml    # API + MongoDB prontos p/ subir
├─ src/
│  ├─ domain/               # Entidades e value-objects puros
│  ├─ usecases/             # Casos de uso (aplicação)
│  ├─ adapters/
│  │  ├─ http/              # Controllers e rotas Express
│  │  ├─ persistence/       # Repositórios (Mongoose)
│  │  └─ email/             # Envio de e-mails (Nodemailer)
│  ├─ infrastructure/       # Conexões e configs externas
|  ├─ utils/                # Helpers para auxiliar
│  └─ server.js             # Bootstrap Express
├─ tests/                   # Testes de integração (Supertest + Jest)
└─ package.json
```

### Responsabilidades

| Camada | Pasta/Arquivo | Depende de | O que faz |
|-----------------|------------------------|------------|----------------------------------------------|
| **Domain** | `src/domain` | Nenhuma | Regras de negócio puras |
| **Usecases** | `src/usecases` | Domain | Orquestra casos de uso |
| **Adapters** | `src/adapters` | Usecases | Conecta HTTP, Mongo, e-mail |
| **Infrastructure** | `src/infrastructure` | Adapters | Configura drivers: Mongoose, JWT, etc. |

---

## 🔧 Configuração local (sem Docker)

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar MongoDB (por conta própria) e copiar .env.example -> .env

# 3. Iniciar API (nodemon)
npm run dev
```

---

## 🐳 Execução com Docker

### Por que usar?

* Sobe **API** e **MongoDB** com um só comando  
* Garante mesmas versões para toda a equipe  
* Facilita execução em CI/CD

### Comandos

```bash
# build da imagem e subida dos containers
docker compose -f docker/docker-compose.yml up --build -d

# logs em tempo real
docker compose -f docker/docker-compose.yml logs -f api

# parar e remover
docker compose -f docker/docker-compose.yml down
```

Containers criados:

| Serviço | Porta local | Descrição      |
|---------|-------------|----------------|
| api     | 3000        | Express + Swagger |
| mongo   | 27017       | Banco de dados   |

A variável `MONGO_URI` já aponta para o host interno `mongodb://mongo:27017/cera`.

---

## 🧪 Testes

* **Runner:** Jest  
* **HTTP:** Supertest  
* **Comando:** `npm test`

Os testes em `tests/*.integration.spec.js` exercitam o ciclo completo das rotas (`middleware → controller → repo`).  
Mocks isolam serviços externos, deixando asserções rápidas e determinísticas.

---

## 🚀 Tecnologias principais

| Categoria | Lib / Tool |
|----------------|-----------------|
| Web | Express 4 |
| Banco | MongoDB + Mongoose |
| Auth | JSON Web Tokens |
| Senhas | bcrypt |
| E-mail | Nodemailer |
| Docs API | Swagger (swagger-jsdoc / UI) |
| Arquitetura | Clean / Hexagonal |
| Testes | Jest + Supertest |
| Container | Docker / Docker Compose |

---

## 🏗️ Clean / Hexagonal vs MVC

| Aspecto | MVC tradicional | Clean / Hexagonal |
|------------------------|--------------------------------------------|--------------------------------------------|
| Núcleo da aplicação | Controllers + Models | Rules de domínio + Casos de uso |
| Dependência de frameworks | Alta | Baixa (inversão de dependência) |
| Testabilidade | Baixa (precisa de Express + DB) | Alta (domínio isolado) |
| Troca de banco/framework | Quebra geral | Apenas novo adapter |

---

## ✨ Fluxos disponíveis

1. **Auth** – registro, login, refresh, recuperação de senha  
2. **Clients** – CRUD completo  
3. **Swagger** – documentação automática em `/docs`

---

## 📝 Licença

MIT
