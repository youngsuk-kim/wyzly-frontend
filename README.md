# Wyzly Frontend

A React application built with Clean Architecture principles for the Wyzly platform.

## Project Overview

This frontend application is designed to work with the Wyzly backend API. It provides a user interface for customers to browse boxes, place orders, and manage their order history.

## Features

- **Authentication**: Login functionality with token-based authentication
- **Box Listing**: View all available boxes with search functionality
- **Box Details**: View detailed information about a specific box, including inventory status
- **Order Management**: Create orders, view order details, and complete orders
- **Order History**: View a history of all orders
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

## Architecture

The project follows Clean Architecture principles, with a clear separation of concerns:

### Domain Layer
- Contains business entities and use cases
- Independent of any external frameworks or libraries
- Located in `src/domain`

### Data Layer
- Implements repositories defined in the domain layer
- Handles data sources and transformations
- Located in `src/data`

### Presentation Layer
- Contains UI components, pages, and hooks
- Implements the user interface using React and Material UI
- Located in `src/presentation`

### Infrastructure Layer
- Provides implementations for external services
- Handles API communication and configuration
- Located in `src/infrastructure`

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Material UI**: Component library for responsive design
- **Axios**: HTTP client for API communication
- **Context API**: For state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## API Configuration

The application is configured to connect to the backend API at `http://localhost:8080/api`. You can change this in `src/infrastructure/api/apiClient.js`.

## Responsive Design

The application is designed to be responsive across different device sizes:
- Mobile: Optimized for screens smaller than 600px
- Tablet: Optimized for screens between 600px and 960px
- Desktop: Optimized for screens larger than 960px

## Authentication

The application uses token-based authentication. When a user logs in, a token is stored in localStorage and included in all subsequent API requests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
# wyzly-frontend
