from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Float, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker, Session
# from models.students_models import Student
# from models.enrollments_models import Enrollments,EnrolledCoursesResponse
# from models.course_models import Course
app = FastAPI()

SQLALCHEMY_DATABASE_URL = 'sqlite+pysqlite:///./db.sqlite3'
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Separate ORM models for students and courses

class DBStudent(Base):
    __tablename__ = 'students'
    student_id=Column(Float, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String)
    age = Column(Float)

class DBCourse(Base):
    __tablename__ = 'courses'
    course_id=Column(Float, primary_key=True, index=True)
    title = Column(String(80))
    description = Column(String)

class DBEnrollments(Base):
    __tablename__="enrollments"
    Enrollment_id=Column(Integer, primary_key=True,index=True,autoincrement=True)
    course_id=Column(Float)
    student_id=Column(Float)


Base.metadata.create_all(bind=engine)


class Student(BaseModel):
    student_id:float
    name: str
    age: float
    email: str

    class Config:
        orm_mode = True

class Course(BaseModel):
    course_id:float
    title: str
    description: str

    class Config:
        orm_mode = True

class Enrollments(BaseModel):
    course_id:float
    student_id:float

    class Config:
        orm_mode = True

class EnrolledCoursesResponse(BaseModel):
    enrolled_courses: List[float]

    class Config:
        orm_mode = True


# Helper functions for Student

def fetch_student(db: Session, sid: int):
    return db.query(DBStudent).filter(DBStudent.student_id == sid).first()

def fetch_course(db: Session, cid: int):
    return db.query(DBCourse).filter(DBCourse.course_id == cid).first()

def fetch_students(db: Session):
    return db.query(DBStudent).all()

def fetch_courses(db:Session):
    return db.query(DBCourse).all()

def fetch_enrolled_courses(db: Session, student_id: int):
    enrollment_records = db.query(DBEnrollments).filter(DBEnrollments.student_id == student_id).all()
    return [record.course_id for record in enrollment_records]

def create_student(db: Session, student: Student):
    db_student = DBStudent(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def create_enrollments(db:Session, enrollment:Enrollments):
    db_enrollment=DBEnrollments(**enrollment.model_dump())
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return  db_enrollment

def create_course(db: Session, course: Course):
    db_course = DBCourse(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


@app.post('/students', response_model=Student)
def create_student_view(student: Student, db: Session = Depends(get_db)):
    return create_student(db, student)

@app.post('/courses', response_model=Course)
def create_course_view(course: Course, db: Session = Depends(get_db)):
    return create_course(db, course)

@app.post('/enrollments', response_model=Enrollments)
def create_enrollments_view(enrollment:Enrollments, db:Session=Depends(get_db)):
    return create_enrollments(db,enrollment)


@app.get('/students-data', response_model=List[Student])
def list_students(db: Session = Depends(get_db)):
    return fetch_students(db)

@app.get('/courses-data', response_model=List[Course])
def list_courses(db:Session=Depends(get_db)):
    return fetch_courses(db)

@app.get('/students/{id}', response_model=Student)
def get_student_view(id: int, db: Session = Depends(get_db)):
    student_obj = fetch_student(db, id)
    if not student_obj:
        raise HTTPException(status_code=404, detail="Student not found")
    return student_obj

@app.get('/courses/{id}', response_model=Course)
def get_student_view(id: int, db: Session = Depends(get_db)):
    student_obj = fetch_course(db, id)
    if not student_obj:
        raise HTTPException(status_code=404, detail="Course not found")
    return student_obj

@app.get('/students/{student_id}/courses/', response_model=EnrolledCoursesResponse)
def get_student_courses(student_id: int, db: Session = Depends(get_db)):
    course_ids = fetch_enrolled_courses(db, student_id)
    return {"enrolled_courses": course_ids}