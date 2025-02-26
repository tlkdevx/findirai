# Set the execution policy for the current process to RemoteSigned
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

Write-Host "Starting project setup..." -ForegroundColor Cyan

# Remove client\node_modules if it exists
if (Test-Path "client\node_modules") {
    Write-Host "Removing client\node_modules..."
    Remove-Item -Recurse -Force "client\node_modules"
}

# Remove client\package-lock.json if it exists
if (Test-Path "client\package-lock.json") {
    Write-Host "Removing client\package-lock.json..."
    Remove-Item -Force "client\package-lock.json"
}

# Navigate into the client directory and install npm packages and type definitions
Write-Host "Installing npm packages in the client directory..."
Push-Location client

# Install regular dependencies
npm install

# Install type definitions for react and react-dom
npm install --save-dev @types/react @types/react-dom

Pop-Location

# Bring down any running Docker containers (if they exist)
Write-Host "Stopping current Docker containers..."
docker-compose down -v

# Build and start Docker containers
Write-Host "Building Docker containers..."
docker-compose up --build

Write-Host "Project setup complete." -ForegroundColor Green