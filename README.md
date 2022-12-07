<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">Autor</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJS]
- [Express]
- [Jest]
- [Winston]
- [Jest]
- [Supertest]
- [Node-LocalStorage]
- [Crypto]
- [MongoDB]

  
## 💻 Projeto

O projeto é uma aplicação em NodeJS para realizar um CRUD completo de petições e assinaturas, além de aplicar testes automatizados utilizando o Jest e o Supertest. 

## 💻 Rotas e utilização

Rota: localhost:3000/api/authUser
Para autenticar o usuário deve-se utilizar o método GET, e passar os PARAMS username e password. Exemplo:
<img src="../peticoesMongoDB/public/assets/authUser.png" />


Rota: localhost:3000/api/peticoes
Para visualizar as petições deve-se estar autenticado e utilizar o método GET. Exemplo:
<img src="../peticoesMongoDB/public/assets/allPetitions.png" />

Rota: localhost:3000/api/peticao
Para visualizar as uma petição específica deve-se estar autenticado e utilizar o método GET, passando o _id como PARAM (_id para teste: 636993580940c23c6f69d2dd). Exemplo:
<img src="../peticoesMongoDB/public/assets/getPeticao.png" />

Rota: localhost:3000/api/incluir/peticao
Para incluir uma petição deve-se estar autenticado e utilizar o método POST, passando os seguintes campos como PARAM -> titulo, descricao e meta (os outros campos são preenchidos com os dados do usuario logado). Exemplo:
<img src="../peticoesMongoDB/public/assets/addPeticao.png" />

Rota: localhost:3000/api/atualizar/peticao
Para atualizar uma petição deve-se estar autenticado e utilizar o método GET, passando os seguintes campos como PARAM -> _id, titulo, descricao e meta. Exemplo:
<img src="../peticoesMongoDB/public/assets/updatePeticao.png" />

Rota: localhost:3000/api/deletar/peticao
Para deletar uma petição deve-se estar autenticado, ser o criador da petição e utilizar o método GET, passando o _id da petição como PARAM. Exemplo:
<img src="../peticoesMongoDB/public/assets/deletarPeticao.png" />

Rota: localhost:3000/api/assinar/peticao
Para assinar uma petição deve-se estar autenticado, e utilizar o método GET, passando o id_peticao da petição como PARAM (lembrando que não é possível assinar a mesma petição duas vezes). Exemplo:
<img src="../peticoesMongoDB/public/assets/assinarPeticao.png" />

## ✍🏾 Autor

<img src="https://avatars.githubusercontent.com/u/62265013?s=400&u=20edcf38588be64a829cb73e1ef715ce62da8de7&v=4" width="100px;" />

