from collections import Counter


meu_texto = "Bem vindo meu nome é Guilherme eu gosto muito de nomes e tenho o meu cachorro e gosto muito de cachorro"
meu_texto = meu_texto.lower()




contagem = Counter(meu_texto.split())

print(contagem)