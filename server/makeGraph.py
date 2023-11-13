from flask import Flask, request, jsonify
from flask_cors import CORS

from makePYGraph.maincode import makeGraph
from makePYGraph.makegraphdata import makegraphdata

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/api/transCourseGraph', methods=['POST'])
def get_data():
    data = request.get_json()
    makeGraph(max_time=int(data["formData"]["creditTime"]))
    
    # data = {"message": "Hello from Python backend!"}
    # print(data)
    makegraphdata()

    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3009, debug=True)
