

# Realtime-Excel

`realtime-excel` is a project that provides real-time spreadsheet management and user interaction features. It allows users to create, update, and access spreadsheets, with support for real-time collaboration. This project handles user management and authorization using JWT cookies and headers for authentication.

## Features

- **User Management**: Users can register, log in, and manage their profiles.
- **Spreadsheet Management**: Create, update, and view spreadsheets with real-time updates.
- **Authorization**: Supports both session JWT cookies and header-based authentication for secure access control.

## Installation

To get started with `realtime-excel`, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd realtime-excel
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGODB_URL=<your-mongodb-connection-url>
   FRONT=<your-frontend-url>
   PORT=<your-port-number>
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

## API Endpoints

### User Routes

- **POST /api/user/signup**: Register a new user.
- **POST /api/user/login**: Authenticate a user and return a JWT token.
- **GET /api/user/users**: Get a list of all users (protected route).
- **GET /api/user/user**: Get authenticated user information (protected route).
- **GET /api/user/logout**: Logout a user by clearing the JWT token.

### Spreadsheet Routes

- **POST /api/file/create-spreadsheet**: Create a new spreadsheet and update users' projects.
- **GET /api/file/spreadsheet/:spreadsheetId**: Get spreadsheet content by ID.
- **POST /api/file/check/:spreadsheetId**: Check if a spreadsheet is accessible by the user.
- **POST /api/file/spreadsheet/:spreadsheetId**: Update spreadsheet data and name.

## Authentication

Authentication is managed via JWT cookies and headers:

- **JWT Cookies**: Tokens are stored as HTTP-only cookies for security.
- **Headers**: JWT tokens can also be included in headers for API requests.

## Development

For development purposes, you can run the server using:

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.

## License

This project is licensed under the MIT License.

---

Feel free to adjust any details as needed!