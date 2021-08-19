from flask_socketio import emit
from sessions import manager

id = None
ef = None
def init(emit_func):
    global ef 
    ef = emit_func

def onconnect(data=None, i=None):
    print('Client ' + str(i) + ' connected')

def ondisconnect(data=None, i=None):
    print('Client ' + str(i) + ' disconnected')

def handleMessages(data=None, i=None):
    global id, ef
    id = i
    manager.init(ef)
    manager.verifyRequest(data,i)
    # print('Client ' + str(i) + ' : ' + str(data))
    # send(data)


def send(data):
    global ef
    ef(data, sid=id)