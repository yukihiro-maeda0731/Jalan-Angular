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
    print("url")
    print(url)
    r = requests.get(url)
    c = r.content
    print("c")
    print(c)
    # ここ原因でAPIGatewayがtimeoutなる
    # soup = BeautifulSoup(c, "html.parser", from_encoding="Shift_JIS")
    # これだとタイムアウト回避できるがデータが少なくなってしまう
    # soup = BeautifulSoup(c, "lxml", from_encoding="Shift_JIS")
    # utf-8に変換してからパース
    soup = BeautifulSoup(c.decode("CP932"), "lxml")
    all = soup.find_all("div",{"class":"p-yadoCassette__body p-searchResultItem__body"})
    facilityName = soup.find_all("h2",{"class":"p-searchResultItem__facilityName"})
    facilityNameIndex = 0
    addressGroup = soup.find_all("dd",{"class":"p-searchResultItem__facilityInfoValue"})
    addressGroupIndex = 0
    facilities = []
    print("a")
    print(all)

    for item in all:
        d = {}
        print("itemtext")
        print(item.text)
        d["facilityName"] = facilityName[facilityNameIndex].text
        facilityNameIndex = facilityNameIndex + 1
        link = item.find('a')
        print("link")
        print(link)
        # reで文字列から数字以外を削除
        d["facilityNo"] = re.sub(r"\D", "", link.get('href'))[0:6]
        d["facilityAddress"] = addressGroup[addressGroupIndex].text
        # 偶数が必要な情報(住所)・奇数が不要な情報のため偶数のみ格納
        addressGroupIndex = addressGroupIndex + 2
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