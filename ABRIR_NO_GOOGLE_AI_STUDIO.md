# Abrir o FluiLer 2.1.3 no Google AI Studio

Este ZIP contém o programa pronto e os seus arquivos de origem. O objetivo é importar ou transferir esses arquivos, preservando os conteúdos e a implementação, sem pedir que o agente crie outro aplicativo a partir de uma descrição.

## Preparar a pasta

Extraia o ZIP. A pasta de trabalho deve ter `package.json`, `server.ts`, `src`, `public`, `scripts` e `server` no mesmo nível. Se houver uma pasta externa envolvendo tudo, use o conteúdo interno como raiz do projeto.

Não envie `node_modules`, `dist`, `.env`, arquivos privados da conta Google ou o banco local de desenvolvimento. Eles não estão incluídos nesta entrega. Preserve o projeto anterior e exporte seu backup antes de usar registros existentes.

## Caminho documentado pelo Google

A documentação oficial consultada em 31 de outubro de 2026 descreve a importação de código existente por **Build → Add files (+) → Import from GitHub**, além da sincronização pela seção GitHub das configurações.

1. Coloque o conteúdo da pasta extraída em um repositório GitHub seu, com `package.json` na raiz.
2. No Build do AI Studio, use Import from GitHub e selecione esse repositório.
3. Confirme que foram carregados o servidor e a pasta `public/assets/premium`, além do frontend.
4. Cole as instruções de `PROMPT_PARA_AI_STUDIO.md` e peça para executar a configuração e os testes preservando o projeto recebido.

Se a sua interface permitir anexar e trabalhar diretamente com o ZIP, forneça o arquivo e o mesmo prompt. Primeiro confirme que o agente extraiu os arquivos e preservou a estrutura. A disponibilidade desse recurso pode variar; não foi presumida a existência de um botão de importação direta de ZIP.

## Primeira prévia

Peça para instalar as dependências e executar `npm run dev`. Sem uma configuração de banco definida, esse comando inicia um banco local de desenvolvimento. Uma chave privada aleatória de instalação será criada em `data/installation-key.txt`; use-a no formulário **Configurar primeiro docente**. Você também pode definir `FLUILER_BOOTSTRAP_TOKEN` nos Secrets do servidor.

Não existe senha padrão nem conta docente automática. Depois de criar o primeiro docente, a inicialização pela interface fica bloqueada. Use **Entrar → Professor** com as credenciais definidas, cadastre os estudantes e gere os códigos de aluno e família.

O arquivo local serve para testes na mesma instalação. Não considere a persistência no contêiner de desenvolvimento como banco escolar permanente.

## Banco persistente para publicação

Nos Secrets ou nas variáveis do servidor, configure:

- `FLUILER_DATA_MODE=firestore`
- `GOOGLE_CLOUD_PROJECT`: projeto Google correto
- `FIRESTORE_DATABASE_ID`: banco correto, por exemplo `(default)` se for esse o banco escolhido
- `FLUILER_BOOTSTRAP_TOKEN`: chave privada aleatória para a primeira conta, se ela ainda não existe
- `GEMINI_API_KEY`: apenas se utilizar os recursos de IA
- `GEMINI_MODEL`: modelo escolhido; o padrão do programa é `gemini-3.6-flash`

Autorize a identidade de execução do servidor a acessar o Firestore por IAM/ADC. Este projeto utiliza o SDK Node do servidor e não aceita regras públicas como substituto dessa configuração. Não coloque credenciais privadas em `src` nem em variáveis com prefixo `VITE_`.

A integração automática de Firebase do AI Studio pode ajudar a preparar os serviços, mas o agente precisa manter o modelo de acesso deste programa. Não substitua os vínculos por códigos e a autorização do servidor por uma troca de perfil sem autenticação.

## Conferir antes de disponibilizar

Execute `npm run check`, `npm run test:legacy` e `npm run diagnostico`. Verifique primeiro com dados sintéticos: criação de docente, cadastro, código de aluno, código de família, leitura, CAA, registro de resposta, relatório e backup. Depois confira Firestore, permissões e recuperação no ambiente de destino.

Para publicar, use a compilação de produção. O servidor precisa de acesso ao Firestore; o modo local é recusado com `NODE_ENV=production`. O cache para recarga sem conexão é gerado no build de produção e só fica disponível depois da primeira abertura com rede. Não foi feita uma publicação na sua conta Google durante a preparação do ZIP.

## Fontes oficiais consultadas

- Build apps in Google AI Studio: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Develop full-stack apps in Google AI Studio: https://ai.google.dev/gemini-api/docs/aistudio-fullstack
- Gemini 3.6 Flash: https://ai.google.dev/gemini-api/docs/models/gemini-3.6-flash

Os fluxos da interface e os modelos disponíveis podem mudar. O programa deixa o modelo configurável para evitar dependência de um identificador fixo no código.
