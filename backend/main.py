from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
from models import Process, ProcessStep
from schemas import ProcessCreate, ProcessOut, ProcessStepCreate, ProcessStepOut

app = FastAPI()

#CORS für Angular Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Show all Process Steps
@app.get("/process/step", response_model=list[ProcessStepOut])
def get_process_step(db: Session = Depends(get_db)):
    output = db.query(ProcessStep).all()
    return output

    
# Add Process Steps to the database
@app.post("/process/step", response_model=ProcessStepOut)
def add_process_step(process_step_in: ProcessStepCreate, db: Session = Depends(get_db)):
    information = process_step_in.model_dump()
    object = ProcessStep(**information)

    db.add(object)
    db.commit()
    db.refresh(object)

    return object

@app.get("/process", response_model=list[ProcessOut])
def get_process(db: Session = Depends(get_db)):
    output = db.query(Process).all()
    return output

# Add Process to the database
@app.post("/process", response_model=ProcessOut)
def add_process(process_in: ProcessCreate, db: Session = Depends(get_db)):
    information = process_in.model_dump()
    object = Process(**information)

    db.add(object)
    db.commit()
    db.refresh(object)

    return object