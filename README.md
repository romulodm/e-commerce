# :mag_right: Visão Geral
<p align="justify">
Comecei esse projeto com o objetivo de explorar algumas das tecnologias mais demandadas no mercado para desenvolvedores web. O intuito foi aprimorar meu conhecimento sobre o funcionamento da web, indo além do que foi visto na minha graduação. 
</p>
<br>

 # 	:seedling: Tecnologias
 **Front-end:**

 - `React`
 - `Redux`
 - `Styled Components`
 - `Material UI`
 - `Axios`


**Back-end:**
 - `Express`
 - `CORS`
 - `MySQL`
 - `Crypto-JS`
 - `JWT`
 - `Nodemailer`

<br>

# :clipboard: Funcionalidades

:heavy_check_mark: `Login`

:heavy_check_mark: `Cadastro`

:heavy_check_mark: `Recuperação de Senha`

:heavy_check_mark: `Listagem de Produtos`

:heavy_check_mark: `Visualização de Produtos`

:heavy_check_mark: `Carrinho de Compras`

:hourglass_flowing_sand: `Lista de Favoritos`

:hourglass_flowing_sand: `Filtragem de Produtos`

:hourglass_flowing_sand: `Painel Administrativo`


<br>

# :hammer_and_wrench: Rodar o Projeto
1º - Instalar o **Node.js**

2º - Para baixar todas as dependências do projeto, navegue até as pastas **app** e **api** e execute o comando: **npm install**

3º - Crie um Banco de Dados MySQL e execute os comandos disponíveis no arquvio <a href="https://github.com/romulodm/E-commerce/blob/main/model.sql">model.sql</a>

4º - Na pasta **api** crie um arquivo chamado **vars.env** com o seguinte <a href="https://github.com/romulodm/E-commerce/blob/main/model.env">modelo</a> onde os valores representam:
 
| Nome | O que é | 
| :-: | - |
| **PORT** | porta do seu localhost |
| **DB_HOST** | link do seu Banco de Dados |
| **DB_USER** | nome de usuário do seu DB |
| **DB_PASS** | senha do usuário escolhido |
| **DB_NAME** | nome do DB criado |
| **JWT_SEC** | senha para criação do web token |
| **PASS_SEC** | senha usada para criptografar as senhas |
| **EMAIL_NAME** | e-mail que será usado para envio de códigos |
| **EMAIL_PASS** | <a href="https://support.google.com/accounts/answer/185833?hl=pt-BR)https://support.google.com/accounts/answer/185833?hl=pt-BR">senha de app</a> cadastrada para este e-mail  |

5º - Execute o comando **npm start** tanto na pasta **app** quanto na pasta **api**

