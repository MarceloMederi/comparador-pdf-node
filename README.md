# Comparador de PDFs

Este é um projeto simples de comparação de arquivos PDF, desenvolvido com **HTML**, **CSS**, **JavaScript** e **Node.js**. Ele permite que os usuários carreguem dois arquivos PDF e obtenham um relatório com as diferenças de texto e layout entre os dois documentos.

## Funcionalidades

- **Comparação de texto**: O sistema compara o texto dos dois PDFs e destaca as diferenças, como textos adicionados ou removidos.
- **Comparação de layout**: Verifica se os PDFs possuem o mesmo número de páginas.
- **Relatório interativo**: Exibe as diferenças de maneira clara, com destaque para textos adicionados (verde e sublinhado) e removidos (vermelho e tachado).
- **Interface simples e amigável**: A página permite upload fácil dos arquivos PDF e exibe os resultados de forma clara.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML
  - CSS (com animações e design responsivo)
  - JavaScript (para interação e envio assíncrono de dados)

- **Backend**:
  - Node.js
  - Express
  - Multer (para upload de arquivos)
  - PDF-parse (para leitura de texto dos PDFs)
  - Diff (para comparação de texto)

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** instalado em seu sistema (pode ser baixado [aqui](https://nodejs.org/)).

### Passos para Execução

1. **Clone o repositório**:

```plaintext
   git clone https://github.com/seu-usuario/comparador-pdf.git
   cd comparador-pdf
```

2. **Instale as dependências**:
```plaintext
    Dentro do diretório do projeto, execute:
    npm install
```

3. **Inicie o servidor:**:
```plaintext
    Para rodar o servidor localmente, execute o seguinte comando:
    npm start
```
   O servidor estará rodando em http://localhost:3000.

4. **Acesse o Projeto**:

Abra o navegador e vá para http://localhost:3000 para visualizar a página de comparação de PDFs.

5. **Estrutura do projeto**:

```plaintext
COMPARADOR-PDF-NODE/
│
├── node_modules/          # Pasta gerada automaticamente pelo npm para dependências do projeto
├── public/                # Pasta para arquivos estáticos (HTML, CSS, JS)
│   ├── index.html         # Arquivo HTML principal
│   ├── script.js          # Arquivo JavaScript para interação
│   └── style.css          # Arquivo de estilo CSS
├── uploads/               # Pasta onde os arquivos PDF enviados são armazenados temporariamente
├── package-lock.json      # Arquivo gerado automaticamente para garantir versões consistentes de pacotes
├── package.json           # Arquivo de configuração do npm (dependências, scripts, etc.)
├── README.md              # Arquivo de documentação do projeto
└── server.js              # Arquivo do servidor (Node.js) que processa a comparação dos PDFs
```

6. **Licença**

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE
 para mais detalhes.

7. **Contribuição**

Se você gostaria de contribuir para este projeto, sinta-se à vontade para enviar um pull request! Basta seguir os passos de clonagem, criar uma branch para a sua alteração e submeter um pull request.