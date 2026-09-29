from fastapi import FastAPI

app = FastAPI()

#CORS für Angular Frontend

@app.get("/api/processes")
def getProcesses():
    return [
        {"id": 1, "name": 'Temperatur', "amount": 42.5, "timestamp": '2012', "status": 'GOOD'},
        {"id": 2, "name": 'Wrinkler', "amount": 12, "timestamp": '2018', "status": "BAD"}
    ]