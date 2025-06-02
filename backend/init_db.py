from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

async def init_db():
    # MongoDB connection
    MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://markone:markone123@localhost:27017/")
    client = AsyncIOMotorClient(MONGODB_URL)
    
    # Create database and collection
    db = client.task_management
    collection = db.tasks
    
    # Create indexes
    await collection.create_index("title")
    await collection.create_index("status")
    await collection.create_index("priority")
    await collection.create_index("due_date")
    
    print("Database and collection initialized successfully!")
    print("Database name: task_management")
    print("Collection name: tasks")
    
    # Close the connection
    client.close()

if __name__ == "__main__":
    asyncio.run(init_db()) 