#!/usr/bin/env node

import pegaArquivo from './index.js'

import chalk from 'chalk';

import validaURL from './http_validacao.js';

import relatorioLinkQuebrado from './relatorio.js'

const caminho = process.argv;

//console.log(caminho);

//node cli.js = motra caminho do node, e o caminho deste arquivo

//node cli.js teste = alem dos caminhos ele vai adiconar teste na array

// segundo a logica se passarmos: node cli.js ./arquivos/texto1.md ele vai retornar isso no indice 2 da array caminho então:

//console.log(pegaArquivo(caminho[2]));

//node cli.js ./arquivos/texto1.md

async function processaTexto (caminhoArquivo) { // esta função precisa ser assincrona pois se nao for a função nao espera o pegaarquivo acontecer o console log ja e executado antes
    const resultado = await pegaArquivo(caminhoArquivo[2]);
    if (caminhoArquivo[3] === 'validar') {
        const listaValidada = await validaURL(resultado);
        console.log(chalk.yellow('Lista Validados'), listaValidada)
        relatorioLinkQuebrado(listaValidada);
    } else {
        console.log(chalk.yellow('Lista de links'), resultado)
    }
}

processaTexto(caminho);

