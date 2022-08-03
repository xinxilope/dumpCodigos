# Requisitos

Alguns programas/ferramentas basicas para rodar a aplicação:

* Docker
* NodeJS(v16.13.2) e npm(v8.1.2)
* VScode e extensão da IBM for blockchain
* O banco de dados off-chain utilizado no projeto foi o MongoDB Atlas, é necessario criar uma conta para posteriormente conectar a aplicacao ao banco de dados atraves da conection string

---


## Realizando o deploy do smart contract no environment

1 - Após baixar o projeto, abra a pasta do "smart-contract" no vscode e clique na extensão da IBM for blockchain

![img](readme/8.png)

Faça o "package" do smart-contract

![img](readme/9.png)

E selecione a opção tag.gz

![img](readme/10.png)

2- Após realizar o package, conecte-se ao fabric environments


![img](readme/11.png)

E realize o deploy da package criada recentemente, aperte em "next" ate realizar o deploy

![img](readme/12.png)

---

## Exportando o Connection Profile

1 - Abra a extensão da IBM;

![img](readme/1.png)

2 - Em Fabric Gateways, exporte o connection profile clicando com o botão direito em Org1 Gateway > Export Connection Profile

![img](readme/3.png)

3 - Defina o nome do arquivo como 'connection.json' e salve dentro da pasta API (substituindo o atual se houver)

![img](readme/4.png)

4 - Na pasta API, edite o arquivo 'config.json', alterando o item atual de 'caName' para o contido dentro de 'connection.json' > "certificateAuthorities".

ex: "org1ca-api.127-0-0-1.nip.io:8090"

![img](readme/5.png)

![img](readme/6.png)

---


## Conectando ao MongoDB Atlas pela connection String

1- Dentro da Pasta API, crie um arquivo chamado .env

![img](readme/16.png)

2- No site do mongoDB clique em "all clusters", connect, e selecione a segunda opção

![img](readme/7.png)
![img](readme/17.png)

3- Copie a sua connection String, e dentro do arquivo .env, cole ela atribuindo a variavel MONGO_URI e trocando seu usuario/senha/nome_da_database respectivamente com o da sua conta (a database sera criada automaticamente com o nome colocado na connection string, caso ela nao exista)

ex: MONGO_URI=mongodb+srv://**SEU_USUARIO**:**SUA_SENHA**@nodeexpressprojects.vcris.mongodb.net/**NOME_DO_SEU_DATABASE**?retryWrites=true&w=majority

---
## Instalando as dependencias do projeto na pasta "API" e "smart-contract"

1- No VScode abra a pasta principal do projeto

![img](readme/13.png)

2- Navegue ate a pasta do smart-contract pelo terminal e execute o "npm install"

![img](readme/14.png)

3- Apos instalar as dependencias, navegue ate a pasta da API pelo terminal e execute novamente o "npm install"

![img](readme/15.png)

---

## Ultimas etapas

1- Ainda com o terminal na pasta da API rode o arquivo "EnrollAdmins", atraves do comando:
"node .\enrollAdmin.js"

![img](readme/18.png)

2- Agora o programa ja esta pronto para rodar, basta dar o comando "npm start" (com o terminal na pasta da API)

![img](readme/19.png)