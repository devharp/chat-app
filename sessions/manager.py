from sessions.session import ChatSession
import random


USER_REQUEST = {'CREATE': 1, 'JOIN': 2}
SERVER_REQUEST = {'SEND_NODE_ID': 3, 'RESPONSE_TO_SEND_NODE_ID': 4, 'SET_NODE_ID_ONLY': 5}

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

        '''
            Add code here. If this node_id is already registered in any other ChatSession, 
            * remove that user from that session
            * create a new session
            * alot a new node_id and session_id for the user
        '''
        send(payload=payload)

    
    elif data['request'] == USER_REQUEST['JOIN']:
        print('user wants to join a session')
        send('Received your request for joining')

    elif data['request'] == SERVER_REQUEST['SEND_NODE_ID']:
        if data['node'] == None:
            payload = {'request': SERVER_REQUEST['SET_NODE_ID_ONLY'], 'node': genId(15)}
            send(payload=payload)
        else:
            send('ok, you already have your old node id')



def onConnect(id=None):
    if id == None:
        return
    send({'request' : SERVER_REQUEST['SEND_NODE_ID']})

def onDisconnect(id=None):
    if id == None:
        return
    print('id: ' + str(id) + ' left')

    

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

def sessionExists(id):
    found = False
    print('Here i Heard you, you said: ' + str(id))
    print('Session list len ' + str(len(sessions_list)))
    for i in sessions_list:
        if id == i.getSessionId(): 
            found = True
            print('Correct')

    if found == False:
        print('incorrect')