import requests
from flask import Flask, jsonify, request
from new_main import func

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    request_data = request.json
    if request_data is None:
        return jsonify({'error': 'Missing data field in request'})
    print(request_data)
    data = request_data

    datasend = func(data)
    
    return jsonify(datasend)

if __name__ == '__main__':
    app.run(debug=True)