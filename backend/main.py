from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#CORS für Angular Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/processes")
def getProcesses():
    return [
        {"id": 1, "name": 'Temperatur', "amount": 42.5, "timestamp": '2012', "status": 'GOOD'},
        {"id": 2, "name": 'Wrinkler', "amount": 12, "timestamp": '2018', "status": "BAD"}
    ]