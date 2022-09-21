class Cpf:
    def __init__(self, documento):
        documento = str(documento)
        if self.cpf_eh_valido(documento):
            self.cpf = documento
        else:
            raise ValueError("CPF invalido")

#METODOS Q EXECUTAM COM __init__
    def cpf_eh_valido(self, documento):
        if len(documento) == 11:
            return True
        else:
            return False

#METODOS
    def formatar_CPF(self):
        p1 = self.cpf[:3]
        p2 = self.cpf[3:6]
        p3 = self.cpf[6:9]
        p4 = self.cpf[9:]
        return "{}.{}.{}-{}".format(p1,p2,p3,p4)

#METODO PRINTAR CLASSE
    def __str__(self):
        return self.formatar_CPF()

