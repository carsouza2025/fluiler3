# Atendimento das demandas — revisão 2.1.3

O anexo contém 120 demandas de ajuste e 14 requisitos de preservação, totalizando 134 linhas. A matriz distingue implementação técnica, configuração no destino e validação com pessoas. Os resultados atuais e os limites de conferência estão em `AUDITORIA_2.1.3.md` e `verificacao/RESULTADOS_2.1.3.json`.

A implementação foi reconstruída e novamente testada. Não houve publicação na conta Google, migração de dados reais, chamada real à IA nem sessões com participantes. A seção 16 permanece pendente de aplicação.

## 2. RECURSOS QUE DEVEM SER PRESERVADOS

Sete textos recebidos preservados e oito acréscimos editoriais identificados; sem alegação de recuperação dos originais ausentes.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 2.01 | Identidade visual e pedagógica do FluiLer — Engenhoca Educacional. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.02 | Trilha Pedagógica dos Elementos, seus ambientes, personagens e funcionalidades. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.03 | Áreas do Aluno, Professor e Família. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.04 | Atividades de alfabetização inicial, letras e sons. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.05 | Famílias silábicas e experiências fonológicas. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.06 | Banco de palavras e estruturas silábicas simples e complexas. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.07 | Formação de palavras, consciência de palavras e consciência de rimas. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.08 | Jogos, atividades interativas e desafios existentes. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.09 | Leitura guiada, gêneros textuais e acervo de histórias. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.10 | Produção textual, compreensão leitora e atividades de oralidade. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.11 | Sondagens e avaliações diagnósticas. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.12 | Registros de evidências formativas, progresso e relatórios. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.13 | Recursos de acessibilidade, áudio e imagens já implementados. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |
| 2.14 | Serviços de armazenamento e integrações entre componentes. | Preservado | `src/App.tsx`<br>`tests/visualCommunication.test.ts` |

## 3. Nova página inicial da Área do Aluno

Quatro entradas com áudio, sugestão e retomada. Reconhecimento por não leitores exige observação real.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 3.01 | Reorganizar a página inicial com menos informações simultâneas. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.02 | Criar botões grandes, ilustrados e acompanhados de áudio. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.03 | Destacar as opções COMEÇAR e CONTINUAR. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.04 | Organizar quatro entradas principais: OUVIR HISTÓRIAS, BRINCAR COM PALAVRAS, JOGAR e CRIAR. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.05 | Utilizar ilustrações facilmente reconhecíveis por estudantes não leitores. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.06 | Criar navegação simples, com botão de retorno ao início. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.07 | Manter a trilha, o avatar, os cenários e o progresso existente. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.08 | Oferecer uma atividade sugerida, sem impedir que o estudante escolha outra. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |
| 3.09 | Disponibilizar um modo simplificado com redução de estímulos. | Implementado em código | `src/components/StudentHomeDashboard.tsx`<br>`src/utils/studentResume.ts` |

## 4. Histórias ilustradas e interativas

Texto, imagem, descrição, zoom e sequência relacionados ao gênero; modalidades sem suporte não são forçadas.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 4.01 | Acrescentar imagens aos acontecimentos principais das histórias. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.02 | Relacionar as ilustrações aos trechos correspondentes. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.03 | Manter os personagens e cenários visualmente consistentes. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.04 | Permitir leitura acompanhada de imagem, texto e narração. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.05 | Oferecer ampliação de imagens e descrições acessíveis. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.06 | Utilizar sequências visuais para trabalhar começo, meio e fim. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.07 | Criar atividades de associação entre imagem e acontecimento. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.08 | Ilustrar etapas de receitas e outros textos funcionais, respeitando suas características. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |
| 4.09 | Preservar a autoria e a redação dos textos. | Implementado em código | `src/utils/stageCVisuals.ts`<br>`src/data/editorialExpansion.ts`<br>`tests/recovery21.test.ts` |

## 5. Acessibilidade em todo o aplicativo

Preferências compartilhadas, contraste e foco. Inspeção automática parcial não certifica todo o aplicativo.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 5.01 | Padronizar letras normal, ampliada e extra-ampliada. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.02 | Utilizar comandos curtos, simples e objetivos. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.03 | Permitir repetir instruções em áudio. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.04 | Oferecer uma pergunta por vez. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.05 | Criar modo de redução de estímulos visuais e sonoros. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.06 | Padronizar botões grandes e contrastes adequados. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.07 | Evitar animações desnecessárias. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.08 | Permitir ajustar a velocidade da narração. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.09 | Manter preferências de acessibilidade entre atividades. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |
| 5.10 | Garantir acesso à Trilha dos Elementos por ícones e áudio, sem depender exclusivamente da leitura. | Implementado em código | `src/utils/accessibilityPreferences.ts`<br>`src/components/AccessibilityControls.tsx`<br>`src/index.css` |

## 6. Comunicação Aumentativa e Alternativa — CAA

CAA é apoio; escrita e fala mediada são descritivas. Ditado depende do navegador e pode usar conexão.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 6.01 | Incorporar pictogramas com palavras e áudio. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.02 | Oferecer cartões como SIM, NÃO, AJUDA, MAIS, QUERO, PAUSA, TERMINAR e NÃO ENTENDI. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.03 | Permitir responder atividades tocando em imagens. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.04 | Integrar pictogramas aos jogos e à leitura guiada. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.05 | Disponibilizar cartões para pedir ajuda, repetir ou interromper uma atividade. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.06 | Permitir respostas por imagem, palavra, toque ou oralidade, conforme a necessidade. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.07 | Utilizar símbolos claros, consistentes e com direitos de uso adequados. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.08 | Preservar os apoios de CAA utilizados pelo estudante. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |
| 6.09 | Não interpretar automaticamente o uso de CAA como dificuldade de aprendizagem. | Implementado em código | `src/components/CommunicationBoard.tsx`<br>`src/components/AlternativeResponsePanel.tsx` |

## 7. Segurança e preservação dos dados

Controles testados com dados sintéticos. Firestore, recuperação de infraestrutura e configuração real precisam de ensaio no destino.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 7.01 | Revisar autenticação e permissões dos três perfis. | Implementado em código | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.02 | Proteger informações individuais dos estudantes. | Implementado em código | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.03 | Restringir acesso aos relatórios e registros escolares. | Implementado em código | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.04 | Garantir a preservação do progresso. | Implementado em código | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.05 | Validar backup e recuperação de dados. | Implementado; conferir no destino | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.06 | Prevenir perda de informações durante atualizações. | Implementado em código | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.07 | Testar comportamento em caso de conexão instável. | Parcial; conflito intermitente requer investigação | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |
| 7.08 | Corrigir vulnerabilidades antes da utilização com dados reais. | Implementado; conferir no destino | `server/centralStore.ts`<br>`server/security.ts`<br>`src/services/centralSyncService.ts`<br>`tests/security.test.ts`<br>`tests/clientSync.test.ts` |

## 8. Ampliar jogos interativos de pareamento

Oito modos novos complementam letras/sílabas móveis e sequência. Imagens duplicadas e comparações não revisadas são excluídas.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 8.01 | Pareamento de imagem e palavra. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.02 | Pareamento de som e imagem. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.03 | Associação de letra e som. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.04 | Associação de sílaba e imagem. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.05 | Associação de frase e imagem. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.06 | Formação de palavras com letras móveis virtuais. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.07 | Formação de palavras com sílabas móveis. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.08 | Identificação dos sons iniciais e finais. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.09 | Jogos de memória com imagens e palavras. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |
| 8.10 | Organização de sequências de imagens. | Implementado em código | `src/components/MatchingGames.tsx`<br>`src/utils/matchingGames.ts`<br>`src/components/WordBuilderGame.tsx`<br>`src/components/VisualStoryActivity.tsx` |

## 9. Corrigir e aperfeiçoar atividades existentes

Palavras são verificadas no texto. Rimas e comparações externas são identificadas. Ausência de tarefa pertinente é informada.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 9.01 | Corrigir inconsistências na geração de rimas. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.02 | Garantir que palavras e desafios correspondam ao texto selecionado. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.03 | Evitar atividades genéricas apresentadas como contextualizadas. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.04 | Preservar os feedbacks individuais das respostas. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.05 | Integrar corretamente as estratégias de recomposição dos 15 textos. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.06 | Garantir que mensagens de apoio correspondam aos recursos realmente exibidos. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.07 | Verificar a correção linguística e pedagógica dos desafios. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |
| 9.08 | Manter registros pelo mecanismo central de evidências formativas. | Implementado em código | `src/utils/readingContext.ts`<br>`src/utils/linguisticCore.ts`<br>`src/utils/reviewedRhymes.ts`<br>`src/utils/formativeEvidenceStorage.ts` |

## 10. Integrar os níveis de aprendizagem à Trilha dos Elementos

Três caminhos de apoio, ajuste docente e escolha do estudante; não há classificação por idade ou diagnóstico.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 10.01 | Relacionar atividades a habilidades específicas da alfabetização. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.02 | Diferenciar reconhecimento, associação, formação, leitura, compreensão e produção. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.03 | Permitir ao professor ajustar a complexidade. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.04 | Oferecer retomadas e apoios conforme as evidências. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.05 | Mostrar ao estudante onde está e qual atividade pode realizar em seguida. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.06 | Permitir escolher outras atividades sem bloqueios desnecessários. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.07 | Registrar os apoios utilizados durante a aprendizagem. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.08 | Integrar os elementos da trilha aos relatórios individuais. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |
| 10.09 | Evitar classificações rígidas baseadas apenas em série, idade ou diagnóstico. | Implementado em código | `src/utils/pedagogicalMatrix.ts`<br>`src/utils/bnccAlignment.ts`<br>`src/utils/learningSupport.ts`<br>`src/utils/studentTrail.ts` |

## 11. Atividades para Educação de Jovens e Adultos — EJA

Seis situações e 18 perguntas, mais situação local docente. EJA abre quatro textos cotidianos; o acervo completo fica acessível por escolha.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 11.01 | Desenvolver atividades com compras e preços. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.02 | Trabalhar listas, receitas e mensagens. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.03 | Incluir leitura de calendário e horários. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.04 | Explorar situações de transporte e trabalho. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.05 | Trabalhar formulários simples e informações do cotidiano. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.06 | Utilizar imagens adequadas ao público jovem e adulto. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.07 | Evitar infantilização de textos, personagens e recompensas. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.08 | Reaproveitar o sistema de atividades, avaliações e relatórios. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |
| 11.09 | Adaptar os contextos à realidade da comunidade. | Implementado em código | `src/data/ejaContexts.ts`<br>`src/utils/communityActivity.ts`<br>`src/components/ContextLearningHub.tsx`<br>`src/components/EjaTrail.tsx`<br>`src/components/ContextFamilyArea.tsx` |

## 12. Aperfeiçoar os relatórios individuais

Cálculos, autoria e observações docentes separados. Comparação requer três tarefas com contexto e apoio comparáveis.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 12.01 | Reunir habilidades trabalhadas e desenvolvidas. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.02 | Apresentar avanços observados. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.03 | Indicar dificuldades que exigem apoio. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.04 | Registrar intervenções utilizadas. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.05 | Permitir observações e validação do professor. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.06 | Comparar períodos quando houver evidências suficientes. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.07 | Apresentar a evolução da Trilha dos Elementos. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.08 | Diferenciar resultados automáticos de observações docentes. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.09 | Oferecer relatório objetivo, legível e adequado ao acompanhamento escolar. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |
| 12.10 | Garantir sigilo das informações individuais. | Implementado em código | `src/components/PdfExportModal.tsx`<br>`src/utils/individualReport.ts`<br>`src/services/pedagogicalPdfService.ts` |

## 13. Melhorar a Área da Família

Família recebe apenas os dados vinculados e mensagem aprovada, sem observações docentes privadas.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 13.01 | Apresentar orientações simples de apoio à leitura. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.02 | Sugerir atividades com objetos e situações do cotidiano. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.03 | Disponibilizar instruções curtas e visuais. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.04 | Relacionar sugestões às habilidades trabalhadas. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.05 | Garantir acesso exclusivo aos dados do estudante autorizado. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.06 | Evitar linguagem excessivamente técnica. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |
| 13.07 | Não transformar o acompanhamento familiar em cobrança por desempenho. | Implementado em código | `src/components/FamilySupportPanel.tsx`<br>`src/utils/familySupport.ts`<br>`server/centralStore.ts` |

## 14. Melhorar o funcionamento em dispositivos reais

Emulação de telas e recarga offline foram verificadas em navegador; não substituem aparelhos físicos e conexão da escola.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 14.01 | Adaptar interfaces a celulares, tablets e computadores. | Implementado em código | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.02 | Otimizar imagens, áudios e carregamento. | Implementado em código | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.03 | Reduzir travamentos em aparelhos simples. | Implementado; conferir em dispositivo real | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.04 | Melhorar o comportamento com internet limitada. | Implementado em código | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.05 | Permitir retomada de atividades interrompidas, quando tecnicamente possível. | Implementado em código | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.06 | Evitar perda de respostas e progresso. | Implementado em código | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |
| 14.07 | Testar telas, áudios, botões e jogos em dispositivos utilizados nas escolas. | Implementado; conferir em dispositivo real | `src/App.tsx`<br>`scripts/buildOffline.mjs`<br>`src/utils/studentResume.ts`<br>`src/services/centralSyncService.ts` |

## 15. Identidade visual premium e inclusiva

Capas premium e personagens preservados, novos vetores locais e modo tranquilo. Reconhecimento e adequação cultural exigem observação.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 15.01 | Padronizar cores, tipografia, cartões e ícones. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.02 | Manter uma identidade visual própria do FluiLer. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.03 | Valorizar personagens e cenários existentes. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.04 | Criar ilustrações pedagógicas consistentes. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.05 | Evitar excesso de elementos decorativos. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.06 | Diferenciar visualmente as áreas do Aluno, Professor e Família. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.07 | Criar indicadores claros de atividade disponível, em andamento ou concluída. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |
| 15.08 | Garantir compatibilidade com o modo de redução de estímulos. | Implementado em código | `src/components/visual/PremiumIcon.tsx`<br>`src/utils/premiumVisualAssets.ts`<br>`PREVIA_VISUAL.html` |

## 16. Validação com estudantes e professores

Instrumentos prontos; zero sessões humanas concluídas. A aplicação supervisionada permanece pendente.

| Item | Demanda | Estado | Referências |
|---|---|---|---|
| 16.01 | Realizar testes supervisionados com estudantes leitores e não leitores. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.02 | Verificar se os comandos são compreensíveis. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.03 | Avaliar a autonomia na página inicial. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.04 | Observar o uso de jogos e respostas por imagens. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.05 | Testar recursos de acessibilidade e CAA com os usuários que deles necessitam. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.06 | Verificar se os relatórios são úteis ao professor. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |
| 16.07 | Registrar dificuldades observadas e corrigir antes de ampliar a aplicação. | Pendente de validação humana | `validacao/Caderno_Etapa_F.html`<br>`validacao/tarefas.json`<br>`validacao/FluiLer_Etapa_F_Roteiro_e_Fichas.docx` |

### Ressalva da revisão 2.1.3

O item 7.07 foi reclassificado como parcial: uma regressão apresentou conflito e fila local pendente; duas repetições posteriores passaram. A causa exata ainda não foi determinada. Consulte a ocorrência em `AUDITORIA_2.1.3.md` antes de homologar o uso com dados reais.
