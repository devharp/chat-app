from flask import Flask, Response, request

app = Flask(__name__)

@app.route('/')
def home():
    return Response(open('./web/index.html', 'rb'), mimetype='text/html')

@app.route('/script.js')
def script():
    return Response(open('./web/script.js', 'rb'), mimetype='text/javascript')

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
    app.run(port=8080)

if __name__ == "__main__":
    main()
