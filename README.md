# Marvel Challenge | Luizalabs

Este projeto foi desenvolvido como desafia do processo seletivo da empresa **Luizalabs** e tem como objetivo buscar na API da Marvel a listagem de heróis

_**Developer:** Rafael Araujo Reis_

---
## Inicializando o projeto
---

Primeiro baixe as dependências do projeto
``` bash
npm install
#ou
yarn
```

Depois execute o projeto

```bash
npm run dev
# ou
yarn dev
```

Abra o navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar o projeto local

---

## Editando no projeto
---
## Components
A documentação dos componentes estão acessíveis abaixo:

* [Component Button](./src/components/Button/Readme.md)
* [Component Card](./src/components/Card/Readme.md)
* [Component Header](./src/components/Header/Readme.md)

## Hooks
Dentro do [useHeroes.tsx](./src/hooks/useHeroes.tsx) está localizada a lógica para buscar os heróis na [API da Marvel](https://developer.marvel.com/docs) e atualização dos dados.

## Páginas
As páginas do projeto se encontram dentro da pasta [pages](./src/pages/)

* O arquivo [_app_.tsx](./src/pages/_app.tsx) encontra-se o provedor de informações da aplicação e a importação do aquivo [global.scss](./src//styles/global.scss)
* O arquivo [_document.tsx](./src/pages/_document.tsx) encontra-se a estrutura do **index.html** e os imports das fontes e do **favicon.ico** da página
* A página Home do projeto está dentro do arquivo [index.tsx](./src/pages/index.tsx). Ela será renderizada assim que a aplicação for acessada em [http://localhost:3000](http://localhost:3000)


## Serviços
O consumo da [API da Marvel](https://developer.marvel.com/docs) ocorre dentro do arquivo [api.ts](./src/services/api.ts)

* Para que a comunicação funcione será necessário criar uma conta na [Marvel](https://developer.marvel.com/account) e pegar a ***public key*** e a ***private key***
* Crie na raiz do projeto o arquivo ```.env.local``` 
  * NEXT_PUBLIC_MARVEL_PUBLIC_KEY=_informe sua public key_
  * NEXT_PUBLIC_MARVEL_PRIVATE_KEY=_informe sua private key_

_(após a execução este passo será necessário parar parar a execução do projeto e inicializar novamente)_

## Estilização
A estilização global do projeto se encontra no arquivo [global.scss](./src//styles/global.scss)
```scss
/********************
 * Reduzindo o tamanho da fonte padrão para desktop de 16px para 10px
 *******************/
html {
  font-size: 62.5%;
}

/********************
 * Reduzindo o tamanho da fonte padrão para tablet de 16px para  9px
 *******************/
@media (max-width: 1080px) {
  html {
    font-size: 56.25%;
  }
}

/********************
 * Reduzindo o tamanho da fonte padrão para mobile de 16px para  8px
 *******************/
@media (max-width: 720px) {
  html {
    font-size: 50%;
  }
}

/********************
 * Como a fonte padrão está em 10px, quando definimos em 1.6rem a fonte para desktop passa a ser 16px
 * facilitando assim a definição dos tamanhos de fonte, espaçamentos, trazendo maior flexibilidade a tela
 *******************/
button {
  font: 400 1.6rem 'Poppins', sans-serif;
}
```
---
_Obs: este projeto foi criado utilizado [Next.js](https://nextjs.org/)._

---