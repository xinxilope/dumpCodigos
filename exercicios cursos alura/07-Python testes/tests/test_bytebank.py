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

    def test_quando_tiver_nome_completo_retornar_sobrenome(self):
        #Given
        entrada = "mateus eduardo"
        esperado = "eduardo"

        funcionario_teste = Funcionario(entrada, "02/08/2000", 1500)

        #When
        result = funcionario_teste.sobrenome()

        #Then
        assert result == esperado