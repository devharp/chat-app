from flask_socketio import SocketIO, emit
from flask import Flask, Response, request
import random

clients = []
class Client:
    node = None
    session = None
    temp = None
    name = None
    sid = None
    connected = False
    def __init__(self, id, sid) -> None:
        self.node = id['node']
        self.session = id['session']
        self.temp = id['temp']
        self.name = id['name']
        self.sid = sid

app = Flask(__name__)
app.config['SECRET KEY'] = 'password'
socketio = SocketIO(app)

@socketio.on('id-validation')
def handleIdValidation(payload):
    print('client sent for id validation: ' + str(payload))
    id = {'node' : None, 'session' : None, 'temp' : None, 'name' : None, 'sid' : request.sid}
    if ((payload['node'] == None) or payload['node'] == 'null'):
        payload['node'] = genRandomId(200)
        print('Node Id Not Available')
    else:
        found = False
        for x in range(len(clients)):
            if clients[x].node == payload['node']:
                found = True
        if found == False:
            payload['node'] = genRandomId(200)
            
    if ((payload['session'] == None) or payload['session'] == 'null'):
        payload['session'] = genRandomId(200)
        print('Session Id Not Available')
    payload['temp'] = genRandomId(200)
    if ((payload['name'] == None) or payload['name'] == 'null'):
        payload['name'] = genRandomId(200)
        print('Name Id Not Available')
    
    clients.append(Client(id=payload,sid=request.sid))
    emit('id-received', payload, sid=request.sid)

@socketio.on('disconnect')
def socketDisconnected():
    global clients
    for x in range(len(clients)):
        if str(clients[x].sid) == str(request.sid):
            del clients[x]
            print('Client ' + str((request.sid) + ' has been removed from the list'))
    
    print('clients size : ' + str(len(clients)))
        

@socketio.on('connect')
def socketConnection():
    print('Client ' + str(request.sid) + ' joined')

@app.route('/')
def home():
    return Response(open('./web/index.html', 'rb'), mimetype='text/html')

@app.route('/script.js')
def script():
    return Response(open('./web/script.js', 'rb'), mimetype='text/javascript')

@app.route('/style.css')
def style():
    return Response(open('./web/style.css', 'rb'), mimetype='text/css')

def main():
    socketio.run(app, port=8888)

def genRandomId(l) -> str:
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    unqid = ""
    for i in range(l):
        num = random.randint(0, len(charset))
        unqid += charset[num - 1]
    return unqid

if __name__ == "__main__":
    main()