import fetch from 'node-fetch';

/*
async function checaStatus(arrayURLs) {
    const arrayStatus = await Promise.all(arrayURLs.map(async url => {
        const res = await fetch(url);
            return res.status;
    }))
    return arrayStatus
}
*/

async function checaStatus(arrayURLs) {
    try{
        const arrayStatusAll = [];
        for (let index = 0; index < arrayURLs.length; index++) {
            const arrayStatusAtual = await Promise.all(arrayURLs[index].map(async url => {
                const res = await fetch(url);
                    return `${res.status} - ${res.statusText}`;  
        }))
        arrayStatusAll.splice(index, 0, arrayStatusAtual);
        }
        return arrayStatusAll
    } catch(erro) {
        manejaErro(`Aconteceu um erro ao checar as URLs: ${erro}`);
    } 
}

function geraArrayObjeto(arrayLinks) {
    const arrayLinksAll = [];
    for (let index = 0; index < arrayLinks.length; index++) {
        const arrayLinksatual = (arrayLinks[index].map(objetoLink => Object.values(objetoLink).join()));
        arrayLinksatual.splice(0, 1); // Removendo o nome do arquivo 
        arrayLinksAll.push(arrayLinksatual);
    }
    return arrayLinksAll //gera array do com os links
}

async function validaURL(arrayLinks) {
    const links =  geraArrayObjeto(arrayLinks); //ok 3 arrays dentro de uma array
    const statusLinks = await checaStatus(links); //ok 3 arrays dentro de uma array
    for (let lista = 0; lista <statusLinks.length; lista++) {
        statusLinks[lista].splice(0, 0, 'Arquivo Processado')
    }
    const ListaComStatus = [];
    for (let lista = 0; lista < arrayLinks.length; lista++) {
        const resultados = arrayLinks[lista].map((objeto, indice) => ({...objeto, Status: statusLinks[lista][indice]}));
        if (statusLinks)
            ListaComStatus.push(resultados);
    }
    return ListaComStatus; //lista completa
}

export default validaURL;