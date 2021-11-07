import requests
from bs4 import BeautifulSoup
import urllib.parse
import json


def lambda_handler(event,context):
    keyword = event['queryStringParameters']['keyword']
    print(keyword)
    urlKeyword = urllib.parse.quote(keyword, encoding='shift-jis')
    print(urlKeyword)
    url = f"https://www.jalan.net/uw/uwp2011/uww2011init.do?keyword={urlKeyword}&dispStartIndex=0"
    r = requests.get(url)
    c = r.content
    # ここ原因でAPIGatewayがtimeoutなる
    # soup = BeautifulSoup(c, "html.parser", from_encoding="Shift_JIS")
    soup = BeautifulSoup(c, "lxml", from_encoding="Shift_JIS")
    all=soup.find_all("h2",{"class":"p-searchResultItem__facilityName"})

    facilities=[]
    facilityNoGroup=[]
    
    for item in all:
        d={}
        d["facilityName"]=item.text
        link = item.find('a')
        d["facilityNo"]=link.get('href').replace("javascript:openYadoSyosai('"," ")[0:7]
        facilities.append(d)
    print("facilitiesの前")
    print(facilities)

    return  {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(facilities)
    }