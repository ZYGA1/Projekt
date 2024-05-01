# importy
from db import db, cursor, randomDate, randDict
from random import randint

class GetData:
    def __init__(self, cursor):
        self.query = cursor

    # Funkcja która wykonuję zapytanie o dane z tabeli uzytkownicy
    def getUsers(self):
        self.query.execute('Select id, login from uzytkownicy')
        return dict(self.query.fetchall())

    # Funkcja która wykonuje zapytanie o dane z tabeli produkty
    def getProducts(self):
        self.query.execute('Select id, nazwa from produkty')
        return dict(self.query.fetchall())

    # Funkcja która wykonuje zapytanie o dane z tabeli metoda_dostawy
    def getMetodyDostawy(self):
        self.query.execute('Select id, nazwa from metoda_dostawy')
        return dict(self.query.fetchall())

    # Funkcja która wykonuje zapytanie o dane z tabeli status_zamowienia
    def getStan(self):
        self.query.execute('Select id, nazwa from status_zamowienia')
        return dict(self.query.fetchall())

data = GetData(cursor)

# dane 
users = data.getUsers()
products = data.getProducts()
metodyDostawy = data.getMetodyDostawy()
stanZamowienia = data.getStan()

# Zapytanie
formZamowienia = 'insert into zamowienia(data_zamowienia, id_uzytkownicy, id_metoda_dostawy, id_status_zamowienia) values (%s, %s, %s, %s)'
formZamowieniaProdukty = 'insert into zamowienie_produkty(ilosc, id_produkty, id_zamowienia) values (%s, %s, %s)'

# Funkcja ktora losuje ilosc produktu
def randomAmountOfProdut() -> int:
    rand = randint(1, 20)

    if rand > 2:
        rand1 = randint(1,10)
        if rand1 > 4:
            rand = 1
    if rand > 4:
        rand1 = randint(1, 10)
        if rand1 > 3:
            rand = int(rand / 2)
    if rand > 6:
        rand1 = randint(1, 10)
        if rand1 > 5:
            rand = rand - 4
    if rand > 11:
        rand1 = randint(0,1)
        if rand1 == 1:
            rand = rand - 10
    if rand > 15:
        rand1 = randint(1, 10)
        if rand1 > 3:
            rand = rand - 10 + rand1

    return rand

def randomAmountOfProduts() -> int:
    rand = randint(1, 10)

    if rand > 2:
        rand1 = randint(1,10)
        if rand1 > 8:
            rand = 1
    if rand > 4:
        rand1 = randint(1, 10)
        if rand1 > 3:
            rand = int(rand / 2)
    if rand > 6:
        rand1 = randint(1, 10)
        if rand1 > 5:
            rand = rand - 4

    return rand

ilosc_zamowien: int = int(input("ile losowych zamowien?: "))
if ilosc_zamowien < 1:
    print("[ERR] Za malo")
    exit()
if ilosc_zamowien > 9999:
    print("[ERR] Za duzo")
    exit()

for _ in range(ilosc_zamowien):

    # Losowe zamowienie
    cursor.execute(formZamowienia, (randomDate(monthMin=3, monthMax=4),
                                    randDict(users),
                                    randDict(metodyDostawy),
                                    randDict(stanZamowienia)
                                    ))
    db.commit()

    # id ostatniego zamowienia
    cursor.execute('Select * from zamowienia')
    zamowienia_id: int =  cursor.fetchall()[-1][0]

    # losowe produkty do zamowienia
    produkty = []
    for i in range(randomAmountOfProduts()):
        randProduct = randDict(products)
        if randProduct not in produkty:
            produkty.append(randProduct)
            cursor.execute(formZamowieniaProdukty, 
                           (randomAmountOfProdut(), randProduct , zamowienia_id))
            db.commit()





