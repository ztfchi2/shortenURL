_data = {}


def set(short_token,origin_url):
    _data[short_token] = origin_url

def get(short_token):
    return _data.get(short_token)