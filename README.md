# StayWise

StayWise is a full-stack web application inspired by Airbnb, designed to facilitate property listings and bookings. It allows users to browse unique accommodations, create their own listings, and leave reviews. Built with a robust Node.js backend and a MongoDB database, it features secure user authentication, image uploads, and interactive maps.

## 🚀 Features

*   **User Authentication & Authorization:** Secure signup and login functionality using Passport.js. Users must be logged in to create listings or leave reviews.
*   **CRUD Operations for Listings:** Users can create, read, update, and delete property listings.
*   **Reviews & Ratings:** Users can leave reviews and star ratings for properties.
*   **Image Uploads:** Seamless image uploading and storage using Cloudinary.
*   **Interactive Maps:** Integration with Leaflet to display property locations on a map.
*   **Responsive Design:** Fully responsive user interface built with Bootstrap 5, ensuring a great experience on desktop and mobile.
*   **Flash Messages:** Instant feedback for user actions (success/error messages).
*   **MVC Architecture:** Clean and organized code structure following the Model-View-Controller pattern.

## 🛠️ Tech Stack

**Frontend:**
*   **HTML5, CSS3, JavaScript**
*   **EJS (Embedded JavaScript):** Templating engine for dynamic content.
*   **Bootstrap 5:** CSS framework for responsive design.
*   **Leaflet:** JavaScript library for interactive maps.

**Backend:**
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.

**Database:**
*   **MongoDB:** NoSQL database for storing listings, reviews, and users.
*   **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.

**Authentication:**
*   **Passport.js:** Authentication middleware for Node.js.

**Cloud Services:**
*   **Cloudinary:** Cloud-based image and video management services.
*   **MongoDB Atlas:** Cloud-hosted MongoDB service.

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)
*   A [Cloudinary](https://cloudinary.com/) account (for image storage)
*   A [MongoDB Atlas](https://www.mongodb.com/atlas/database) account (or a local MongoDB instance)

## ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/aay-zee/StayWise.git
    cd StayWise
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the root directory of the project and add the following variables:

    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret_key
    ```

    *   Replace the values with your actual credentials.
    *   `ATLASDB_URL` can be your local MongoDB URL (e.g., `mongodb://127.0.0.1:27017/staywise`) for local development.

4.  **Initialize the Database (Optional):**

    If you want to seed the database with some sample data, run:

    ```bash
    node init/index.js
    ```

5.  **Run the Application:**

    ```bash
    node app.js
    ```
    *   Or if you have `nodemon` installed: `nodemon app.js`

6.  **Access the App:**

    Open your browser and navigate to `http://localhost:5000`.

## 📂 Project Structure

```
StayWise/
├── controllers/      # Route controllers (logic)
├── init/             # Database initialization scripts
├── models/           # Mongoose models (Schema)
├── public/           # Static files (CSS, JS, Images)
├── routes/           # Express routes
├── utils/            # Utility functions (Error handling, etc.)
├── views/            # EJS templates
│   ├── layouts/      # Layout templates (boilerplate)
│   ├── listings/     # Listing-related views
│   ├── users/        # User-related views
│   └── includes/     # Partials (navbar, footer, flash)
├── app.js            # Main application entry point
├── cloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware
├── schema.js         # Joi validation schemas
└── package.json      # Project dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.