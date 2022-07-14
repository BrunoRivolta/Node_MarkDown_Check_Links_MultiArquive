/*

expressores regulares são um pacote do java script, que reconhece padroes no texto, e pode ser configurado para reconhecer links por exemplo
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

Site que nos ajuda com as expressoes regulares, copiamos o texto e colamos la
https://regex101.com/

Expressao regular

parte 1: vamos pegar palavras dentro de cochetes exemplo [oi]

ab = vai pegar no texto onde ha ab em minusculo
[ab] = vai pegar a e b mesmo nao estando juntos
[] = é uma classe - se usar o /[ ou /] ai ele pega o caractere
() = separador de grupos - se usar /( ou /) ai ele pega o caractere
[^ab] = vai pegar todo texto que nao for nem a nem b
[a-e] = vai pegar todas letras entre a e e minusculas
[A-e] = vai pegar todas letras de a e e maiusculas e minusculas
não pega letras com caracteres especiais ê ó à ã : / , .
\w = pega estruturas que ele reconhece como palavra (word)
\[ = usando a barra antes ele vai pegar o cochete [ mesmo a chave sendo uma caractere especial do codigo
\[[\w]\] = pega [palavra] temos uma classe dentro dos cochetes chamando palavras /w. Porem nao vai funcionar pois precisamos definir qual palavra
\[[\w]*\] = o asterisco pega toda quantidade de caracteres, agora sim indicamos uma palavra qualqer dentro de chaves 
porem ele nao pega caracteres especiais tipo [<imput>] ou [oi ok] porque ha espeço entre as palavras
\[[\w\s]*\] = \s significa espaço agora [oi ok funcionaria] 
poderiamos ir adicionando cada caractare porem ia ficar uma expressao muito grande, ha uma forma melhor de resolver
\[[^\]]*\] = usei o [^\]] significa pegar tudo que nao for um cochete fechando, *\ nao importa quantos caracteres

\[[^\]]*\]


parte 2: vamos pegar um endereço dentro de aspas exemplo
(https://developer.mozilla.org/pt-BR/docs/Web/API/FileList)

\(http = pega a sequencia (http
\(https? = s? significa que o s pode ocorrer ou nao, pois existem apenas http sem o s
\(https?:\/\/ = pega tambem os : e os //
agora complica um pouco pois temos enderecos de dominio. tem deminio.outracoisa., entao varia
\(https?:\/\/[^$#\s] = abrimos agora uma classe com ^ tudo que nao for $# espaço
\(https?:\/\/[^$#\s]*\) = *\) significa quantos caracteres forem necessarios ate chegar a aspa fechada ) 
ja funciona mais a processora usou o codigo abaixo
\(https?:\/\/[^$#\s].[^\s]*\) = .[^\s]*\) até o ponto que nao for espaço quantos caracteres forem necessarios ate a )

juntando as duas partes

\[[^\]]*\]\(https?:\/\/[^$#\s].[^\s]*\)

porem podemos separalas por grupo, com (), 
primeiro grupo o que esta dentro de [] exemplo: ([^\]]*)
segundo grupo o endereco exemplo: (https?:\/\/[^$#\s].[^\s]*)

\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)

podemos visualizar agora no menu lateral do regex101 o 

match1: [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList)
grupo1: FileList
grupo2: https://developer.mozilla.org/pt-BR/docs/Web/API/FileList

e assim por diante

agora temis tudo separado e podemos usar a informação de cada grupo ou do match inteiro

/gm = no regex101 apos o codigo temos o /gm significa global ou seja todas as ocorrencias, e multilinha pois vai pegar todas as linhas onde acontecem a ocorrencia  da expressao regular

codigo final para ser incerido no script:

const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;


precisa ser envolvido entre /..../gm


Cada linguagem de programação desenvolve seu próprio interpretador de expressões regulares; no caso do JavaScript podemos usar // e salvar o padrão em uma variável, como foi feito nos vídeos, ou utilizar o construtor new RegExp():

const regex = /[a-zA-z\s]/;

chamada de meta-chars por exemplo *.jpg para procurar todos os jpg, e uma expressao em meta-chars

Para trabalhar com as regex em nosso código, podemos utilizar alguns métodos próprios de string, como match() (que usamos no vídeo), search(), replace(), matchAll() e split(). Você pode consultar mais sobre estes métodos no MDN. Além disso, o JavaScript também tem alguns métodos próprios do objeto RegExp: test() e exec(). Vamos enter mais sobre o exec()

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

*/

