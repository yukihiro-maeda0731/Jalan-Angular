import boto3
import json

client = boto3.client('translate')

def lambda_handler(event, context):

    japanese = event['queryStringParameters']['japanese']
    result = client.translate_text(Text=japanese, SourceLanguageCode="ja", TargetLanguageCode="en")
    
    response = {}
    response['english'] = result
    
    responseObject = {}
    responseObject['body'] = json.dumps(response)

    # CORS対策後
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': responseObject['body']
    }