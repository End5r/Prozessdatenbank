from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
import models
from database import get_db
from models import Orders, Process, ProcessStep
from schemas import OrdersCreate, OrdersOut, ProcessCreate, ProcessOut, ProcessStepCreate, ProcessStepOut

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

# TODO Also needs to be connected with frontend
@app.delete("/process/step/{process_step_id}")
def delete_process_step(process_step_id: int, db:Session = Depends(get_db)):
    process_step = db.query(models.ProcessStep).filter(models.ProcessStep.id == process_step_id).first()

    db.delete(process_step)
    db.commit()

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


# TODO Also needs to be connected with frontend
@app.delete("/process/{process_id}")
def delete_process(process_id: int, db:Session = Depends(get_db)):
    process = db.query(models.Process).filter(models.Process.id == process_id).first()

    db.delete(process)
    db.commit()
    
# TODO
@app.patch("/process/{process_id}")
def update_process(process_id: int, db: Session = Depends(get_db)):
    pass

@app.post("/orders", response_model=OrdersOut)
def add_orders(orders_in: OrdersCreate, db : Session = Depends(get_db)):
    information = orders_in.model_dump()
    object = Orders(**information)

    db.add(object)
    db.commit()
    db.refresh(object)
    return object

@app.get("/orders", response_model=list[OrdersOut])
def get_orders(db: Session = Depends(get_db)):
    output = db.query(Orders).all()
    return output

@app.get("/evaluation")
def get_evualuation(db: Session = Depends(get_db)):
    produced = db.query(func.sum(Process.amount)).join(
        ProcessStep).where(ProcessStep.is_last == True).scalar()

    ordered = db.query(func.sum(Orders.ordered_amount)).scalar()

    return {
        "produced": produced or 0,
        "ordered": ordered or 0
    }