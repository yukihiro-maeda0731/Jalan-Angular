import requests
from bs4 import BeautifulSoup
import urllib.parse
import json
import re

def lambda_handler(event,context):
    keyword = event['queryStringParameters']['keyword']
    currentIndex = event['queryStringParameters']['currentIndex']
    urlKeyword = urllib.parse.quote(keyword, encoding='shift-jis')
    url = f"https://www.jalan.net/uw/uwp2011/uww2011init.do?keyword={urlKeyword}&dispStartIndex={currentIndex}"
    r = requests.get(url)
    c = r.content
    # ここ原因でAPIGatewayがtimeoutなる
    # soup = BeautifulSoup(c, "html.parser", from_encoding="Shift_JIS")
    # これだとタイムアウト回避できるがデータが少なくなってしまう
    # soup = BeautifulSoup(c, "lxml", from_encoding="Shift_JIS")
    # utf-8に変換してからパース
    soup = BeautifulSoup(c.decode("CP932"), "lxml")
    all=soup.find_all("h2",{"class":"p-searchResultItem__facilityName"})

    facilities=[]

    for item in all:
        d={}
        d["facilityName"]=item.text
        link = item.find('a')
        # d["facilityNo"]=link.get('href').replace("javascript:openYadoSyosai('"," ")[0:7]
        # reで文字列から数字以外を削除
        d["facilityNo"] = re.sub(r"\D", "", link.get('href'))[0:6]
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