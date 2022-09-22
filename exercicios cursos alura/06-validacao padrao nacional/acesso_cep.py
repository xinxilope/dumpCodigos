import requests

class BuscaEndereco:
    def __init__(self,cep):
        cep = str(cep)
        if self.cep_e_valido(cep):
            self.cep = cep
        else:
            raise ValueError("CEP invalido")

#METODO EXECUTA NO INIT
    def cep_e_valido(self,cep):
        if len(cep) == 8:
            return True
        else:
            return False

#METODOS PARA REPRESENTAR O OBJETO
    def __str__(self):
        return self.format()

    def format(self):
        return "{}-{}".format(self.cep[:5],self.cep[5:])

    def acessa_via_cep(self):
        url = "https://viacep.com.br/ws/{}/json/".format(self.cep)
        r = requests.get(url)
        return  r