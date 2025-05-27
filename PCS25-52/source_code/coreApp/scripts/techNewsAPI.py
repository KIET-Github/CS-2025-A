import requests
import random

def getTechNews():
    url = 'https://newsapi.org/v2/top-headlines?category=business&apiKey=c9773d6d5b214253a2970da91085319b'
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Error: Received status code {response.status_code}")
        print(f"Response text: {response.text}")
        return []

    try:
        data = response.json()
    except ValueError:
        print("Error: Unable to parse JSON response")
        print(f"Response text: {response.text}")
        return []

    if data.get('totalResults', 0) == 0:
        print("No articles found")
        return []

    r = random.sample(range(len(data['articles'])), min(5, len(data['articles'])))
    news_articles = [{'title': data['articles'][i]['title'], 'url': data['articles'][i]['url']} for i in r]

    return news_articles

print(getTechNews())


