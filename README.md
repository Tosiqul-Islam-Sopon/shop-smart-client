# Shop Smart - Client

[Live Link](https://shop-smart-a4283.web.app)

## Project Overview

"Shop Smart" is an e-commerce web application where users can browse and search for products, filter by categories, and sort them by price or date added. The frontend is built using React.js with a focus on responsive design.

## Features

- **Product Listing:** Displays a list of products with pagination.
- **Search:** Allows users to search for products by name.
- **Filtering:** Filter products by category, brand, and price range.
- **Sorting:** Sort products by price (Low to High, High to Low) and by date added.
- **Responsive Design:** Fully responsive UI with mobile-first approach.
- **Authentication:** Google and Email/Password authentication using Firebase.

## Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - For authentication and deployment
- **Axios** - For making API requests
- **React Router** - For handling routing in the application

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- Firebase account for authentication and hosting.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tosiqul-Islam-Sopon/shop-smart-client.git
   cd shop-smart-client
2. Install dependencies:
   ```bash
   npm install
3. Set up Firebase:
- Create a Firebase project.
- Enable Google Authentication and Email/Password Authentication.
- Copy your Firebase configuration and create a .env file in the root of the project:
  ```bash
  REACT_APP_FIREBASE_API_KEY=your_api_key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
  REACT_APP_FIREBASE_PROJECT_ID=your_project_id
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  REACT_APP_FIREBASE_APP_ID=your_app_id
4. Run the project:
   ```bash
   npm start
