# HemoWebApp

HemoWebApp is an Angular-based frontend that connects to a .NET Web API and an Azure SQL database to deliver an interactive, data-driven experience for cardiac hemodynamics education.

---

## Overview

HemoWebApp provides:

- **Dynamic dashboards** for case attempts, flashcards, quizzes, puzzle-steps, and more  
- **CSV export** functionality for all data tables  
- **Real-time data interaction** with a Web API  
- **Persistent storage** in Azure SQL  

---

## Tech Stack

- **Frontend**  
  - Angular (v16+)  
  - TypeScript  
  - RxJS  

- **Backend**  
  - ASP.NET Core Web API (C#, .NET 7)  
  - Newtonsoft.Json for JSON serialization  

- **Database**  
  - Azure SQL Server (hosted in Microsoft Azure)  

- **Source Control**  
  - Frontend repository: [Link](https://github.com/brimatt16219/Hemo_Web_App)  
  - Backend repository:  [Link](https://ucfcom.visualstudio.com/z_EdTech_2024_cARdiac_Hemo_Web_API/_git/z_EdTech_2024_cARdiac_Hemo_Web_API)
    

---

## Getting Started

### Prerequisites

- **Node.js** v16 or higher  
- **Angular CLI** (`npm install -g @angular/cli`)  
- **.NET 7 SDK**  
- **Azure SQL connection string** (server, database, user, password)

---

### 1. Clone the Repositories

```bash
# Frontend (HemoWebApp)
git clone <your-frontend-repo-url> HemoWebApp
cd HemoWebApp

# Backend (Web API)
git clone https://ucfcom.visualstudio.com/z_EdTech_2024_cARdiac_Hemo_Web_API/_git/z_EdTech_2024_cARdiac_Hemo_Web_API
cd z_EdTech_2024_cARdiac_Hemo_Web_API
```

---

### 2. Configure the Backend

Edit `appsettings.json` in the backend project to include your Azure SQL connection string:

```json
{
  "ConnectionStrings": {
    "DataConnection": "Server=<your-azure-server>.database.windows.net;Database=<db-name>;User Id=<user>;Password=<password>;"
  }
}
```

Restore, build, and run the API:

```bash
dotnet restore
dotnet build
dotnet run
```

The API will listen by default on `http://localhost:5295`.

---

### 3. Configure & Run the Frontend

Back in the HemoWebApp directory:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update the environment file (`src/environments/environment.ts`) to point to your API:
   ```ts
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:5295/api'
   };
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```
   The app will run at `http://localhost:4200`.

---

## Project Structure

```
HemoWebApp/
├── src/
│   └── app/
│       ├── dashboard/              # global dashboard components
│       ├── crv/                    # CVR-related components
│       │   ├── cvrcase-attempts/
│       │   ├── cvrcases/
│       │   ├── cvrflashcard-attempts/
│       │   ├── cvrquiz-attempts/
│       │   └── cvrquizes/
│       ├── drhemo/                 # Hemo-related components
│       │   ├── drhemo-answers/
│       │   ├── drhemo-attempts/
│       │   └── drhemo-puzzlesteps/
│       ├── leaderboard/            # Leaderboard component
│       ├── login/                  # Login component
│       ├── nav-bar/                # Navigation bar
│       ├── services/               # HTTP and data services
│       └── students/               # Student management
│           ├── add-student/
│           └── edit-student/
├── angular.json
├── package.json
└── README.md
```

---

## Author

### Brian Chang
- GitHub: [@brimatt16219](https://github.com/brimatt16219)  
- LinkedIn: [linkedin.com/in/ch4ng](https://www.linkedin.com/in/ch4ng/)
- Email: brimatt062495@gmail.com
