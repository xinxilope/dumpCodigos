class Conta:

#ATRIBUTOS
    def __init__(self, numero, titular, saldo, limite):
        print("Construindo objeto...")
        self.__numero = numero
        self.__titular = titular
        self.__saldo = saldo
        self.__limite = limite


#METODOS
    def depositar(self, valor):
        self.__saldo += valor 

    def sacar(self, valor):
        if (self.__podeSacar(valor)):
            self.__saldo -= valor
        else:
            print("valor indisponivel")

    def transferir(self, valor, contaRecebe):
        self.sacar(valor)
        contaRecebe.depositar(valor)


    def __podeSacar(self, valor):
        valor_disponivel = self.__saldo + self.__limite
        return valor <= valor_disponivel

#METODOS ESTATICOS
    @staticmethod
    def cod_banco():
        return "001"



#GETTERS
    @property
    def numero(self):
        return self.__numero

    @property
    def titular(self):
        return self.__titular

    @property
    def saldo(self):
        return self.__saldo

    @property
    def limite(self):
        return self.__limite


#SETTERS
    @limite.setter
    def limite(self, limite):
        self.__limite = limite







#TESTANDO CLASSE
conta1 = Conta(1, "mat", 120, 900)
conta2 = Conta(2, "jao", 0, 900)

print(Conta.cod_banco())
print("")

print(conta1.saldo)
print(conta2.saldo)

conta1.transferir(100, conta2)
print("")

print(conta1.saldo)
print(conta2.saldo)

print("")

print(conta1.titular)
print(conta2.titular)

print("")
conta1.sacar(921)

print("")
print(conta1.saldo)