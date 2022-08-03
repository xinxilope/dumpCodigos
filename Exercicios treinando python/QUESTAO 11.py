NUMERO_ALUNO = int(input("Digite o codigo do aluno:"))
nota1 = float(input("Digite primeira nota"))
nota2 = float(input("Digite a segunda nota"))
nota3 = float(input("Digite a terceira nota"))
ME = float(input("Digite media da nota dos trabalhos"))

MA = ((nota1 + (2 * nota2) + (3 * nota3) + ME)/7) * 10

if MA >= 90:
    CONCEITO = "A"
elif MA >= 75 and MA < 90:
    CONCEITO = "B"
elif MA >=60 and MA < 75:
    CONCEITO = "C"
elif MA >= 40 and MA < 60:
    CONCEITO = "D"
elif MA < 40:
    CONCEITO = "E"
    
print("Codigo do aluno:",NUMERO_ALUNO)
print("Notas do aluno:",nota1,nota2,nota3)
print("Media dos trabalhos:",ME)
print("Media de aproveitamento:",MA)
print("Conceito:",CONCEITO)

if CONCEITO == "A" or CONCEITO == "B" or CONCEITO == "C":
    print("Aprovado")
elif CONCEITO == "D" or CONCEITO == "E":
    print("Reprovado")