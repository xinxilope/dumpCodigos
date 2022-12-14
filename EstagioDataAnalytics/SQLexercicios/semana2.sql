SELECT LIVRO.Cod AS CodigoLivro, LIVRO.Titulo, LIVRO.Autor AS CodigoAutor, AUTOR.Nome AS NomeAutor, LIVRO.Valor, LIVRO.Editora AS CodigoEditora, EDITORA.Nome AS NomeEditora FROM LIVRO
INNER JOIN AUTOR ON LIVRO.Autor = AUTOR.CodAutor
INNER JOIN EDITORA ON LIVRO.Editora = EDITORA.CodEditora
ORDER BY LIVRO.Valor DESC
LIMIT 10;


SELECT LIVRO.Cod AS CodigoLivro, LIVRO.Titulo, LIVRO.Autor AS CodigoAutor, AUTOR.Nome AS NomeAutor, LIVRO.Valor, LIVRO.Editora AS CodigoEditora, EDITORA.Nome AS NomeEditora FROM LIVRO
INNER JOIN EDITORA ON LIVRO.Editora = EDITORA.CodEditora
INNER JOIN AUTOR ON LIVRO.Autor = AUTOR.CodAutor
GROUP BY LIVRO.Editora
ORDER BY COUNT(*) DESC
LIMIT 5;