# Instrução para implementar o pacote recebido

Use os arquivos anexados ou importados como o projeto completo do FluiLer 2.1.3. Não gere outro aplicativo e não reconstrua suas telas a partir de uma descrição. Preserve a identidade FluiLer, os conteúdos, as rotas, as imagens locais, os personagens, os identificadores dos estudantes, os mecanismos de avaliação e os arquivos de configuração.

Mantenha React, Vite, TypeScript e o servidor Node/Express. O servidor em server.ts deve atender APIs e frontend na mesma porta definida por PORT, escutando em 0.0.0.0. Instale as dependências de package-lock.json. Use npm run dev para a prévia e npm run build seguido de npm start para produção. Não troque a aplicação full-stack por um frontend estático isolado.

Na primeira prévia, o script de desenvolvimento pode usar o banco local isolado. Não copie dados escolares reais para esse contêiner. A chave para criar o primeiro docente está em data/installation-key.txt quando é gerada no desenvolvimento, ou pode ser definida como FLUILER_BOOTSTRAP_TOKEN nos Secrets do servidor. O formulário inicial exige essa chave. Não inclua e-mail, senha padrão, token ou chave em código público.

Para publicação, configure FLUILER_DATA_MODE=firestore, GOOGLE_CLOUD_PROJECT e FIRESTORE_DATABASE_ID com o projeto e o banco autorizados. Use IAM/ADC da identidade do servidor. Mantenha a autenticação com senha docente e códigos distintos de aluno e família, o vínculo por studentId e as verificações do servidor. Não abra regras do Firestore nem conceda perfil docente automaticamente para fazer a prévia funcionar. Não altere o banco real antes de conferir backup e testar a configuração.

Se a IA for usada, configure GEMINI_API_KEY somente como segredo do servidor. GEMINI_MODEL é configurável; o padrão é gemini-3.6-flash. Não exponha chaves com VITE_ nem faça chamadas autenticadas ao Gemini diretamente do navegador. Sem a chave, as atividades da coleção continuam disponíveis e a geração deve informar indisponibilidade.

Preserve os quinze textos da coleção, os 223 registros lexicais, os seis contextos e dezoito tarefas de EJA, a Trilha dos Elementos, o áudio, a fonte ampliada, o modo tranquilo, as respostas por imagens, os nove cartões de CAA, os relatórios e a Área da Família. Mantenha a distinção entre resultado de tarefa e observação docente. Apoios não são penalizações e cliques não comprovam fluência oral.

Preserve as sete capas de public/assets/premium, os 24 pictogramas e os doze avatares refinados. Os arquivos são locais e não precisam ser substituídos por links externos. Não mude o nome do aplicativo nem crie personagens novos sem solicitação.

O build gera sw.js para cache apenas dos arquivos públicos. Não armazene respostas de /api, tokens, registros escolares ou PDFs privados nesse cache. O armazenamento protegido da conta e a fila de sincronização devem continuar separados dele.

Execute npm run check, npm run test:legacy e npm run diagnostico. Corrija erros comprovados preservando os recursos existentes. Depois teste os três perfis e confirme o Firestore no ambiente de destino. Relate separadamente o que foi testado e o que depende de credenciais ou de aplicação com participantes reais. A etapa F tem instrumentos prontos, mas não possui sessões humanas concluídas.

Esta é uma recuperação reconstruída, versão 2.1.3. Preserve os oito textos editoriais novos e suas origens explícitas, os oito modos de pareamento e memória, os três caminhos de apoio, a resposta alternativa por fala/escrita, a configuração docente da comunidade e sua atividade local. Escrita livre e desenho são registros descritivos, sem acerto automático; sugestões de IA exigem identificação e revisão docente. O contexto EJA usa apresentação adulta. Não use o bun.lock histórico: instale com npm ci pelo package-lock.json da raiz.
