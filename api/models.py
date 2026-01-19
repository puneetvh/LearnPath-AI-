from pydantic import BaseModel, Field
from typing import List, Optional

class StudyRequest(BaseModel):
    topic: str = Field(..., description="The subject to study (e.g. 'Advanced Python', 'Calculus')")
    current_level: str = Field(..., description="Current knowledge level (e.g. 'Beginner', 'Intermediate')")
    time_commitment: str = Field(..., description="Total time available (e.g. '2 weeks', '10 hours')")

class Resource(BaseModel):
    title: str = Field(..., description="Title of the resource")
    type: str = Field(..., description="Type of resource (Video, Article, Book, Code)")
    url: Optional[str] = Field(None, description="URL if available")
    description: Optional[str] = Field(None, description="Brief description")

class DayPlan(BaseModel):
    day_label: str = Field(..., description="Day identifier (e.g. 'Day 1', 'Monday')")
    tasks: List[str] = Field(..., description="List of specific learning tasks")
    resources: List[Resource] = Field(..., description="Recommended resources")

class WeekPlan(BaseModel):
    week_label: str = Field(..., description="Week identifier (e.g. 'Week 1')")
    goal: str = Field(..., description="Main learning goal for the week")
    days: List[DayPlan] = Field(..., description="Daily breakdown")

class StudyPlan(BaseModel):
    title: str = Field(..., description="Title of the study plan")
    weeks: List[WeekPlan] = Field(..., description="Weekly breakdown")
