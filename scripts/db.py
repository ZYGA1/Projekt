# importy
import mysql.connector
from os import getenv
from dotenv import load_dotenv
from random import randint

# Importowanie zmiennych środowiskowych
load_dotenv()

# Polaczenie z baza i przypisanie zmiennych
def connect():
    return mysql.connector.connect(
    host=getenv("HOST"),
    user=getenv("USER"),
    passwd=getenv("PASSWD"),
    database=getenv("DATABASE")
    )
db = connect()
cursor = db.cursor()

# funkcja ktora generuje losowa date
def randomDate(month: int=0,monthMin:int=1, monthMax:int=12) -> str:
    randYear: str = str(2024)
    if monthMax > 12 or monthMax < monthMin or monthMin < 1 or month > 12 or month < 0:
        print("[ERR] Invalid range")
        exit()
    if month > 0 and month < 13:
        monthMin = month
        monthMax = month

    randMonth: int = randint(monthMin, monthMax)

    months: dict =  {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    
    randDay: str = str(randint(1, months[randMonth]))
    randMonth: str = str(randMonth)

    randomDate: str = f'{randYear}-{randMonth}-{randDay}'

    return randomDate


# Funkcja ktora wybiera losowe id ze slownika
def randDict(dictionary: dict):
    dictMin = 0;
    for i in range(0, 99999):
        if dictionary.get(i) != None and dictMin == 0:
            dictMin = i

    randuser = randint(dictMin, len(dictionary) + dictMin - 1)
    while dictionary.get(randuser) == None:
        randuser = randint(dictMin, len(dictionary) + dictMin)
    return randuser