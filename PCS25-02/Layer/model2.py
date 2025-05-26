from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

def load_data():
    df = pd.read_csv('justice.csv')
    df.rename(columns={'facts': 'facts', 'first_party': 'first_party', 'second_party': 'second_party', 'first_party_winner': 'winner_index'}, inplace=True)
   
    if df['winner_index'].isnull().any():
        df['winner_index'] = df['winner_index'].fillna(0).astype(int)

    df['merged_facts'] = df['first_party'].fillna('') + " " + df['second_party'].fillna('') + " " + df['facts'].fillna('')
 
    df.dropna(subset=['merged_facts'], inplace=True)

    return df

def train_model(df):
    vectorizer = TfidfVectorizer(max_features=2000)
    X = vectorizer.fit_transform(df['merged_facts'])
    y = df['winner_index']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = LogisticRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

train_model(load_data())