from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import shorten

app = FastAPI()

@app.get("/")
async def read_index():
    return FileResponse('public/index.html',media_type='text/html')


@app.get("/url/short")
async def shorten_URL(url):
    short_url = shorten.shorten_url(url)
    return {"message": "success","url":short_url}

app.mount("/", StaticFiles(directory="public"), name="static")