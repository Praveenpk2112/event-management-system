# 🎓 Event Management System

A full-stack event management platform built with a microservices architecture, designed to streamline event creation, faculty coordination, and student registration for campus/organizational events.

---

## 📌 Overview

This system helps manage the end-to-end lifecycle of events — from creation and faculty assignment to student registration — through a set of independent backend services and a modern frontend.

## 🏗️ Architecture

The project follows a **microservices-based** design, with each core responsibility split into its own service:

```
event-management-system/
├── eventService/       # Handles event creation, updates, and listings
├── facultyService/     # Manages faculty details and event coordination
├── studentRegister/    # Handles student registration for events
└── frontend/           # Client-facing web application
```

## 🛠️ Tech Stack

| Layer            | Technology                          |
|-------------------|--------------------------------------|
| Backend services  | Java (Spring Boot)                  |
| Frontend          | TypeScript                          |
| Containerization  | Docker                              |

> ℹ️ *Update this table with the exact frameworks/libraries used in each service (e.g., Spring Boot version, React/Next.js/Angular for the frontend, database used) for full accuracy.*

## 🚀 Getting Started

### Prerequisites

- Java 17+ and Maven/Gradle (for backend services)
- Node.js and npm/yarn (for the frontend)
- Docker (optional, for containerized setup)

### Clone the repository

```bash
git clone https://github.com/Praveenpk2112/event-management-system.git
cd event-management-system
```

### Run the backend services

Each service can be run independently:

```bash
cd eventService
./mvnw spring-boot:run
```

```bash
cd facultyService
./mvnw spring-boot:run
```

```bash
cd studentRegister
./mvnw spring-boot:run
```

### Run the frontend

```bash
cd frontend
npm install
npm run dev
```

> ℹ️ *Add exact ports, environment variables (`.env`), and any database configuration required to run each service.*

### Run with Docker (optional)

```bash
docker build -t event-management-system .
docker run -p 8080:8080 event-management-system
```

## 📂 Project Structure

- **`eventService/`** — REST API for creating, updating, and retrieving event details.
- **`facultyService/`** — Manages faculty registration and their association with events.
- **`studentRegister/`** — Handles student sign-ups and registration for events.
- **`frontend/`** — User interface for browsing events, registering, and managing details.

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

## 📄 License

No license has been specified for this project yet. Consider adding one (e.g., MIT) so others know how they can use your code.

## 👤 Author

**Praveen PK**
GitHub: [@Praveenpk2112](https://github.com/Praveenpk2112)
