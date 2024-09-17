# Fyama

ML webapp for predicting health insurance premium based on medical and general insurance data.

# Setup

## VS Code

- VS Code will prompt you to install recommended extensions when you open the project, it is recommended to install them.

## Clone the repository

```
git clone https://github.com/SenZmaKi/Fyama.git && cd Fyama
```

## Backend

From Fyama directory:

```
cd backend
```

Ensure you have Python 3.12 or higher installed.

### Install dependencies

- Windows (Command Prompt)

```
python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt
```

- Linux/Mac

```
python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
```

### Start backend server

```
python -m server
```

- To use a different port, set the `FLASK_PORT` environment variable
- By default, the port is 5000

```
set FLASK_PORT=5001
```

- To enable or disable debug mode, set the `FLASK_DEBUG` environment variable
- By default, debug mode is enabled

```
set FLASK_DEBUG=1
set FLASK_DEBUG=0
```

## Frontend

Ensure you have Node.js 22.1.0 or higher installed.

From Fyama directory:

```
cd frontend
```

### Install dependencies

```
npm install
```

### Start frontend server

```
npm run dev
```
