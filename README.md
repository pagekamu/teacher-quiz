# English Proficiency Quiz — Teacher Recruitment

A 50-question, 30-minute English proficiency test for teacher candidates. Tests vocabulary, grammar, synonyms, and reading comprehension. Built in plain HTML/CSS/JS — no frameworks, no server needed.

---

## 📁 Folder Structure

```
english-teacher-quiz/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── quiz.js
├── data/
│   └── questions.js
└── README.md
```

---

## 🚀 Deploy to GitHub Pages

1. Upload this entire folder to a GitHub repository.
2. Go to **Settings → Pages → Source** → select `main` branch → `/root` folder.
3. GitHub will give you a live URL like `https://yourusername.github.io/english-teacher-quiz/`.

---

## 📊 Google Sheets Integration (Required Setup)

Results are sent to your Google Sheet via a Google Apps Script Web App. Follow these steps:

### Step 1 — Create a Google Sheet

Open [sheets.google.com](https://sheets.google.com) and create a new sheet.

Add these headers in Row 1 (exactly in this order):

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Applying For | Score | Total | Percentage | Vocabulary | Grammar | Synonyms | Reading | Answered | Time Taken |

### Step 2 — Create the Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**.
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.teachingLevel,
      data.score,
      data.total,
      data.percentage + "%",
      data.vocabScore,
      data.grammarScore,
      data.synonymScore,
      data.readingScore,
      data.answeredQuestions,
      data.timeTaken
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (name the project anything you want, e.g. "Quiz Logger").

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web App**.
3. Set:
   - **Description**: Quiz Logger
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**.
5. Copy the **Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### Step 4 — Paste URL into Quiz Config

Open `js/quiz.js` and find line 7:

```javascript
GOOGLE_SCRIPT_URL: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",
```

Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL:

```javascript
GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb.../exec",
```

Save and push to GitHub. Done! 🎉

---

## ⚙️ Customization

All configuration is in `js/quiz.js` at the top:

```javascript
const CONFIG = {
  GOOGLE_SCRIPT_URL: "...",   // Your Apps Script URL
  QUIZ_DURATION_MINUTES: 30,  // Change quiz time
  QUIZ_TITLE: "..."           // Displayed in page title
};
```

To add or edit questions, open `data/questions.js`. Each question follows this format:

```javascript
{
  id: "v16",               // Unique ID (important!)
  type: "vocabulary",      // vocabulary | grammar | synonyms | reading
  question: "...",         // The question text
  options: ["A", "B", "C", "D"],
  answer: "A"              // Must exactly match one option
}
```

For reading questions, also include:
```javascript
passage: "passage1"  // or "passage2"
```

And add passage text in the `PASSAGES` object at the bottom of `questions.js`.

---

## 📋 Scoring Guide

| Score | Verdict |
|-------|---------|
| 80–100% | 🏆 Excellent — Highly Recommended |
| 65–79% | ✅ Good — Recommended |
| 50–64% | 📋 Average — May Require Review |
| < 50% | ⚠️ Needs Improvement |

---

## 📝 Notes

- The quiz auto-submits when the 30-minute timer runs out.
- Candidates can submit early with unanswered questions (they'll be warned).
- The result screen shows a full breakdown by section.
- To run the next candidate, click **← New Candidate** to reset the form.
- Google Sheets submission uses `no-cors` mode — if the request goes through, data will appear in your sheet within a few seconds.
