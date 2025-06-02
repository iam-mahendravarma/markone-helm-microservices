from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Task Management API")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://markone:markone123@localhost:27017/")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.task_management

# Models
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    priority: str = "medium"
    due_date: Optional[datetime] = None

class Task(TaskBase):
    id: str
    created_at: datetime
    updated_at: datetime

# Routes
@app.get("/")
async def read_root():
    return {"message": "Welcome to Task Management API"}

@app.get("/tasks/", response_model=List[Task])
async def get_tasks(
    status: Optional[str] = None,
    view: Optional[str] = None,
    priority: Optional[str] = None
):
    query = {}
    
    # Filter by status
    if status:
        query["status"] = status
    
    # Filter by priority
    if priority:
        query["priority"] = priority
    
    # Filter by view type
    if view == "completed":
        query["status"] = "completed"
    elif view == "scheduled":
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        tomorrow = today + timedelta(days=1)
        query["due_date"] = {"$gte": today, "$lt": tomorrow}
    elif view == "upcoming":
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        query["due_date"] = {"$gte": today}
    
    tasks = []
    cursor = db.tasks.find(query).sort("due_date", 1)
    async for document in cursor:
        document["id"] = str(document.pop("_id"))
        tasks.append(document)
    return tasks

@app.get("/tasks/dashboard", response_model=dict)
async def get_dashboard():
    # Get total tasks
    total_tasks = await db.tasks.count_documents({})
    
    # Get tasks by status
    pending_tasks = await db.tasks.count_documents({"status": "pending"})
    in_progress_tasks = await db.tasks.count_documents({"status": "in_progress"})
    completed_tasks = await db.tasks.count_documents({"status": "completed"})
    
    # Get tasks by priority
    high_priority = await db.tasks.count_documents({"priority": "high"})
    medium_priority = await db.tasks.count_documents({"priority": "medium"})
    low_priority = await db.tasks.count_documents({"priority": "low"})
    
    # Get upcoming tasks (due in next 7 days)
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    next_week = today + timedelta(days=7)
    upcoming_tasks = await db.tasks.count_documents({
        "due_date": {"$gte": today, "$lt": next_week}
    })
    
    return {
        "total_tasks": total_tasks,
        "status_summary": {
            "pending": pending_tasks,
            "in_progress": in_progress_tasks,
            "completed": completed_tasks
        },
        "priority_summary": {
            "high": high_priority,
            "medium": medium_priority,
            "low": low_priority
        },
        "upcoming_tasks": upcoming_tasks
    }

@app.post("/tasks/", response_model=Task)
async def create_task(task: TaskBase):
    task_dict = task.dict()
    task_dict["created_at"] = datetime.utcnow()
    task_dict["updated_at"] = datetime.utcnow()
    
    result = await db.tasks.insert_one(task_dict)
    task_dict["id"] = str(result.inserted_id)
    
    return task_dict

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str):
    task = await db.tasks.find_one({"_id": task_id})
    if task:
        task["id"] = str(task.pop("_id"))
        return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, task: TaskBase):
    task_dict = task.dict()
    task_dict["updated_at"] = datetime.utcnow()
    
    result = await db.tasks.update_one(
        {"_id": task_id},
        {"$set": task_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    
    updated_task = await db.tasks.find_one({"_id": task_id})
    updated_task["id"] = str(updated_task.pop("_id"))
    return updated_task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    result = await db.tasks.delete_one({"_id": task_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"} 