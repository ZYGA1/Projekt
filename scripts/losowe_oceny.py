from db import db, cursor, randomDate
from math import floor
from random import randint
from datetime import date



cursor.execute('Select id, login from uzytkownicy')

user = dict(cursor.fetchall())


sql = 'Insert into opinie(gwiazdki, data_wystawienia, id_uzytkownicy) VALUEs (%s, %s, %s)'

for i in range(11, len(user)):
    print(user[i], end=" ")
    random = randint(1,3) + 2
    cursor.execute(sql, (random, randomDate(monthMax=4, monthMin=2), i))
    db.commit()
    