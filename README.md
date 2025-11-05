# unfunny-meme-machine

# 🧠 Meme Emotion & Sentiment Labelling Web App

This project aims to build a web application that allows users to label **memes** (images with text) according to their **sentiment** (positive, neutral, negative) and **emotion** (joy, anger, sadness, etc.).  
The collected labels will help train and evaluate machine learning models for multimodal emotion and sentiment analysis.

---

## 🚀 Tech Stack

### **Frontend**
- React + TypeScript + Tailwind CSS  
- Displays memes, collects user labels, and communicates with the backend via REST API

### **Backend**
- Spring Boot (Java) + Spring Data JPA  
- Provides REST endpoints for meme retrieval, label submission, and aggregated reporting  
- Connects to PostgreSQL database

### **Database**
- PostgreSQL  
- Stores structured data: memes, users, labels (emotion + sentiment)

### **Image Storage**
- AWS S3 *(preferred)* or local folder (for prototype)  
- Only image URLs are stored in the database

---

## 🧩 System Overview

**Flow:**
1. Frontend fetches meme URLs and text from backend.  
2. User labels meme with sentiment & emotion.  
3. Label is sent to backend and stored in PostgreSQL.  
4. Aggregated results (e.g., most common emotions per topic) are computed and displayed.

---

## 🧱 Planned Features

- Meme feed with simple UI for labelling  
- Emotion & sentiment tagging via emojis or buttons  
- Admin dashboard for viewing label statistics  
- Fun, gamified UX to encourage participation  
- CI/CD via GitHub Actions (build, test, deploy)

---

## 🛠️ Project Setup (Planned)

| Component | Command / Action |
|------------|------------------|
| **Frontend** | `npm install && npm run dev` |
| **Backend** | `mvn spring-boot:run` |
| **Database** | PostgreSQL with `.env` configuration |
| **Deployment** | Docker + GitHub Actions |

---

## 📋 Project Structure (planned)
