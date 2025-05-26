import streamlit as st
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import re  
@st.cache_data
def load_data():
    df = pd.read_csv('justice.csv')
    df.rename(columns={'facts': 'facts', 'first_party': 'first_party', 'second_party': 'second_party', 'first_party_winner': 'winner_index'}, inplace=True)
   
    if df['winner_index'].isnull().any():
        df['winner_index'] = df['winner_index'].fillna(0).astype(int)

    df['merged_facts'] = df['first_party'].fillna('') + " " + df['second_party'].fillna('') + " " + df['facts'].fillna('')
 
    df.dropna(subset=['merged_facts'], inplace=True)

    return df

@st.cache_data
def train_model(df):
    vectorizer = TfidfVectorizer(max_features=2000)
    X = vectorizer.fit_transform(df['merged_facts'])
    y = df['winner_index']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    report = classification_report(y_test, y_pred, output_dict=True)
    
    return model, vectorizer, report

def validate_input(first_party, second_party, facts):
    if not first_party.strip():
        return "First Party cannot be empty."
    
    if not second_party.strip():
        return "Second Party cannot be empty."
    
    if not facts.strip():
        return "Case facts cannot be empty."
    
    if len(facts) < 20:
        return "Case facts must be at least 20 characters long."
    
    if not re.match(r"^[a-zA-Z0-9\s.,!?'-]+$", facts):
        return "Case facts contain invalid characters. Only letters, numbers, spaces, and basic punctuation are allowed."
    
    return None  
def predict_outcome(model, vectorizer, first_party, second_party, facts):
    input_text = first_party + " " + second_party + " " + facts
    input_vectorized = vectorizer.transform([input_text])
    probabilities = model.predict_proba(input_vectorized)[0]
    return {
        "Petitioner": probabilities[0] * 100,
        "Respondent": probabilities[1] * 100
    }

def plot_pie_chart(prediction):
    labels = ['Petitioner', 'Respondent']
    sizes = [prediction['Petitioner'], prediction['Respondent']]
    colors = ['#ff9999','#66b3ff']
    
    fig, ax = plt.subplots()
    ax.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
    ax.axis('equal')  
    
    st.pyplot(fig)

def main():
    st.title("Judgement Prediction Model")

    df = load_data()
    model, vectorizer, report = train_model(df)

    st.header("Predict Outcome")
    first_party = st.text_input("Enter First Party")
    second_party = st.text_input("Enter Second Party")
    facts = st.text_area("Enter Case Facts")

    if st.button("Predict"):
        error_message = validate_input(first_party, second_party, facts)
        
        if error_message:
            st.error(error_message)  
        else:
            prediction = predict_outcome(model, vectorizer, first_party, second_party, facts)
            st.write(f"Chances of Petitioner winning: {prediction['Petitioner']:.2f}%")
            st.write(f"Chances of Respondent winning: {prediction['Respondent']:.2f}%")
           
            plot_pie_chart(prediction)

if __name__ == "__main__":
    main()
