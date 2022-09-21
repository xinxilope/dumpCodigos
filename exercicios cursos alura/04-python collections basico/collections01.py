from abc import abstractmethod
from functools import total_ordering

@total_ordering
class Conta():
    def __init__(self, codigo):
        self._codigo = codigo
        self._saldo = 0

#METODOS
    def deposita(self, valor):
        self._saldo += valor

#METODOS ABSTRATOS
    @abstractmethod
    def passa_o_mes(self):
        pass

#METODOS ESPECIAIS
    def __str__(self):
        return "Cod: {} Saldo: {}".format(self._codigo, self._saldo)

    def __eq__(self, outro):
        return self._codigo == outro._codigo and self._saldo == outro._saldo

    def __lt__(self, outro):
        return self._saldo < outro._saldo

#############################################
#############################################

class ContaCorrente(Conta):
#METODOS
    def passa_o_mes(self):
        self._saldo -= 2

#############################################
#############################################

class ContaPoupanca(Conta):
#METODOS
    def passa_o_mes(self):
        self._saldo *= 1.01
        self._saldo -= 3

#############################################
#############################################





#TESTANDO CLASSES

conta1 = ContaCorrente(1)
conta2 = ContaPoupanca(2)
contas = [conta1, conta2]

conta1.deposita(600)
conta2.deposita(1000)

conta1.passa_o_mes()
conta2.passa_o_mes()

for conta in sorted(contas):
    print(conta)

print(conta1 >= conta2)