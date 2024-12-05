# Backoffice-Bank-API-Service

# .NET Core 8 Web API Service

This repository contains a .NET Core 8 Web API service. Follow the instructions below to set up and run the application.

---

## Prerequisites

Ensure the following tools are installed on your machine:

1. **.NET SDK 8.0**  
   [Download and install .NET SDK 8.0](https://dotnet.microsoft.com/download)

2. **Git**  
   [Download and install Git](https://git-scm.com/)

3. **Database**  
   If the service depends on a database, ensure it is set up and running.

---

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Restore Dependencies
Run the following command to restore all dependencies:

```bash
dotnet restore
```

### 3. Update Configuration (Optional)
If the service requires specific configurations (e.g., database connection strings or JWT settings), update the `appsettings.json` file located in the `src` folder.

Example:
```json
"Jwt": {
  "Key": "your_secret_key",
  "Issuer": "your_issuer",
  "Audience": "your_audience"
}
```

---

## Running the Application

### 1. Start the Service
Run the application locally using the following command:

```bash
dotnet run
```

The service will start, and the console output will display the URL (e.g., `http://localhost:5000`).

### 2. Access the Swagger UI (Optional)
If Swagger is enabled, open your browser and navigate to:

```
http://localhost:5000/swagger
```

---

## Testing the Endpoints
You can test the endpoints using:
- **Postman** or **curl**.
- Use the Swagger UI for interactive API testing.

Example `curl` command:
```bash
curl -X GET "http://localhost:5000/api/Customer" -H "Accept: application/json"
```

---

## Publishing the Application
To publish the application for deployment:

```bash
dotnet publish -c Release -o ./publish
```

Deploy the contents of the `./publish` folder to your server or hosting environment.

---

## Troubleshooting
- If you encounter `dotnet` errors, ensure the correct version of .NET SDK is installed.
- Check the logs in the console output for detailed error information.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
```

Replace `<repository-url>` with your repository's URL. Add or remove sections as needed for your specific application.
