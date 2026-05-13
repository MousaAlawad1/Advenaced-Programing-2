<div dir="rtl">

# 📚 مدير منهاج الويب

تطبيق ويب تفاعلي مبني بـ **React** لإدارة الكورسات التعليمية وتتبع التمارين بشكل منظّم وجميل.

---

## ✨ المميزات

- 🎨 **واجهة ملوّنة** — كل كورس له لون مميز خاص فيه
- ➕ **إضافة كورسات** — أضف كورسات جديدة بسهولة من زر واحد
- 📝 **إضافة أجزاء** — أضف أجزاء وتمارين داخل كل كورس
- 📊 **إحصائيات فورية** — يحسب مجموع التمارين لكل كورس وللكل تلقائيًا
- 📱 **تصميم متجاوب** — يشتغل على الجوال والكمبيوتر
- 🔤 **خط عربي احترافي** — مبني على خط IBM Plex Sans Arabic

---

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
|--------|-----------|
| ⚛️ React 18 | بناء الواجهة والمكونات |
| 🎣 useState Hook | إدارة الحالة (State) |
| 🎨 Inline Styles | التنسيق والألوان الديناميكية |
| 🔤 IBM Plex Sans Arabic | خط عربي احترافي |

---

## 📁 هيكل المشروع

```
src/
└── App.jsx        ← المكوّن الرئيسي والكود كله
```

### المكونات الداخلية

```
App
├── Course          ← كارد الكورس الكامل
│   ├── Part        ← سطر الجزء الواحد
│   └── AddPartForm ← فورم إضافة جزء جديد
└── [Add Course]    ← زر وفورم إضافة كورس
```

---

## 🚀 طريقة التشغيل

```bash
# 1. أنشئ مشروع React جديد
npx create-react-app my-courses
cd my-courses

# 2. استبدل محتوى src/App.jsx بالكود

# 3. أضف الخط العربي في public/index.html داخل <head>
# <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">

# 4. شغّل التطبيق
npm start
```

---

## 🗂️ نموذج البيانات

```js
// كورس واحد
{
  id: 1,
  name: "تطبيقات تطوير Half Stack",
  parts: [
    { id: 1, name: "أساسيات React", exercises: 10 },
    { id: 2, name: "تمرير البيانات باستخدام props", exercises: 7 },
  ]
}
```

---

## 🎨 نظام الألوان

كل كورس يأخذ لونًا من القائمة التالية بالترتيب:

| # | اللون | الكود |
|---|-------|-------|
| 1 | 🟣 بنفسجي | `#534AB7` |
| 2 | 🟢 أخضر | `#0F6E56` |
| 3 | 🟠 برتقالي | `#993C1D` |
| 4 | 🔵 أزرق | `#185FA5` |

</div>

---
---

<div dir="ltr">

# 📚 Web Curriculum Manager

An interactive web application built with **React** to manage educational courses and track exercises in a clean, colorful interface.

---

## ✨ Features

- 🎨 **Color-coded courses** — each course has its own unique accent color
- ➕ **Add courses** — create new courses on the fly with one click
- 📝 **Add parts** — add chapters and exercises inside any course
- 📊 **Live stats** — automatically calculates totals per course and overall
- 📱 **Responsive design** — works on mobile and desktop
- 🔤 **Arabic-first typography** — built with IBM Plex Sans Arabic

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| ⚛️ React 18 | UI components and rendering |
| 🎣 useState Hook | State management |
| 🎨 Inline Styles | Dynamic, theme-aware styling |
| 🔤 IBM Plex Sans Arabic | Professional Arabic typeface |

---

## 📁 Project Structure

```
src/
└── App.jsx        ← All components live here
```

### Component Tree

```
App
├── Course          ← Full course card
│   ├── Part        ← Single part/chapter row
│   └── AddPartForm ← Inline form to add a new part
└── [Add Course]    ← Button + form to add a new course
```

---

## 🚀 Getting Started

```bash
# 1. Create a new React project
npx create-react-app my-courses
cd my-courses

# 2. Replace the contents of src/App.jsx with the provided code

# 3. Add the Arabic font in public/index.html inside <head>
# <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">

# 4. Start the development server
npm start
```

---

## 🗂️ Data Model

```js
// A single course object
{
  id: 1,
  name: "Half Stack Application Development",
  parts: [
    { id: 1, name: "Fundamentals of React", exercises: 10 },
    { id: 2, name: "Passing data with props", exercises: 7 },
  ]
}
```

---

## 🎨 Color Themes

Each course cycles through the following theme palette:

| # | Color | Hex |
|---|-------|-----|
| 1 | 🟣 Purple | `#534AB7` |
| 2 | 🟢 Green | `#0F6E56` |
| 3 | 🟠 Coral | `#993C1D` |
| 4 | 🔵 Blue | `#185FA5` |

---

## 📄 License

MIT — free to use and modify.

</div>