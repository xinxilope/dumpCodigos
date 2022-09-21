class Programa:
    def __init__(self, nome, ano):
        self._nome = nome.title()
        self.ano = ano
        self._likes = 0

#METODOS
    def add_like(self):
        self._likes += 1

    def remove_like(self):
        self._likes -= 1

#GETTERS
    @property
    def nome(self):
        return self._nome

    @property
    def likes(self):
        return self._likes

#SETTERS
    @nome.setter
    def nome(self, nome):
        self._nome = nome.title()

#######################################################
#######################################################

class Filme(Programa):
    def __init__(self, nome, ano, duracao):
        super().__init__(nome, ano)
        self.duracao = duracao

#METODO ESPECIAL: REPRESENTACAO EM STR
    def __str__(self):
        return f'{self._nome} -- {self.ano} -- {self.duracao} -- {self._likes}'

#######################################################
#######################################################

class Serie(Programa):
    def __init__(self, nome, ano, temporadas):
        super().__init__(nome, ano)
        self.temporadas = temporadas

#METODO ESPECIAL: REPRESENTACAO EM STR
    def __str__(self):
        return f'{self._nome} -- {self.ano} -- {self.temporadas} -- {self._likes}'

#######################################################
#######################################################

class Playlist:
    def __init__(self, nome, programas):
        self.nome = nome
        self._programas = programas

#METODO ESPECIAL: PODER SER ITERAVEL
    def __getitem__(self, item):
        return self._programas[item]

#METODO ESPECIAL: PODER SER MESURAVEL
    def __len__(self):
        return len(self._programas)

#######################################################
#######################################################

#TESTANDO CLASSES
vingadores = Filme("vingadores", 2018, 160)
flash = Serie("flash", 2014, 6)
scream = Filme("o grito", 2008, 120)
demolidor = Serie("o demolidor", 2018, 4)
todos_programas = [vingadores, flash, scream, demolidor]
playlist_filmes_terror = Playlist("filmes de terror", todos_programas)

vingadores.add_like()
vingadores.add_like()
scream.add_like()
flash.add_like()
flash.add_like()
flash.add_like()
vingadores.nome = "vingadores: guerra infinita"
flash.nome = "the flash"

#POLIMORFISMO
print("Tamanho da palylist: {}".format(len(playlist_filmes_terror)))
for programa in playlist_filmes_terror:
    print(programa)