# 🏡 Bangalore Home Price Prediction

A full-stack machine learning web application that predicts residential real estate prices in Bangalore, India based on property features such as total area (square footage), number of bedrooms (BHK), bathrooms, and location.

---

## ✨ Overview & Features

* **Interactive Web UI:** Simple and clean interface allowing users to input property details and choose from over 240+ locations across Bangalore.
* **RESTful API Backend:** Flask server handling data preprocessing, request routing, and real-time model inference.
* **Predictive Machine Learning Model:** Linear Regression model trained on real-estate data to estimate home prices accurately.
* **Cloud Architecture:** Decoupled architecture with separate frontend and backend deployments.

---

## 🛠️ Tech Stack

### **Frontend**
* **HTML5 / CSS3**
* **JavaScript (jQuery, AJAX)**

### **Backend**
* **Python 3**
* **Flask** & **Flask-CORS**
* **Gunicorn**

### **Machine Learning & Data Science**
* **Scikit-learn** (Linear Regression)
* **Pandas & NumPy** (Data Cleaning & Feature Engineering)
* **Pickle** (Model Serialization)

---

## 📁 Project Structure

```text
├── client/
│   ├── app.html         # User Interface
│   ├── app.js           # Frontend logic & API handling
│   └── app.css          # Styling
├── server/
│   ├── artifacts/
│   │   ├── banglore_home_prices_model.pickle  # Trained ML Model
│   │   └── columns.json                       # Data feature headers
│   ├── server.py        # Flask server routes
│   ├── util.py          # Prediction pipeline logic
│   └── requirements.txt # Python packages
└── README.md
