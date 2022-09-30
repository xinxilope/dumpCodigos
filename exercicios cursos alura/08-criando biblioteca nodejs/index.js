import fs from 'fs'
import chalk from 'chalk'

function trataErro(erro) {
    throw new Error(chalk.red(erro.code,"Arquivo nao encontrado"))
}

async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encode = 'utf-8'
        const texto = await fs.promises.readFile(caminhoDoArquivo, encode)
        console.log(chalk.green(texto))
    } catch (error) {
        trataErro(error)
    }
}


// function pegaArquivo(caminhoDoArquivo) {
//     const encode = 'utf-8'
//     fs.promises.readFile(caminhoDoArquivo, encode)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }

// function pegaArquivo(caminhoDoArquivo) {
//     const encode = 'utf-8'
//     fs.readFile(caminhoDoArquivo, encode, (erro, texto) => {
//         if (erro) {
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto))
//     })
// }

pegaArquivo('./arquivos/texto.md')