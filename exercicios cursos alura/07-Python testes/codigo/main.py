from codigo.bytebank import Funcionario



def teste_idade():
    funcionario_teste = Funcionario("teste","02/08/2000",1500)
    print(funcionario_teste.idade())

    funcionario_teste2 = Funcionario("teste2","20/5/1990",2500)
    print(funcionario_teste2.idade())

teste_idade()