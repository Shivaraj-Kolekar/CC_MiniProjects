# from fastapi import FastAPI, Depends, HTTPException
# from pydantic import BaseModel
# from typing import List
# from sqlalchemy import create_engine, Column, Float, String, Integer
# from sqlalchemy.orm import declarative_base, sessionmaker, Session
# from models.students_models import Student
# from models.enrollments_models import Enrollments,EnrolledCoursesResponse
# from models.course_models import Course

# def fetch_enrolled_courses(db: Session, student_id: int):
#     enrollment_records = db.query(DBEnrollments).filter(DBEnrollments.student_id == student_id).all()
#     return [record.course_id for record in enrollment_records]


# def create_enrollments(db:Session, enrollment:Enrollments):
#     db_enrollment=DBEnrollments(**enrollment.model_dump())
#     db.add(db_enrollment)
#     db.commit()
#     db.refresh(db_enrollment)
#     return  db_enrollment