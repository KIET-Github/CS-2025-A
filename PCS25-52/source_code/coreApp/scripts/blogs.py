import requests
from FlowState.settings import apiKey

def getBlogs(query,count):
    print("HERE")
    api_key = apiKey
    cx = "732be405134ed4372"
    url = "https://www.googleapis.com/customsearch/v1"

    params = {
        "key": api_key,
        "cx": cx,
        "q": query
    }
    response = requests.get(url, params=params)
    data = response.json()
    
    blogs=[]
    if "items" in data:
        for item in data["items"]:
            blogs.append({'title':item["title"],'url':item["link"]})
            if len(blogs)==count:
                break
    
    return blogs

    








#from bs4 import BeautifulSoup

# def getBlogs(query,count):

#     newQuery=query.replace(' ','+')
    
#     url = f"https://www.google.com/search?q={newQuery}"

#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
#     }

#     response = requests.get(url, headers=headers)
#     blogs=[]
#     if response.status_code == 200:
#         soup = BeautifulSoup(response.content, 'html.parser')
#         results = soup.find_all('div', class_='g')

#         if results:
#             for result in results:
#                 title_element = result.find('h3')
#                 if title_element:
#                     blogs.append({'title':title_element.text.strip()})
#                     link_element = result.find('a')
#                     if link_element:
#                         blogs[len(blogs)-1]['link']=link_element['href']
#                 if len(blogs)==count:
#                     break
#     return blogs




