from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Float, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker, Session


class Enrollments(BaseModel):
    course_id:float
    student_id:float

    class Config:
        orm_mode = True

class EnrolledCoursesResponse(BaseModel):
    enrolled_courses: List[float]

    class Config:
        orm_mode = True