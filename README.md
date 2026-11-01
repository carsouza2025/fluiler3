# FluiLer 2.1.3 — Engenhoca Educacional

Pacote de recuperação reconstruído a partir da base 2.0 preservada e dos ajustes registrados no chat. Mantém React, Vite, TypeScript, servidor Node/Express, Firestore, banco local de desenvolvimento e os recursos pedagógicos anteriores. Não é uma cópia binária do ZIP 2.1 que ficou indisponível. Esta entrega foi novamente compilada e testada; os resultados atuais estão em `RESULTADOS_TECNICOS.md`.


## Auditoria e acabamento 2.1.3

Esta cópia preserva a entrega 2.1.2 e corrige três integrações: alternativas de jogos visuais, apoio ao completar frases e encaminhamento da trilha EJA para leituras adultas. Recebe cabeçalho sóbrio, cores mais contidas, hierarquia e espaçamento revisados, tipografia local e apoios secundários expansíveis. Os 24 pictogramas próprios e 12 avatares foram preservados e padronizados; quatro novas capas ilustradas complementam as sete anteriores (11 capas ilustradas e quatro capas funcionais vetoriais). Abra `PREVIA_VISUAL.html` para consultar os elementos gráficos.

Consulte `AUDITORIA_2.1.3.md` e `verificacao/RESULTADOS_2.1.3.json`. A matriz registra cobertura de implementação, sem declarar validação humana realizada. Os documentos identificados como 2.1.2 são históricos.

## Executar

1. Extraia o ZIP em uma pasta nova. `package.json` deve ficar na raiz, junto de `server.ts`, `src`, `public`, `server` e `scripts`.
2. Use Node.js 22 ou superior. Execute `npm ci` e `npm run dev`.
3. Abra `http://localhost:3000`. Clique em **Configurar primeiro docente**. No desenvolvimento, a chave privada fica em `data/installation-key.txt`. Defina nome, e-mail, senha e turmas. Não existe conta nem senha padrão.
4. Entre como professor, cadastre um estudante sintético e gere os códigos separados de **Aluno** e **Família** no indicador de acesso.
5. Para o AI Studio, leia `ABRIR_NO_GOOGLE_AI_STUDIO.md` e use `PROMPT_PARA_AI_STUDIO.md`, preservando o frontend e o servidor juntos. A disponibilidade da importação direta de ZIP depende da interface; o pacote não pressupõe um botão universal.

## Ajustes incluídos

| Área | Recursos |
|---|---|
| Acervo | 15 textos e 223 registros lexicais; sete textos recebidos preservados e oito acréscimos editoriais identificados |
| Pedagogia | Nove domínios, referências BNCC, rimas revisadas, letras e sílabas móveis, compreensão, sequência visual, sondagem e produção |
| Jogos | Oito modos de pareamento, incluindo memória; imagens distintas, confirmação e evidência por tentativa |
| Apoios | Duas, três ou quatro alternativas; escolha inicial do professor e ajuste pelo estudante; índices e gabaritos preservados |
| Acessibilidade | Três tamanhos de fonte, velocidade da voz, repetição, pausa, modo tranquilo, foco, zoom, imagens e nove cartões de CAA |
| Expressão | Resposta complementar por escrita ou fala transcrita/mediada; ditado quando suportado pelo navegador e confirmação explícita |
| Professor | Cadastro, avaliação, planejamento, seis PDFs, revisão e validação do relatório, diagnóstico de persistência e configurações do estudante |
| Família | Código próprio, estudante vinculado, orientação aprovada e propostas em três passos; sem anotações docentes privadas |
| EJA | Seis situações, 18 perguntas, acervo inicial de quatro leituras cotidianas, trilha adulta, nome da comunidade e atividade local editável |
| Escrita | Autoria registrada sem acerto automático; devolutiva opcional da IA identificada; orientação local quando a IA está indisponível |
| Dados | Autorização no servidor, senhas scrypt, vínculos, cache cifrado, conflitos explícitos, fila com confirmação e backup |
| Visual | Capas premium, pictogramas e avatares preservados; novas ilustrações locais e imagens WebP otimizadas |
| Etapa F | Caderno digital, vinte tarefas e fichas Word; nenhuma sessão humana é apresentada como realizada |

## Configurar o estudante e a comunidade

Abra **Estudantes → Ver perfil completo → relatório individual**. O comando **Salvar orientação e contexto** guarda contexto infância/EJA, apoio inicial e comunidade. Abra **Criar ou adaptar situação da comunidade • EJA** para informar título, texto, pergunta, três opções distintas e resposta esperada. Esvazie esses campos para remover a atividade. Editar a atividade muda sua identidade e preserva as evidências anteriores.

O estudante pode usar **Apoio à atividade** e **Responder de outro jeito: falar ou escrever**. A resposta alternativa complementa o registro e deve ser interpretada pelo professor; não troca o gabarito de uma resposta já confirmada. O ditado exige suporte do navegador, permissão de microfone e, em alguns dispositivos, conexão. A escrita e a fala registrada por mediador continuam disponíveis.

## Banco e publicação

`npm run dev` usa o arquivo local de desenvolvimento quando não existe configuração de banco. Ele permite persistência entre reinícios na mesma pasta, mas não é um banco escolar permanente para a nuvem ou para múltiplas instâncias. Em produção, o modo local é recusado.

Para publicar, configure `FLUILER_DATA_MODE=firestore`, projeto, banco e IAM/ADC da identidade do servidor. Use `.env.firestore.example` e `docs/BANCO_DE_DADOS.md`. Configure a primeira conta com `FLUILER_BOOTSTRAP_TOKEN` privado ou pelo comando administrativo `npm run setup`. Mantenha as credenciais fora de `src` e de variáveis `VITE_`.

A IA é opcional. Configure `GEMINI_API_KEY` e um `GEMINI_MODEL` disponível na conta somente no servidor. Sem chave, o acervo e as atividades locais funcionam. Presença de chave não comprova disponibilidade do modelo ou de cota.

## Conferir

- `npm run check`: TypeScript, testes do programa e do caderno, build de cliente/servidor e cache público.
- `npm run test:legacy`: verificações pedagógicas históricas.
- `npm run diagnostico`: versão, modo de banco e leitura da persistência sem expor segredos.
- `npm run build` e `npm start`: execução de produção com Firestore autorizado.

## Escopo da recuperação

Os oito textos acrescentados são novas versões editoriais, com origem declarada no aplicativo. Não são recuperação de oito originais que não foram recebidos. As modalidades só são oferecidas quando existem palavras, imagens ou comparações sonoras adequadas; uma indisponibilidade não é preenchida com uma atividade genérica apresentada como contextualizada.

Os testes usam dados sintéticos. Firestore institucional, chamada real à IA, restauração no destino, áudio e aparelhos escolares precisam de conferência com as credenciais e equipamentos reais. A etapa F precisa ser aplicada com professores, estudantes e familiares. A matriz distingue implementação em código e validação externa.

**Próxima etapa:** importar este pacote, configurar os serviços do destino e executar os instrumentos de validação supervisionada.
