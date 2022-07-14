// para instalar o package.json digitar no termial - npm init -y - sendo que -y significa dar yes para todas as questoes da instalação
// npm é um repositorio de codigo aberto onde e disponibilizado varios codigos, npm.com ja fiz o cadastro, o init e uma biblioteca
// alem do npm tambem temos o repositorio yarn// para instalar esse pacote json digitar no termial - npm init -y - sendo que -y significa dar yes para todas as questoes da instalação
// npm é um repositorio de codigo aberto onde e disponibilizado varios codigos, npm.com ja fiz o cadastro, o init e uma biblioteca
// alem do npm tambem temos o repositorio yarn
// instalei tambem o chalk -npm install chalk
// vamos importar a biblioteca nativa fs = file system
// ver sempre a documentação
// o exec e um metodo utilizado em regex. ele mostra apenas a primeira ocorrencia, para ver todas e necessario um laco de repeticao


//console.log(chalk.blue('Ola Mundo'));
//console.log(chalk.blue.bgWhite.bold('Alura'));

/* codigo simples, vamos reescrever de forma assincrona
function pegaArquivo (caminho) {
   const encoding = 'utf-8'
   fs.readFile(caminho, encoding, (erro, texto) => { // a documentação do FS pede caminho, encoding, e uma função do que fazer com o texto encontrado
      if (erro) {
         trataErro(erro);
      }
      console.log(chalk.green(texto))
   })
}
*/

/* escrito de forma assincrona usando uma promessa, vamos escrever usando async e await

function pegaArquivo(caminho) {
   const encoding = 'utf-8';
   fs.promises.readFile(caminho, encoding) // o fs ja esta pronto para trabalhar com codigo assincrono, ou seja ele ja gera a promessa de demorar o tempo que precisar para ler o arquivo não impedindo o restante do programa de ser executado
   .then(texto => console.log(chalk.green(texto))) // then significa entao, primeiro vai ler o texto se ok entao executa uma função no caso o console.log
   .catch(erro => trataErro(erro)) // cath significa pegar, ele pega um erro caso nao seja possivel ler o arquivo
}

a função abaixo apenas pegava o arquivo, atualizamos para agora procurar arquivos na pasta
async function pegaArquivo(caminho) {
   const encoding = 'utf-8';
   try {
      const texto = await fs.promises.readFile(caminho, encoding)
      return extraiLinks(texto);
   } catch (erro) {
      trataErro(erro);
   }
}
*/

//const chalk = require("chalk");
//const fs = require('fs');
//const path = require('path');
import chalk from "chalk";
import fs from 'fs';
import path from "path";

function extraiLinks(txt) { //função usada na função pegaArquivo
   const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
   const arrayResultados = [];
   let temp;
   while((temp = regex.exec(txt)) !== null) { // a repeticao vai acontecer enquanto tivermos ocorrencias quando for igual a null para
      arrayResultados.push({ [temp[1]]: temp[2]});
   }
   return arrayResultados.length === 0 ? 'Não existem links no texto' : arrayResultados; // tratamento caso o texto nao tenha links para processar
}

function trataErro (erro) {
   throw new Error(chalk.red(`O programa não conseguiu ler o arquivo, erro: ${erro.code}`));
}

async function pegaArquivo(caminho) {
   const caminhoAbsoluto = path.join("__dirname", '..', caminho);
   const encoding = 'utf-8';
   try {
     const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
     const nomeArquivos = await fs.promises.readdir(caminhoAbsoluto, (err, arquivos) => {
      arquivos.forEach(arquivo => {
         return arquivo;
      })
     });
     const result = await Promise.all(arquivos.map(async (arquivo) => {
       const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
       const texto = await fs.promises.readFile(localArquivo, encoding);
       return extraiLinks(texto);
     }));
     for (let lista = 0; lista < nomeArquivos.length; lista++) {
      const arquivo = nomeArquivos[lista];
      const objeto = new Object();
      objeto.nomeDoArquivo = arquivo
      result[lista].splice(0, 0, objeto)
     }
     return result; //lista de links + nome arquivo sem status
   } catch (erro) {
     return trataErro(erro);
   }
  }

//module.exports = pegaArquivo; 
export default pegaArquivo;

