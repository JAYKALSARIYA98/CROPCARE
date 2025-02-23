import os
import json
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
from flask_cors import CORS
# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load the pre-trained model (adjust path accordingly)
model_path = "./plant_disease_prediction_model.h5"
model = tf.keras.models.load_model(model_path)

# Load class indices (make sure this file exists and is in the correct directory)
class_indices = json.load(open("./class_indices.json"))

# Create the 'temp' directory if it doesn't exist
if not os.path.exists('temp'):
    os.makedirs('temp')


# Function to preprocess the uploaded image
def preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.
    return img_array


# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file temporarily
    image_path = os.path.join("temp", file.filename)
    try:
        file.save(image_path)
    except Exception as e:
        return jsonify({'error': f'Error saving file: {str(e)}'}), 500

    try:
        # Preprocess the image and make prediction
        img_array = preprocess_image(image_path)
        prediction = model.predict(img_array)
        print(prediction)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class_name = class_indices[str(predicted_class_index)]
        print(predicted_class_name)
        # Remove the temporary file
        os.remove(image_path)

        return jsonify({'disease': predicted_class_name})

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500


# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)   , what should be my require,et.txt