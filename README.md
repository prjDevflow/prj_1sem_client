# ABP - 1º Semestre

![Preview-Screens](https://github.com/prjDevflow/Index/blob/main/Documentation/images/examplePages.png)

Caso deseje dar uma olhada no protótipo na versão Desktop, acesse [aqui](https://www.figma.com/design/H9ykp2tUglsJ3HM4xhpoqe/Untitled?node-id=0-1&t=hBgk1VTakJzf9dWQ-1).
Ou na versão Mobile, [aqui](https://www.figma.com/design/H9ykp2tUglsJ3HM4xhpoqe/Untitled?node-id=101-120&m=dev&t=hBgk1VTakJzf9dWQ-1).

## Sobre o Projeto

A ideia do projeto é:

_"Desenvolver um sistema web para que a comunidade acadêmica possa consultar os horários das aulas"._

A cada semestre, as coordenações de curso, juntamente com a secretaria acadêmica, montam os
horários de aula e alocam as aulas nos ambientes da faculdade, como salas de aula e laboratórios. 
Normalmente, são divulgados os horários de aula para a comunidade acadêmica por meio dos murais da
faculdade e e-mail. No entanto, a cada alteração no horário de professores, disciplinas ou
ambientes, é necessário refazer os informes impressos.

A partir dessa problemática, surgiu a necessidade de um sistema para a consulta dos horários das aulas por
curso, ambiente, turno (diurno e noturno) e turma.

## Colaboradores

| Colaborador                     | Cargo      | GitHub                                  |
|---------------------------------|------------|-----------------------------------------|
| Lucas Cauã Soares de Paiva | Product Owner | [Link](https://github.com/Lucaspaiva11) |
| Eduardo da Silva Machado | Scrum Master | [Link](https://github.com/EduMachado07) |
| Matheus da Cunha Soldesi | Developer | [Link](https://github.com/Soldesi) |
| Matheus Venancio Moreira Sales | Developer | [Link](https://github.com/MatheusSales95) |
| Pedro Henrique Bernardo Barbosa | Developer | [Link](https://github.com/P3droGs) |
| Rafael Vitor de Medeiros Costa| Developer | [Link](https://github.com/Raflael) |

## Sprints

| Sprint | Início     | Entrega     | Trello |
|--------|------------|-------------|--------|
| 01     | 18/03/2025 | 15/04/2025  | [Link](https://trello.com/b/qOWm2Dro/sprint-1) |
| 02     | 16/04/2025 | 15/05/2025  | [link](#sprint-02) |
| 03     | 16/05/2025 | 10/06/2025  | - |


Para visualizar as informações das sprints do projeto, acesse o quadro do Trello [aqui](https://trello.com/invite/b/67cf74d4a47f8308a0bd9c9b/ATTI30ae049e04f5319833ecaf3ba7456af94CA286F4/projeto-abp-1-sprint).

## Product Backlog

- Requisitos Funcionais
   - RF01 – Fazer a ingestão de dados no sistema a partir de uma fonte tal como um arquivo CSV.
   - RF02 – (opcional) Fazer o gerenciamento dos dados do sistema (CRUD) através da interface da aplicação, permitindo que a secretaria acadêmica/coordenação altere os dados por meio de uma tela da aplicação
   - RF03 – Garantir que o cadastro ou a ingestão de dados satisfaça as regras básicas de alocação da faculdade (ex.: duas turmas diferentes não podem ser alocadas na mesma sala, e um professor não pode ter duas turmas no mesmo horário).
   - RF04 – Permitir que o sistema exporte relatórios/mapas de ambientes e horários em formato PDF.
   - RF05 – Permitir consultas no sistema (ex.: por turma e turno) para apoiar a gestão da faculdade.

- Requisitos Não Funcionais
   - RNF01 – Exibir um mapa de salas com a opção interativa para visualizar a situação do ambiente (ex. aulas alocadas ao longo dos turnos do dia);
   - RNF02 – Garantir que o sistema seja responsivo, mantendo um layout consistente em dispositivos móveis e preservando a arquitetura de informação da interface.

- Restrições
   - R01 – O sistema deve ser prototipado e validado utilizando o Figma.
   - R02 – Deve seguir o catálogo de tecnologias do semestre:
      - Ser codificado usando HTML, CSS e JavaScript;
      - Utilizar o SGBD PostgreSQL;
      - Implementar o servidor utilizando JavaScript;
      - Manter a documentação e projeto em um repositório público do GitHub, e
      - Utilizar alguma ferramenta de controle de tarefas.
    
## UML

![Preview-Screens](https://github.com/prjDevflow/Index/blob/main/Documentation/images/UML.png)

##  User Stories

| Id Requisito | Remetente    | Instrução                     | Finalidade  |
|--------------|--------------|-------------------------------|-------------|
| RF01         | Como usuário administrativo (secretaria acadêmica)        |  Quero importar dados no sistema a partir de um arquivo CSV  | Para que os dados da faculdade possam ser facilmente carregados no sistema sem a necessidade de inserção manual   |
| RF02         |  Como usuário administrativo (secretaria acadêmica)       | Quero gerenciar os dados do sistema por meio de uma interface  | Para que eu possa fazer alterações, inclusões ou exclusões diretamente na aplicação   |
| RF03         | Como administrador acadêmico        | Quero que o sistema impeça que duas turmas sejam alocadas na mesma sala no mesmo horário  | Para que eu possa garantir que não existam conflitos físicos de espaço no cronograma da faculdade   |
| RF04         | Como administrador acadêmico        | Quero exportar relatórios e mapas de ambientes e horários em formato PDF  | Para que eu possa compartilhá-los com a equipe, professores e coordenação de forma padronizada e acessível   |
| RF05         | Como coordenador ou administrador acadêmico        | Quero realizar consultas no sistema por critérios como turma e turno  | Para que eu possa acessar rapidamente informações relevantes para a gestão acadêmica   |
| RFN01         | Como gestor acadêmico ou coordenador        | Quero visualizar um mapa interativo das salas com a ocupação por turnos ao longo do dia  | Para que eu possa entender rapidamente a utilização dos ambientes e tomar decisões mais assertivas de alocação   |
| RFN02         | Como usuário do sistema       | Quero que o sistema se adapte automaticamente ao dispositivo que estou utilizando (computador, tablet ou celular)  | Para que eu tenha uma boa experiência de uso, independentemente do tamanho da tela   |

## Critérios de Aceitação

| Id Requisito  | Critérios de Aceitação |
|---------------|---------------|
| RF01          | 1- O sistema deve permitir o upload de arquivos CSV. <br> 2- O sistema deve ler e processar corretamente os dados do arquivo. <br>  3- O sistema deve informar ao usuário sobre possíveis erros no arquivo (Ex: dados mal formatados ou campos obrigatórios ausentes).| 
| RF02          | 1- Quando eu estiver na interface, o sistema deve carregar os registros e permitir visualizar, editar ou excluir as suas informações. <br> 2- O sistema deve incluir um botão para criar um novo registro e abrir um formulário para adiicionar as informações.| 
| RF03          | 1- O sistema deve impedir o cadastro de uma nova turma caso já exista outra turma alocada na mesma sala, no mesmo dia e horário.<br> 2- A verificação de conflito deve considerar o intervalo completo da aula (início e fim), não apenas o horário de início. <br> 3- A mensagem de erro deve indicar claramente qual é a turma em conflito, o horário e a sala. <br> 4- A validação deve ocorrer tanto no cadastro manual quanto na importação de dados. <br> 5- O sistema deve permitir o cadastro se as turmas forem em horários diferentes, mesmo que na mesma sala.  | 
| RF04          | 1- O sistema deve oferecer a opção de exportar relatórios diretamente da interface de visualização de ambientes e horários.<br> 2- O arquivo gerado deve estar no formato PDF e conter todas as informações visíveis na tela selecionada.<br> 3- O layout do PDF deve ser organizado, legível e respeitar a estrutura do mapa/relatório exibido na tela.<br> 4- O sistema deve notificar o usuário caso ocorra alguma falha na geração do arquivo.  | 
| RF05          | 1- O sistema deve permitir filtros de busca por pelo menos os seguintes campos: turma, turno.<br>  2- O sistema deve exibir os resultados da consulta de forma clara e organizada, em formato de tabela. <br> 3- O sistema deve permitir exportar os resultados da consulta em PDF. <br> 4- Caso não haja resultados para os filtros aplicados, o sistema deve exibir uma mensagem amigável de "nenhum dado encontrado".| 
| RNF01          | 1- O sistema deve exibir um mapa (grade ou planta).<br> 2- O usuário deve poder clicar ou passar o mouse sobre uma sala para visualizar detalhes como: turma, horário e professor alocados. <br> 3- A interface deve ser responsiva, funcionando em diferentes tamanhos de tela.        | 
| RNF02          | 1- A interface do sistema deve se ajustar automaticamente a diferentes resoluções de tela (desktop, tablet e mobile).<br> 2- Os elementos de navegação devem permanecer funcionais e visíveis em qualquer dispositivo. <br> 3- O conteúdo principal (como relatórios, mapas de salas, listas de turmas) deve se reorganizar para manter a legibilidade em telas menores.| 
 
## Sprint 01

Nesta primeira sprint, o foco foi iniciar a estruturação do sistema, 
com atividades que envolvem tanto o planejamento conceitual quanto o desenvolvimento inicial da interface e funcionalidades principais. 
A equipe se concentrou em atividades essenciais para estabelecer a base do projeto, garantindo uma base sólida para as próximas etapas.

### Sprint Backlog
| Story Points  | Tarefa                                    |
|---------------|-------------------------------------------|
| 13 pts        | Criar modelo conceitual do banco de dados  |
| 3 pts         | Criar botão para exportar mapa/relatório em pdf  |
| 31 pts        | Criar página para consultar as aulas de cada curso  |
| 13 pts        | Criar mapas interativos das salas  |
| 5 pts         | Criar layout responsivo para aplicativos móveis  |
| 13 pts        | Prototipar as telas do sistema no Figma  |
| 9 pts         | Criar página inicial  |
| 5 pts         | Criar o banco de dados  |
| 5 pts         | Criar modelo UML  |

- Botão de exportação para PDF (RF04) em andamento.
- Página de consulta das aulas (RF05) e mapas interativos (RNF01) em andamento.

### Burndown

![Preview-Screens](https://github.com/prjDevflow/Index/blob/main/Documentation/images/Burndown.PNG)

### Sprint Retrospective

_**1. O que funcionou bem durante o sprint?**_
   
   A divisão de tarefas foi feita de maneira clara, 
   o que evitou sobrecarga de trabalho e garantiu que todos os membros do time estivessem focados em suas responsabilidades específicas. 
   
   O envolvimento e o entusiasmo dos desenvolvedores também contribuíram para um ambiente colaborativo e altamente produtivo, 
   com troca constante de feedbacks e ideias.
   
_**2. O que não funcionou tão bem durante o sprint?**_

   A saída de um integrante da equipe durante o sprint gerou um impacto negativo na distribuição de tarefas e na carga de trabalho dos demais membros. 
   Isso exigiu uma reestruturação rápida das responsabilidades e ajustes no planejamento.
      
_**3. Quais ações podemos tomar para melhorar no próximo sprint?**_

   Melhorar a organização e a consistência do registro das Dailys, garantindo que sejam documentadas diariamente, com anotações claras e objetivas dos pontos discutidos.
   
   Facilitando o acompanhamento do progresso da equipe, identificar rapidamente impedimentos recorrentes e promover maior transparência no andamento das tarefas

## Sprint 02

Nesta sprint, o time foi responsável por implementar funcionalidades essenciais voltadas à área administrativa do sistema, com foco principal na Secretaria, incluindo autenticação, gestão de dados, visualização de aulas e criação das rotas do backend. Além disso, realizamos melhorias no layout geral da aplicação, visando uma experiência mais moderna e intuitiva.

### Sprint Backlog

**1. Alterações no visual do sistema (RNF02 - 5 pts)**

✔️ Atualizamos o layout das principais telas, tornando-o mais moderno e responsivo.

_Responsável:_ Rafael Costa

**2. Página de autenticação da secretaria (RF02 - 3 pts)**

✔️ Criamos uma página de login funcional com validação, redirecionamento e interface alinhada ao novo visual do sistema.

_Responsável:_ Matheus Soldesi, Lucas Cauã

**3. Página da secretaria para visualizar, alterar e excluir dados (RF02 - 11 pts)**

✔️ Implementamos uma interface completa para a secretaria com funcionalidades de CRUD e feedback visual.

_Responsável:_ Rafael Costa, Eduardo Machado

**4. Modal interativo com o mapa de aulas por sala (RNF01 - 8 pts)**

✔️ Desenvolvido um modal que mostra a ocupação das salas por dia e horário, com layout responsivo.

_Responsável:_ Eduardo Machado, Pedro Henrique, Lucas Cauã

**5. Consultas e revisão da estrutura do banco (RF03 - 8 pts)**

✔️ Criamos as consultas básicas para simular interações com o banco e validar a estrutura dos dados.

_Responsável:_ Matheus Venancio, Pedro Henrique

**6. Documentação da sprint (8 pts)**

✔️ Documentamos o progresso no GitHub e elaboramos um vídeo explicativo.

_Responsável:_ Eduardo Machado, Matheus Soldesi, Rafael Costa

**7. Grade com horários das turmas e professores (RF05 - 8 pts)**

✔️ A funcionalidade permite a visualização das grades de cada turma, consumindo dados da API.

_Responsável:_ Eduardo Machado

**8. Autenticação da secretaria - backend (RF02 - 3 pts)**

✔️ A rota de autenticação foi implementada, retornando token ou erro conforme as credenciais.

_Responsável:_ Rafael Costa

**9. Rota de consulta à grade de horários por turma (RF05 - 8 pts)**

✔️ Criada rota que retorna os dados estruturados da grade, com horários e dias da semana.

_Responsável:_ Matheus Venancio, Pedro Henrique

**10. Cadastro de dados via arquivo CSV (RF01 - 11 pts)**

✔️ A rota permite o envio de arquivos CSV para inserção automatizada de dados no banco.

_Responsável:_ Eduardo Machado

**11. Validação de entrada da secretaria (RF02 - 3 pts)**

✔️ Implementada validação na rota de login com retorno de status apropriado e geração de token.

_Responsável:_ Rafael Costa

**12. Rota para buscar aulas de uma sala por dia da semana (RNF01 - 11 pts)**

✔️ Desenvolvida rota que retorna as aulas de uma sala específica, com filtro por dia da semana.

_Responsável:_ Matheus Soldesi, Lucas Cauã

### Burndown

![Preview-Screens](https://github.com/prjDevflow/Index/blob/main/Documentation/images/BourndownSprint2.png)

### Sprint Retrospective

_**1. O que funcionou bem durante o sprint?**_
   
   A equipe demonstrou comprometimento em aprender e superar os desafios técnicos, especialmente na parte do backend, mesmo com a limitação de conhecimento prévio.

   A colaboração entre os membros foi essencial para compartilhar descobertas e ajudar uns aos outros durante o processo de aprendizagem.
   
_**2. O que não funcionou tão bem durante o sprint?**_

   A falta de familiaridade da maioria do time com o desenvolvimento backend resultou em atrasos nas entregas e dificuldade para seguir o planejamento inicial.

   Além disso, o tempo necessário para entender novas tecnologias acabou sendo subestimado no planejamento.
      
_**3. Quais ações podemos tomar para melhorar no próximo sprint?**_

   Incluir um tempo de "imersão técnica" no início da sprint para estudo coletivo dos temas mais desafiadores.

   Ajustar as estimativas no planejamento com mais margem para tarefas que envolvem aprendizado de novas tecnologias.


   ![Preview-Screens](https://github.com/prjDevflow/prj_1sem_client/blob/main/Documentation/images/Bourndown_Sprint3.png)




