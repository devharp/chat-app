from sessions.session import ChatSession
import random


USER_REQUEST = {'CREATE': 1, 'JOIN': 2}

sessions_list = []
temp_id = []    # request.sid
initialized = False
ef=None

def init(emit_func=None):
    global ef, initialized
    ef = emit_func
    initialized = True
def verifyRequest(data=None, id=None):
    if initialized == False:
        print('Manager not initialized')
        return
    print('From manager' + str(data))

    if data['request'] == USER_REQUEST['CREATE']:
        for i in range(len(temp_id)):
            if id == temp_id[i]:
                return
        temp_id.append(id)
        print('user wants to create a session')
        payload = {'request' : USER_REQUEST['CREATE'], 'session' : genSessionId(), 'node' : genId(15)}
        sessions_list.append(ChatSession(originatorid=payload['node'], sessionid=payload['session']))
        send(payload=payload)

    
    elif data['request'] == USER_REQUEST['JOIN']:
        print('user wants to join a session')
        send('Received your request for joining')


def onConnect(id=None):
    if id == None:
        return

def onDisconnect(id=None):
    if id == None:
        return

    

def send(payload):
    ef(payload)

def genId(l):
    charset = "abcdefghijklmnopqrstuvwxyz0123456789"
    unqid = ""
    for i in range(l):
        num = random.randint(0, len(charset))
        unqid += charset[num - 1]
    return unqid

def genSessionId() -> str:
    return genId(random.randint(3, 4)) + '-' + genId(random.randint(3, 4)) + '-' + genId(random.randint(3, 4))