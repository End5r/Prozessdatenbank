from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
import models
from database import get_db
from models import Orders, Process, ProcessStep
from schemas import OrdersCreate, OrdersOut, ProcessCreate, ProcessOut, ProcessStepCreate, ProcessStepOut, averageStepOut

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

@app.get("/step-average", response_model= list[averageStepOut])
def get_average_step_time_per_step(db: Session = Depends(get_db)):
    information = db.query(ProcessStep.step_order, 
                       func.sum(Process.duration), func.sum(Process.amount)).outerjoin(
                           Process).group_by(ProcessStep.step_order).order_by(ProcessStep.step_order).all()
    result = []
    for step_order, total_duration, total_amount in information:
        average = 0
        if total_amount:
            average = total_duration / total_amount # Minuten pro Stück
        result.append(
            {
                "step_order": step_order,
                "average": average
            }
        )
    return result
