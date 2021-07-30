from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from backend import settings, urls, db

# Init
app = FastAPI(**settings.API_METADATA)

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(**settings.MIDDLEWARE)

# Static files
app.mount("/static", StaticFiles(directory=settings.STATIC_FILES), name="static")

# Path
[app.include_router(path) for path in urls.URL_PATTERNS]

# Events
@app.on_event("startup")
async def startup():
    db.metadata.create_all(db.engine)
    await db.database.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.database.disconnect()

# Catch all path (react-router-dom) handles it
@app.get('/{catch_all:path}', include_in_schema=False)
def ReactFrontend():
    try:
        with open(settings.TEMPLATE, 'r') as html:
            HTML_CONTENT = html.read()
            html.close()
            return HTMLResponse(HTML_CONTENT, status_code=200)
    except FileNotFoundError as exec:
        raise exec