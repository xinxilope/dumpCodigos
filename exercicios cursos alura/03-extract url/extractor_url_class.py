from operator import indexOf
import re

class ExtratorURL:
    def __init__(self, url_origem):
        self.url_origem = url_origem
        self.all_params = []
        self.__validaURL()
        self.__getAll_params()




#METODOS
    def getAllParams(self):
        return self.all_params

    def getParam(self, indice):
        return self.all_params[indice]

    def getURL(self):
        interrogacao = indexOf(self.url_origem, "?")
        url = self.url_origem[0:interrogacao]
        return url





#METODOS QUE EXECUTAM NO INIT
    def __getAll_params(self):
        interrogacao = indexOf(self.url_origem, "?")
        params = self.url_origem[interrogacao+1:]

        qtd_params = self.url_origem.count('&') + 1

        for i in range(0,qtd_params):
            if "&" in params:
                E = indexOf(params, "&")
                param = params[0:E]
                params = params.replace(params[0:E+1], "")
                self.all_params.append(param)
            else:
                param = params
                self.all_params.append(param)


    def __validaURL(self):
        interrogacao = indexOf(self.url_origem, "?")
        url = self.url_origem[0:interrogacao]
        padrao_url = re.compile('(http(s)?://)?(www.)?bytebank.com(.br)?/cambio')
        match = padrao_url.match(url)

        if not match:
            raise ValueError("URL nao e valida")



#TESTANDO CLASSE
extractor_url = ExtratorURL("https://www.bytebank.com/cambio?moedaOrigem=real&moedaDestino=dolar&quantidade=100")
print(extractor_url.getAllParams())
print(extractor_url.getParam(0))