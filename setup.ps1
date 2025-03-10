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

# Install type definitions for react, react-dom, and react-router-dom
npm install --save-dev @types/react @types/react-dom @types/react-router-dom

Pop-Location

# Navigate into the server directory and install npm packages
Write-Host "Installing npm packages in the server directory..."
Push-Location server

# Install regular dependencies
npm install

# Install multer package
Write-Host "Installing multer package..."
npm install multer

Pop-Location

# Bring down any running Docker containers (if they exist)
Write-Host "Stopping current Docker containers..."
try {
    docker-compose down -v
} catch {
    Write-Host "Failed to stop Docker containers. Please ensure Docker is running and try again." -ForegroundColor Red
    exit 1
}

# Build and start Docker containers
Write-Host "Building Docker containers..."
try {
    docker-compose up --build
} catch {
    Write-Host "Failed to build Docker containers. Please ensure Docker is running and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Project setup complete." -ForegroundColor Green