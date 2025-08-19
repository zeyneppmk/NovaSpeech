from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from app.routes import transcribe

app = FastAPI()

# Route kaydı
app.include_router(transcribe.router)

@app.get("/")
async def redirect_to_docs():
    return RedirectResponse(url="/docs")
