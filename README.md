# Super Admin Panel - Full Stack Application

This is a complete admin panel application with super admin and sub admin functionality, built with React frontend and Node.js backend.

## Project Structure

```
super/
├── landing_super_backend/     # React Frontend
└── super_Backend/            # Node.js Backend
```

## Features

### Super Admin
- Dashboard with statistics
- Manage landing pages (CRUD operations)
- Manage sub admins (approve, reject, create, delete)
- Handle access requests from sub admins
- View and export all leads
- Grant/revoke landing page access to sub admins

### Sub Admin
- Dashboard with assigned landing page statistics
- View and manage leads from assigned landing pages
- Update lead status and details
- Request access to additional landing pages
- Export leads data

### Landing Pages
- Public lead submission endpoints
- Lead management and tracking
- IP address and user agent logging

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Backend Setup

### 1. Navigate to backend directory
```bash
cd super_Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `config.env` file in the `super_Backend` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/super_admin_panel
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

### 4. Database Setup
Make sure MongoDB is running, then run the setup script:

```bash
# Create initial super admin and sample data
node scripts/setup.js

# Create demo users for testing
node scripts/createDemoUsers.js
```

### 5. Start the backend server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd landing_super_backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `landing_super_backend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the frontend development server
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Demo Users

After running the setup scripts, you can use these demo accounts:

### Super Admin
- **Email:** superadmin@example.com
- **Password:** SuperAdmin@123

### Sub Admin
- **Email:** subadmin@example.com
- **Password:** password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new sub admin
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Super Admin
- `GET /api/dashboard/super-admin` - Dashboard statistics
- `GET /api/super-admin/landing-pages` - List all landing pages
- `POST /api/super-admin/landing-pages` - Create landing page
- `PUT /api/super-admin/landing-pages/:id` - Update landing page
- `DELETE /api/super-admin/landing-pages/:id` - Delete landing page
- `GET /api/super-admin/sub-admins` - List all sub admins
- `POST /api/super-admin/sub-admins` - Create sub admin
- `PUT /api/super-admin/sub-admins/:id` - Update sub admin
- `DELETE /api/super-admin/sub-admins/:id` - Delete sub admin
- `GET /api/super-admin/leads` - List all leads
- `GET /api/super-admin/leads/export` - Export leads

### Sub Admin
- `GET /api/dashboard/sub-admin` - Dashboard statistics
- `GET /api/sub-admin/profile` - Get profile
- `PUT /api/sub-admin/profile` - Update profile
- `GET /api/sub-admin/landing-page` - Get assigned landing pages
- `GET /api/sub-admin/leads` - Get leads from assigned landing pages
- `PUT /api/sub-admin/leads/:id/status` - Update lead status
- `PUT /api/sub-admin/leads/:id` - Update lead details
- `GET /api/sub-admin/leads/export` - Export leads
- `GET /api/sub-admin/dashboard-stats` - Dashboard statistics

### Access Requests
- `POST /api/access-requests` - Create access request
- `GET /api/access-requests` - List all access requests (super admin)
- `GET /api/access-requests/my-requests` - Get my access requests (sub admin)
- `PUT /api/access-requests/:id/approve` - Approve access request
- `PUT /api/access-requests/:id/reject` - Reject access request
- `DELETE /api/access-requests/:id` - Delete access request

### Landing Pages
- `GET /api/landing-pages` - List all landing pages
- `GET /api/landing-pages/:id` - Get landing page details
- `POST /api/landing-pages` - Create landing page (super admin)
- `PUT /api/landing-pages/:id` - Update landing page (super admin)
- `DELETE /api/landing-pages/:id` - Delete landing page (super admin)

### Leads
- `POST /api/leads` - Submit new lead (public)
- `GET /api/leads` - List leads (filtered by user role)
- `GET /api/leads/:id` - Get lead details
- `PUT /api/leads/:id/status` - Update lead status
- `PUT /api/leads/:id` - Update lead details
- `DELETE /api/leads/:id` - Delete lead (super admin only)

## Database Models

### User
- Basic user information (name, email, password)
- Role-based access control (super_admin, sub_admin)
- Approval status for sub admins
- Company information

### LandingPage
- Landing page details (name, URL, description)
- Status tracking (active/inactive)
- Creator information

### Lead
- Lead information (name, email, phone, company, message)
- Landing page association
- Status tracking (new, contacted, qualified, converted, lost)
- IP address and user agent logging

### AdminAccess
- Access control between sub admins and landing pages
- Grant/revoke functionality
- Audit trail

### AccessRequest
- Sub admin requests for landing page access
- Approval/rejection workflow
- Message and reason tracking

## Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes with middleware

## Development

### Backend Development
```bash
cd super_Backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd landing_super_backend
npm start    # React development server
```

### Database Management
```bash
# Connect to MongoDB
mongosh

# Use database
use super_admin_panel

# View collections
show collections

# View documents
db.users.find()
db.landingpages.find()
db.leads.find()
```

## Testing

### Backend Testing
```bash
cd super_Backend
npm test
```

### Frontend Testing
```bash
cd landing_super_backend
npm test
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment
2. Use PM2 or similar process manager
3. Configure reverse proxy (nginx)
4. Set up SSL certificates

### Frontend
1. Build the application: `npm run build`
2. Serve static files with nginx or similar
3. Configure environment variables
4. Set up SSL certificates

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in config.env
   - Verify network access

2. **JWT Token Issues**
   - Check JWT_SECRET in environment
   - Verify token expiration settings
   - Clear browser localStorage if needed

3. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend API URL configuration
   - Ensure ports match between frontend and backend

4. **Authentication Issues**
   - Run setup scripts to create demo users
   - Check user approval status in database
   - Verify role assignments

### Logs

Backend logs are displayed in the console. For production, consider using a logging service like Winston or Bunyan.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 