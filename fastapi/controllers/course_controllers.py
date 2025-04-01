# from fastapi import FastAPI, Depends, HTTPException
# from pydantic import BaseModel
# from typing import List
# from sqlalchemy import create_engine, Column, Float, String, Integer
# from sqlalchemy.orm import declarative_base, sessionmaker, Session
# from models.students_models import Student
# from models.enrollments_models import Enrollments,EnrolledCoursesResponse
# from models.course_models import Course
# def fetch_course(db: Session, cid: int):
#     return db.query(DBCourse).filter(DBCourse.course_id == cid).first()

# def fetch_courses(db:Session):
#     return db.query(DBCourse).all()

# def create_course(db: Session, course: Course):
#     db_course = DBCourse(**course.model_dump())
#     db.add(db_course)
#     db.commit()
#     db.refresh(db_course)
#     return db_course