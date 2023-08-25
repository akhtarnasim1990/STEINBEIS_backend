# Backend project

## Table of Contents

- [Backend project](#backend-project)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Technologies Used](#technologies-used)

## Description

A brief introduction to your backend project. Explain what it does, its main features, and its role in the overall application architecture. You can also mention any key concepts or technologies used.

## Getting Started

### Prerequisites

- Node.js (version 16.18.0)
- MongoDB (comapss)

### Installation

Provide step-by-step instructions for setting up the project locally on a developer's machine.

1. Clone the repository: git clone git@github.com:akhtarnasim1990/STEINBEIS_backend.git

2. Navigate to the project directory: cd STEINBEIS_backend

3. Install dependencies: npm install

### Configuration

NO variables is stored in env file, so that it can be easily accessible.

## Usage

1. Start the server: npm run dev (if nodemon is globally installed) or npm start

2. The server will run on http://localhost:8000 by default.

## Endpoints

List the available API endpoints .

- `POST /users/login`: To login the asset page.
  payloads: {
  name: 'username',
  password: 'password'
  }
- `POST /users/userDetails`: Save user details.
  payloads: {
  name(unique),
  dob,
  age,
  gender,
  }
- `POST /users/assetPurchasing`: To purchase the asset.
  payloads: {
  userName,
  assetName,
  bankBalance
  }
- `POST /asset/assetDetails`: Save asset details.
  payloads: {
  assetName(unique),
  quantity,
  cost,
  }

## Technologies Used

List the main technologies, libraries, and tools used to build backend project.

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- ...
