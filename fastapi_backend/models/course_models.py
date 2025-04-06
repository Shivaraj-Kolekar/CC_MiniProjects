from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Float, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker, Session

class Course(BaseModel):
    course_id:float
    title: str
    description: str

    class Config:
        orm_mode = True