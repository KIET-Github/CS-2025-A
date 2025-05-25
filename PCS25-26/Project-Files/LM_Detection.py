import streamlit as st
import PIL
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import pandas as pd
from geopy.geocoders import Nominatim
import os
from tensorflow_hub.keras_layer import KerasLayer
# Load Monument Data
monument_file = 'monuments_data.csv'
if os.path.exists(monument_file):
    monument_data = pd.read_csv(monument_file)
else:
    st.error(f"Error: {monument_file} not found!")

# Load Model & Labels
model_url = 'https://tfhub.dev/google/on_device_vision/classifier/landmarks_classifier_asia_V1/1'
labels_file = 'landmarks_classifier_asia_V1_label_map.csv'
df = pd.read_csv(labels_file)
labels = dict(zip(df.id, df.name))

# Initialize Model Once (Avoid Reloading in Each Call)
classifier = tf.keras.Sequential([
    hub.KerasLayer(model_url, input_shape=(321, 321, 3), output_key="predictions:logits")
])

def image_processing(image):
    """Process and classify the uploaded image."""
    img_shape = (321, 321)
    img = PIL.Image.open(image)
    img = img.resize(img_shape)
    img1 = img  # Keep original resized image for display
    img = np.array(img) / 255.0
    img = img[np.newaxis]
    result = classifier.predict(img)
    prediction = labels[np.argmax(result)]
    print(f"Prediction: {prediction}")  # Debugging
    return prediction, img1

def get_map(loc):
    """Get latitude, longitude, and address for a given location name."""
    geolocator = Nominatim(user_agent="heritage_identifier")
    location = geolocator.geocode(loc)
    return location.address, location.latitude, location.longitude

def run():
    st.title("🏛 Heritage Identification of Monuments using Deep Learning")
    img = PIL.Image.open('logo.png').resize((256, 256))
    st.image(img)
 
    img_file = st.file_uploader("📤 Choose your Image", type=['png', 'jpg', 'jpeg'])
    
    if img_file:
        save_path = os.path.join('./Uploaded_Images/', img_file.name)
        with open(save_path, "wb") as f:
            f.write(img_file.getbuffer())

        # Predict Monument
        prediction, image = image_processing(save_path)

        # Display Image & Prediction
        st.image(image)
        st.header(f"📍 **Predicted Landmark: {prediction}**")

        # Retrieve Monument Data
        monument_info = monument_data[monument_data["Name"] == prediction]
        print(f"Monument Info: {monument_info}")  # Debugging

        if not monument_info.empty:
            st.subheader("🏛 **Monument Details**")
            st.write(f"📍 **Location:** {monument_info.iloc[0]['Location']}")
            st.write(f"📅 **Year Built:** {monument_info.iloc[0]['Year Built']}")
            st.write(f"🏛 **Architectural Style:** {monument_info.iloc[0]['Architectural Style']}")
            st.write(f"📝 **Interesting Fact:** {monument_info.iloc[0]['Interesting Fact']}")

            # **New History Section**
            if 'History' in monument_info.columns:
                st.subheader("📜 **History**")
                st.write(monument_info.iloc[0]['History'])

        else:
            st.warning("⚠️ No detailed information available for this monument.")

        # Get Location Data
        try:
            address, latitude, longitude = get_map(prediction)
            st.success(f'📍 **Address:** {address}')
            loc_dict = {'Latitude': latitude, 'Longitude': longitude}
            st.subheader(f'✅ **Latitude & Longitude of {prediction}**')
            st.json(loc_dict)

            # Show on Map
            st.subheader(f'🗺️ **{prediction} on the Map**')
            df_map = pd.DataFrame([[latitude, longitude]], columns=['lat', 'lon'])
            st.map(df_map)

        except Exception:
            st.warning("❌ No address found!")

#Contribution Section
    st.subheader("💡 **Contribute to Our Project**")
    st.write("If you find this tool useful and want to contribute, here are a few ways you can help:")
    
    st.write("1. **Feedback**: Share your feedback on how we can improve this tool.")
    st.markdown("""
        <style>
        .feedback-form {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #f0f4f8;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .feedback-form label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: #333;
        }
        .feedback-form input[type="email"],
        .feedback-form textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            color: #333;
            background-color: #fff;
        }
        .feedback-form textarea {
            height: 100px;
        }
        .feedback-form button {
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }
        .feedback-form button:hover {
            background-color: #0056b3;
        }
        </style>
        <div class="feedback-form">
            <form action="https://formspree.io/f/xrbzdozv" method="POST">
                <label>
                    Your email:
                    <input type="email" name="email" required>
                </label>
                <label>
                    Your message:
                    <textarea name="message" required></textarea>
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    """, unsafe_allow_html=True)

    st.write("2. **Help Us Improve**: Have landmark images or data to contribute? Share your suggestions or uploads with us! [Submit Your Data](https://forms.gle/AUC9grqtY1kYkBR58)")
    st.write("3. **Spread the Word**: Share this tool with your friends and colleagues.")

run()