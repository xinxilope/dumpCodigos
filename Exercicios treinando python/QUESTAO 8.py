ALTURA = float(input("Digite sua altura:"))
SEXO = str(input("Digite seu sexo(M/F):"))

if SEXO == "M":
    PESO = (72.7 * ALTURA) - 58
elif SEXO == "F":
    PESO = (62.1 * ALTURA) - 44.7
    
print(PESO)