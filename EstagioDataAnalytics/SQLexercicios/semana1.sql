#TOPICO 2
# a) Listar todos os livros publicados após 2014
SELECT Titulo, Publicacao FROM LIVRO WHERE YEAR(Publicacao) > 2014;


# b) Listar os 10 livros mais caros
SELECT Titulo, Valor FROM LIVRO ORDER BY Valor DESC LIMIT 10;


# c) Listar as 5 editoras que mais tem livros na biblioteca
SELECT EDITORA.Nome AS Editora, COUNT(Editora) AS QuantLivros FROM LIVRO INNER JOIN EDITORA ON LIVRO.Editora = EDITORA.CodEditora GROUP BY Editora ORDER BY COUNT(Editora) DESC LIMIT 5;


# d) Listar a quantidade de publicações de cada autor
SELECT AUTOR.Nome AS Autor, COUNT(LIVRO.Autor) AS QuantLivros FROM LIVRO INNER JOIN AUTOR ON LIVRO.Autor = AUTOR.CodAutor GROUP BY AUTOR.Nome;


# e) Listar a quantidade de publicações de cada editora
SELECT EDITORA.Nome AS Editora, COUNT(LIVRO.Editora) AS QuantLivros FROM LIVRO INNER JOIN EDITORA ON LIVRO.Editora = EDITORA.CodEditora GROUP BY EDITORA.Nome;


# f) Listar qual é o autor com mais publicações
SELECT AUTOR.Nome AS Autor, COUNT(LIVRO.Autor) AS QuantLivros FROM LIVRO INNER JOIN AUTOR ON LIVRO.Autor = AUTOR.CodAutor GROUP BY AUTOR.Nome ORDER BY COUNT(LIVRO.Autor) DESC LIMIT 1;


# g) Listar qual é o autor com menos ou nenhuma publicação
SELECT AUTOR.Nome, COUNT(Autor) AS Publicacoes FROM LIVRO RIGHT JOIN AUTOR ON LIVRO.Autor = AUTOR.CodAutor GROUP BY AUTOR.Nome HAVING COUNT(Autor) = 0 ORDER BY COUNT(Autor);



#TOPICO 3
# a) selecione o nome e o codigo do vendedor com o maior número de vendas
SELECT TbVendedor.NmVdd, TbVendas.CdVdd, COUNT(*) AS QuantidadeVendas FROM TbVendas INNER JOIN TbVendedor ON TbVendas.CdVdd = TbVendedor.CdVdd
WHERE status = 'Concluído'
GROUP BY TbVendedor.NmVdd
ORDER BY COUNT(*) DESC
LIMIT 1;

# b) selecione o produto mais vendido entre as datas de 2014-02-03 até 2018-02-02
SELECT NmPro, COUNT(*) AS QuantidadeProduto FROM TbVendas
WHERE status = 'Concluído' AND DtVen BETWEEN '2014-02-03' AND '2018-02-02'
GROUP BY NmPro
ORDER BY COUNT(*) DESC
LIMIT 1;

# c) calcule a comissão dos vendedores
SELECT TbVendedor.NmVdd, SUM(TbVendas.Qtd * TbVendas.VrUnt) * TbVendedor.PercComissao AS ComissaoTotalDeVendas FROM TbVendas INNER JOIN TbVendedor ON TbVendas.CdVdd = TbVendedor.CdVdd
WHERE status = 'Concluído'
GROUP BY TbVendedor.NmVdd;

# d)  selecione o cliente que mais gastou
SELECT NmCli, SUM(Qtd * VrUnt) AS ValorGastoTotal FROM TbVendas
WHERE status = 'Concluído'
GROUP BY NmCli
ORDER BY SUM(Qtd * VrUnt) DESC
LIMIT 1;

# e) selecione a escola que mais gastou
SELECT TbDependente.InepEscola, SUM(TbVendas.Qtd * TbVendas.VrUnt) AS ValorGastoTotal FROM TbVendas INNER JOIN TbDependente ON TbVendas.CdVdd = TbDependente.CdVdd
WHERE status = 'Concluído'
GROUP BY TbDependente.InepEscola
ORDER BY SUM(TbVendas.Qtd * TbVendas.VrUnt) DESC
LIMIT 1;

# f) selecione os 10 produtos menos vendidos por ecommerce e pela matriz
SELECT NmPro, Qtd, NmCanalVendas FROM TbVendas
WHERE status = 'Concluído' AND NmCanalVendas IN ('Matriz','Ecommerce')
ORDER BY Qtd
LIMIT 10;

# g) calcule a media de gasto por estado
SELECT Estado, ROUND(AVG(Qtd * VrUnt)) AS ValorMedioDeVenda FROM TbVendas
GROUP BY Estado;

# h) selecione todos os registro deletado
SELECT * FROM TbVendas
WHERE deletado = 1;

# i)  calcule a media da quantidade vendida de cada produto por estado
SELECT Estado, NmPro, ROUND(AVG(Qtd)) AS QuantidadeMediaDeProdutosVendida FROM TbVendas
WHERE status = 'Concluído'
GROUP BY Estado, NmPro;

# j)  selecione os gastor por dependente.
SELECT TbDependente.NmDep, SUM(TbVendas.Qtd * TbVendas.VrUnt) * TbVendedor.PercComissao AS ValorGastos FROM TbVendas INNER JOIN TbDependente ON TbVendas.CdVdd = TbDependente.CdVdd
INNER JOIN TbVendedor ON TbVendas.CdVdd = TbVendedor.CdVdd
WHERE status = 'Concluído'
GROUP BY TbDependente.NmDep;