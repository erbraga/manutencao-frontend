# manutencao-frontend

<br>

## Descrição

Este projeto foi produzido como entrega final do módulo **Desenvolvimento Full Stack Avançado** do curso de **Especialização em Desenvovimento Web** da PUC Rio.
Trata-se de um MVP (mínimo produto viável) desenvolvido no formato SPA (Single page application ou aplicação em página única) com o objetivo de dar suporte à gestão de manutenções de veículos.
Esta aplicação é uma página web com persistência dos dados no armazenamento local do navegador web. Funciona off line e precisa de adaptações para consumir uma API backend.

<br>

## Instalação

A API foi desenvolvida na linguagem Python, utilizando o framework Flask. Para executá-la é preciso que o interpretador Python esteja instalado no computador, assim como todas as  dependências *(bibliotecas utilizadas no código da aplicação)*. Para tanto é necessário seguir os passos abaixo:

1. Garantir que o interpretador Python esteja instalado.

    As principais distribuições Linux já vêm com o interpretador Python instalado em uma versão razoavelmente atual, como é o caso do Ubuntu, distribuição Linux utilizada para criação do projeto. No Windows será necessário instalá-lo, caso não tenha feito antes, se for o caso acesse https://www.python.org/downloads/windows/ e siga as instruções apresentadas.

2. Fazer o download da aplicação em https://github.com/erbraga/manutencao-api/archive/refs/heads/main.zip e extraia o diretório compactado no HD.

3. Abrir o terminal e executar os comandos abaixo para criar e ativar o ambiente virtual e instalar as dependências.
    
    No Ubuntu:
    ```
    cd ./ manutencao-api-main
    python3 -m venv .venv
    source ./.bin/activate
    pip install -r requirements.txt
    ```
    
    No Windows:
    ```
    cd manutencao-api-main
    py -m venv .venv
    .venv\Scripts\activate.bat
    pip install -r requirements.txt
    ```

<br>

## Como executar
Após a criação e ativação do ambiente virtual a aplicação pode ser executada por meio do comando ``` flask run  ``` no terminal. 

<br>

## Como utilizar

A APi pode ser consumida por meio de requisições HTML para as rotas definidas.
Como a aplicação foi desenvolvida para fins acadêmicos, está hospedada em servidor local, por isso o domínio é *127.0.0.1:5000* e as rotas são:

***/apidocs/***<br>
Rota criada pelo **Swagger**  que mostra uma página gerada automaticamente pela ferramenta para exibir a documentação e permite testar todas as rotas da API. 

<br>














## Instalação

Para instalar a aplicação siga os passoa abaixo: 

1. Caso não tenha o Node instalado na sua máquina, siga as instruções de instalação em https://nodejs.org/pt-br/download.

2. Faça o download do repositório no Github em https://github.com/erbraga/manutencao-frontend/archive/refs/heads/main.zip

3. Crie um diretório e extraia os arquivos.

4. Entre no diretório do projeto e instale as dependências, digitando no terminal:

```
npm install
```
<br>

## Como executar

Abra o terminal no diretório onde baixou o repositório e digite:
```
npm run dev
```

5. Abra o navegador no endereço informado no terminal, normalmente é
```
http://localhost:5173/
```
4. Na barra de navegaçãop do navegador digite
Para executar basta abrir o arquivo index.html no navegador.
O layout do aplicativo foi projetado para ser responsivo, por isso muda caso seja executado em modo tablet ou celular.  

<br>

## Funcionalidades

Apesar de ser uma SPA (single page application), podemos dividi-la em três páginas, renderizadas automaticamente pelo servidor web com suas respectivas funcionalidades:

- **veiculos:** é a página exibida ao abrir a aplicação. Exibe os veículos cadastrados e permite fazer a sua gestão. 
    
    **Funcionalidades:** 
    - Editar, cadastrar ou excluir um veículo.
    - Abrir a página de gestão de manutenções.
    - 
    

- **manutencoes:** Exibe os ítens de manutenção do veículo selecionado e permite fazer a sua gestão.
    
    **Funcionalidades:** 
    - atualizar, editar, excluir ou cadastrar um item de manutenção
    - Calcular e mostrar a data e quilometragem previstas para a próxima manutenção de cada ítem.

- **itens:** Tela de cadastro ou edição de um ítem de manutenção.


## Tecnologias utilizadas


- **HTML:** Linguagem de marcação utilizada para definir o conteúdo de uma página web.

- **CSS:** Linguagem de estilo utilizada para adicionar formatação à página web.
- **Tailwind:** Framework CSS que permite agilizar a estilização de páginas web por meio de classes mnemônicas. 
- **Javascript:** Linguagem de programação utilizada para adicionar comportamento à página web. 
- **React:** Biblioteca JavaScript para criar interfaces de usuário dinâmicas e reutilizáveis por meio de componentes e  Virtual DOM para atualizar a tela dinâmicamente.
- **Node.js** Ambiente de execução JavaScript baseado no motor V8 do Chrome. que permite rodar código JavaScript no servidor.
- **Vite:** O Vite é um empacotador e servidor de desenvolvimento para aplicações web. 
- **Github:** Ferramenta de versionamento, que permite criar diversas versões do código durante o desenvolvimento da aplicação, além do seu compartilhamento.
- **Visual Studio Code (VSCode):** Ambiente de desenvolvimento integrado (IDE) que permite editar todo o código do projeto, escrito em diferentes linguagens, em um mesmo ambiente, integrando ainda outras ferramentas como **github**.
