from validate_docbr import CPF
from validate_docbr import CNPJ

class CpfCnpj:
    def __init__(self, documento, tipo_documento):
        self.tipo_documento = tipo_documento
        if self.tipo_documento == "cpf":
            documento = str(documento)
            if self.cpf_eh_valido(documento):
                self.cpf = documento
            else:
                raise ValueError("CPF invalido")

        elif self.tipo_documento == "cnpj":
            if self.cnpj_eh_valido(documento):
                self.cnpj = documento
            else:
                raise ValueError("CNPJ invalido")

        else:
            raise ValueError("tipo de documento invalido")

#METODOS Q EXECUTAM COM __init__
    def cpf_eh_valido(self, cpf):
        if len(cpf) == 11:
            validador = CPF()
            return validador.validate(cpf)
        else:
            raise ValueError("CPF precisa ter 11 digitos")

    def cnpj_eh_valido(self, cnpj):
        if len(cnpj) == 14:
            validador_cnpj = CNPJ()
            return validador_cnpj.validate(cnpj)
        else:
            raise ValueError("CNPJ precisa ter 14 digitos")

#METODOS
    def formatar_CPF(self):
        mascara = CPF()
        return mascara.mask(self.cpf)

    def formatar_CNPJ(self):
        mascara_cnpj = CNPJ()
        return mascara_cnpj.mask(self.cnpj)

#METODO PRINTAR CLASSE
    def __str__(self):
        if self.tipo_documento == 'cpf':
            return self.formatar_CPF()
        else:
            return self.formatar_CNPJ()

