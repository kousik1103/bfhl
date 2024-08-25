from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])

    # Initialize arrays
    numbers = []
    alphabets = []
    highest_lowercase = []

    for item in data:
        if item.isdigit():
            numbers.append(item)
        elif item.isalpha():
            alphabets.append(item)
            if item.islower():
                if not highest_lowercase or item > highest_lowercase[0]:
                    highest_lowercase = [item]

    response = {
        "is_success": True,
        "user_id": "your_full_name_ddmmyyyy",  # Replace with your actual full name and DOB
        "email": "your_college_email@domain.com",  # Replace with your college email
        "roll_number": "21BDS0039",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase
    }

    return jsonify(response), 201

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
