from codigo.bytebank import Funcionario
import pytest
from pytest import mark

class TestClass:
    @mark.idade
    def test_quando_idade_recebe_02_08_2000_deve_retornar_22(self):
        #Given
        entrada = '02/08/2000'
        esperado = 22

        funcionario_teste = Funcionario("teste", entrada, 1500)

        #When
        result = funcionario_teste.idade()

        #Then
        assert result == esperado

    @mark.sobrenome
    def test_quando_tiver_nome_completo_retornar_sobrenome(self):
        #Given
        entrada = "mateus eduardo"
        esperado = "eduardo"

        funcionario_teste = Funcionario(entrada, "02/08/2000", 1500)

        #When
        result = funcionario_teste.sobrenome()

        #Then
        assert result == esperado

    @mark.decrescimo
    def test_quando_decrescimo_salario_recebe_100k_deve_retornar_90k(self):
        #Given
        entrada_salario = 100000
        entrada_nome = "Paulo Bragança"
        esperado = 90000
        funcionario_teste = Funcionario(entrada_nome, "02/08/2000", entrada_salario)

        #When
        funcionario_teste.decrescimo_salario()
        result = funcionario_teste.salario

        #Then
        assert result == esperado


    @mark.calcular_bonus
    def test_quando_calcular_bonus_recebe_1000_deve_retornar_100(self):
        #Given
        entrada_salario = 1000
        esperado = 100
        funcionario_teste = Funcionario("teste", "02/08/2000", entrada_salario)

        #When
        result = funcionario_teste.calcular_bonus()

        #Then
        assert result == esperado

    @mark.calcular_bonus
    def test_quando_calcular_bonus_recebe_20000_deve_retornar_exception(self):
        with pytest.raises(Exception):
            #Given
            entrada_salario = 20000
            funcionario_teste = Funcionario("teste", "02/08/2000", entrada_salario)

            #When
            result = funcionario_teste.calcular_bonus()

            #Then
            assert result