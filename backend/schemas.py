from datetime import datetime

from pydantic import BaseModel, ConfigDict

class ProcessCreate(BaseModel):
    amount: int
    duration: float
    step_id: int

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