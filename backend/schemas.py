from datetime import datetime, date

from pydantic import BaseModel, ConfigDict

class ProcessCreate(BaseModel):
    amount: int
    duration: int
    step_id: int
    produced_at: date

class ProcessStepCreate(BaseModel):
    step_order: int
    is_last: bool


class ProcessOut(ProcessCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProcessStepOut(ProcessStepCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class OrdersCreate(BaseModel):
    ordered_amount: int

class OrdersOut(OrdersCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class EvulationSummary(BaseModel):
    produced: int
    ordered: int

class averageStepOut(BaseModel):
    step_order: int
    average: float

class WeeklySummary(BaseModel):
    week: date
    produced: int
    ordered: int
    duration: int