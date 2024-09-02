import streamlit as st
import pandas as pd
import numpy as np
import plotly.figure_factory as ff
import plotly.express as px
import matplotlib.pyplot as plt 
import pickle
# import tensorflow 

loaded_model = pickle.load(open('linear_regression_model.pkl', 'rb'))


st.title('🛰️TEC predictor using space Data')
st.subheader('To predict TEC values using space data as input 📊')

with st.expander('*Team Information*'):
  st.caption('1. Aryan Kaushik')
  st.caption('2. Manas Rai')
  st.caption('3. Ananya srivastava')
st.divider()



with st.sidebar:
    st.title("Have a look at Earth")
    st.divider()
    st.caption("Total Electron Content (TEC) is the number of electrons present along a path between a radio transmitter and receiver.02 The more electrons in the path of the radio wave, the more the radio signal will be affected. TEC is a good parameter to monitor for possible space weather impacts for ground-to-satellite communication and satellite navigation.")
    st.map()


df= pd.read_csv("tec_plot.csv")
st.subheader("Space Data")
st.write(df)
st.divider()

st.subheader("TEC variation along the year")
fig = px.line(df, x="Day_of_year", y= "TEC",markers = True)
st.plotly_chart(fig, use_container_width=True)
st.divider()


st.subheader("Clust Variation")
fig1 = px.line(df, x="Day_of_year", y= "Clust",markers = True)
st.plotly_chart(fig1, use_container_width=True)
st.divider()

st.subheader("Ion Percentages")
weekly_data = pd.DataFrame(df,columns = ["O+","02+","H+","He+","NO+"])
st.line_chart(weekly_data)
st.divider()

st.subheader("Temperature")
weekly_data = pd.DataFrame(df,columns = ["Tn/K", "Te/K" ,"Ti/K"])
st.line_chart(weekly_data)
st.divider()


st.subheader("Electron Density")
weekly_data = pd.DataFrame(df,columns = ["Ne/cm-3", "Ne/NmF2"])
st.line_chart(weekly_data)
st.divider()

def tec_predict(input_data):
    # changing the input_data to numpy array
    input_data_as_numpy_array = np.asarray(input_data,dtype = float)

    # reshape the array as we are predicting for one instance
    input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

    prediction = loaded_model.predict(input_data_reshaped)
    print(prediction)
    result = prediction/1000
    return result

'''Location
dataset

    


one = st.text_input("Value of Ne/cm-3")
two = st.text_input('Value of Ne/NF2')
three = st.text_input('Value of Tn/K')
four = st.text_input('Value of Ti/K')
five =  st.text_input('Value of Te/K')
six = st.text_input('Value of O+')
seven = st.text_input('Value of N+')
eight = st.text_input('Value of H+')
nine =  st.text_input('Value of He+')
ten = st.text_input('Value of t/%')
eleven =  st.text_input('Value of ksp')

if one !='' and two !='' and three != '' and four != '' and five != '' and six != '' and seven != '' and eight != '' and nine != '' and ten != ''and eleven != '':
  input_data = [
    float(one),
    float(two),
    float(three),
    float(four),
    float(five),
    float(six),
    float(seven),
    float(eight),
    float(nine),
    float(ten),
    float(eleven)]

prediction = ''
    
    # creating a button for Prediction
if st.button('Predicted Result'):
    prediction = tec_predict(input_data)
        
        
st.success(prediction)


# 'Ne/cm-3', 'Ne/NF2', 'Tn/K', 'Ti/K', 'Te/K', 'O+', 'N+', 'H+', 'He+',
#        'TEC', 't/%', 'ksp'
 