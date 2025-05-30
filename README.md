# 🚀 markone-helm-microservices

A production-ready Helm-based Kubernetes deployment template for a microservices architecture.

---

## 📦 Architecture

Markone --> 
├──> Frontend Service (React/Next.js)
└──> Backend Service (Node.js)
└──> MongoDB Database


Each component is deployed as a separate Helm subchart, making it modular and easy to maintain.

---

## 🧱 Project Structure

markone-helm-microservices/
├── Chart.yaml
├── values.yaml
├── charts/
│ ├── frontend/
│ │ ├── templates/
│ │ └── values.yaml
│ ├── backend/
│ │ ├── templates/
│ │ └── values.yaml
│ └── database/
│ ├── templates/
│ └── values.yaml
└── templates/
└── ingress.yaml


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
 
