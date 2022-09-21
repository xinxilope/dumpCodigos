PESO = float(input("Digite o peso:"))
ALTURA = float(input("Digite a altura:"))

IMC = PESO / (ALTURA ** 2)

if IMC < 18.5:
    print("Abaixo do peso")
elif IMC >= 18.5 and IMC < 25:
    print("Peso normal")
elif IMC >= 25 and IMC < 30:
    print("Acima do peso")
elif IMC >= 30:
    print("Obeso")