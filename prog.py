from flask_socketio import SocketIO, emit
from flask import Flask, Response, request
import random

# from werkzeug.wrappers import request

app = Flask(__name__)
app.config['SECRET KEY'] = 'password'
socketio = SocketIO(app)

@socketio.on('id-validation')
def handleIdValidation(payload):
    print('client sent for id validation: ' + str(payload))
    id = {"node" : None, "session" : None, "temp" : None, "name" : None}
    if payload['node'] == None or payload['node'] == 'null':
        id["node"] = genRandomId(200)
        print('node id na')
    if payload['session'] == None or payload['session'] == 'null':
        id["session"] = genRandomId(200)
        print('session id na')
    if payload['temp'] == None or payload['temp'] == 'null':
        id["temp"] = genRandomId(200)
        print('temp id na')
    if payload['name'] == None or payload['name'] == 'null':
        id["name"] = "John Doe"
        print('name id na')
    emit('id-received', id, sid=request.sid)

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