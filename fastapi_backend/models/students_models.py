from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Float, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker, Session

class Student(BaseModel):
    student_id:float
    name: str
    age: float
    email: str

    class Config:
        orm_mode = True

