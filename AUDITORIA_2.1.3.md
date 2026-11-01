# Auditoria do FluiLer e revisão Premium 2.1.3

**Data:** 1º de novembro de 2026. **Objeto:** a entrega 2.1.2 e sua revisão em cópia 2.1.3. **Conclusão:** havia implementação extensa, mas o acabamento visual estava desigual e três integrações precisavam de correção. Essas correções foram aplicadas e verificadas nesta cópia. Não é possível declarar todas as demandas integralmente concluídas: a aplicação da etapa F, os serviços da conta institucional e os testes em aparelhos reais continuam pendentes.

## 1. Base examinada e método

O ZIP 2.1.2 de 14.789.995 bytes foi validado por integridade e pelos hashes de seu manifesto. SHA-256: `0acb99c9b39f336b32a9f785a911aa2dc2de46333fdbaabfb4b4e5c40194bf19`. A base anterior foi preservada.

Foram confrontados o anexo recebido, a matriz, os arquivos de implementação, os recursos locais, os testes automatizados e os fluxos no navegador. O anexo contém 14 requisitos de preservação e 120 demandas de ajuste, total de 134 linhas. A matriz rastreia cada linha; sua marcação de implementação não equivale a homologação pedagógica ou de produção.

A revisão não examinou uma publicação externa nem utilizou dados de estudantes reais. A adequação dos comandos a não leitores, a eficácia pedagógica e a aceitação estética por participantes não podem ser inferidas de um build ou de testes sintéticos.

## 2. Achados e correções nesta revisão

| Achado da 2.1.2 | Alteração aplicada na 2.1.3 | Evidência |
|---|---|---|
| Cabeçalho e cartões misturavam excesso de estímulos, emojis e tratamentos visuais | Cabeçalho mais compacto, verde fechado, fundo claro, cartões suaves, hierarquia e espaçamentos revistos; apoios secundários agrupados em área expansível | `src/App.tsx`, `src/premium.css`, `MainNavigation.tsx`, `StudentHomeDashboard.tsx` |
| Algumas famílias de ícones já eram próprias, mas a aplicação era desigual | Pictogramas preservados, traço padronizado e uso ampliado na navegação da Família; removido emoji de título docente que aparecia como quadrados no ambiente examinado | `src/components/visual/PremiumIcon.tsx`, `MainNavigation.tsx`, `TeacherArea.tsx` |
| Fonte de interface citada por nome não era integralmente fornecida localmente | DejaVu Sans regular e negrito incluídos em WOFF, com licença e carregamento local | `src/premium.css`, `public/assets/fonts` |
| Quatro novas leituras infantis usavam capas vetoriais muito simples em relação às sete capas ilustradas anteriores | Quatro novas ilustrações editoriais locais, com descrição e WebP, integradas ao acervo | `src/utils/premiumVisualAssets.ts`, `storyVisualAssets.ts` |
| Jogo visual sempre gerava três opções | Opções seguem o apoio escolhido de duas, três ou quatro, limitado às imagens disponíveis; alvo preservado | `stageCVisuals.ts`, `VisualStoryActivity.tsx`, `tests/audit213.test.ts` |
| Completar frase ignorava a preferência global de apoio | Alternativas seguem o apoio e mantêm a resposta esperada | `TextualProduction.tsx`, `learningSupport.ts` |
| Trilha EJA tinha apresentação adulta, mas seus destinos ainda podiam abrir leituras infantis | Destinos de leitura, escrita e palavras encaminhados ao conjunto adulto; escuta abre leitura adulta com áudio | `EjaTrail.tsx`, `ejaTrailTargets.ts`, `tests/audit213.test.ts` |

Não foram alterados os textos originais recebidos, as avaliações de autoria nem os gabaritos em função do acabamento. Vetores de objetos e cenas continuam sendo usados onde sua função é apoiar reconhecimento e sequência.

## 3. Atendimento por conjunto de demandas

| Seção do anexo | Linhas | Conclusão da conferência |
|---|---:|---|
| 2 — Preservação | 14 | Identidade, personagens, trilha e recursos mantidos. Sete textos recebidos preservados; oito acréscimos são versões editoriais identificadas, sem alegar recuperação de originais ausentes. |
| 3 — Página inicial | 9 | Quatro entradas principais, retomada, perfil e apresentação EJA; hierarquia visual revisada nesta cópia. |
| 4 — Histórias ilustradas | 9 | Capas, cenas, descrição, ampliação e sequências vinculadas ao texto. Onze capas ilustradas e quatro vetoriais funcionais. |
| 5 — Acessibilidade | 10 | Fonte, áudio, repetição, pausa, modo tranquilo e apoios disponíveis; ajustes de opções estendidos ao jogo visual e à frase. Tecnologias assistivas reais ainda precisam de avaliação. |
| 6 — Comunicação alternativa | 9 | Nove cartões com palavra e áudio; pausa e instrução contextual; uso da CAA distinguido de evidência de aprendizagem. Validação de compreensão pendente. |
| 7 — Acessos, sincronização e backup | 8 | Perfis separados, vínculo ao estudante, autorização no servidor, fila com confirmação, cache cifrado e backup. Firestore/IAM e restauração no destino não homologados. |
| 8 — Jogos | 10 | Oito modos de pareamento/memória, confirmação e evidência contextual; imagens pertinentes e apoio por opções. |
| 9 — Rimas e palavras | 8 | Relações sonoras revisadas, montagem de letras/sílabas e indisponibilidade explícita quando faltam dados pertinentes. |
| 10 — Matriz e BNCC | 9 | Nove domínios, códigos de referência e distinção entre participação, resposta e observação docente. Associação curricular é proposta de planejamento, sem certificação do MEC ou inferência automática de domínio. |
| 11 — EJA | 9 | Seis situações, 18 perguntas, quatro leituras cotidianas, atividade local editável e trilha com destinos adultos. Adequação cultural requer avaliação com o público. |
| 12 — Relatórios individuais | 10 | Evidências, período, análise qualitativa, revisão explícita e seis tipos de PDF. Rascunho docente e mensagem à família são distintos. |
| 13 — Família | 7 | Código próprio, estudante vinculado, orientação aprovada e proposta em três passos. Regressão recusa relatório docente e não envia notas privadas. |
| 14 — Dispositivos e desempenho | 7 | Amostra de larguras 390, 768 e 1280 px e recarga offline aprovadas. Desempenho em aparelhos escolares e carga simultânea não medidos. |
| 15 — Acabamento | 8 | Paleta, tipografia, cartões, navegação e uso dos pictogramas revisados; quatro novas capas geradas. Julgamento estético final depende do usuário e dos participantes. |
| 16 — Validação supervisionada | 7 | Instrumentos, caderno e vinte tarefas preparados; **zero sessões realizadas**. Demandas de aplicação e análise com participantes continuam pendentes. |

Na matriz: **108** linhas implementadas em código e **uma** com verificação de sincronização parcial, **14** de preservação, **2** a conferir no destino, **2** a conferir em dispositivos reais e **7** pendentes de validação humana. O item 7.07 foi reclassificado como parcial após uma ocorrência intermitente de conflito durante a regressão. São estados de cobertura técnica; não significam 109 resultados de aprendizagem comprovados. Consulte `MATRIZ_DE_ATENDIMENTO.md` e `.json` para as 134 linhas individuais.

## 4. O que foi feito com imagens e ícones

A 2.1.2 já continha as sete capas ilustradas da VP01, 24 pictogramas próprios e 12 avatares. A comparação dos arquivos confirmou preservação, e não um redesenho de todos os elementos naquela entrega.

Nesta 2.1.3 foram geradas quatro novas capas: **Batatinha Quando Nasce**, **A Raposa e as Uvas**, **No Jardim da Escola** e **Vitamina Gostosa de Banana**. O acervo passa a ter **11 capas ilustradas** e **quatro capas funcionais vetoriais para EJA**. Os **24 pictogramas** e **12 avatares** foram preservados e receberam uso e acabamento mais consistentes. Os **29 vetores didáticos** continuam disponíveis. Ícones utilitários Lucide e alguns símbolos textuais permanecem nas atividades; não se afirma substituição integral de todos os símbolos por imagens novas.

A identidade continua verde, com personagem original, fundo claro, acentos discretos e fontes locais. Não foi comprado um pacote comercial de imagens. Os créditos e prompts estão em `CREDITOS_VISUAIS_2.1.3.md` e `PROMPTS_VISUAIS_2.1.3.json`. A coleção pode ser vista abrindo `PREVIA_VISUAL.html` na pasta extraída; as telas reais exigem executar o programa.

## 5. Verificações e limites

- Instalação independente com `npm ci`; TypeScript e build de cliente/servidor aprovados.
- **120 testes do programa e 18 do caderno**, total de **138**, sem falhas; **11** verificações históricas aprovadas.
- **94 verificações de integração**: 38 de regressão, 19 de relatórios/Família/EJA, 22 de apoios/expressão/imagens/responsividade, nove de produção/offline e seis de instalação/reinício. São passos sintéticos, não sessões com pessoas.
- Imagens do acervo decodificadas no navegador; acervo sem transbordamento horizontal em 390, 768 e 1280 px. Fluxos móveis incluem fonte extra-ampliada.
- **Sete telas sem violações automáticas** nos critérios executados pelo axe-core. A amostra não certifica conformidade integral com WCAG nem usabilidade com leitor de tela.
- Consulta `npm audit --omit=dev` reportou zero vulnerabilidades conhecidas de produção nesta data; isso não é uma auditoria de invasão.
- Build com avisos de arquivos maiores que 500 kB. Não foi provado desempenho sob carga de múltiplas escolas. O adaptador Firestore usa consultas amplas e limite operacional por lote, exigindo avaliação na escala prevista.
- Produção exige Firestore autorizado. O ensaio de recarga offline usou compilação de produção com uma fixture sintética externa; não habilita banco local para uso escolar publicado.

Os resultados detalhados estão em `verificacao/RESULTADOS_2.1.3.json`. Os arquivos de execução, credenciais, bases de teste e capturas de navegador não fazem parte do pacote.

### Ocorrência intermitente registrada

Uma execução com recargas e envio de respostas apresentou conflito de revisão e manteve os registros na fila local, sem confirmar a gravação no servidor. Duas repetições isoladas posteriores completaram os 22 passos e enviaram as 15 evidências esperadas. A causa exata da ocorrência não foi determinada. Ela não foi ocultada pela contagem dos testes aprovados: a ausência de perda e de bloqueio em todas as combinações de recarga e envio **não está homologada**. O item 7.07 permanece parcial. Antes de dados reais, repetir esse cenário, conferir a conciliação e corrigir eventual conflito indevido.

## 6. Próximo ajuste e critérios para encerrar

1. Investigar a ocorrência intermitente de sincronização descrita acima e executar o cenário com recarga durante envio até ter uma conclusão rastreável. Em seguida, importar a cópia 2.1.3 no ambiente desejado, conferir frontend e servidor e configurar Firestore, IAM/ADC e segredos. A chamada Gemini é opcional e depende de modelo e cota disponíveis.
2. Conferir criação de contas, gravação após reinício da instância, vínculos, backup e restauração com uma base sintética no destino.
3. Aplicar o roteiro da etapa F com professores, leitores, não leitores, familiares e público EJA, em dispositivos e navegadores reais; registrar consentimentos e evidências conforme o instrumento.
4. Conferir compreensão de ícones e comandos, áudio, CAA, teclado, leitor de tela e carregamento em aparelho simples. Só então registrar homologação humana e encerrar as pendências correspondentes da matriz.

Essas etapas exigem o ambiente institucional e a participação de pessoas; não foram representadas como realizadas nesta auditoria.
