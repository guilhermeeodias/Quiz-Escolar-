Quiz Escolar

MVP desenvolvido para facilitar a vida de professores e engajar alunos. A ideia é simples: o professor cola o material da aula (texto), e a IA gera automaticamente um quiz gamificado estilo Duolingo.


React + Vite

TypeScript

Tailwind CSS

Google Gemini API 

Como rodar localmente

Clone o repositório:

git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)


Instale as dependências:

npm install


Configure a API Key:
Crie um arquivo .env na raiz do projeto e cole sua chave do Gemini (Google AI Studio):

VITE_GEMINI_API_KEY=sua_chave_aqui


Rode o projeto:

npm run dev


Funcionalidades Atuais

[x] Input de texto para material de estudo

[x] Configuração de dificuldade e quantidade de questões

[x] Geração de perguntas via IA (JSON estruturado)

[x] Interface de jogo com feedback instantâneo

[x] Tela de resultados com pontuação

Próximos Passos

Upload direto de PDF/Word

Login de alunos e professores

Ranking global da turma
