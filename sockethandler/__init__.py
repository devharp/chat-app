from flask_socketio import emit


id = None
ef = None
def init(emit_func):
    global ef 
    ef = emit_func

def handleMessages(data, i):
    global id
    id = i
    print('HarpReceived: ' + str(data))
    send(data)

def send(data):
    global ef
    ef(data, id)