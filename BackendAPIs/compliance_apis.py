from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/upload_video', methods=['POST'])
def upload_video():
    try:
        file = request.files['file']
        file.save(file.filename)
        return jsonify({'message': 'Video uploaded successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Error uploading video: {}'.format(str(e))}), 400


@app.route('/check_steps', methods=['GET'])
def check_steps():
    results = [
        {'step': 'Step 0', 'value': 'Step Followed Correctly'},
        {'step': 'Step 1', 'value': 'Step Not followed Correctly'},
        {'step': 'Step 2', 'value': 'Hand not visible'},
        {'step': 'Step 3', 'value': 'Step Followed Correctly'},
        {'step': 'Step 4', 'value': 'Hand not visible'},
        {'step': 'Step 5', 'value': 'Step Not followed Correctly'},
        {'step': 'Step 6', 'value': 'Step Followed Correctly'},
        {'step': 'Step 7', 'value': 'Hand not visible'},
        {'step': 'Step 8', 'value': 'Step Followed Correctly'}
    ]
    response = jsonify({'results': results})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Content-Type', 'application/json')
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3050)
