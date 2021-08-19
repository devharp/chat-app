from flask import sessions
from sessions.session import ChatSession

USER_REQUEST = {'CREATE': 1, 'JOIN': 2}

sessions_list = []
initialized = False
ef=None

def init(emit_func=None):
    global ef, initialized
    ef = emit_func
    initialized = True
def verifyRequest(data=None):
    if initialized == False:
        print('Manager not initialized')
        return
    print('From manager' + str(data))

    if data['request'] == USER_REQUEST['CREATE']:
        print('user wants to create a session')
        send('Received your request for creating')

    
    elif data['request'] == USER_REQUEST['JOIN']:
        print('user wants to join a session')
        send('Received your request for joining')

def send(payload):
    ef(payload)