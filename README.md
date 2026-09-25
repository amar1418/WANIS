# وَنِيس (Wa-Nis) — رفيق القراءة والتعلّم الأكاديمي

> مساحتك الهادئة وملاذك المصمم ليؤنس رحلتك بين أمهات الكتب والمراجع؛ يجمع بين عراقة الصفحة المنسابة، وفصاحة البيان الصافي، ومعلمٍ حكيم يُدارسك ويختبر استيعابك متى طلبت، دون ضجيج أو تشتيت.

---

## 📖 نظرة عامة

**وَنِيس** منصة ويب تفاعلية للقراءة الأكاديمية، مبنية حول كتاب **"مبادئ الإدارة" (Principles of Management)** لستيفن روبنز وماري كولتر — الجزء الأول كاملاً (تصدير + 7 فصول، 37 صفحة تفاعلية). توفر المنصة:

- 📚 **مكتبة أكاديمية** — رف كتب منظم مع خارطة منهاج شاملة
- 📖 **قارئ متكيف** — تجربة قراءة سلسة مع ثيمات متعددة، خطوط عربية، تحكم بالحجم
- 🤖 **مختبر استيراد** — رفع مستندات نصية (TXT / Markdown) وهيكلتها تلقائياً إلى صفحات قارئ
- 🎓 **معلم أكاديمي مدمج** — حوار سقراطي، اختبارات تكيفية، كبسولات مراجعة
- 🌙 **دعم RTL كامل** — تجربة عربية أصلية مع `dir="rtl"` و `lang="ar"`

---

## 🏗 هيكل المشروع

```
wanis/
├── index.html          # الهيكل الرئيسي (HTML Semantic + ARIA)
├── styles.css          # التصميم الكامل (CSS Custom Properties، Themes، WCAG AA)
├── script.js           # منطق التطبيق (ES Module، محتوى كامل، دوال عامة لـ onclick)
├── storage.js          # طبقة التخزين (localStorage + sessionStorage + Migration)
├── manifest.json       # PWA Manifest
├── sw.js               # Service Worker (شبكة أولاً + تخزين مؤقت للعمل دون اتصال)
├── ونيس.html           # النسخة الأحادية القديمة (مرجعية سابقة — بها ميزات وهمية وثغرات)
├── build.ps1           # سكربت الدمج: يولّد النسخة الأحادية المحدّثة من المصادر المعيارية
├── ونيس-مدمج.html      # النسخة الأحادية المولّدة (تُعاد كتابتها عند كل تشغيل لـ build.ps1)
├── books/              # الكتب الإضافية (ملف JSON لكل كتاب + manifest.json)
│   ├── manifest.json   # قائمة أسماء ملفات الكتب المفعّلة
│   └── _template.json  # قالب كتاب جاهز للنسخ (لا يُحمَّل لأنه غير مذكور في manifest)
├── assets/
│   └── icon.svg        # أيقونة التطبيق
└── README.md           # هذا الملف
```

---

## 🚀 التشغيل المحلي

### متطلبات بسيطة
- متصفح حديث يدعم **ES Modules** و **CSS Custom Properties**
- خادم محلي (لسياسة CORS مع ES Modules)

### طرق التشغيل

#### 1. باستخدام Python (الأبسط)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
ثم افتح `http://localhost:8000`

#### 2. باستخدام Node.js (npx serve)
```bash
npx serve .
```

#### 3. باستخدام PHP
```bash
php -S localhost:8000
```

#### 4. باستخدام VS Code Live Server
- ثبت إضافة **Live Server**
- انقر يمين على `index.html` → **Open with Live Server**

---

## 📦 النسخة الأحادية (ملف HTML مدمج)

يمكن دمج المشروع المعياري في **ملف HTML واحد** يعمل بالنقر المزدوج (`file://`) دون خادم، عبر سكربت PowerShell:

```powershell
# من مجلد المشروع — يولّد «ونيس-مدمج.html»
powershell -ExecutionPolicy Bypass -File .\build.ps1

# باسم مخصص
powershell -ExecutionPolicy Bypass -File .\build.ps1 -OutputName "نسختي.html"
```

**ما يفعله السكربت:**
- يضمّ `styles.css` داخل `<style>`، و `storage.js` + `script.js` داخل `<script>` واحد قبل `</body>`
- يضمّن كتب `books/` المذكورة في `manifest.json` داخل الملف (لتعمل على `file://` دون خادم)
- يزيل `import/export` تلقائياً (يحوّلها إلى ثوابت عامة) ويتحقق من عدم بقاء أي أثر لها
- يخرج برمز خطأ (`exit 1`) إذا فشل أي فحص

**ملاحظات مهمة:**
- المصادر المعيارية (`index.html` / `styles.css` / `storage.js` / `script.js`) هي **مصدر الحقيقة** — عدّل فيها ثم أعد تشغيل السكربت
- `sw.js` و `manifest.json` لا يُضمّنان (ملفات منفصلة حسب المواصفات؛ الـ Service Worker يعطّل نفسه تلقائياً على `file://`)
- خط Google Fonts يبقى رابطاً خارجياً (يتطلب إنترنت عند أول تحميل)
- `localStorage` مرتبط بالأصل (origin): بيانات المكتبة على `http://localhost:8765` لا تنتقل تلقائياً إلى `file://` والعكس
- `ونيس.html` القديمة نسخة أحادية مرجعية قديمة (بميزات وهمية وثغرات) — استخدم `ونيس-مدمج.html` بدلاً منها

---

## 🛠 التطوير

### متغيرات CSS الأساسية (Design Tokens)
جميع الألوان والمسافات معرفة في `:root` في `styles.css`:
```css
:root {
  --bg-primary: #f8f6f0;
  --bg-surface: #ffffff;
  --accent: #155e8c;
  --font-body: 'IBM Plex Sans Arabic', ...;
  --font-size: 16.5px;
  --line-height: 1.85;
  /* ... */
}
```

### الثيمات المدعومة
- `light` (نهاري) — الافتراضي
- `dark` (ليلي)
- `sepia` (ورقي)
- `oled` (فحمي)

تغيير الثيم: `setTheme('dark')` أو عبر درج الإعدادات.

### الحالة (State Management)
`script.js` وحدة ES تحتفظ بالحالة في متغيرات على مستوى الوحدة، وتُعرَّض كل الدوال على `window` (عبر `Object.assign`) لتعمل مع معالجات `onclick` المضمّنة في `index.html`:

```javascript
// مفاتيح التخزين (عبر LocalStore من storage.js، بادئة wanis:v1:)
LIBRARY_KEY = 'library_data'   // المكتبة كاملة + الكتاب/الفصل النشط
VIEW_KEY    = 'active_view'    // الواجهة النشطة: home | reader | lab
'theme'                        // الثيم الحالي
'font_family'                  // عائلة الخط
'font_size'                    // حجم الخط
```

- الحفظ التلقائي في `localStorage` عبر `LocalStore` (`storage.js`)
- ترحيل تلقائي من مفتاح النسخة الأحادية القديم `library_platform_store_v6` إن وُجد
- جلسة القراءة في `sessionStorage` عبر `SessionStore`

### إضافة كتاب جديد — الطريقة الموصى بها (مجلد `books/`)

أسهل طريقة وأكثرها أماناً — **بدون تعديل أي كود**:

1. انسخ `books/_template.json` إلى `books/اسم-كتابك.json`
2. عدّل المحتوى: `id` (معرّف فريد لا يتكرر)، `title`، `author`، `description`، ثم `chapters[]` وكل فصل فيه `pages[]` مع `htmlContent` (HTML كامل يدعم أصناف CSS الجاهزة)
3. أضف اسم الملف إلى `books/manifest.json` (مصفوفة أسماء الملفات)
4. **النسخة المعيارية:** أعد تحميل الصفحة — يظهر الكتاب تلقائياً (يُدمج حسب `id` دون المساس ببياناتك الحالية)
5. **النسخة المدمجة:** أعد تشغيل `build.ps1` — يضمّن الكتب داخل الملف تلقائياً

ملاحظات:
- الملفات التي تبدأ بـ `_` (مثل `_template.json`) لا تُحمَّل أبداً — استخدمها كمرجع فقط
- **لإزالة كتاب:** احذفه من `manifest.json` (واحذف ملفه)، ثم احذفه من المكتبة عبر تصدير/استيراد النسخة الاحتياطية — لأن الكتب المدمجة تُحفظ في `localStorage` ولا تُحذف تلقائياً
- **كتب مدمجة في الكود (اختياري):** لإضافة كتاب «أساسي» يظهر حتى بدون مجلد `books/`، أضفه إلى `DEFAULT_LIBRARY_DATA.books` في `script.js` بنفس الهيكل، ثم نفّذ خطوة التصدير/الاستيراد مرة واحدة (لأن `localStorage` ينتصر على الافتراضي عند وجوده)

### ملاحظة: مفتاح الذكاء الاصطناعي
مفتاح Gemini (`apiKey` في `script.js`) فارغ حالياً — ميزات المعلم الأكاديمي (الحوار، الاختبارات، الملخصات) تتدهور بأمان إلى نتائج بديلة (fallbacks) دون مفتاح. لتفعيلها:
1. ضع مفتاحاً في `apiKey` (أو الأفضل: عبر متغير بيئة/خادم وسيط — لا تضع مفتاحاً حقيقياً في الكود المصدري)
2. النموذج المستخدم: `gemini-3-flash-preview`

---

## ♿ الوصولية (Accessibility)

الالتزام بـ **WCAG 2.2 Level AA**:
- ✅ **مساحة الهدف** — جميع الأزرار ≥ 44×44px
- ✅ **مؤشرات التركيز** — `outline: 2px solid var(--accent)` واضح
- ✅ **نسب التباين** — 4.5:1 للنصوص، 3:1 للعناصر الرسومية
- ✅ **HTML دلالي** — `<button>`، `<nav>`، `<main>`، `<dialog>`، `aria-*`
- ✅ **دعم RTL** — `dir="rtl"`، `lang="ar"`، خطوط عربية
- ✅ **Reduced Motion** — يحترم `prefers-reduced-motion`

---

## 📱 PWA (تطبيق ويب تقدمي)
- `manifest.json` معرف مع `display: standalone`
- أيقونة SVG قابلة للتكبير
- اختصارات (Shortcuts) للمكتبة والقارئ
- قابل للتثبيت على الهاتف/سطح المكتب

---

## 🔧 التخصيص المتقدم

### الخط العربي المعتمد
- الخط الوحيد المعتمد هو **IBM Plex Sans Arabic** (محمّل من Google Fonts في `index.html`)
- لإضافة خط جديد: أضفه في `index.html`، ثم أضف زراً في درج الإعدادات يستدعي `setFontFamily('New Font')`

### إضافة ثيم جديد
1. أضف `[data-theme="newtheme"]` block في `styles.css` مع جميع المتغيرات
2. أضف زر في `settings-sheet` يستدعي `setTheme('newtheme')`

---

## 📦 النشر (Deployment)

### Netlify / Vercel / GitHub Pages
- ارفع المجلد كاملاً
- لا توجد عملية بناء (No build step) — ملفات ثابتة纯粹
- تأكد من تفعيل HTTPS (مطلوب لـ PWA و Service Workers)

### Apache / Nginx
```nginx
# Nginx example
server {
    listen 80;
    server_name wanis.example.com;
    root /var/www/wanis;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(css|js|svg|json)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🧪 الاختبارات (مخطط)
- **Unit Tests**: Vitest لـ `AppState`، `AppPersistence`
- **E2E Tests**: Playwright للتنقل، الثيمات، القارئ، الأدراج
- **Accessibility**: axe-core في CI

---

## 📄 الترخيص

هذا المشروع للأغراض التعليمية والتوضيحية. محتوى كتاب "مبادئ الإدارة" محفوظ الحقوق لمؤلفيه ودار النشر.

---

## 🤝 المساهمة

مرحباً بالمساهمات! يرجى:
1. عمل Fork
2. إنشاء فرع للميزة (`git checkout -b feature/amazing-feature`)
3. الالتزام بـ **Conventional Commits**
4. فتح Pull Request مع وصف واضح

---

## 📞 التواصل

للاستفسارات أو الاقتراحات: افتح **Issue** في المستودع.

---

**صنع بعناية للتعلم الهادئ** ☕📚