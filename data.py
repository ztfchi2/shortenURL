_data = {}

def get(short_token):
    return _data.get(short_token)

def set(short_token,orgin_url):
    _data[short_token] = orgin_url