# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based admin panel for Miezu E-commerce, built with Create React App. It manages products, orders, employees, content pages, and other e-commerce administrative functions.

## Development Commands

- **Start development server**: `npm start` (runs on port 3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Run single test file**: `npm test -- --testNamePattern="filename"`
- **Install dependencies**: `npm install`
- **Eject (not recommended)**: `npm run eject`

## Architecture

### Core Structure
- **Entry point**: `src/index.js` → `src/App.js`
- **Routing**: React Router DOM with routes defined in `App.js`
- **State management**: Custom providers in `src/allProvider/`
- **API layer**: Modular API functions in `src/api/`
- **Reusable components**: `src/components/`
- **Pages**: `src/pages/` (referenced in App.js routes)

### Key Architectural Patterns

**Provider Pattern**: Each domain (products, orders, homepage, etc.) has its own provider in `src/allProvider/` that:
- Manages domain-specific state
- Provides CRUD operations
- Handles API calls and error handling with toast notifications
- Returns data and functions for components to consume

**API Layer**: Domain-specific API modules in `src/api/` handle HTTP requests:
- `products.js`, `orders.js`, `homepage.js`, etc.
- Centralized API functions used by providers

**Component Structure**: Reusable UI components in `src/components/`:
- Input fields, dropdowns, tables, text editors
- Toast notifications via `src/components/toastify`
- Image upload components and drag-and-drop functionality

### Main Application Areas

**Product Management** (`/products`, `/add-products`, `/edit-product/:id`):
- Full CRUD operations for products
- Image upload/management
- SEO metadata handling
- Stock and pricing management

**Order Management** (`/orders`, `/view-order/:id`):
- Order listing and detailed views
- Order status management

**Content Management**:
- Homepage content (`/homepage`)
- About Us (`/about-us`)
- Water Type content (`/water-type`)
- FAQ/Solutions (`/faq`)
- Contact Us (`/contact-us`)

**Administrative Features**:
- Employee management (`/employee`, `/add-employee`)
- Coupon management (`/coupons`)
- Blog management (`/blogs`)
- Testimonials (`/testimonial`)
- Reviews and ratings (`/reviews-and-ratings`)

## Key Technologies

- **React 18** with functional components and hooks
- **React Router DOM** for navigation
- **Bootstrap 5** + **React Bootstrap** for UI
- **Formik + Yup** for form handling and validation
- **Axios** for HTTP requests
- **React Toastify** for notifications
- **Various editors**: React Quill, React Draft WYSIWYG, React MDE
- **AG Grid React** and **React Data Table** for data tables

## Development Guidelines

**Working with Providers**: When modifying business logic, work with the corresponding provider file. Each provider follows the pattern of returning data state and action functions.

**API Integration**: API calls are centralized in `src/api/` modules. When adding new endpoints, follow the existing pattern and update the corresponding provider.

**Image Handling**: The application uses `src/imageUploader/` for image upload functionality, integrated with the orders API for file management.

**Form Validation**: Forms use Formik with Yup schemas. Check `src/utils/validation.js` for existing validation patterns.

**Styling**: The project uses Bootstrap classes and SCSS. Global styles are in `src/index.css`.

**Error Handling**: Use the `showToast` function from `src/components/toastify` for user feedback on API operations.

**Authentication**: The application starts with a login page at `/` and redirects to various admin sections after authentication.

**Environment**: This is a standard Create React App with no additional linting tools configured. ESLint rules are inherited from `react-app` configuration in package.json.