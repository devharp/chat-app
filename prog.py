from flask import Flask, Response, request
from flask_socketio import SocketIO, emit
import sessions.id, sockethandler
app = Flask(__name__)
app.config['SECRET_KEY'] = '0QbpOgiOpTZO302x'
socketio = SocketIO(app)

@socketio.on('connect')
def connect(auth):
    sockethandler.onconnect(i=request.sid)

@socketio.on('disconnect')
def disconnect():
    sockethandler.ondisconnect(i=request.sid)

@socketio.on('message')
def receivePayload(data):
    sockethandler.handleMessages(data, request.sid)

def send(payload, sid=None, namespace=None):
    if id != None:
        emit('message', payload, sid=sid)
    elif namespace != None:
        emit('message', payload, namespace=namespace)


sockethandler.init(send)

@app.route('/')
def home():
    return Response(open('./web/index.html', 'rb'), mimetype='text/html')

@app.route('/script.js')
def script():
    return Response(open('./web/script.js', 'rb'), mimetype='text/javascript')

@app.route('/sock.js')
def sock():
    return Response(open('./web/sock.js', 'rb'), mimetype='text/javascript')

@app.route('/style.css')
def style():
    return Response(open('./web/style.css', 'rb'), mimetype='text/css')

@app.route('/fonts/Roboto.css')
def fonts():
    return Response(open('./web/fonts/Roboto.css', 'rb'), mimetype='text/css')

@app.route('/data', methods = ['POST', 'GET'])
def dataRecv():
    if request.method == 'POST':
        print(str(request))
        return 'req recieved'
    elif request.method == 'GET':
        return 'no response'
    else:
        return "Error"

def main():
    # app.run(port=8080)
    # sockethandler.init(s=socketio, e=emit, r=request)
    socketio.run(app, port=8888, host='0.0.0.0')


if __name__ == "__main__":
    main()
