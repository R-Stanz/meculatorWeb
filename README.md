# :checkered_flag: Meculator Web

A web application of a mechanics calculator. 

## :technologist: Stanz

556361, Stanz CC.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Initially this application should accept only signed users and the required admin.

> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :spiral_calendar: Entidades ou tabelas do sistema

Users, vectors, moments of force, planes/dimensions.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Initially capable of accepting and manipulating vectors and momentums and making unit convertions, all focused on physics applications.
Each user shoud be capable of using/accessing the tables that they have created.


----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Vue, Html, Css, Vue-router, Vee-validate, Vee-validate rules, Bootstrap Icons, Vite, Eslint, Prettier, Pinia, Axios, Vue-axios.

**Backend:**

Strapi.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Users 1   | X |   | X |   |
| Vectors 2 | X | X | X | X |
| Moments 3 | X |   |   |   |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/vectors/|
| POST | api/vectors/ |
