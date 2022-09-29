import fs from 'fs'
import chalk from 'chalk'

function trataErro(erro) {
    throw new Error(chalk.red(erro.code,"Arquivo nao encontrado"))
}

function pegaArquivo(caminhoDoArquivo) {
    const encode = 'utf-8'
    fs.readFile(caminhoDoArquivo, encode, (erro, texto) => {
        if (erro) {
            trataErro(erro)
        }
        console.log(chalk.green(texto))
    })
}

pegaArquivo('./arquivos/texto.md')