from sqlalchemy.orm import relationship

from database import Base
from sqlalchemy import Column, Float, ForeignKey, Integer, TIMESTAMP, Boolean, text

class ProcessStep(Base):
    __tablename__ = "process_steps"

    id = Column(Integer,primary_key=True,nullable=False)
    step_order = Column(Integer, nullable=False)
    is_last = Column(Boolean, server_default='FALSE', nullable=False)

    processes = relationship("Process", back_populates="step")

class Process(Base):
    __tablename__ = "process"

    id = Column(Integer,primary_key=True,nullable=False)
    amount = Column(Integer, nullable=False)
    duration = Column(Float, nullable=False)
    step_id = Column(Integer, ForeignKey("process_steps.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)

    step = relationship("ProcessStep", back_populates="processes")


class Orders(Base):
    id = Column(Integer, primary_key=True, nullable=False)
    ordered_amount = Column(Integer, nullable=False)
    sold_amount = Column(Integer, nullable=False)
    