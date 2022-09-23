from datetime import date
from operator import truediv

class Funcionario:
    def __init__(self, nome, data_nascimento, salario):
        self._nome = nome
        self._data_nascimento = data_nascimento
        self._salario = salario

    @property
    def nome(self):
        return self._nome

    @property
    def salario(self):
        return self._salario

    def idade(self):
        data_quebrada = self._data_nascimento.split("/")
        ano_nasc = data_quebrada[-1]
        ano_atual = date.today().year
        return ano_atual - int(ano_nasc)

    def sobrenome(self):
        nome_completo = self.nome.strip()
        nome_quebrado = nome_completo.split(" ")
        return nome_quebrado[-1]

    def _verifica_diretor(self):
        sobrenomes = ['Bragança', 'Windsor', 'Bourbon', 'Yamato', 'Al Saud', 'Khan', 'Tudor', 'Ptolomeu']
        return self._salario >= 100000 and (self.sobrenome() in sobrenomes)

    def _calcula_decrescimo(self):
        decrescimo = self._salario * 0.1
        return decrescimo

    def decrescimo_salario(self):
        if self._verifica_diretor():
            self._salario = self._salario - self._calcula_decrescimo()

    def calcular_bonus(self):
        valor = self._salario * 0.1
        if valor > 1000:
            valor = 0
        return valor

    def __str__(self):
        return f'Funcionario({self._nome}, {self._data_nascimento}, {self._salario})'