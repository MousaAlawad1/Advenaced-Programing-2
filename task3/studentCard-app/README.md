# ⚛️ Student Profile App
### توثيق المشروع — React Component System

---

## 📋 جدول المحتويات

1. [ما هو React؟](#1-ما-هو-react)
2. [المفاهيم الأساسية](#2-المفاهيم-الأساسية)
3. [بيئة Vite](#3-بيئة-vite)
4. [مكوّنات البرنامج](#4-مكوّنات-البرنامج)
5. [التقنيات المستخدمة](#5-التقنيات-المستخدمة)
6. [كيف تشغّل المشروع](#6-كيف-تشغّل-المشروع)

---

## 1. ما هو React؟

React هي مكتبة JavaScript مفتوحة المصدر طوّرتها شركة **Meta (Facebook)** عام 2013، وتُستخدم لبناء واجهات المستخدم التفاعلية. تعتمد على مفهوم **المكوّنات (Components)** حيث تُقسَّم الواجهة إلى أجزاء صغيرة مستقلة وقابلة لإعادة الاستخدام.

### المميزات الأساسية

| الميزة | الوصف |
|--------|-------|
| **Virtual DOM** | نسخة افتراضية من DOM تجعل التحديثات أسرع بكثير |
| **Component-Based** | كل جزء من الواجهة مكوّن مستقل له state وprops خاصة |
| **Unidirectional Data Flow** | البيانات تسير باتجاه واحد من الأب إلى الابن |
| **JSX** | صيغة تجمع JavaScript وHTML لكتابة واجهات أوضح |
| **Hooks** | دوال تتيح إدارة الحالة والتأثيرات في المكوّنات الوظيفية |

### React مقارنةً بالبدائل

| الميزة | React | Vue | Angular |
|--------|-------|-----|---------|
| النوع | مكتبة UI | إطار تدريجي | إطار كامل |
| منحنى التعلم | متوسط | سهل | صعب |
| الأداء | ممتاز | ممتاز | جيد |
| المجتمع | الأكبر | كبير | كبير |

---

## 2. المفاهيم الأساسية

### 2.1 Components (المكوّنات)

المكوّن هو وحدة البناء الأساسية في React — دالة JavaScript ترجع JSX:

```jsx
function MyComponent({ name }) {
  return <h1>مرحباً {name}</h1>;
}
```

### 2.2 Props (الخصائص)

Props هي بيانات يمررها المكوّن الأب إلى الابن، وهي للقراءة فقط ولا يمكن تعديلها من الداخل.

```jsx
<StudentCard student={studentData} />
```

### 2.3 State (الحالة)

State هي بيانات داخلية تتحكم بطريقة عرض المكوّن، وعند تغيّرها يُعاد الرسم تلقائياً:

```jsx
const [count, setCount] = useState(0);
// count    → القيمة الحالية
// setCount → دالة التحديث
```

### 2.4 Hooks

| Hook | الاستخدام |
|------|-----------|
| `useState` | إدارة الحالة الداخلية |
| `useEffect` | تأثيرات جانبية (API calls، subscriptions) |
| `useRef` | الوصول لعناصر DOM بدون إعادة رسم |
| `useContext` | الوصول لـ Context دون تمرير props يدوياً |
| `useMemo` | حفظ نتيجة حسابية لتحسين الأداء |
| `useCallback` | حفظ دالة لمنع إعادة إنشائها في كل render |

---

## 3. بيئة Vite

Vite هو أداة بناء حديثة وسريعة جداً تتميز بوقت تشغيل فوري مقارنةً بـ Create React App.

### إنشاء مشروع React مع Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### هيكل المشروع

```
my-app/
├── src/
│   ├── main.jsx              # نقطة الدخول
│   ├── App.jsx               # المكوّن الجذري
│   └── Student/              # مجلد المكوّنات
│       ├── index.js
│       ├── Student.jsx
│       ├── StudentCard.jsx
│       ├── StudentGrades.jsx
│       └── StudentProgress.jsx
├── public/
├── index.html
└── package.json
```

---

## 4. مكوّنات البرنامج

المشروع يتكوّن من **4 مكوّنات** + ملف `index.js` للـ exports:

| المكوّن | الوصف | الـ Props |
|---------|-------|-----------|
| `Student.jsx` | المكوّن الرئيسي مع sidebar + header | `student: Object` |
| `StudentCard.jsx` | بطاقة البيانات الشخصية والمهارات | `student: Object` |
| `StudentGrades.jsx` | جدول الدرجات مع فلترة وترتيب | `subjects: Array` |
| `StudentProgress.jsx` | إحصائيات وتايم لاين المسيرة الدراسية | `student: Object` |

---

### 4.1 Student.jsx — المكوّن الرئيسي

يعمل كـ layout wrapper يضمّ الـ sidebar والـ header والمحتوى الرئيسي.

```jsx
export default function Student({ student = STUDENT }) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // إصلاح أبعاد الـ viewport وإزالة max-width من body و #root
  }, []);

  return (
    <div style={styles.root} dir="rtl">
      <header>...</header>
      <aside>{/* Sidebar Nav */}</aside>
      <main>{/* Active Component */}</main>
    </div>
  );
}
```

**الـ Hooks المستخدمة:**
- `useState` — تتبع التبويب النشط (overview / grades / progress)
- `useEffect` — إزالة `max-width` من `body` و `#root` عند التحميل

---

### 4.2 StudentCard.jsx

يعرض بيانات الطالب الشخصية مع ميزة نسخ الإيميل وألوان ديناميكية حسب الحالة.

```jsx
export default function StudentCard({ student }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(student.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // ...
}
```

**المميزات:**
- `useState` — حالة زر النسخ (نسخ / ✓ تم)
- `navigator.clipboard` — نسخ الإيميل للحافظة
- Dynamic styling — لون البادج حسب `(active / inactive / suspended)`

---

### 4.3 StudentGrades.jsx

يعرض جدول الدرجات مع إمكانية الفلترة والترتيب وتوسيع تفاصيل كل مادة.

```jsx
export default function StudentGrades({ subjects = [] }) {
  const [sortBy, setSortBy]     = useState("grade");
  const [filter, setFilter]     = useState("all");
  const [expanded, setExpanded] = useState(null);
  // ...
}
```

**المميزات:**
- `useState (sortBy)` — ترتيب حسب الدرجة أو الاسم
- `useState (filter)` — فلترة بين الكل / ممتاز / دون 90
- `useState (expanded)` — فتح وإغلاق تفاصيل كل مادة
- `Array.sort` و `Array.filter` — معالجة البيانات قبل العرض

---

### 4.4 StudentProgress.jsx

يعرض إحصائيات الطالب وتايم لاين المسيرة مع حساب التقدم تلقائياً.

```jsx
export default function StudentProgress({ student }) {
  const completionRate = Math.round(
    (student.completedCourses / student.totalCourses) * 100
  );

  const milestones = Array.from({ length: 5 }, (_, i) => ({
    year: startYear + i,
    isDone: startYear + i <= currentYear,
    // ...
  }));
}
```

**المميزات:**
- حساب نسبة الإتمام والمعدل من البيانات المُمرَّرة مباشرةً
- `Array.from` — إنشاء نقاط التايم لاين تلقائياً من تاريخ التسجيل
- Conditional styling — تلوين كل نقطة حسب حالتها

---

## 5. التقنيات المستخدمة

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> البرنامج لا يعتمد على أي مكتبة UI خارجية — كل التصميم مكتوب بـ **inline styles** خالص داخل React، مما يجعله خفيفاً وسريعاً وسهل التخصيص.

### ملخص الـ Hooks في المشروع

| Hook | المكوّن | الاستخدام |
|------|---------|-----------|
| `useState` | `Student.jsx` | تتبع التبويب النشط |
| `useEffect` | `Student.jsx` | إصلاح أبعاد الـ viewport |
| `useState` | `StudentCard.jsx` | حالة زر نسخ الإيميل |
| `useState x3` | `StudentGrades.jsx` | الترتيب، الفلترة، التوسيع |

---

## 6. كيف تشغّل المشروع

### المتطلبات

- Node.js الإصدار **18** أو أحدث
- npm الإصدار **9** أو أحدث

### خطوات التشغيل

```bash
# 1. استنسخ المشروع
git clone <repo-url>

# 2. ثبّت الاعتماديات
npm install

# 3. شغّل السيرفر المحلي
npm run dev

# 4. افتح في المتصفح
# http://localhost:5173
```

### استيراد المكوّنات

```jsx
// استيراد المكوّن الرئيسي
import Student from "./Student";

// أو استيراد كل مكوّن لحاله
import { StudentCard, StudentGrades, StudentProgress } from "./Student";

// الاستخدام
<Student />
<StudentCard student={myData} />
<StudentGrades subjects={mySubjects} />
<StudentProgress student={myData} />
```

---

<div align="center">
  <sub>Student Profile App • React Component System • 2025</sub>
</div>