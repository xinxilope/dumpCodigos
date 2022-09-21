print("1 = À vista em dinheiro ou cheque, recebe 10% de desconto")
print("2 = À vista no cartão de crédito, recebe 15% de desconto")
print("3 = Em duas vezes, preço normal de etiqueta sem juros")
print("4 = Em duas vezes, preço normal de etiqueta mais juros de 10%")
PRECO_PRODUTO = float(input("Digite o preco do produto:"))
CODIGO = int(input("Escolha a forma de pagamento (1/2/3/4):"))

if CODIGO == 1:
    PRECO = PRECO_PRODUTO - (PRECO_PRODUTO * 0.1)
    print(PRECO)
elif CODIGO == 2:
    PRECO = PRECO_PRODUTO - (PRECO_PRODUTO * 0.15)
    print(PRECO)
elif CODIGO == 3:
    PRECO = (PRECO_PRODUTO / 2)
    print("2x de:",PRECO)
elif CODIGO == 4:
    PRECO = (PRECO_PRODUTO / 2)
    PRECO_JURO = PRECO + (PRECO * 0.1)
    print("Primeira parcela  de:",PRECO,"Segunda com 10% de juros:",PRECO_JURO)