import requests
from isodate import parse_duration
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from nltk.tokenize import word_tokenize
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')
from operator import itemgetter
from .models import Video, Task
from FlowState.settings import*

def sentiment(text):
    sia = SentimentIntensityAnalyzer()
    result=sia.polarity_scores(text)
    score=result['pos']*100
    return score

def search_task_data(string, taskId):
    videos = []
    comments = []
    final_comments = []
    print("************************************")
    print("i am called")
    
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'
    comment_url = 'https://www.googleapis.com/youtube/v3/commentThreads'

    search_params = {
        'part' : 'snippet',
        'q' : string,
        # 'key' : 'AIzaSyA6PXcMFY4sXRae4-HVisjz31GUjSyQses',
        'key':apiKey,
        'maxResults' : 15,
        'type' : 'video'
    }
    r = requests.get(search_url, params=search_params)
    results = r.json()['items']

    video_ids = []
    for result in results:
        video_ids.append(result['id']['videoId'])

    video_params = {
        'key' : apiKey,
        'part' : 'snippet,contentDetails,statistics',
        'id' : ','.join(video_ids),
        'maxResults' : 15
    }

    r = requests.get(video_url, params=video_params)

    results = r.json()['items']
    
    for video_id in video_ids:
        comments = []
        comment_params = {
            'key' : apiKey,
            'part' : 'snippet',
            'videoId' : video_id,
            'order': 'relevance'
        }   
    
        r2 = requests.get(comment_url, params=comment_params)
        print(">> API call log")
        # print(r2.json())
        try:
            print("flag0")
            results2 = r2.json()['items']
            for result2 in results2:
                comment_data = {
                    "comment": result2['snippet']['topLevelComment']['snippet']['textOriginal']
                }
                comments.append(comment_data)
            print("flag1")
        except:
            print("flag2")
            comments='Negative'
        
        final_comments.append(comments)
        
        

    print("flag3")
    print(">>>",len(results))
    print(">",final_comments)
    for result in results:
        print("flag4")
        # print(">>>",result)
        video_data = {
            'title' : result['snippet']['title'].encode('utf-8').decode('utf-8'),
            'id' : result['id'],
            'url' : f'https://www.youtube.com/watch?v={ result["id"] }',
            'duration' : int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
            
            'thumbnail' : result['snippet']['thumbnails']['high']['url'],
            'description': result['snippet']['description'],
            'viewCount': result['statistics']['viewCount'],
            'likeCount': result['statistics']['likeCount'],
            'favoriteCount': result['statistics']['favoriteCount'],
            'commentCount': result['statistics']['commentCount'],
            "score": 0
        }

        videos.append(video_data)
    print("flag5")
    context = {
        'videos' : videos,
        'comments': final_comments
        }
    i=0
    score_arr=[]
    print("flag6")
    try:
        for i in range(len(final_comments)):
            score=0

            for dict in final_comments[i]:
                if dict=="Negative":
                    continue

                score+=sentiment(dict['comment'])
            videos[i]['score'] = score
    except Exception as e:
        print(">>>>",e)
    print("flag7")
    newlist = sorted(videos, key=itemgetter('score'), reverse=True)
    print(newlist)
    i=1
    print("flag8")
    for resource in newlist:
        if i == 4:
            break
        Video.objects.create(task = Task.objects.get(id=taskId),title = resource["title"] , thumbnail = resource["thumbnail"] ,duration = resource["duration"],url = resource["url"],score = resource["score"])
        i+=1
    
    print("flag9")
    return "Data searched"
