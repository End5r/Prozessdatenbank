from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, literal_column
import models
from database import get_db
from models import Orders, Process, ProcessStep
from schemas import OrdersCreate, OrdersOut, ProcessCreate, ProcessOut, ProcessStepCreate, ProcessStepOut, WeeklySummary, averageStepOut

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
            average = round((total_duration / total_amount),0) # Minuten pro Stück
        result.append(
            {
                "step_order": step_order,
                "average": average
            }
        )
    return result


def weekly_adapter(db : Session):
    week_trunc = func.date_trunc('week', Process.produced_at)
    information = db.query(week_trunc, func.sum(Process.amount)).join(ProcessStep).where(
        ProcessStep.is_last == True).group_by(week_trunc).all()

    result = []
    for week, total_amount in information:
        result.append(
            {
                "week": week.date(),
                "total_amount": total_amount
            }
        )
    return result


def weekly_ordered(db: Session):
    week_trunc = func.date_trunc('week', Orders.created_at)
    information = db.query(week_trunc, func.sum(Orders.ordered_amount)).group_by(week_trunc).all()

    result = []

    for week, total_amount in information:
        result.append(
            {
                "week": week.date(),
                "total_amount": total_amount
            }
        )
    return result


def weekly_duration(db : Session):
    week_trunc = func.date_trunc('week',Process.produced_at)
    information = db.query(week_trunc, func.sum(Process.duration)).group_by(week_trunc).all()

    result = []

    for week, duration in information:
        result.append(
            {
                "week": week.date(),
                "duration": duration 
            }
        )

    return result

@app.get("/summary_week", response_model=list[WeeklySummary])
def get_weekly_summary(db : Session = Depends(get_db)):
    adapters = weekly_adapter(db)
    ordered = weekly_ordered(db)
    durations = weekly_duration(db)

    summary = {}
    
    for item in adapters:
        entry = summary.setdefault(item["week"], {"produced": 0, "ordered": 0, "duration": 0})
        entry["produced"] = item["total_amount"]

    for item in ordered:
        entry = summary.setdefault(item["week"], {"produced": 0, "ordered": 0, "duration": 0})
        entry["ordered"] = item["total_amount"]

    for item in durations:
        entry = summary.setdefault(item["week"], {"produced": 0, "ordered": 0, "duration": 0})
        entry["duration"] = item["duration"]
        

    result = []

    for item in sorted(summary.keys()):
        result.append( {
            "week": item,
            "produced": summary[item]["produced"],
            "ordered": summary[item]["ordered"],
            "duration": summary[item]["duration"]
        }
        )
    return result