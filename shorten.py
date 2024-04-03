import config
import randstr
import os

def shorten_url(url):
# EDIT :  token에 host url을 직접 붙여서 리턴하는 방식에서 token만 리턴
#  token = randstr.generate_rand_token(6)
#  return os.path.join(config.host,token)
    return randstr.generate_rand_token(6)