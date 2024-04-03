import redis
import config

_redis_client = redis.Redis(host=config.redis_host, port=config.redis_port, decode_responses=True)

def set(short_token,origin_url):
    return _redis_client.set(short_token,origin_url)

def get(short_token):
    return _redis_client.get(short_token)