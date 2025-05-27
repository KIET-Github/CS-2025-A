import requests
from django.conf import settings
from django.shortcuts import render
from FlowState.settings import*

def search_data(string,counter):
    search_url = 'https://www.googleapis.com/youtube/v3/search'

    search_params = {
        'part' : 'snippet',
        'q' : string,
        'key' : apiKey,
        'maxResults' : counter,
        'type' : 'video'
    }
    response=requests.get(search_url,params=search_params)
    print(response.json())
    results=response.json()['items']


    random_videos=[]
    for i in results:
        random_videos.append({'title':i['snippet']['title'],'url':f'https://www.youtube.com/watch?v={ i["id"]["videoId"] }','thumbnail':i['snippet']['thumbnails']['default']['url'],'id':i["id"]["videoId"]})

    
    # print("hello",i["id"]["videoId"])
    return random_videos



