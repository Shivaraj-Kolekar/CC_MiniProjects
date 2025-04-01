# from fastapi import FastAPI, Depends, HTTPException
# from pydantic import BaseModel
# from typing import List
# from sqlalchemy import create_engine, Column, Float, String, Integer
# from sqlalchemy.orm import declarative_base, sessionmaker, Session
# from main import DBStudent
# def fetch_student(db: Session, sid: int):
#     return db.query(DBStudent).filter(DBStudent.student_id == sid).first()
# def fetch_students(db: Session):
#     return db.query(DBStudent).all()
