from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class Process(BaseModel):
    name: str
    duration: int

#CORS für Angular Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

processes = [
        {"id": 1, "name": 'Head', "duration": 1},
        {"id": 2, "name": 'Wrinkler', "duration": 4}
    ]

@app.get("/api/processes")
def getProcesses():
    return processes 

@app.post("/api/processes")
def addProcess(process: Process):
    process_dict = process.model_dump()
    process_dict["id"] = 1  #TODO needs to be optimized
    processes.append(process_dict)
    return process_dict


