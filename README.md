# manutencao-frontend

<br>

## Descrição

Este projeto foi produzido como entrega final do módulo **Desenvolvimento Full Stack Avançado** do curso de **Especialização em Desenvovimento Web** da PUC Rio.
Trata-se de um MVP (mínimo produto viável) desenvolvido no formato SPA (Single page application ou aplicação em página única) com o objetivo de dar suporte à gestão de manutenções de veículos.
Esta aplicação é uma página web com persistência dos dados no armazenamento local do navegador web. Funciona off line e precisa de adaptações para consumir uma API backend.

<br>

## Instalação

A API foi desenvolvida na linguagem Javascript, utilizando a biblioteca React. Para executá-la é preciso que o ambiente de execução Node JS esteja instalado no computador, assim como todas as  dependências *(bibliotecas utilizadas no código da aplicação)*. Para tanto é necessário seguir os passos abaixo:

1. Garantir que o *Node* esteja instalado, caso negativo, siga as instruções de instalação em https://nodejs.org/pt-br/download.

2. Fazer o download da aplicação em https://github.com/erbraga/manutencao-frontend/archive/refs/heads/main.zip e extrair o diretório compactado no HD.

3. Abrir o terminal e executar o comando ```npm install``` para instalar as dependências.
    

## Como executar

4. Executar o comando ```npm run dev``` para iniciar a aplicação no servidor local. 

5. Abra o navegador no endereço informado no terminal, normalmente é ```http://localhost:5173/```

O layout do aplicativo foi projetado para ser responsivo, por isso muda caso seja executado em modo tablet ou celular.

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
