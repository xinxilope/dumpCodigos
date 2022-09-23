from codigo.bytebank import Funcionario

class TestClass:
    def test_quando_idade_recebe_02_08_2000_deve_retornar_22(self):
        #Given
        entrada = '02/08/2000'
        esperado = 22

        funcionario_teste = Funcionario("teste", entrada, 1500)

        #When
        result = funcionario_teste.idade()

        #Then
        assert result == esperado