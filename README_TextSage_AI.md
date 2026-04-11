# 🚀 TextSage AI  
**Intelligent Text Summarization Platform**

TextSage AI is an AI-powered web application that transforms lengthy text into concise, meaningful summaries using Natural Language Processing (NLP) techniques. It is designed to improve information consumption by extracting key insights while preserving context.

---

## 🔗 Live Demo  
👉 [Add your deployed link here]

---

## 📌 Features  
- ✨ AI-based text summarization  
- 🧠 TF-IDF driven sentence scoring  
- 📄 Supports large text inputs  
- ⚡ Fast REST API response  
- 🎯 Clean and responsive UI  
- 🔄 Multiple summarization styles  

---

## 🛠️ Tech Stack  

**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Python (Flask)  
- Flask-CORS  

**Core NLP:**  
- Tokenization  
- Stop-word removal  
- TF-IDF scoring  
- Sentence ranking algorithms  

---

## ⚙️ How It Works  

1. Input Text – User provides raw text  
2. Preprocessing – Tokenization & cleaning  
3. Feature Extraction – TF-IDF calculation  
4. Sentence Scoring – Rank sentences by importance  
5. Summary Generation – Extract top-ranked sentences  

---

## 📂 Project Structure  

```
TextSage-AI/
│
├── backend/
│   ├── app.py
│   ├── summarizer.py
│   ├── preprocessor.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup  

### 🔧 Backend Setup  
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 💻 Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoint  

**POST /api/summarize**

### Request Body:
```json
{
  "text": "Your input text here",
  "style": "short"
}
```

### Response:
```json
{
  "summary": "Generated summary text"
}
```

---

## 📜 License  
This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software with proper attribution.

---

## 👨‍💻 Author  
**Krishnendu Ghosh**  
AIML Student | Full Stack Developer  

---

## ⭐ Support  
If you like this project, consider giving it a ⭐ on GitHub!
