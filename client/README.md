# Findirai

## Project Setup

### Prerequisites
- Node.js
- Docker
- Docker Compose
- PowerShell

### Initial Setup

1. Clone the repository:
    ```powershell
    git clone https://github.com/tlkdevx/findirai.git
    cd findirai
    ```

2. Run the setup script:
    ```powershell
    .\setup.ps1
    ```

### Running the Application

- The application will be available at `http://localhost:3000`.

### Project Structure

```plaintext
findirai/
├── client/
|   ├── public/
|   ├── src/
|   ├── package.json
|   ├── tsconfig.json
|   └── ...
├── server/
|   ├── src/
|   ├── package.json
|   ├── tsconfig.json
|   └── ...
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── setup.ps1
└── README.md
```

### Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Create a pull request.