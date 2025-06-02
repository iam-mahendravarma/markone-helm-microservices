# Use the official MongoDB image from Docker Hub
FROM mongo:6.0

# Optional: Set environment variables (use docker-compose or Kubernetes secrets for production)
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin123

# Copy initialization scripts (for creating DBs, users, etc.)
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

# Expose MongoDB default port
EXPOSE 27017

# MongoDB runs automatically using CMD in the base image
