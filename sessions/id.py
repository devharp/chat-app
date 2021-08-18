import random

charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

def genId(l):
    unqid = ""
    for i in range(l):
        num = random.randint(0, len(charset))
        unqid += charset[num - 1]
    return unqid

