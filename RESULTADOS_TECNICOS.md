# Verificação técnica — FluiLer Premium 2.1.3

Data: 01/11/2026. Dados exclusivamente sintéticos. A versão publicada e o banco escolar não foram alterados.

| Conferência | Resultado |
|---|---|
| Instalação limpa independente | `npm ci` e `npm run check` aprovados; sem links locais no pacote |
| TypeScript | Aprovado |
| Testes do programa | 120 aprovados, zero falhas |
| Testes do caderno da etapa F | 18 aprovados, zero falhas |
| Verificações históricas | 11 aprovadas |
| Build | Cliente, servidor e cache de 96 arquivos públicos |
| Regressão pedagógica e acessos | 38 verificações aprovadas |
| Relatórios, Família e EJA | 19 verificações aprovadas |
| Apoios, expressão, comunidade, imagens e responsividade | 22 verificações aprovadas |
| Compilação e recarga sem conexão | 9 verificações aprovadas |
| Instalação, gravação e reinício | 6 verificações aprovadas |
| Acessibilidade automatizada | Sete telas, zero violações nos critérios executados com axe-core |
| Dependências de produção | Zero vulnerabilidades conhecidas reportadas por npm audit nesta consulta |
| Acervo | Quinze textos e 223 registros lexicais; sete textos preservados e oito acréscimos identificados |
| Etapa F com participantes | Zero sessões; instrumentos prontos |

Os 94 passos de integração acima são verificações sintéticas, não participantes humanos. Os testes do programa e do caderno totalizam 138. As sete telas examinadas são: professor, relatório, início EJA, percursos EJA, pareamento/expressão, pareamento em celular e produção escrita EJA. Foram usados critérios WCAG 2 e 2.1 A/AA da ferramenta; isso não equivale a certificação integral de acessibilidade.

O ensaio de produção usa uma fixture externa com repositório sintético. Confirmou recarga offline e envio único após reconexão, sem APIs no cache público. A aplicação entregue continua recusando banco local em produção. Os testes de ditado e de devolutiva da IA simulam essas integrações; não houve chamada real ao Gemini nem acesso ao Firestore institucional.

O acervo foi examinado em larguras de 390, 768 e 1280 pixels; os testes de celular incluem fonte extra-ampliada. Isso não mede desempenho em aparelho escolar real. O build aprovado ainda informa chunks maiores que 500 kB, incluindo a fonte completa dos PDFs. Não houve ensaio em Windows, Docker, Cloud Run ou sob carga simultânea de escolas.

Resultados detalhados: `verificacao/RESULTADOS_2.1.3.json`. Conclusões, achados corrigidos e pendências: `AUDITORIA_2.1.3.md`. Documentos nomeados como 2.1.2 permanecem como histórico.

**Ressalva:** uma execução anterior apresentou conflito intermitente e fila local pendente. Duas repetições isoladas passaram; a causa não foi determinada. O item 7.07 permanece parcial. Consulte a auditoria antes de homologar a sincronização para dados reais.
