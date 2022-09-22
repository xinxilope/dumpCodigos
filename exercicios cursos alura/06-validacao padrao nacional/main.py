from telefones import Telefone
from documento import Documento
from datas import DatasBr
from acesso_cep import BuscaEndereco


#TESTANDO CLASSES
pessoa1 = Documento.cria_documento('01234567890')
pessoa2 = Documento.cria_documento('81188463000120')

print(pessoa1)
print(pessoa2)
print("")

telefone1 = Telefone("1214912341234")
telefone2 = Telefone("4312341234")

print(telefone1)
print(telefone2)
print("")

data1 = DatasBr()

print(data1)
print("")

cep1 = BuscaEndereco("01001000")

print(cep1)

cep1.acessa_via_cep()