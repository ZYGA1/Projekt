from db import db, cursor, randomDate
from random import randint
from datetime import date



cursor.execute('Select id, login from uzytkownicy')
users = dict(cursor.fetchall())

cursor.execute('Select id, nazwa from produkty')
products = dict(cursor.fetchall())

form = 'insert into opinie_produktu(gwiazdki, data_wystawienia, id_uzytkownicy, id_produkty) values (%s, %s, %s, %s)'

for i in range(1, len(products) + 1):
    if products.get(i) != None:
        rand = []
        for j in range(1 , len(users) + 1):
            randuser = j + randint(-30, 30)
            if users.get(randuser) != None:
                if randuser not in rand:
                    cursor.execute(form, (randint(1,5), randomDate(monthMin=2, monthMax=4) , j , i))
                    db.commit()


    
