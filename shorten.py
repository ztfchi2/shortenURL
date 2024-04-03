import config
import randstr
import os

def shorten_url(url):
    token = randstr.generate_rand_token(6)
    print(token)
    return os.path.join(config.host,token)