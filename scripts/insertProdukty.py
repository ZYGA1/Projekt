from math import floor
from db import cursor, db


# Zapytania o wszystkie nazwy kategorii, producentow i ich id
cursor.execute('Select nazwa, id from kategorie')
kategorie = dict(cursor.fetchall())
cursor.execute('Select nazwa, id from producenci')
producenci = dict(cursor.fetchall())

print("\n\n")

# Wybor producenta przez nazwe
print("wybierz producenta: ")
for key, value in producenci.items():
    
    print(key, ", ",end="")
    if value % floor(len(producenci) - 5) == 0:
        print("")

print("\n")

producent = producenci[input("podaj producenta: ")]
print(producent)

# Podawanie danych o produkcie
nazwa = input("podaj nazwe: ")
cena = float(input("podaj cene: "))
opis = input("podaj opis: ")
dstIlosc = int(input("podaj dostepna ilosc: "))

# Insert into produkty
produkty = (nazwa, cena, opis, dstIlosc ,producent)
formulaProdukty =  "insert into produkty(nazwa, cena, opis, dostepna_ilosc, id_producenci) values (%s, %s, %s, %s, %s)"
cursor.execute(formulaProdukty, produkty)

# Id ostatniego produktu
cursor.execute("select * from produkty")
produktyLastid = cursor.fetchall()[-1][0]

# Wybieranie dowolnej ilosci kategori
kategoria_produkty = []

while True:
    for key, value in kategorie.items():
        print(key, ", ",end="")
        if value % floor(len(kategorie) - 5) == 0:
            print("")
    
    kategoria = kategorie[input("podaj kategorie: ")]
    kategoria_produkty.append((kategoria, produktyLastid))
    
    if(input("dalej? (t, n): ") != 't'):
        break;
    

# Insert into kategorie_produkty
formulaKategoria_produkty =  "insert into kategorie_produkty(id_kategorie, id_produkty) values (%s, %s) "
cursor.executemany(formulaKategoria_produkty, kategoria_produkty)

db.commit()
