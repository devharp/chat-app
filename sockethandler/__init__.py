from flask_socketio import emit
from sessions import manager

id = None
ef = None
def init(emit_func):
    global ef 
    ef = emit_func

def onConnect(data=None, id=None):
    print('Client ' + str(id) + ' connected')
    manager.onConnect(id=id)

def onDisconnect(data=None, id=None):
    print('Client ' + str(id) + ' disconnected')
    manager.onDisconnect(id=id)

def handleMessages(data=None, i=None):
    global id, ef
    id = i
    manager.init(ef)
    manager.verifyRequest(data,i)
    # print('Client ' + str(i) + ' : ' + str(data))
    # send(data)

def joinSessionRequest(id):
    manager.sessionExists(id)
def send(data):
    global ef
    ef(data, sid=id)