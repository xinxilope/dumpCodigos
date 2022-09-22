from validate_docbr import CPF
from validate_docbr import CNPJ

#########################################################
#########################################################

class Documento:

    @staticmethod #METODO ESTATICO PARA SABER SE A STRING É CPF OU CNPJ
    def cria_documento(documento):
        if len(documento) == 11:
            return DocCpf(documento)
        elif len(documento) == 14:
            return DocCnpj(documento)
        else:
            raise ValueError("quantidade de caracteres invalida")

#########################################################
#########################################################

class DocCpf:
    def __init__(self,documento):
        if self.valida(documento):
            self.cpf = documento
        else:
            raise ValueError("CPF invalido")

#METODO USADO NO __INIT__
    def valida(self,documento):
        if len(documento) == 11:
            validador = CPF()
            return validador.validate(documento)
        else:
            raise ValueError("CPF precisa ter 11 digitos")

#METODOS PARA REPRESENTAR O OBJETO
    def __str__(self):
        return self.format()

    def format(self):
        mascara = CPF()
        return mascara.mask(self.cpf)

#########################################################
#########################################################

class DocCnpj:
    def __init__(self,documento):
        if self.valida(documento):
            self.cnpj = documento
        else:
            raise ValueError("CNPJ invalido")

#METODO USADO NO __INIT__
    def valida(self,documento):
        if len(documento) == 14:
            validador = CNPJ()
            return validador.validate(documento)
        else:
            raise ValueError("CNPJ precisa ter 14 digitos")

#METODOS PARA REPRESENTAR O OBJETO
    def __str__(self):
        return self.format()

    def format(self):
        mascara = CNPJ()
        return mascara.mask(self.cnpj)
