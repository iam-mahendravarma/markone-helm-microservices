# 🚀 markone-helm-microservices

A production-ready Helm-based Kubernetes deployment template for a microservices architecture.

---

## 📦 Architecture

Markone
──> Frontend Service 
──> Backend Service
──> MongoDB Database


Each component is deployed as a separate Helm subchart, making it modular and easy to maintain.

---

## 🚀 Getting Started

### Prerequisites

- Kubernetes cluster (minikube, kind, or cloud provider)

- Helm 3+

- Docker (for building custom images)

- Ingress Controller (e.g., NGINX)

### 1. Clone the repo

git clone https://github.com/iam-mahendravarma/markone-helm-microservices.git

cd markone-helm-microservices

### 2. Package dependencies

helm dependency update

### 3. Install Helm chart

helm install markone .

### 4. Access the application

kubectl port-forward svc/frontend 8080:80

Then open: http://localhost:8080
 
