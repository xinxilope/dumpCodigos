import fs from 'fs'
import chalk from 'chalk'

function pegaArquivo(caminhoDoArquivo) {
    const encode = 'utf-8'
    fs.readFile(caminhoDoArquivo, encode, (_, texto) => {
        console.log(chalk.green(texto))
    })
}

pegaArquivo('./arquivos/texto.md')