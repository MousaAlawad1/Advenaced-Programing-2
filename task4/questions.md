# أسئلة المناقشة — React

---

## 1. لماذا `reduce` أفضل من حلقة `for` لحساب المجموع في React؟

### الإجابة

في React، يُعدّ أسلوب البرمجة الوظيفية (Functional Programming) هو المنهج المُفضَّل، وذلك لارتباطه المباشر بمبدأ **عدم تغيير الحالة (Immutability)**. وفيما يلي المقارنة:

| المعيار | `for` loop | `reduce` |
|---|---|---|
| الأسلوب | إجرائي (Imperative) | وظيفي (Declarative) |
| تغيير المتغيرات | يعتمد على متغير خارجي قابل للتعديل | لا يُعدِّل أي متغير خارجي |
| التوافق مع React | أقل توافقًا مع نمط البرمجة | متوافق مع Hooks والـ rendering النقي |
| قابلية القراءة | أطول وأكثر تفصيلاً | موجز وتصريحي |

### مثال مقارن

```javascript
// ❌ باستخدام for — يحتاج متغيرًا خارجيًا قابلًا للتعديل
let total = 0;
for (let i = 0; i < numbers.length; i++) {
  total += numbers[i];
}

// ✅ باستخدام reduce — بلا تأثيرات جانبية
const total = numbers.reduce((acc, curr) => acc + curr, 0);
```

### السبب الجوهري في سياق React

عند استخدام `reduce` داخل مكوّن React (مثلاً في `useMemo` أو عند حساب قيمة للعرض)، فإنه:
- لا يُنتج **تأثيرات جانبية (Side Effects)**.
- يُعيد دائمًا نفس النتيجة لنفس المدخلات (**Pure Function**).
- يندمج بسلاسة مع نمط `useState` و`useReducer`.

---

## 2. ما الفرق بين `export default` و `export`؟

### التعريف

| النوع | الصياغة | عدد الصادرات في الملف | طريقة الاستيراد |
|---|---|---|---|
| **Named Export** | `export const X = ...` | متعددة | `import { X } from './file'` |
| **Default Export** | `export default X` | واحد فقط | `import X from './file'` |

### أمثلة توضيحية

```javascript
// ---- file: MathUtils.js ----

// Named exports — يمكن تعدادها
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Default export — واحد فقط في الملف
export default function multiply(a, b) {
  return a * b;
}
```

```javascript
// ---- file: App.js ----

// استيراد الـ default — الاسم حر
import multiply from './MathUtils';

// استيراد الـ named — الاسم مقيّد بالاسم الأصلي
import { add, subtract } from './MathUtils';

// أو كليهما معًا
import multiply, { add, subtract } from './MathUtils';
```

### متى تستخدم كلاً منهما؟

- **`export default`**: للمكوّن الرئيسي في الملف (مثل `export default function HomePage`).
- **`export`**: للدوال المساعدة، الثوابت، والأنواع (Types) التي يُستورد منها أكثر من شيء.

---

## 3. لماذا نضع `[]` كمعامل ثانٍ لـ `useEffect` عند جلب البيانات؟

### الإجابة

المعامل الثاني لـ `useEffect` هو **مصفوفة الاعتماديات (Dependency Array)**، وهي تتحكم في **متى يُعاد تشغيل الـ effect**.

### سلوك المصفوفة

| قيمة المعامل | وقت التشغيل |
|---|---|
| غير موجود (مُهمَل) | بعد كل عملية render |
| `[]` (مصفوفة فارغة) | مرة واحدة فقط عند أول تحميل للمكوّن |
| `[value]` (مع قيمة) | عند أول تحميل، وعند كل تغيير في `value` |

### مثال جلب البيانات

```javascript
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []); // ← المصفوفة الفارغة: شغّل مرة واحدة فقط
```

### لماذا هي ضرورية هنا؟

إذا أُهملت المصفوفة، سيُعيد `useEffect` تشغيل الطلب بعد **كل render**، وبما أن جلب البيانات يُحدِّث الحالة (عبر `setState`)، فهذا يُنتج:

```
fetch → setState → re-render → fetch → setState → re-render → ...
```

أي **حلقة لا نهائية**. المصفوفة الفارغة `[]` تُخبر React بأن الـ effect لا يعتمد على أي متغير متغيّر، فيُشغَّل مرة واحدة فحسب.

---

## 4. ما هو المكوّن المتحكَّم به ولماذا نستخدمه؟

### التعريف

**المكوّن المتحكَّم به (Controlled Component)** هو عنصر نموذج (input, textarea, select) تكون **قيمته مُدارة بالكامل من خلال حالة React** (`state`)، بدلاً من أن يحتفظ DOM بقيمته الخاصة.

### المقارنة مع Uncontrolled Component

| المعيار | Controlled | Uncontrolled |
|---|---|---|
| مصدر القيمة | `state` في React | DOM مباشرةً |
| طريقة القراءة | `value={stateVar}` | `ref.current.value` |
| التحقق الفوري | ✅ ممكن في كل keystroke | ❌ يحتاج قراءة يدوية |
| التحكم الكامل | ✅ React تتحكم | ❌ DOM يتحكم |

### مثال

```javascript
function LoginForm() {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value); // React تتحكم في القيمة
  };

  return (
    <input
      type="email"
      value={email}        // القيمة مربوطة بالـ state
      onChange={handleChange}
    />
  );
}
```

### أسباب الاستخدام

1. **التحقق الفوري من المدخلات**: يمكن التحقق من صحة البريد الإلكتروني أو كلمة المرور مع كل حرف يُكتب.
2. **التزامن بين عناصر متعددة**: إذا كانت قيمة حقل تؤثر على حقل آخر.
3. **التحكم في السلوك**: مثل تعطيل زر الإرسال حتى يكتمل النموذج.
4. **القدرة على إعادة الضبط**: تصفير النموذج عبر `setState('')` بدون الحاجة إلى الوصول المباشر للـ DOM.

---

*إعداد: موسى | مادة: React — أسئلة المناقشة*