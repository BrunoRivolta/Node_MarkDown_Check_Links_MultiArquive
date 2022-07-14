import chalk from 'chalk';

function relatorioLinkQuebrado (arrayStatus) {
    const erros = [];
    const atencao = [];
    for(let arquivo = 0; arquivo < arrayStatus.length; arquivo++) {
        const links = arrayStatus[arquivo];
        for(let lista = 0; lista < links.length; lista++) {
            const status = links[lista].Status;
            if (status.charAt('0') === '4') {
                erros.splice(0, 0, [arquivo, lista]);
            } 
            if (status.charAt('0') !== '2' && status.charAt('0') !== 'A' && status.charAt('0') !== '4') {
                atencao.splice(0, 0, [arquivo, lista]);
            } 
        }    
    }
    console.log('')
    console.log(chalk.magentaBright('x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-'))
    console.log(chalk.red('RELATÓRIO DE LINKS QUEBRADOS!'))
    console.log('')
    if(erros.length === 0) {
        console.log(chalk.cyanBright('Não foram econtrados links com defeito!'));
        console.log('')
    } else {
        for (let atenc = 0; atenc < atencao.length; atenc++) {
            const nomeArquivo = arrayStatus[atencao[atenc][0]][0].nomeDoArquivo;
            const linkErro = arrayStatus[atencao[atenc][0]][atencao[atenc][1]];
            const linkNumero = atencao[atenc][1];
    
            console.log(chalk.cyanBright('Há links neste arquivo que podem ser um erro ou não'));
            console.log(chalk.yellowBright('Vefificar =>'), nomeArquivo);
            console.log(chalk.cyanBright('Link de numero =>'), linkNumero);
            console.log(linkErro);
            console.log('')
        }
        for (let erro = 0; erro < erros.length; erro++) {
            const nomeArquivo = arrayStatus[erros[erro][0]][0].nomeDoArquivo;
            const linkErro = arrayStatus[erros[erro][0]][erros[erro][1]];
            const linkNumero = erros[erro][1];
    
            console.log(chalk.red('Erro encontrado no arquivo =>'), nomeArquivo);
            console.log(chalk.cyanBright('Link de numero =>'), linkNumero);
            console.log(linkErro);
            console.log('')
        }
    }
    console.log(chalk.magentaBright('x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-'))
    console.log('')
}

export default relatorioLinkQuebrado;