//const pegaArquivo = require('../index.js')
import pegaArquivo from '../index.js';

const arrayResult = [
  [
    {"nomeDoArquivo": "txt1.md" },
    { Terra: 'http://www.terra.com.br' },
    { Uol: 'http://www.uol.com.br' },
    { r7: 'http://www.r7.com' },
    {
      'Canal Tech': 'https://canaltech.com.br/internet/erro-404-o-que-e-como-resolveru/'
    }
  ]
];



describe('pegaArquivo::', () => {
  it('Deve ser uma função', () => { //primeiro teste se pega arquivo é uma função
    expect(typeof pegaArquivo).toBe('function');
  })
  it('Deve retornar um array com resultados', async () => {// segundo teste compara o resultado do pega arquivo
    const resultado = await pegaArquivo('./test/md')
    expect(resultado).toEqual(arrayResult)
  })
  it('deve lançar um erro na falta de arquivo', async () => {// terceiro ve se a promessa é rejeitada e volta a mensagem de erro
    await expect(pegaArquivo('./test/md2')).rejects.toThrow('O programa não conseguiu ler o arquivo, erro: ENOENT')
  })
  it('deve resolver a função com sucesso', async () => {// quarto verifica se a promessa é aceita
    await expect(pegaArquivo('./test/md')).resolves.toEqual(arrayResult)
  })
})







