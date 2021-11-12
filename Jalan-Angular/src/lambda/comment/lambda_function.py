import requests
from bs4 import BeautifulSoup
import urllib.parse
import json


def lambda_handler(event,context):
    facilityNo = event['queryStringParameters']['facilityNo']
    print(facilityNo)
    currentIndex = event['queryStringParameters']['currentIndex']
    print(currentIndex)
    urlFacilityNo = urllib.parse.quote(facilityNo, encoding='shift-jis')
    print(urlFacilityNo)
    url = f"https://www.jalan.net/yad{urlFacilityNo}/kuchikomi/?yadNo={urlFacilityNo}"
    # 2ページ目以降はurlのルールが異なる
    if not currentIndex == '1':
        url = f"https://www.jalan.net/yad{urlFacilityNo}/kuchikomi/{currentIndex}.HTML?yadNo={urlFacilityNo}"
    r = requests.get(url)
    c = r.content
    # ここ原因でAPIGatewayがtimeoutなる
    # soup = BeautifulSoup(c, "html.parser", from_encoding="Shift_JIS")
    # soup = BeautifulSoup(c, "lxml", from_encoding="Shift_JIS")
    soup = BeautifulSoup(c.decode("CP932"), "lxml")
    all=soup.find_all("p",{"class":"jlnpc-kuchikomiCassette__postBody"})
    
    comments=[]

    for item in all:
        d={}
        d["comment"]=item.text
        comments.append(d)
    print("commentsの前")
    print(comments)

    return  {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(comments)
    }