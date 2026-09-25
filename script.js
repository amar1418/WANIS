import { LocalStore, SessionStore, AppPersistence, Migration } from './storage.js';
/* ════════════════════════════════════════════════════════════════════
   وَنِيس (Wa-Nis) — Frontend Logic (ES Module)
   ─────────────────────────────────────────────────────────────────────
   • كل الدوال معرّضة على window لتعمل مع معالجات onclick المضمّنة.
   • طبقة التخزين عبر storage.js (LocalStore + AppPersistence).
   • المحتوى الأكاديمي الكامل (الجزء الأول: الفصول 1-7) في DEFAULT_LIBRARY_DATA.
   ════════════════════════════════════════════════════════════════════ */


/* ── إعدادات الذكاء الاصطناعي (Gemini) ─────────────────────────────── */
/* TODO: ضع المفتاح في متغير بيئة أو خادم وسيط — لا تضع مفتاحاً حقيقياً هنا. */
const apiKey = "";
const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

async function callGeminiAPI(payload, maxRetries = 2) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}

const DEFAULT_LIBRARY_DATA = {
  activeBookId: "mgmt_101",
  activeChapterId: "mgmt_preface",
  books: [
    {
      id: "mgmt_101",
      title: "مبادئ الإدارة (Principles of Management)",
      author: "ستيفن روبنز وماري كولتر (Stephen P. Robbins & Mary Coulter)",
      description: "المرجع الأكاديمي والمهني الأوسع انتشاراً واعتماداً؛ يغطي دورة الإدارة الكبرى مع اكتمال الجزء الأول كاملاً (الفصول 1 إلى 7).",
      chapters: [
        {
          id: "mgmt_preface",
          chapterNumber: 0,
          title: "تصدير الكتاب ومدخله العام وفهرس الأجزاء",
          shortTitle: "التصدير والفهرس العام",
          pages: [
            {
              pageNumber: 1,
              subHeader: "تصدير المرجع ورؤيته الأكاديمية",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">تصدير الكتاب والمدخل العام</span>
                  <h1>مبادئ الإدارة: الرؤية والأصول المعرفية</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <div class="highlight-card">
                  <p style="margin:0; font-size:1rem; line-height:1.85;">
                    <strong>تصدير الكتاب (Book Preface):</strong> يعد كتاب <strong>«مبادئ الإدارة» (Principles of Management)</strong> المرجع الأكاديمي والمهني الأوسع انتشاراً واعتماداً في كليات التجارة وإدارة الأعمال حول العالم. يستهدف الكتاب إرساء فهم متكامل لعلم الإدارة يجمع بين الأصول العلمية النظرية الصارمة والمهارات التطبيقية الحية التي تلزم قادة المؤسسات في بيئات العمل المعاصرة.
                  </p>
                </div>

                <h2>المنطلقات الفكرية للكتاب في بيئة الأعمال المعاصرة</h2>
                <p>تنطلق الرؤية المعرفية للكتاب من حقيقة أن ممارسة الإدارة لم تعد محصورة في توجيه روتيني داخل مكاتب مغلقة، بل غدت فناً قيادياً ديناميكياً يتطلب التكيف المستمر مع:</p>
                <ul>
                  <li><strong>التحولات التقنية والرقمية:</strong> توظيف الذكاء الاصطناعي والأتمتة والبيانات الضخمة في دعم اتخاذ القرار وقيادة الفرق الافتراضية.</li>
                  <li><strong>استيعاب قوى العولمة:</strong> إدارة المنظمات عبر الحدود الثقافية والجغرافية والاستفادة من التحالفات الاقتصادية الدولية.</li>
                  <li><strong>التمركز حول رعاية العميل:</strong> جعل إرضاء المستفيد النهائي وبناء تجربته المتميزة حجر الزاوية في ميزة المنظمة التنافسية.</li>
                  <li><strong>ترسيخ الحوكمة والاستدامة:</strong> موازنة العوائد المالية مع المسؤولية المجتمعية وحفظ موارد البيئة للأجيال القادمة.</li>
                </ul>
              `
            },
            {
              pageNumber: 2,
              subHeader: "خارطة فصول الكتاب الكاملة (18 فصلاً)",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 1.6rem 0;">
                  <span class="chapter-badge">خارطة المنهاج الأكاديمي الشامل</span>
                  <h1>فهرس الأجزاء والمحاور الرئيسة للمرجع</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    دورة الإدارة ووظائفها الكبرى عبر خمسة أجزاء وثمانية عشر فصلاً دراسياً معتمداً
                  </p>
                </div>

                <div class="curriculum-meta-banner">
                  <div class="curriculum-stat-item">
                    <div class="curriculum-stat-icon">📚</div>
                    <div class="curriculum-stat-text">
                      <strong>5 أجزاء علمية</strong>
                      <span>تغطي دورة الإدارة الكبرى</span>
                    </div>
                  </div>
                  <div class="curriculum-stat-item">
                    <div class="curriculum-stat-icon">📑</div>
                    <div class="curriculum-stat-text">
                      <strong>18 فصلاً دراسياً</strong>
                      <span>المنهاج الأكاديمي الكامل</span>
                    </div>
                  </div>
                  <div class="curriculum-stat-item">
                    <div class="curriculum-stat-icon">✨</div>
                    <div class="curriculum-stat-text">
                      <strong style="color: #059669;">7 فصول مفعلة</strong>
                      <span>الجزء الأول كاملاً</span>
                    </div>
                  </div>
                </div>

                <div class="curriculum-wrapper">
                  <!-- الجزء الأول -->
                  <div class="curriculum-part-card">
                    <div class="curriculum-part-header">
                      <div class="curriculum-part-title-box">
                        <span class="part-color-pill" style="background: #2563eb;"></span>
                        <div>
                          <h3 class="curriculum-part-title">الجزء الأول: مدخل إلى الإدارة وبيئة العمل</h3>
                          <span class="curriculum-part-subtitle-en">Part I: Introduction to Management & Organizations</span>
                        </div>
                      </div>
                      <span class="curriculum-part-badge" style="color: #059669; border-color: #6ee7b7; font-weight:800;">7 / 7 فصول متاحة (مكتمل)</span>
                    </div>
                    <div class="curriculum-chapters-list">
                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch1')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">01</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 1: المديرون وموقعك في بيئة العمل</span>
                            <span class="chapter-title-en">Managers and You in the Workplace</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch2')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">02</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 2: صناعة القرارات وتحديد الخيارات</span>
                            <span class="chapter-title-en">Making Decisions</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch3')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">03</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 3: إدارة البيئة الخارجية وثقافة المنظمة</span>
                            <span class="chapter-title-en">Managing the External Environment and Culture</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch4')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">04</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 4: ممارسات الإدارة في السياق العالمي</span>
                            <span class="chapter-title-en">Managing in a Global Environment</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch5')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">05</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 5: إدارة التنوع وتكافؤ الفرص</span>
                            <span class="chapter-title-en">Managing Diversity</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch6')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">06</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 6: المسؤولية المجتمعية وأخلاقيات الأعمال</span>
                            <span class="chapter-title-en">Social Responsibility and Ethics</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item is-clickable" onclick="selectChapter('mgmt_ch7')">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">07</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 7: إدارة التغيير والابتكار المؤسسي</span>
                            <span class="chapter-title-en">Managing Change and Disruptive Innovation</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-available">✓ متاح ومفعل ←</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- الجزء الثاني -->
                  <div class="curriculum-part-card">
                    <div class="curriculum-part-header">
                      <div class="curriculum-part-title-box">
                        <span class="part-color-pill" style="background: #0d9488;"></span>
                        <div>
                          <h3 class="curriculum-part-title">الجزء الثاني: التخطيط وصياغة الاستراتيجيات</h3>
                          <span class="curriculum-part-subtitle-en">Part II: Planning</span>
                        </div>
                      </div>
                      <span class="curriculum-part-badge" style="color: #0d9488; border-color: #99f6e4;">فصلان دراسيان</span>
                    </div>
                    <div class="curriculum-chapters-list">
                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">08</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 8: أسس التخطيط وتنسيق أنشطة العمل</span>
                            <span class="chapter-title-en">Planning Work Activities</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">09</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 9: الإدارة الاستراتيجية وتحديد المسار التنافسي</span>
                            <span class="chapter-title-en">Managing Strategy</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- الجزء الثالث -->
                  <div class="curriculum-part-card">
                    <div class="curriculum-part-header">
                      <div class="curriculum-part-title-box">
                        <span class="part-color-pill" style="background: #d97706;"></span>
                        <div>
                          <h3 class="curriculum-part-title">الجزء الثالث: التنظيم وهندسة الموارد</h3>
                          <span class="curriculum-part-subtitle-en">Part III: Organizing</span>
                        </div>
                      </div>
                      <span class="curriculum-part-badge" style="color: #d97706; border-color: #fde68a;">3 فصول دراسية</span>
                    </div>
                    <div class="curriculum-chapters-list">
                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">10</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 10: تصميم الهياكل التنظيمية وتوزيع الصلاحيات</span>
                            <span class="chapter-title-en">Designing Organizational Structure</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">11</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 11: إدارة الموارد البشرية واستقطاب الكفاءات</span>
                            <span class="chapter-title-en">Managing Human Resources</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">12</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 12: بناء فرق العمل وإدارتها</span>
                            <span class="chapter-title-en">Managing Teams</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- الجزء الرابع -->
                  <div class="curriculum-part-card">
                    <div class="curriculum-part-header">
                      <div class="curriculum-part-title-box">
                        <span class="part-color-pill" style="background: #7c3aed;"></span>
                        <div>
                          <h3 class="curriculum-part-title">الجزء الرابع: القيادة وتوجيه السلوك البشري</h3>
                          <span class="curriculum-part-subtitle-en">Part IV: Leading</span>
                        </div>
                      </div>
                      <span class="curriculum-part-badge" style="color: #7c3aed; border-color: #ddd6fe;">4 فصول دراسية</span>
                    </div>
                    <div class="curriculum-chapters-list">
                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">13</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 13: إدارة الاتصال وقنوات تدفق المعلومات</span>
                            <span class="chapter-title-en">Managing Communication</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">14</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 14: فهم السلوك الفردي وديناميكياته</span>
                            <span class="chapter-title-en">Understanding Individual Behavior</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">15</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 15: تحفيز الكوادر وإيقاد دافعية الإنجاز</span>
                            <span class="chapter-title-en">Motivating Employees</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">16</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 16: نظريات القيادة وممارساتها الفعالة</span>
                            <span class="chapter-title-en">Being an Effective Leader</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- الجزء الخامس -->
                  <div class="curriculum-part-card">
                    <div class="curriculum-part-header">
                      <div class="curriculum-part-title-box">
                        <span class="part-color-pill" style="background: #dc2626;"></span>
                        <div>
                          <h3 class="curriculum-part-title">الجزء الخامس: الرقابة وإدارة العمليات</h3>
                          <span class="curriculum-part-subtitle-en">Part V: Controlling & Operations</span>
                        </div>
                      </div>
                      <span class="curriculum-part-badge" style="color: #dc2626; border-color: #fecaca;">فصلان دراسيان</span>
                    </div>
                    <div class="curriculum-chapters-list">
                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">17</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 17: الرصد والرقابة التنظيمية وتصحيح الانحرافات</span>
                            <span class="chapter-title-en">Monitoring and Controlling</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>

                      <div class="curriculum-chapter-item">
                        <div class="chapter-main-info">
                          <span class="chapter-number-circle">18</span>
                          <div class="chapter-text-block">
                            <span class="chapter-title-ar">الفصل 18: إدارة العمليات وسلاسل القيمة التشغيلية</span>
                            <span class="chapter-title-en">Managing Operations</span>
                          </div>
                        </div>
                        <div class="chapter-action-box">
                          <span class="status-pill-upcoming">قيد الإدراج في المرجع</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
            }
          ]
        },
        {
          id: "mgmt_ch1",
          chapterNumber: 1,
          title: "الفصل الأول: المديرون وموقعك في بيئة العمل",
          shortTitle: "الفصل 1: المديرون والبيئة",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم وأهمية المديرين",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل الأول: المديرون وموقعك في بيئة العمل</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li><strong>إيضاح أهمية المديرين للمنظمات <span class="term-en">Explain why managers are important to organizations</span>:</strong> استيعاب المسوغات الجوهرية التي تجعل من القيادة الإدارية ركيزة البقاء والنمو في بيئات الأعمال المعاصرة.</li>
                  <li><strong>التعريف بهوية المديرين ومواضع عملهم <span class="term-en">Tell who managers are and where they work</span>:</strong> التمييز الدقيق بين الموظفين التنفيذيين والمديرين وتعرف مستوياتهم الهرمية ومفهوم المنظمة.</li>
                  <li><strong>بيان وظائف الإدارة، وأدوارها، ومهاراتها <span class="term-en">Describe the functions, roles, and skills of managers</span>:</strong> الإحاطة بوظائف فايول، وأدوار مينتزبرغ، ومصفوفة كاتز.</li>
                  <li><strong>استعراض العوامل المعاصرة المعيدة لصياغة العمل الإداري <span class="term-en">Describe the factors that are reshaping the manager's job</span>:</strong> إدراك أثر الذكاء الاصطناعي، والحوكمة، والتمركز حول العميل، والابتكار، والاستدامة.</li>
                  <li><strong>إبراز القيمة المكتسبة من دراسة علم الإدارة <span class="term-en">Explain the value of studying management</span>.</strong></li>
                </ol>

                <h3>1.1 أهمية المديرين في المنظمات</h3>
                <p>تشتد حاجة المنظمات المعاصرة إلى مهارات المديرين وبصائرهم القيادية كلما اضطربت الأسواق وتعقدت مسارات الاقتصاد؛ وتستند منزلة الإدارة الرفيعة إلى ثلاثة مسوغات جوهرية:</p>
                <ul>
                  <li><strong>المسوغ الأول:</strong> حاجة المؤسسات الماسة إلى كفاءات إدارية ترعى المسيرة التنظيمية في أوقات الفوضى والتحولات غير المسبوقة، وتملك القدرة على استشراف الأزمات وقيادة فرق العمل نحو بر الأمان.</li>
                  <li><strong>المسوغ الثاني:</strong> اضطلاع المديرين بمهمة تنسيق الطاقات البشرية وتوجيهها نحو مقاصدها؛ فالمدير المقتدر هو من يتعرف على مواطن الخلل، ويضع الحلول الناجعة، ويهيئ للعاملين سبلاً تيسر أداء واجباتهم المهنية باقتدار.</li>
                  <li><strong>المسوغ الثالث:</strong> أثر الإدارة الحاسم في رفع إنتاجية العاملين وتثبيت ولائهم لمؤسستهم؛ إذ كشفت بحوث مؤسسة غالوب <span class="term-en">Gallup</span> لاستطلاعات الرأي أن جودة العلاقة الوظيفية القائمة بين الموظف ومشرفه المباشر هي المتغير الأقوى أثراً في بقاء الكفاءات وتعزيز عطائها الإنتاجي، مما يجعل المدير عماد الاستقرار التنظيمي ورأس ماله المعنوي.</li>
                </ul>
              `
            },
            {
              pageNumber: 2,
              subHeader: "1.2 من هم المديرون؟ • شكل (1-1) الهرم التنظيمي",
              htmlContent: `
                <h2>1.2 من هم المديرون وأين يعملون؟</h2>
                <p>المدير <span class="term-en">Manager</span> في العرف التنظيمي هو كل شخص ينسق أعمال الآخرين ويشرف عليها بغية بلوغ أهداف المنظمة، متجاوزاً حدود الإنجاز الفردي إلى تفعيل الجهد الجماعي المشترك.</p>
                <p>وتنقسم القوى العاملة داخل أي منشأة إلى صنفين متمايزين:</p>
                <ol>
                  <li><strong>الموظفون التنفيذيون <span class="term-en">Non-managerial Employees</span>:</strong> وهم الأفراد المنوط بهم تنفيذ المهام التخصصية والتشغيلية المباشرة، دون أن تمتد مسؤولياتهم إلى الإشراف على عمل زملائهم.</li>
                  <li><strong>المديرون <span class="term-en">Managers</span>:</strong> وهم الذين يتحملون أمانة توجيه الآخرين، ورعاية أعمالهم، ومساءلتهم عن تحقيق النتائج المرسومة.</li>
                </ol>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (1-1): الهرم التنظيمي لمستويات الإدارة التقليدية Levels of Management</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-1-1')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="diagram-scroll-hint"><span>↔ اسحب لعرض تفاصيل الهرم الإداري</span></div>
                  <div class="diagram-scroll-wrapper">
                    <svg id="svg-exhibit-1-1" class="diagram-svg" viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#2563eb"/></linearGradient>
                        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
                        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#0284c7"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient>
                        <linearGradient id="g4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#64748b"/><stop offset="100%" stop-color="#94a3b8"/></linearGradient>
                      </defs>
                      <polygon points="255,16 505,16 550,90 210,90" fill="url(#g1)" stroke="#fff" stroke-width="2"/>
                      <text x="380" y="42" fill="#ffffff" font-weight="800" font-size="14" text-anchor="middle">الإدارة العليا (Top Managers)</text>
                      <text x="380" y="66" fill="#dbeafe" font-size="11" text-anchor="middle">رسم الاستراتيجيات الكلية واتخاذ القرارات المصيرية للمنظمة</text>

                      <polygon points="208,96 552,96 612,172 148,172" fill="url(#g2)" stroke="#fff" stroke-width="2"/>
                      <text x="380" y="124" fill="#ffffff" font-weight="800" font-size="14" text-anchor="middle">الإدارة الوسطى (Middle Managers)</text>
                      <text x="380" y="148" fill="#eff6ff" font-size="11" text-anchor="middle">ترجمة الاستراتيجية إلى خطط قطاعية وتوجيه مديري الخط الأول</text>

                      <polygon points="146,178 614,178 678,254 82,254" fill="url(#g3)" stroke="#fff" stroke-width="2"/>
                      <text x="380" y="206" fill="#ffffff" font-weight="800" font-size="14" text-anchor="middle">إدارة الخط الأول / الإشرافية (First-line Managers)</text>
                      <text x="380" y="230" fill="#f0f9ff" font-size="11" text-anchor="middle">الإشراف الميداني المباشر على أداء الموظفين التنفيذيين</text>

                      <polygon points="80,260 680,260 746,336 14,336" fill="url(#g4)" stroke="#fff" stroke-width="2"/>
                      <text x="380" y="288" fill="#ffffff" font-weight="800" font-size="14" text-anchor="middle">الموظفون التنفيذيون (Non-managerial Employees)</text>
                      <text x="380" y="312" fill="#f8fafc" font-size="11" text-anchor="middle">إنجاز الأعمال التشغيلية والخدمية المباشرة دون مسؤوليات إشرافية</text>
                    </svg>
                  </div>
                  <div class="exhibit-caption">المصدر: صياغة مطابقة للشكل المعياري في مرجع Robbins & Coulter لمستويات الهرم التنظيمي.</div>
                </div>

                <p><strong>مفهوم المنظمة:</strong> يمارس هؤلاء مهامهم في إطار المنظمة <span class="term-en">Organization</span>، وهي كيان منظم يجمع أفراداً لتحقيق غاية محددة <span class="term-en">Distinct Purpose</span>، وينتظم في بنية مهيكلة مدروسة <span class="term-en">Deliberate Structure</span> تحدد المسؤوليات والصلاحيات وتضبط مسارات اتخاذ القرار.</p>
              `
            },
            {
              pageNumber: 3,
              subHeader: "1.3 مفهوم الإدارة • الكفاءة والفاعلية • وظائف فايول",
              htmlContent: `
                <h2>1.3 ما الإدارة وماذا يفعل المديرون؟</h2>
                <p>الإدارة <span class="term-en">Management</span> علم وفن يشتمل على تنسيق أنشطة العمل والإشراف عليها لتحقيق الأهداف التنظيمية بكفاءة وفاعلية.</p>
                <p>وترتكز الممارسة الإدارية الرشيدة على بعدين متكاملين:</p>
                <ul>
                  <li><strong>الكفاءة <span class="term-en">Efficiency</span>:</strong> تعني الاستغلال الأمثل للموارد المتاحة وتجنب أي وجه من وجوه الهدر، وتصاغ اصطلاحاً في عبارة إنجاز الأمور على وجهها الصحيح <span class="term-en">Doing Things Right</span>، ومدارها على تقليل المدخلات المادية والبشرية مع استخراج أعلى مردود ممكن.</li>
                  <li><strong>الفاعلية <span class="term-en">Effectiveness</span>:</strong> تعني مباشرة الأنشطة التي تفضي رأساً إلى إدراك الأهداف التنظيمية المرسومة، وتصاغ اصطلاحاً في عبارة إنجاز الأمور الصحيحة ذات الأثر <span class="term-en">Doing the Right Things</span>، ومدارها على بلوغ المقاصد النهائية وتحقيق النتائج. وبذا تكون الكفاءة معنية بوسائل الإنجاز <span class="term-en">Means</span>، في حين تختص الفاعلية بالغايات ومآلات العمل <span class="term-en">Ends</span>.</li>
                </ul>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (1-2): الكفاءة والفاعلية في المنظور الإداري Efficiency vs. Effectiveness</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-1-2')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="diagram-scroll-hint"><span>↔ اسحب لمقارنة الوسائل والغايات</span></div>
                  <div class="diagram-scroll-wrapper">
                    <svg id="svg-exhibit-1-2" class="diagram-svg" viewBox="0 0 740 180" xmlns="http://www.w3.org/2000/svg">
                      <rect x="390" y="20" width="330" height="140" rx="12" fill="var(--bg-surface)" stroke="#2563eb" stroke-width="2"/>
                      <text x="555" y="52" fill="#1e3a8a" font-weight="bold" font-size="14" text-anchor="middle">الكفاءة (Efficiency) - الوسائل (Means)</text>
                      <text x="555" y="82" fill="#2563eb" font-weight="700" font-size="12.5" text-anchor="middle">إنجاز الأمور على وجهها الصحيح (Doing Things Right)</text>
                      <text x="555" y="112" fill="var(--text-muted)" font-size="11" text-anchor="middle">التركيز: تقليل الهدر واستغلال الموارد (Low Waste)</text>
                      <text x="555" y="134" fill="#0d9488" font-size="10.5" font-weight="700" text-anchor="middle">أدنى مدخلات ممكنة</text>

                      <rect x="20" y="20" width="330" height="140" rx="12" fill="var(--bg-surface)" stroke="#059669" stroke-width="2"/>
                      <text x="185" y="52" fill="#065f46" font-weight="bold" font-size="14" text-anchor="middle">الفاعلية (Effectiveness) - الغايات (Ends)</text>
                      <text x="185" y="82" fill="#059669" font-weight="700" font-size="12.5" text-anchor="middle">إنجاز الأمور الصحيحة ذات الأثر (Doing the Right Things)</text>
                      <text x="185" y="112" fill="var(--text-muted)" font-size="11" text-anchor="middle">التركيز: إدراك الأهداف الكبرى (High Attainment)</text>
                      <text x="185" y="134" fill="#155e8c" font-size="10.5" font-weight="700" text-anchor="middle">أعلى مخرجات مستهدفة</text>
                    </svg>
                  </div>
                  <div class="exhibit-caption">المصدر: Robbins & Coulter، مقارنة أبعاد الكفاءة والفاعلية ونتائجهما في قياس الأداء التنظيمي.</div>
                </div>

                <h3>وظائف الإدارة الأربع لهنري فايول <span class="term-en">Henri Fayol</span></h3>
                <p>يعد مدخل الوظائف الإدارية من أعرق المداخل النظرية، ويتكون من أربع وظائف متكاملة:</p>
                <ol>
                  <li><strong>التخطيط <span class="term-en">Planning</span>:</strong> صياغة الأهداف وتحديد الاستراتيجيات وخطط العمل التنسيقية.</li>
                  <li><strong>التنظيم <span class="term-en">Organizing</span>:</strong> توزيع المسؤوليات وهندسة العلاقات وتحديد الصلاحيات.</li>
                  <li><strong>القيادة <span class="term-en">Leading</span>:</strong> تحفيز الأفراد وتوجيه الطاقات وحل النزاعات باقتدار.</li>
                  <li><strong>الرقابة <span class="term-en">Controlling</span>:</strong> متابعة الأداء ومقارنته بالمعايير وتصحيح الانحرافات.</li>
                </ol>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (1-3): دورة الوظائف الإدارية الأربع لهنري فايول</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-1-3')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="diagram-scroll-wrapper">
                    <svg id="svg-exhibit-1-3" class="diagram-svg" viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg">
                      <rect x="580" y="25" width="160" height="120" rx="10" fill="var(--bg-surface)" stroke="#2563eb" stroke-width="2"/>
                      <text x="660" y="65" fill="#1e3a8a" font-weight="bold" font-size="14" text-anchor="middle">التخطيط</text>
                      <text x="660" y="88" fill="#2563eb" font-size="11" text-anchor="middle">(Planning)</text>
                      <text x="660" y="118" fill="var(--text-muted)" font-size="10.5" text-anchor="middle">تحديد الغايات والمسارات</text>

                      <rect x="390" y="25" width="145" height="120" rx="10" fill="var(--bg-surface)" stroke="#0d9488" stroke-width="2"/>
                      <text x="462" y="65" fill="#0f766e" font-weight="bold" font-size="14" text-anchor="middle">التنظيم</text>
                      <text x="462" y="88" fill="#0d9488" font-size="11" text-anchor="middle">(Organizing)</text>
                      <text x="462" y="118" fill="var(--text-muted)" font-size="10.5" text-anchor="middle">هيكلة المهام والسلطات</text>

                      <rect x="210" y="25" width="145" height="120" rx="10" fill="var(--bg-surface)" stroke="#d97706" stroke-width="2"/>
                      <text x="282" y="65" fill="#b45309" font-weight="bold" font-size="14" text-anchor="middle">القيادة</text>
                      <text x="282" y="88" fill="#d97706" font-size="11" text-anchor="middle">(Leading)</text>
                      <text x="282" y="118" fill="var(--text-muted)" font-size="10.5" text-anchor="middle">تحفيز الكوادر وتوجيههم</text>

                      <rect x="20" y="25" width="155" height="120" rx="10" fill="var(--bg-surface)" stroke="#dc2626" stroke-width="2"/>
                      <text x="97" y="65" fill="#991b1b" font-weight="bold" font-size="14" text-anchor="middle">الرقابة</text>
                      <text x="97" y="88" fill="#dc2626" font-size="11" text-anchor="middle">(Controlling)</text>
                      <text x="97" y="118" fill="var(--text-muted)" font-size="10.5" text-anchor="middle">رصد الأداء وتصحيحه</text>
                    </svg>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 4,
              subHeader: "أدوار مينتزبرغ • مصفوفة روبرت كاتز",
              htmlContent: `
                <h2>أدوار مينتزبرغ العشرة ومهارات روبرت كاتز</h2>
                <p>صنف البروفيسور هنري مينتزبرغ عمل المدير إلى 10 أدوار تنتظم في 3 فئات كبرى:</p>
                <ul>
                  <li><strong>الأدوار التفاعلية الشخصية <span class="term-en">Interpersonal Roles</span>:</strong> الممثل الرمزي (Figurehead)، القائد الموجه (Leader)، وضابط الاتصال (Liaison).</li>
                  <li><strong>الأدوار المعلوماتية <span class="term-en">Informational Roles</span>:</strong> الراصد (Monitor)، ناشر البيانات داخلياً (Disseminator)، والمتحدث الرسمي خارجياً (Spokesperson).</li>
                  <li><strong>الأدوار القرارية <span class="term-en">Decisional Roles</span>:</strong> المبادر الريادي (Entrepreneur)، معالج الأزمات (Disturbance Handler)، مخصص الموارد (Resource Allocator)، والمفاوض (Negotiator).</li>
                </ul>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (1-4): أدوار المدير العشرة بحسب هنري مينتزبرغ</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-1-4')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="structured-diagram-grid">
                    <div class="structured-card" style="border-right: 4px solid #2563eb;">
                      <h4>الأدوار التفاعلية (Interpersonal)</h4>
                      <p>
                        • <strong>الممثل الرمزي (Figurehead):</strong> الواجبات الرسمية والتشريفية والقانونية.<br>
                        • <strong>القائد (Leader):</strong> تحفيز وتوجيه وتدريب العاملين.<br>
                        • <strong>ضابط الاتصال (Liaison):</strong> نسج شبكة علاقات خارجية حيوية.
                      </p>
                    </div>
                    <div class="structured-card" style="border-right: 4px solid #0d9488;">
                      <h4>الأدوار المعلوماتية (Informational)</h4>
                      <p>
                        • <strong>الراصد (Monitor):</strong> تتبع البيئة وتلقي التقارير والمعلومات.<br>
                        • <strong>ناشر البيانات (Disseminator):</strong> تمرير البيانات الحيوية داخلياً.<br>
                        • <strong>المتحدث الرسمي (Spokesperson):</strong> نقل مواقف المنظمة للخارج.
                      </p>
                    </div>
                    <div class="structured-card" style="border-right: 4px solid #d97706;">
                      <h4>الأدوار القرارية (Decisional)</h4>
                      <p>
                        • <strong>المبادر الريادي (Entrepreneur):</strong> إطلاق مشاريع التغيير واقتناص الفرص.<br>
                        • <strong>معالج الأزمات (Disturbance Handler):</strong> تدارك المشكلات الطارئة.<br>
                        • <strong>مخصص الموارد (Resource Allocator):</strong> توزيع الميزانيات والوقت.<br>
                        • <strong>المفاوض (Negotiator):</strong> الدفاع عن مصالح المؤسسة في العقود.
                      </p>
                    </div>
                  </div>
                </div>

                <h3>مصفوفة المهارات الإدارية لروبرت كاتز <span class="term-en">Robert L. Katz</span></h3>
                <p>تتوزع المهارات الإدارية إلى ثلاث فئات رئيسية تتباين نسبتها حسب المستوى الهرمي:</p>
                <ol>
                  <li><strong>المهارات الفنية <span class="term-en">Technical Skills</span>:</strong> المعرفة الإجرائية والخبرة التخصصية؛ وتتعاظم في إدارة الخط الأول (48%).</li>
                  <li><strong>المهارات الإنسانية <span class="term-en">Human Skills</span>:</strong> القدرة على التواصل والتعاطف؛ وهي مطلوبة بنسب متساوية في المستويات كافة (~35%).</li>
                  <li><strong>المهارات الإدراكية التحليلية <span class="term-en">Conceptual Skills</span>:</strong> القدرة على رؤية المنظمة كلاً متكاملاً؛ وتتعاظم الحاجة إليها في الإدارة العليا (48%).</li>
                </ol>
              `
            },
            {
              pageNumber: 5,
              subHeader: "1.4 التحولات الكبرى • 1.5 قيمة دراسة الإدارة",
              htmlContent: `
                <h2>1.4 التحولات الكبرى المعاصرة في بيئة عمل المدير</h2>
                <p>تعيد قوى متسارعة صياغة الممارسة الإدارية المعاصرة وتفرض أساليب قيادة جديدة:</p>
                <ul>
                  <li><strong>التقنيات الرقمية والذكاء الاصطناعي <span class="term-en">AI & Technology</span>:</strong> التحليلات التنبؤية، الأتمتة الذكية، وإدارة الفرق الافتراضية العابرة للحدود.</li>
                  <li><strong>حوكمة السلوك وأخلاقيات الأعمال <span class="term-en">Ethics & Governance</span>:</strong> إرساء معايير الشفافية والمسؤولية المجتمعية والنزاهة المؤسسية.</li>
                  <li><strong>التمركز حول العميل <span class="term-en">Customer Focus</span>:</strong> تجربة المستفيد بوصفها الركيزة الحاسمة للبقاء في المنافسة السوقية.</li>
                  <li><strong>الابتكار المستمر <span class="term-en">Innovation</span>:</strong> تجديد نماذج الأعمال، وتحفيز الأفكار الريادية داخل المؤسسة.</li>
                  <li><strong>الاستدامة وصيانة الموارد <span class="term-en">Sustainability</span>:</strong> حماية موارد البيئة وضمان رفاهية الأجيال القادمة.</li>
                </ul>

                <h2>1.5 قيمة دراسة علم الإدارة</h2>
                <ol>
                  <li><strong>شمولية الإدارة وعالميتها <span class="term-en">Universality of Management</span>:</strong> حاجة المنظمات كافة على اختلاف أنواعها ومواقعها إلى الممارسة الإدارية الرشيدة.</li>
                  <li><strong>استحقاقات الواقع المهني:</strong> إما أن تقود وتدير، أو تُدار وتُوجّه؛ وفهم الإدارة يمنحك وعياً واستيعاباً لمحيطك المؤسسي.</li>
                  <li><strong>توازن المغارم والمغانم:</strong> مكابدة ضغوط المسؤولية في مقابل إلهام الآخرين وصناعة الأثر الإيجابي المستدام في المجتمع.</li>
                </ol>
              `
            }
          ]
        },
        {
          id: "mgmt_ch2",
          chapterNumber: 2,
          title: "الفصل الثاني: صناعة القرارات وتحديد الخيارات",
          shortTitle: "الفصل 2: صناعة القرارات",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم وخطوات اتخاذ القرار الثماني",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل الثاني: صناعة القرارات وتحديد الخيارات</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>وصف الخطوات الثماني المكونة لمسار عملية اتخاذ القرار <span class="term-en">Describe the eight steps in decision-making</span>.</li>
                  <li>استعراض المداخل الأربعة المفسرة لكيفية صناعة المديرين لقراراتهم <span class="term-en">Explain the four ways managers make decisions</span>.</li>
                  <li>تصنيف أنماط المشكلات والقرارات وبيان أوجه التباين بينها <span class="term-en">Classify decisions and conditions</span>.</li>
                  <li>تصنيف التحيزات والأخطاء الإدراكية المؤثرة في خيارات المديرين <span class="term-en">Classify decision-making biases and errors</span>.</li>
                  <li>بيان معايير صناعة القرار الفعال في بيئة العمل المعاصرة.</li>
                </ol>

                <h3>2.1 خطوات عملية اتخاذ القرار الثماني</h3>
                <p>القرار <span class="term-en">Decision</span> خيار مستقر بين بديلين أو أكثر؛ وعملية اتخاذ القرار <span class="term-en">The Decision-Making Process</span> مسار إداري متكامل يتجاوز مجرد لحظة الاختيار الخاطفة عبر ثماني خطوات متتابعة:</p>
                <ol>
                  <li><strong>تشخيص المشكلة (Identifying a Problem):</strong> رصد الفجوة بين وضع قائم وحال مأمول.</li>
                  <li><strong>تحديد معايير القرار (Identifying Decision Criteria):</strong> حصر محددات المفاضلة (التكاليف، المخاطر، الجودة، الزمن).</li>
                  <li><strong>ترجيح أوزان المعايير (Allocating Weights):</strong> إسناد وزن نسبي لكل معيار وفق أولويته.</li>
                  <li><strong>ابتكار البدائل وتوليدها (Developing Alternatives):</strong> حصر الخيارات الممكنة بحرية إبداعية.</li>
                  <li><strong>فحص البدائل وتحليلها (Analyzing Alternatives):</strong> تقييم كل بديل بميزان الأوزان المحددة.</li>
                  <li><strong>اختيار البديل الأنسب (Selecting an Alternative):</strong> الاستقرار على البديل الحائز على أعلى تقييم مرجح.</li>
                  <li><strong>إنفاذ القرار ومتابعته (Implementing the Alternative):</strong> نقل القرار إلى حيز التطبيق الفعلي.</li>
                  <li><strong>تقييم فاعلية القرار (Evaluating Decision Effectiveness):</strong> التحقق من معالجة أصل المشكلة وزوال الفجوة.</li>
                </ol>
              `
            },
            {
              pageNumber: 2,
              subHeader: "2.2 المداخل المعرفية لصناعة القرارات",
              htmlContent: `
                <h2>2.2 المداخل المعرفية لكيفية صناعة القرارات</h2>
                <p>تفسر الممارسة الإدارية سلوك المديرين عند المفاضلة عبر أربعة مداخل رئيسة:</p>
                <ul>
                  <li><strong>المدخل الأول: العقلانية التامة (Rational Decision Making):</strong> يفترض اتخاذ القرار العقلاني أن المدير يتسم بالموضوعية والمنطق التام، ويمتلك تصورا شاملا لكافة الخيارات وعواقبها، ويوجه خياره حصراً لتعظيم المردود الاقتصادي للمنظمة؛ وهو نموذج نظري مثالي تندر مطابقته لواقع العمل الفعلي.</li>
                  <li><strong>المدخل الثاني: العقلانية المقيدة (Bounded Rationality):</strong> أرسى هربرت سيمون <span class="term-en">Herbert Simon</span> مفهوم العقلانية المقيدة ليقر بقصور قدرة الذهن البشري عن الإحاطة بشتى المعلومات ومعالجة البدائل كافة في ظل ضيق الوقت وتعقد المتغيرات. وبدلاً من استنزاف الجهد في طلب الحل الأقصى الخيالي، يلجأ المدير إلى سلوك الرضا الكافي <span class="term-en">Satisficing</span>، وهو قبول خيار جيد ومرضٍ يفي بالغرض المطلوب. ويحذر هذا المدخل من مغبة التصعيد الالتزامي <span class="term-en">Escalation of Commitment</span>، وهو التمادي غير الرشيد في تكريس الموارد لقرار سابق ثبت تعثره، بدافع الكبرياء أو الخوف من الاعتراف بالخطأ.</li>
                  <li><strong>المدخل الثالث: صناعة القرار بالحدس (Intuitive Decision Making):</strong> صناعة القرار بالحدس عملية واعية ولاواعية ترتكز على مخزون التجارب السابقة، والمشاعر المهنية المصقولة، والأحكام الأخلاقية؛ وهو مدخل يظاهر التحليل العقلاني ويسانده ولا يضاده.</li>
                  <li><strong>المدخل الرابع: الإدارة المستندة إلى الشواهد (Evidence-Based Management):</strong> الإدارة المستندة إلى الشواهد المنهج القائم على الاستخدام الواعي والمنظم لأفضل الحقائق والبيانات الميدانية الصادقة لدعم خيارات الإدارة.</li>
                </ul>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (2-2): العقلانية التامة مقابل العقلانية المقيدة</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-2-2')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="structured-diagram-grid">
                    <div class="structured-card" style="border-right: 4px solid #2563eb;">
                      <h4>العقلانية التامة (Rationality)</h4>
                      <p>
                        • <strong>الافتراض:</strong> موضوعية مطلقة، علم تام بكافة النتائج والبدائل.<br>
                        • <strong>المقصد:</strong> التعظيم الأقصى للمردود الاقتصادي (Maximizing).<br>
                        • <strong>الواقع:</strong> نموذج مثالي نادر الحدوث.
                      </p>
                    </div>
                    <div class="structured-card" style="border-right: 4px solid #059669;">
                      <h4>العقلانية المقيدة (Bounded Rationality)</h4>
                      <p>
                        • <strong>الافتراض:</strong> قصور العقل البشري، ضيق الوقت، شح المعلومات.<br>
                        • <strong>المقصد:</strong> اختيار حل مرضٍ وكافٍ يفي بالغرض (Satisficing).<br>
                        • <strong>الواقع:</strong> السلوك العملي للمديرين في بيئة الأعمال المعقدة.
                      </p>
                    </div>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 3,
              subHeader: "2.3 تصنيف المشكلات والقرارات",
              htmlContent: `
                <h2>2.3 تصنيف المشكلات والقرارات</h2>
                <p>تتمايز التحديات التي تجابه المؤسسات إلى نمطين يقابلهما نوعان من القرارات:</p>
                
                <div class="highlight-card">
                  <h3 style="margin-top:0;">1. المشكلات المهيكلة والقرارات المبرمجة</h3>
                  <p>المشكلات المهيكلة <span class="term-en">Structured Problems</span> قضايا صريحة ومتكررة الوقوع تتوافر بياناتها بوضوح (كمطالبة عميل باسترداد ثمن سلعة معيبة). وتُعالج هذه المشكلات عبر قرارات مبرمجة <span class="term-en">Programmed Decisions</span> روتينية تستند إلى:</p>
                  <ul>
                    <li><strong>الإجراءات (Procedures):</strong> خطوات متسلسلة متتابعة يستخدمها المشرف في مواجهة مشكلة محددة.</li>
                    <li><strong>القواعد (Rules):</strong> بنود صريحة تحدد ما ينبغي فعله وما يحظر فعله على نحو قاطع.</li>
                    <li><strong>السياسات (Policies):</strong> أطر عامة ترسم حدود التفكير وتمنح المدير مساحة تقديرية مرنة.</li>
                  </ul>
                </div>

                <div class="highlight-card" style="border-right-color: #d97706;">
                  <h3 style="margin-top:0;">2. المشكلات غير المهيكلة والقرارات غير المبرمجة</h3>
                  <p>المشكلات غير المهيكلة <span class="term-en">Unstructured Problems</span> معضلات طارئة أو فريدة تنقصها المعلومات الكافية (كقرار دخول سوق خارجي جديد أو التحول نحو خط إنتاج غير مسبوق). وتتطلب هذه المعضلات قرارات غير مبرمجة <span class="term-en">Nonprogrammed Decisions</span> استثنائية تفصل حلولها وفق كل واقعة بذاتها، وتستلزم مهارات إدراكية عليا لدى الإدارة العليا.</p>
                </div>
              `
            },
            {
              pageNumber: 4,
              subHeader: "2.4 بيئات وظروف صناعة القرار",
              htmlContent: `
                <h2>2.4 ظروف وبيئات صناعة القرار</h2>
                <p>يتحرك متخذ القرار في ثلاث بيئات احتمالية:</p>
                <ol>
                  <li><strong>التأكد التام (Certainty):</strong> حالة بيئية مثالية تتوافر فيها المعلومات التامة، وتعرف نتائج كل بديل مسبقا بيقين حاسم.</li>
                  <li><strong>المخاطرة (Risk):</strong> وضع لا تتوافر فيه نتائج حتمية، ولكن يمتلك المدير فيه تقديرات احتمالية لكل نتيجة بالرجوع إلى البيانات التاريخية أو النماذج الإحصائية لتقدير القيمة المتوقعة <span class="term-en">Expected Value</span>.</li>
                  <li><strong>عدم التأكد (Uncertainty):</strong> بيئة تفتقر إلى المعطيات والاحتمالات، ويحكم خيارات المدير فيها توجهه السلوكي:
                    <ul>
                      <li>تعظيم العائد الأقصى <span class="term-en">Maximax</span>: توجه متفائل يسعى وراء أعلى مكسب ممكن.</li>
                      <li>تعظيم العائد الأدنى <span class="term-en">Maximin</span>: توجه متحفظ وحذر يستهدف تجنب أسوأ الخسائر.</li>
                      <li>تقليل الأسف الأقصى <span class="term-en">Minimax Regret</span>: محاولة تقليص أقصى ندم يمكن أن يتجرعه متخذ القرار عند فوات فرصة بديلة.</li>
                    </ul>
                  </li>
                </ol>
              `
            },
            {
              pageNumber: 5,
              subHeader: "2.5 التحيزات الإدراكية ومعايير القرار الفعال",
              htmlContent: `
                <h2>2.5 التحيزات والأخطاء الإدراكية في صناعة القرار</h2>
                <p>يقع المديرون في عثرات ذهنية تعيب موضوعية المفاضلة، ومن أبرزها:</p>
                <ul>
                  <li><strong>الثقة المفرطة (Overconfidence Bias):</strong> مغالاة المدير في تقدير خبرته الذاتية ودقة توقعاته.</li>
                  <li><strong>الانطباع الأولي والرسو الذهني (Anchoring Effect):</strong> التشبث الجامد بأول معلومة ترد إلى الذهن.</li>
                  <li><strong>تحيز التأكيد (Confirmation Bias):</strong> البحث الدائب عما يوافق الرأي المسبق وتجاهل الشواهد المعارضة.</li>
                  <li><strong>فخ التأطير (Framing Bias):</strong> تأثر القرار بأسلوب عرض المشكلة وكيفية صياغة أبعادها.</li>
                  <li><strong>مغالطة التكاليف الغارقة (Sunk Costs Fallacy):</strong> مواصلة ضخ الأموال في مشروع فاشل لتسويغ نفقات سابقة لا يمكن استردادها.</li>
                  <li><strong>خدمة الذات (Self-Serving Bias):</strong> عزو النجاحات إلى العبقرية الذاتية ونسبة الإخفاقات إلى قوى خارجية.</li>
                </ul>

                <h2>2.6 معايير صناعة القرار الفعال في عالم اليوم</h2>
                <p>تتطلب الإدارة المعاصرة من متخذ القرار: استيعاب الفروق الثقافية، وصناعة المعايير الصالحة، واستثمار تدفق البيانات الضخمة والذكاء الاصطناعي مع تحكيم البصيرة الإنسانية، وامتلاك شجاعة التراجع عند ثبوت خطأ الخيار لتجنب فخ التصعيد الالتزامي.</p>
              `
            }
          ]
        },
        {
          id: "mgmt_ch3",
          chapterNumber: 3,
          title: "الفصل الثالث: إدارة البيئة الخارجية وثقافة المنظمة",
          shortTitle: "الفصل 3: البيئة والثقافة",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم وسلطة المدير (المنظور الإطلاقي والرمزي)",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل الثالث: إدارة البيئة الخارجية وثقافة المنظمة</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>المقارنة بين المنظور الإطلاقي والمنظور الرمزي لسلطة المدير <span class="term-en">Omnipotent vs. Symbolic views</span>.</li>
                  <li>وصف ملامح البيئة الخارجية للمنظمة وكيفية تأثيرها في ممارسات الإدارة <span class="term-en">External environment constraints</span>.</li>
                  <li>مناقشة خصائص ثقافة المنظمة وأبعادها وطرق ترسيخها <span class="term-en">Organizational culture dimensions</span>.</li>
                  <li>بيان أثر البيئة والثقافة في تقييد قرارات المديرين وتوجيهها.</li>
                </ol>

                <h3>3.1 المدير بين السلطة المطلقة والتأثير الرمزي</h3>
                <p>تتجادل النظريات الإدارية حول المدى الحقيقي لقدرة المدير على توجيه مصير المنظمة عبر منظورين متقابلين:</p>
                <ul>
                  <li><strong>المنظور الإطلاقي للإدارة (Omnipotent View of Management):</strong> يفترض أن المديرين مسؤولون مسؤولية مباشرة ومطلقة عن نجاح المؤسسة أو إخفاقها؛ فالأرباح الوفيرة تعزى مباشرة إلى حنكة القيادة، والانتكاسات تُحمل على عاتق تقصير الإدارة.</li>
                  <li><strong>المنظور الرمزي للإدارة (Symbolic View of Management):</strong> يرى أن قدرة المدير مقيدة إلى حد بعيد بقوى خارجية عاتية تقع خارج نطاق سيطرته المباشرة، كتقلبات الاقتصاد الكلي والسياسات والمنافسة الشرسة، ولا يمثل المدير سوى رمز يمنح التوجيه ويضفي الطمأنينة.</li>
                </ul>
                <p><strong>الواقع الإداري الرشيد:</strong> يمارس المدير سلطته داخل مساحة من الفعل تصوغها وتحدها قوتان حاكمتان: قيود البيئة الخارجية وثقافة المنظمة الداخلية.</p>
              `
            },
            {
              pageNumber: 2,
              subHeader: "3.2 مكونات البيئة الخارجية (المباشرة والعامة)",
              htmlContent: `
                <h2>3.2 البيئة الخارجية: قيود وتحديات</h2>
                <p>تشير البيئة الخارجية <span class="term-en">External Environment</span> إلى مجمل القوى والعوامل المحيطة بالمنظمة المؤثرة في أدائها وأنشطتها، وتتفرع إلى طبقتين:</p>
                
                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #1e3a8a;">
                    <h4>البيئة الخاصة / المباشرة (Specific)</h4>
                    <p>
                      • <strong>العملاء (Customers):</strong> المستفيدون من السلع والخدمات.<br>
                      • <strong>الموردون (Suppliers):</strong> موفرو المواد والتمويل والكوادر.<br>
                      • <strong>المنافسون (Competitors):</strong> قوى المزاحمة السوقية.<br>
                      • <strong>جماعات الضغط (Pressure Groups):</strong> النقابات وهيئات حماية المستهلك.
                    </p>
                  </div>

                  <div class="structured-card" style="border-right: 4px solid #0d9488;">
                    <h4>البيئة العامة الشاملة (General)</h4>
                    <p>
                      • <strong>الأوضاع الاقتصادية:</strong> التضخم، الفائدة، ودورات النمو.<br>
                      • <strong>التحولات الديمغرافية:</strong> تركيبة السكان وتوزيع الأعمار.<br>
                      • <strong>البيئة السياسية والقانونية:</strong> التشريعات والسياسات الضريبية.<br>
                      • <strong>العوامل الاجتماعية والثقافية:</strong> القيم وأنماط المعيشة.<br>
                      • <strong>التقدم التقني:</strong> الرقمنة والذكاء الاصطناعي.<br>
                      • <strong>المحيط العالمي:</strong> التنافس وسلاسل الإمداد الدولية.
                    </p>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 3,
              subHeader: "مصفوفة عدم التأكد البيئي • إدارة أصحاب المصلحة",
              htmlContent: `
                <h2>مصفوفة عدم التأكد البيئي وإدارة أصحاب المصلحة</h2>
                <p>تتحدد طبيعة البيئة بموجب بعدين: درجة التغير (مستقرة مقابل ديناميكية) ودرجة التعقيد (بسيطة مقابل معقدة). وتتعاظم حالة عدم التأكد البيئي <span class="term-en">Environmental Uncertainty</span> كلما ازدادت وتيرة التغير وارتفعت درجة التعقيد.</p>

                <h3>إدارة علاقات أصحاب المصلحة <span class="term-en">Stakeholders</span></h3>
                <p>أصحاب المصلحة هم جميع الأطراف المتأثرة بقرارات المنظمة وسياساتها أو المؤثرة فيها:</p>
                <ul>
                  <li><strong>الموظفون والنقابات:</strong> الأمان الوظيفي، الرواتب العادلة، والبيئة المحفزة.</li>
                  <li><strong>العملاء والمستهلكون:</strong> الجودة العالية، السعر العادل، والخدمة الراقية.</li>
                  <li><strong>الموردون والشركاء:</strong> استقرار التوريد والوفاء بالالتزامات التعاقدية.</li>
                  <li><strong>المساهمون وجهات التمويل:</strong> العائد الاستثماري المنصف والشفافية وحماية رأس المال.</li>
                  <li><strong>المجتمع والجهات الرقابية:</strong> حماية البيئة، المسؤولية المجتمعية، والامتثال للأنظمة.</li>
                </ul>
              `
            },
            {
              pageNumber: 4,
              subHeader: "3.3 ثقافة المنظمة وأبعادها السبعة",
              htmlContent: `
                <h2>3.3 ثقافة المنظمة: البيئة الداخلية الحاكمة</h2>
                <p>ثقافة المنظمة <span class="term-en">Organizational Culture</span> منظومة مشتركة من المعاني والقيم والمبادئ والتقاليد الموجهة لسلوك الأفراد داخل المؤسسة والتي تميزها عن غيرها.</p>
                
                <h3>الأبعاد السبعة لثقافة المنظمة <span class="term-en">Seven Dimensions of Culture</span></h3>
                <ol>
                  <li><strong>الاهتمام بالتفاصيل (Attention to Detail):</strong> مدى الدقة والتحليل والتركيز على الجزئيات الصغيرة.</li>
                  <li><strong>التوجه نحو النتائج (Outcome Orientation):</strong> تركيز الإدارة على المخرجات قبل الوسائل.</li>
                  <li><strong>التوجه نحو الأفراد (People Orientation):</strong> مراعاة آثار القرارات على العنصر البشري.</li>
                  <li><strong>التوجه نحو الفريق (Team Orientation):</strong> تنظيم العمل حول فرق مشتركة بدلاً من الأفراد.</li>
                  <li><strong>الحزم والعدوانية التنافسية (Aggressiveness):</strong> النزوع إلى المبادأة ومزاحمة المنافسين بشراسة.</li>
                  <li><strong>الاستقرار التنظيمي (Stability):</strong> تفضيل الحفاظ على الوضع الراهن والمسارات الآمنة.</li>
                  <li><strong>الابتكار والمخاطرة (Innovation and Risk Taking):</strong> تشجيع التجريب واستحداث الأفكار الجريئة.</li>
                </ol>
              `
            },
            {
              pageNumber: 5,
              subHeader: "الثقافات القوية • نشأة الثقافة واستمرارها",
              htmlContent: `
                <h2>الثقافات القوية مقابل الضعيفة وترسيخ الهوية</h2>
                <p>تتمايز الثقافة القوية بالتزام عميق وشامل من غالبية العاملين بقيم المنظمة الجوهرية، مما يقلل الحاجة للوائح الرسمية المعقدة؛ في حين تتسم الثقافة الضعيفة بتشتت القيم وتستلزم رقابة بيروقراطية مشددة.</p>

                <h3>مسار تشكل ثقافة المنظمة واستمرارها</h3>
                <p>تنبثق الثقافة أصلاً من <strong>فلسفة المؤسسين</strong> ورؤيتهم الأولى، ثم تستمر عبر:</p>
                <ul>
                  <li><strong>معايير التوظيف الدقيقة:</strong> استقطاب الكفاءات المتوافقة مع هوية المنظمة.</li>
                  <li><strong>أفعال الإدارة العليا:</strong> القدوة القيادية الحية في تجسيد المبادئ.</li>
                  <li><strong>التنشئة التنظيمية (Socialization):</strong> دمج الموظفين الجدد عبر القصص (Stories)، الطقوس والاحتفالات (Rituals)، الرموز المادية (Material Symbols)، والمصطلحات واللغة المهنية الخاصة (Language).</li>
                </ul>
              `
            }
          ]
        },
        {
          id: "mgmt_ch4",
          chapterNumber: 4,
          title: "الفصل الرابع: ممارسات الإدارة في السياق العالمي",
          shortTitle: "الفصل 4: الإدارة في السياق العالمي",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم والمواقف العالمية الثلاثة",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل الرابع: ممارسات الإدارة في السياق العالمي</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>التمييز بين التوجهات والمواقف العالمية المختلفة تجاه إدارة الأعمال الدولية <span class="term-en">Ethnocentric, polycentric, geocentric</span>.</li>
                  <li>مناقشة أهمية الاتفاقيات والتحالفات التجارية الإقليمية والمنظمات العالمية.</li>
                  <li>تصنيف أشكال المنظمات الدولية واستراتيجيات التوسع والدخول في الأسواق العالمية <span class="term-en">Going global structures</span>.</li>
                  <li>شرح التحديات الثقافية والسياسية التي تجابه المدير العالمي (أبعاد هوفستيد ودراسات جلوب).</li>
                </ol>

                <h3>4.1 المنظور العالمي وتحديات الانغلاق الثقافي</h3>
                <p>يواجه المدير المعاصر خطورة الانكفاء المحلي والتعصب الضيق <span class="term-en">Parochialism</span>؛ وهو عجز المرء عن إدراك الفروق بين الثقافات، واعتقاده بأن طرائق بلده هي النموذج الأوحد الصالح للتطبيق. ولتجاوز هذه الآفة، يتمايز القادة في ثلاثة مواقف عالمية:</p>
                <ul>
                  <li><strong>الموقف المتمركز حول الوطن الأم (Ethnocentric Attitude):</strong> الاعتقاد بأن أفضل أساليب العمل وممارسات الإدارة هي تلك المطبقة في البلد الأم للمنظمة، مما يقود إلى فرض السياسات مركزياً وتجاهل الكفاءات المحلية.</li>
                  <li><strong>الموقف المتمركز حول البلد المضيف (Polycentric Attitude):</strong> الاعتقاد بأن مديري البلد المضيف هم الأقدر على استيعاب خصوصية أسواقهم، مما يمنح الفروع الخارجية استقلالية واسعة قد تعزلها عن المنظمة الأم.</li>
                  <li><strong>المنظور العالمي الشامل (Geocentric Attitude):</strong> توجه قيادي كوني ينشد توظيف أفضل الأساليب واستقطاب أميز الكفاءات من شتى بقاع الأرض، متجاوزاً الانحياز الجغرافي، وهو التوجه الأشد نجاحاً لبناء ميزة تنافسية دولية.</li>
                </ul>
              `
            },
            {
              pageNumber: 2,
              subHeader: "4.2 البيئة التجارية والتحالفات الاقتصادية الدولية",
              htmlContent: `
                <h2>4.2 البيئة الاقتصادية والتجارية العالمية</h2>
                <p>تنتظم التجارة الدولية في أطر وتحالفات إقليمية كبرى تستهدف تحرير حركة السلع والخدمات ورؤوس الأموال:</p>
                <ul>
                  <li><strong>الاتحاد الأوروبي (European Union - EU):</strong> يشكل سوقاً موحدة ذات عملة مشتركة وقوانين متكاملة.</li>
                  <li><strong>اتفاقية الولايات المتحدة والمكسيك وكندا (USMCA):</strong> تيسر التبادل التجاري عبر أمريكا الشمالية.</li>
                  <li><strong>رابطة دول جنوب شرق آسيا (ASEAN):</strong> تكتل اقتصادي متسارع النمو في آسيا.</li>
                </ul>

                <h3>المؤسسات الحاكمة للتجارة الدولية</h3>
                <p>تسند النظام التجاري الدولي مؤسسات حاكمة تضبط قواعد المنافسة وتيسر التعاون؛ كـ <strong>منظمة التجارة العالمية (WTO)</strong> المعنية بفض المنازعات وتنسيق التعرفة الجمركية، و<strong>صندوق النقد الدولي (IMF)</strong> والبنك الدولي المعنيان باستقرار النظام المالي وتقديم الدعم التنموي ومكافحة الأزمات النقدية.</p>
              `
            },
            {
              pageNumber: 3,
              subHeader: "4.3 هياكل المنظمات الدولية واستراتيجيات التوسع",
              htmlContent: `
                <h2>4.3 هياكل المنظمات الدولية واستراتيجيات التوسع</h2>
                <p>تتنوع الشركات الدولية في بنيتها التنظيمية بحسب درجة تكاملها العالمي واستجابتها المحلية:</p>
                <ul>
                  <li><strong>الشركة متعددة الجنسيات (Multinational Corporation - MNC):</strong> أي منشأة تمارس عمليات تجارية واستثمارية واسعة في بلدان متعددة.</li>
                  <li><strong>الشركة متعددة الأوطان (Multidomestic):</strong> تمنح الإدارة في كل بلد مضيف حرية تفصيل المنتجات والسياسات لتلائم السوق المحلي (موقف بوليسنتري).</li>
                  <li><strong>الشركة العالمية (Global Company):</strong> تركز صناعة القرار وتوحيد العمليات في مقرها المركزي بالبلد الأم لتحقيق وفورات الحجم (موقف إثنوسنتري).</li>
                  <li><strong>المنظمة العابرة للأوطان (Transnational / Borderless):</strong> كيان كوني يلغي الحواجز الجغرافية وينسق شبكة فروعه حول العالم بمرونة عالية تجمع بين الكفاءة العالمية والاستجابة المحلية (منظور جيوسنتري).</li>
                </ul>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (4-2): تدرج استراتيجيات التوسع في الأسواق الدولية</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-4-2')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="structured-diagram-grid">
                    <div class="structured-card">
                      <h4>استثمار أولي منخفض</h4>
                      <p>المصادر والتوريد العالمي (Global Sourcing) والتصدير والاستيراد (Exporting & Importing).</p>
                    </div>
                    <div class="structured-card">
                      <h4>اتفاقيات تعاقدية</h4>
                      <p>الترخيص والامتياز التجاري (Licensing & Franchising) لاستخدام العلامات والتقنيات.</p>
                    </div>
                    <div class="structured-card">
                      <h4>استثمار مشترك</h4>
                      <p>التحالفات الاستراتيجية والمشاريع المشتركة (Strategic Alliances & Joint Ventures).</p>
                    </div>
                    <div class="structured-card">
                      <h4>استثمار مباشر عالي</h4>
                      <p>الشركات التابعة الأجنبية المملوكة بالكامل (Foreign Subsidiaries) بأعلى درجات التحكم والمخاطرة.</p>
                    </div>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 4,
              subHeader: "4.4 أبعاد جيرت هوفستيد لتقييم الثقافات الوطنية",
              htmlContent: `
                <h2>4.4 أبعاد جيرت هوفستيد للثقافات الوطنية (Hofstede)</h2>
                <p>تمثل البيئة الثقافية التحدي الأعمق للمدير الدولي؛ وحدد جيرت هوفستيد خمسة أبعاد تميز البنية القيمية للشعوب:</p>
                <ol>
                  <li><strong>مسافة القوة (Power Distance):</strong> درجة قبول المجتمع للتوزيع غير المتكافئ للسلطة والثروة والامتثال للتراتبية الهرمية.</li>
                  <li><strong>الفردية مقابل الجماعية (Individualism vs. Collectivism):</strong> تركيز المجتمع على استقلال الفرد وحقوقه الذاتية مقابل الولاء للجماعة والأسرة والتضامن المشترك.</li>
                  <li><strong>الإنجاز مقابل الرعاية (Achievement vs. Nurturing):</strong> إعلاء قيم الحزم والمادية والمنافسة مقابل إعلاء قيم التعاطف والعلاقات الإنسانية وجودة الحياة.</li>
                  <li><strong>تجنب عدم اليقين (Uncertainty Avoidance):</strong> مدى انزعاج المجتمع من الغموض وميله لفرض قواعد صارمة لتقليل المخاطر.</li>
                  <li><strong>التوجه طويل المدى مقابل قصير المدى (Long-Term Orientation):</strong> التخطيط المستقبلي والادخار الصبور مقابل الاقتصار على المكاسب السريعة الحاضرة.</li>
                </ol>
              `
            },
            {
              pageNumber: 5,
              subHeader: "دراسات GLOBE • العقلية العالمية للمدير المعاصر",
              htmlContent: `
                <h2>برنامج دراسات GLOBE والعقلية العالمية</h2>
                <p>وسع برنامج أبحاث جلوب <span class="term-en">GLOBE Studies</span> أبعاد هوفستيد ليشمل 9 محددات ثقافية تفصيلية لقيادة الكوادر متعددة الثقافات.</p>

                <h3>متطلبات النجاح للمدير العالمي المعاصر</h3>
                <p>يقتضي النجاح الدولي امتلاك <strong>الذكاء الثقافي (Cultural Intelligence)</strong> وبناء <strong>العقلية العالمية (The Global Mindset)</strong> المرتكزة على ثلاثة أبعاد:</p>
                
                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #1e3a8a;">
                    <h4>1. رأس المال الفكري (Intellectual)</h4>
                    <p>المعرفة المتعمقة بقطاع الأعمال العالمي والقدرة على استيعاب تشابك الأسواق المعقدة وفهم التحولات الدولية.</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #0d9488;">
                    <h4>2. رأس المال النفسي (Psychological)</h4>
                    <p>الانفتاح الذهني على التنوع الثقافي، والشغف باكتشاف البيئات الجديدة، والجرأة في تقبل التغيير.</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #d97706;">
                    <h4>3. رأس المال الاجتماعي (Social)</h4>
                    <p>القدرة الدبلوماسية على بناء شبكات التعاون وبناء جسور الثقة مع أفراد ينتمون إلى خلفيات ثقافية متباينة.</p>
                  </div>
                </div>
              `
            }
          ]
        },
        {
          id: "mgmt_ch5",
          chapterNumber: 5,
          title: "الفصل الخامس: إدارة التنوع وتكافؤ الفرص",
          shortTitle: "الفصل 5: إدارة التنوع",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم والتنوع السطحي والعميق",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل الخامس: إدارة التنوع وتكافؤ الفرص</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>تعريف تنوع القوى العاملة والتمييز بين التنوع السطحي والتنوع العميق <span class="term-en">Workforce diversity levels</span>.</li>
                  <li>شرح الأسباب التي تجعل إدارة التنوع ركيزة أساسية لنجاح المنظمات المعاصرة.</li>
                  <li>استعراض التحولات الديمغرافية وتصنيف أبعاد التنوع في بيئات العمل.</li>
                  <li>بيان التحديات والتحيزات التي تجابه المديرين في إدارة التنوع.</li>
                  <li>مناقشة المبادرات والبرامج التنظيمية الفعالة لإدارة التنوع وترسيخ تكافؤ الفرص.</li>
                </ol>

                <h3>5.1 مفهوم تنوع القوى العاملة: التنوع السطحي والعميق</h3>
                <p>يقصد بتنوع القوى العاملة <span class="term-en">Workforce Diversity</span> مجمل السبل التي يختلف بها الأفراد داخل المنظمة عن بعضهم بعضاً وأوجه الشبه التي تجمع بينهم؛ وينتظم هذا التباين في مستويين متمايزين:</p>
                <ul>
                  <li><strong>التنوع السطحي (Surface-Level Diversity):</strong> الفروق الديمغرافية المادية الظاهرة للعيان، كالعمر والجنس والعرق والسمات البدنية. وتكمن خطورته في استحثاث التنميط الذهني والأحكام المسبقة السريعة، غير أن أثره يتراجع مع تعمق معرفة العاملين ببعضهم.</li>
                  <li><strong>التنوع العميق (Deep-Level Diversity):</strong> الفروق غير المرئية في المنظومات القيمية، والمعتقدات الفكرية، وسمات الشخصية، وتفضيلات إنجاز العمل. وهو المحرك الأقوى لسلوك الموظف وأدائه وتفاعله الجماعي على المدى الطويل.</li>
                </ul>

                <div class="exhibit-container">
                  <div class="exhibit-title">
                    <span>شكل (5-1): مستويات التنوع في بيئة العمل Surface vs. Deep Level</span>
                    <button class="btn-zoom-diagram" onclick="zoomDiagram('svg-exhibit-5-1')">🔍 تكبير الشكل</button>
                  </div>
                  <div class="structured-diagram-grid">
                    <div class="structured-card" style="border-right: 4px solid #2563eb;">
                      <h4>التنوع السطحي (Surface-Level)</h4>
                      <p>
                        • <strong>الخصائص:</strong> فروق بيولوجية ومادية ظاهرة (السن، الجنس، الإثنية، القدرات البدنية).<br>
                        • <strong>المستوى:</strong> المظهر الخارجي والصفات المرئية التي يسهل رصدها.
                      </p>
                    </div>
                    <div class="structured-card" style="border-right: 4px solid #059669;">
                      <h4>التنوع العميق (Deep-Level)</h4>
                      <p>
                        • <strong>الخصائص:</strong> فروق باطنة جوهرية (القيم، المعتقدات، أساليب التفكير، سمات الشخصية).<br>
                        • <strong>المستوى:</strong> الهوية الفكرية والنفسية الحاكمة للتعاون والإنتاجية.
                      </p>
                    </div>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 2,
              subHeader: "5.2 منافع إدارة التنوع وعوائدها الكبرى",
              htmlContent: `
                <h2>5.2 مسوغات العناية بإدارة التنوع ومنافعها</h2>
                <p>تتجاوز العناية بالتنوع مجرد الامتثال للضوابط القانونية؛ إذ تثمر عوائد تنظيمية كبرى تنتظم في ثلاثة مساقات رئيسة:</p>
                
                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #1e3a8a;">
                    <h4>1. إدارة الكوادر والأفراد (People Management)</h4>
                    <p>
                      • استقطاب أميز الكفاءات والخبرات المتنوعة والاحتفاظ بها.<br>
                      • تحسين التماسك والروح المعنوية للفرق وتقليل معدلات التسرب الوظيفي.
                    </p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #0d9488;">
                    <h4>2. الأداء التنظيمي والمالي (Organizational Performance)</h4>
                    <p>
                      • تقليص تكاليف الغياب ودوران العمل والدعاوى القضائية.<br>
                      • الارتقاء بجودة حل المشكلات المعقدة واستحضار زوايا نظر متعددة.
                    </p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #d97706;">
                    <h4>3. المزايا الاستراتيجية (Strategic Benefits)</h4>
                    <p>
                      • استيعاب شرائح المستهلكين المتنوعة في الأسواق المحلية والدولية.<br>
                      • إشعال جذوة الابتكار وتوليد خدمات ومنتجات ريادية تحقق ميزة تنافسية.
                    </p>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 3,
              subHeader: "5.3 أبعاد التنوع في بيئات العمل المعاصرة",
              htmlContent: `
                <h2>5.3 أبعاد التنوع في بيئات العمل المعاصرة</h2>
                <p>تتمثل أبرز أبعاد التنوع التي تفرض على المنظمات استيعاب أطياف واسعة من التباين في الآتي:</p>
                <ul>
                  <li><strong>العمر وتعدد الأجيال (Age & Generations):</strong> تجاور جيل طفرة المواليد، والجيل X، وجيل الألفية، والجيل Z، والمواءمة بين الخبرة وتطلعات الشباب للتقنية.</li>
                  <li><strong>الجنس وتمكين الكفاءات (Gender Diversity):</strong> تزايد دور المرأة في القيادة وصياغة سياسات تضمن عدالة الأجور وتكافؤ الترقية والموازنة الأسرية.</li>
                  <li><strong>العرق والإثنية (Race & Ethnicity):</strong> إرساء بيئة تنفي التفضيل القائم على الأصل وتوفر مسارات تطوير وظيفي عادلة للجميع.</li>
                  <li><strong>القدرات والاحتياجات الجسدية (Disabilities):</strong> توفير الترتيبات التيسيرية المعقولة لتمكين أصحاب الهمم من المشاركة الفعالة.</li>
                  <li><strong>المعتقدات الدينية والثقافية (Religion):</strong> احترام الشعائر والخصوصيات العقائدية ومراعاة المواسم والمناسبات الخاصة بالعاملين.</li>
                  <li><strong>التنوع المعرفي وأساليب التفكير (Cognitive Diversity):</strong> تباين الخلفيات التعليمية والخبرات التخصصية وأنماط معالجة البيانات.</li>
                </ul>
              `
            },
            {
              pageNumber: 4,
              subHeader: "5.4 التحديات والعوائق والتحيزات",
              htmlContent: `
                <h2>5.4 التحديات والتحيزات التي تجابه إدارة التنوع</h2>
                <p>تعترض مسيرة التنوع عوائق نفسية وسلوكية متجذرة تتطلب حزماً قيادياً لتفكيكها:</p>
                <ul>
                  <li><strong>التحيز الشخصي (Personal Bias):</strong>
                    <ul>
                      <li><strong>الحكم المسبق والتحامل (Prejudice):</strong> رأي باطن سلبي غير مبرر تجاه جماعة بعينها.</li>
                      <li><strong>التنميط والقولبة (Stereotyping):</strong> إصدار أحكام عامة مجردة على فرد استناداً لتصوره عن الفئة التي ينتمي إليها.</li>
                      <li><strong>التمييز السلوكي (Discrimination):</strong> الممارسة الإجرائية الفعلية التي تعامل أفراداً بدون إنصاف مهني.</li>
                    </ul>
                  </li>
                  <li><strong>ظاهرة السقف الزجاجي (The Glass Ceiling):</strong> استعارة تعبر عن حاجز خفي غير مرئي يمنع النساء والأقليات المؤهلة من الترقي إلى أعلى المراتب القيادية في الهرم الإداري.</li>
                </ul>

                <div class="highlight-card" style="border-right-color: #ef4444;">
                  <p style="margin:0;"><strong>صور التمييز الشائعة:</strong> السياسات التمييزية، الترهيب والمضايقة، الاستهزاء والسخرية، الإقصاء والعزل المهني، والفظاظة في التفاعل اليومي.</p>
                </div>
              `
            },
            {
              pageNumber: 5,
              subHeader: "5.5 المبادرات والبرامج التنظيمية لإدارة التنوع",
              htmlContent: `
                <h2>5.5 المبادرات والبرامج التنظيمية لإدارة التنوع</h2>
                <p>يستلزم النجاح في احتضان التنوع منظومة متكاملة من البرامج والسياسات التي ترعاها القيادة التنفيذية:</p>
                <ol>
                  <li><strong>الامتثال للتشريعات وتكافؤ الفرص (Legal Compliance & EEO):</strong> الالتزام الصارم بقوانين العمل المحرمة للتمييز.</li>
                  <li><strong>التزام الإدارة العليا والقدوة القيادية (Top Management Commitment):</strong> إدراج التنوع في الخطط الاستراتيجية العامة ومساءلة المديرين عن تحقيق مؤشراته.</li>
                  <li><strong>برامج التوجيه والإرشاد المهني (Mentoring Programs):</strong> ربط الكوادر الصاعدة بقادة متمرسين يقدمون لهم المشورة ويدعمون نموهم.</li>
                  <li><strong>التدريب على مهارات التنوع (Diversity Skills Training):</strong> برامج تركز على بناء الوعي بالتنوع واكتساب مهارات التواصل الفعال وإدارة الاختلاف.</li>
                  <li><strong>مجموعات الموارد ومساندة الموظفين (Employee Resource Groups - ERGs):</strong> شبكات تطوعية داخل المنشأة توفر الدعم المهني وتقدم الرؤى الاستشارية للإدارة العليا.</li>
                </ol>
              `
            }
          ]
        },
        {
          id: "mgmt_ch6",
          chapterNumber: 6,
          title: "الفصل السادس: المسؤولية المجتمعية وأخلاقيات الأعمال",
          shortTitle: "الفصل 6: المسؤولية والأخلاق",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم ومفهوم المسؤولية المجتمعية",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة</span>
                  <h1>الفصل السادس: المسؤولية المجتمعية وأخلاقيات الأعمال</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>بيان مفهوم المسؤولية المجتمعية والمفاضلة بين المنظور الكلاسيكي والاجتماعي والاقتصادي.</li>
                  <li>التمييز بين الالتزام الاجتماعي والاستجابة الاجتماعية والمسؤولية الاجتماعية.</li>
                  <li>شرح مفهوم الإدارة الخضراء وتحديد مستويات تبني المنظمات للممارسات المستدامة.</li>
                  <li>مناقشة العوامل المتشابكة المحددة للسلوك الأخلاقي وغير الأخلاقي للمديرين.</li>
                  <li>استعراض التدابير والبرامج المؤسسية لترسيخ النزاهة وحوكمة السلوك الأخلاقي.</li>
                </ol>

                <h3>6.1 المسؤولية المجتمعية: المنظور الكلاسيكي مقابل الاجتماعي والاقتصادي</h3>
                <ul>
                  <li><strong>المنظور الكلاسيكي الاقتصادي المحض (Classical View):</strong> يتزعمه ميلتون فريدمان (Milton Friedman)؛ يرى أن المسؤولية الوحيدة للإدارة هي تعظيم أرباح المساهمين في إطار القوانين، وإنفاق أموال المنشأة في مشاريع مجتمعية هدر لأموال الملاك.</li>
                  <li><strong>المنظور الاجتماعي والاقتصادي الشامل (Socioeconomic View):</strong> يرى أن المنظمة مؤسسة اجتماعية تستمد ترخيصها ومواردها من المجتمع، ويمتد واجبها لحماية رفاهية المجتمع وصيانة البيئة؛ إذ لا تزدهر المنظمة في مجتمع عليل.</li>
                </ul>
              `
            },
            {
              pageNumber: 2,
              subHeader: "6.2 التدرج من الالتزام إلى المسؤولية الاجتماعية",
              htmlContent: `
                <h2>6.2 التدرج من الالتزام الاجتماعي إلى المسؤولية الاجتماعية</h2>
                <p>ينتظم انخراط المنشأة في قضايا محيطها في ثلاثة مستويات متصاعدة:</p>
                
                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #64748b;">
                    <h4>1. الالتزام الاجتماعي (Social Obligation)</h4>
                    <p>الاقتصار على تلبية الواجبات القانونية والاقتصادية المفروضة حصراً دون أي مبادرة تطوعية إضافية (يعبر عن المنظور الكلاسيكي).</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #0284c7;">
                    <h4>2. الاستجابة الاجتماعية (Social Responsiveness)</h4>
                    <p>تفاعل المنظمة العملي والسريع مع الضغوط والمطالب الاجتماعية الظاهرة وتلبيتها استجابة للحاجات الشعبية الملحة.</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #059669;">
                    <h4>3. المسؤولية الاجتماعية (Social Responsibility)</h4>
                    <p>التزام أخلاقي ذاتي مستقر ومستمر يتجاوز حدود النصوص القانونية وضغوط السوق الفورية لفعل الخير وتحقيق النفع المجتمعي المستدام.</p>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 3,
              subHeader: "6.3 الإدارة الخضراء ومداخلها الأربعة",
              htmlContent: `
                <h2>6.3 الإدارة الخضراء والاستدامة البيئية</h2>
                <p>تشير الإدارة الخضراء <span class="term-en">Green Management</span> إلى إدراك عمق التأثير المتبادل بين المنظمة والبيئة وتضمين حمايتها في صلب القرارات. وتتدرج المنظمات في هذا المسار وفق أربعة مداخل:</p>
                <ol>
                  <li><strong>مدخل الامتثال القانوني / الأخضر الفاتح (Legal Approach):</strong> الاكتفاء بالانصياع التام للقوانين واللوائح البيئية المفروضة رسمياً.</li>
                  <li><strong>مدخل السوق (Market Approach):</strong> الاستجابة للتفضيلات البيئية للعملاء وتوفير منتجات صديقة للبيئة.</li>
                  <li><strong>مدخل أصحاب المصلحة (Stakeholder Approach):</strong> تلبية التطلعات البيئية للأطراف المتعددة ذات المصلحة (الموظفين، الموردين، المجتمع).</li>
                  <li><strong>مدخل النشاط البيئي الشامل / الأخضر الداكن (Activist Approach):</strong> أعلى مراتب الالتزام البيئي؛ مبادرة المنشأة بالابتكار الاستباقي لصيانة موارد الأرض والاستدامة الكلية.</li>
                </ol>
              `
            },
            {
              pageNumber: 4,
              subHeader: "6.4 العوامل المحددة للسلوك الأخلاقي • مراحل كولبرج",
              htmlContent: `
                <h2>6.4 محددات السلوك الأخلاقي ونموذج لورانس كولبرج</h2>
                <p>تتشكل أخلاقيات المدير عبر تفاعل معقد بين عدة عوامل:</p>
                <ul>
                  <li><strong>مراحل التطور الأخلاقي لكولبرج (Kohlberg):</strong>
                    <ol>
                      <li><em>المستوى قبل التقليدي:</em> تجنب العقاب الشخصي أو السعي وراء المكافأة المادية الذاتية.</li>
                      <li><em>المستوى التقليدي:</em> تلبية توقعات الأقران والأسرة والالتزام بالقوانين وحفظ النظام السائد.</li>
                      <li><em>المستوى القائم على المبادئ:</em> الاحتكام إلى مبادئ العدالة الكونية المستقلة وتقديم الحقوق الإنسانية على اللوائح الصامتة.</li>
                    </ol>
                  </li>
                  <li><strong>السمات الفردية:</strong> المنظومة القيمية، وقوة الأنا (صلابة المعتقد ومقاومة الضغوط)، وموضع الضبط (الداخلي المعتمد على الذات مقابل الخارجي المحيل للحظ).</li>
                  <li><strong>المتغيرات التنظيمية:</strong> الهيكل، وثقافة النزاهة، وحدة المشكلة الأخلاقية (جسامة الضرر والإجماع على قبح الفعل).</li>
                </ul>
              `
            },
            {
              pageNumber: 5,
              subHeader: "6.5 التدابير والبرامج المؤسسية لترسيخ النزاهة",
              htmlContent: `
                <h2>6.5 التدابير المؤسسية الشاملة لترسيخ النزاهة</h2>
                <p>تؤسس المنظمات الرائدة منظومة متكاملة من الضمانات لحماية النزاهة المؤسسية:</p>
                <ul>
                  <li><strong>التوظيف والانتقاء الدقيق:</strong> استخدام اختبارات النزاهة لاستبعاد الكوادر ذات الاختلالات القيمية.</li>
                  <li><strong>مدونات قواعد السلوك الأخلاقي (Codes of Ethics):</strong> ميثاق رسمي صريح يوضح القيم الجوهرية والممارسات المحظورة.</li>
                  <li><strong>القدوة الأخلاقية في الإدارة العليا:</strong> التزام القيادات التنفيذية بالصدق والشفافية وتجسيد المبادئ.</li>
                  <li><strong>واقعية الأهداف والتقييم العادل:</strong> تجنب الأهداف التعجيزية التي تدفع للتحايل ومكافأة السلوك المستقيم.</li>
                  <li><strong>التدريب الأخلاقي المستمر:</strong> ورش عمل دورية لتفكيك المعضلات وتطبيق معايير الشرف المهني.</li>
                  <li><strong>التدقيق الاجتماعي المستقل:</strong> تقييم مهني محايد لمدى الامتثال لمعايير الحوكمة والمسؤولية.</li>
                  <li><strong>آليات حماية المبلغين عن المخالفات (Whistle-Blowers):</strong> قنوات اتصال سرية وآمنة للإبلاغ عن الفساد دون خوف من الانتقام.</li>
                </ul>
              `
            }
          ]
        },
        {
          id: "mgmt_ch7",
          chapterNumber: 7,
          title: "الفصل السابع: إدارة التغيير والابتكار المؤسسي",
          shortTitle: "الفصل 7: التغيير والابتكار",
          pages: [
            {
              pageNumber: 1,
              subHeader: "مخرجات التعلم وحتمية التغيير وقواه",
              htmlContent: `
                <div style="text-align:center; margin:1.2rem 0 2rem 0;">
                  <span class="chapter-badge">الصياغة البيانية المعتمدة • ختام الجزء الأول</span>
                  <h1>الفصل السابع: إدارة التغيير والابتكار المؤسسي</h1>
                  <p style="text-align:center; color:var(--text-muted); font-size:0.95rem;">
                    ستيفن روبنز وماري كولتر <span class="term-en">Stephen P. Robbins & Mary Coulter</span>
                  </p>
                </div>

                <h2>مخرجات التعلم المستهدفة <span class="term-en">Learning Outcomes</span></h2>
                <ol>
                  <li>مقارنة استعارتي التغيير التنظيمي وبيان قوى التغيير الدافعة.</li>
                  <li>تصنيف مجالات التغيير التنظيمي وأدوات التطوير المؤسسي (OD).</li>
                  <li>شرح أسباب مقاومة التغيير واستعراض التقنيات القيادية الست لتقليصها.</li>
                  <li>مناقشة مظاهر الإجهاد وضغوط العمل وأساليب إدارتها.</li>
                  <li>التمييز بين الإبداع والابتكار واستعراض المتغيرات المحفزة للابتكار المؤسسي.</li>
                </ol>

                <h3>7.1 حتمية التغيير وقواه المحركة</h3>
                <p>التغيير التنظيمي <span class="term-en">Organizational Change</span> أي تعديل يمس أهداف المنظمة أو هياكلها أو تقنياتها أو كوادرها. ويقوده <strong>وكيل التغيير (Change Agent)</strong> بتأثير قوى متداخلة:</p>
                <ul>
                  <li><strong>قوى خارجية:</strong> تبدل رغبات المستهلكين، القوانين الجديدة، الذكاء الاصطناعي والأتمتة، والتقلبات الاقتصادية.</li>
                  <li><strong>قوى داخلية:</strong> تعديل الاستراتيجية، إدخال معدات جديدة، تبدل مواقف العاملين، ومشكلات الأداء الداخلي.</li>
                </ul>
              `
            },
            {
              pageNumber: 2,
              subHeader: "7.2 استعارات التغيير: المياه الهادئة مقابل النهر الجارف",
              htmlContent: `
                <h2>7.2 استعارتان لتفسير مسار التغيير التنظيمي</h2>
                
                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #2563eb;">
                    <h4>استعارة المياه الهادئة (Calm Waters)</h4>
                    <p>
                      تشبه المنظمة بسفينة تبحر في بحر هادئ يعترضها عارض مؤقت؛ ويعبر عنها <strong>نموذج كورت ليفين (Lewin) ثلاثي المراحل:</strong><br>
                      1. <strong>إذابة الجليد (Unfreezing):</strong> تهيئة المؤسسة عبر تقليص القوى المعيقة وزيادة القوى الدافعة.<br>
                      2. <strong>تنفيذ التغيير (Changing):</strong> التحرك العملي نحو الوضع الجديد.<br>
                      3. <strong>إعادة التجميد (Refreezing):</strong> تثبيت الأوضاع المستحدثة في الثقافة وأنظمة الحوافز.
                    </p>
                  </div>

                  <div class="structured-card" style="border-right: 4px solid #dc2626;">
                    <h4>استعارة منحدرات النهر الجارف (White-Water Rapids)</h4>
                    <p>
                      تشبه المنظمة بقارب يخوض نهراً هائجاً تتوالى فيه الصخور والمفاجآت دون توقف.<br>
                      <strong>الواقع المعاصر:</strong> التغيير حالة تشغيلية دائمة ومستمرة في بيئة مضطربة، مما يستوجب المرونة القصوى وسرعة التكيف والتخلي الفوري عن القديم.
                    </p>
                  </div>
                </div>
              `
            },
            {
              pageNumber: 3,
              subHeader: "7.3 مجالات التغيير الثلاثة والتطوير التنظيمي (OD)",
              htmlContent: `
                <h2>7.3 مجالات التغيير التنظيمي وأدوات التطوير المؤسسي</h2>
                <p>ينتظم التغيير في ثلاثة أبعاد رئيسة مترابطة:</p>
                <ol>
                  <li><strong>تغيير الهيكل والأنظمة (Structure):</strong> خطوط السلطة، نطاق الإشراف، الوصف الوظيفي، وتفكيك البيروقراطية لصالح الفرق المرنة.</li>
                  <li><strong>تغيير التقنية والعمليات (Technology):</strong> الأتمتة، برمجيات الموارد المتكاملة، والتحول الرقمي.</li>
                  <li><strong>تغيير الأفراد والسلوكيات (التطوير التنظيمي OD):</strong> تعديل الاتجاهات النفسية وتطوير مهارات التواصل عبر:
                    <ul>
                      <li><em>بناء فرق العمل (Team Building):</em> تعزيز الثقة وروح التعاضد المشترك.</li>
                      <li><em>الاستشارة الإجرائية (Process Consultation):</em> تحليل مسارات العمل وعلاج خلل التنسيق بمستشار خارجي.</li>
                      <li><em>المسح الاستقصائي (Survey Feedback):</em> استطلاع اتجاهات الكوادر وتشخيص الثغرات بشفافية.</li>
                    </ul>
                  </li>
                </ol>
              `
            },
            {
              pageNumber: 4,
              subHeader: "7.4 مقاومة التغيير والتقنيات القيادية الست لتقليصها",
              htmlContent: `
                <h2>7.4 مقاومة التغيير والتقنيات القيادية لتقليصها</h2>
                <p>ينشأ اعتراض العاملين من: الخوف من المجهول، سلطان العادة المستقرة، الخوف من الخسارة الشخصية (النفوذ أو الميزات)، أو الاعتقاد بعدم جدوى التغيير للمنظمة.</p>
                
                <h3>التقنيات القيادية الست لإدارة المقاومة:</h3>
                <ol>
                  <li><strong>التعليم والتواصل (Education & Communication):</strong> إيضاح منطق التغيير وتبديد المخاوف متى كان الرفض ناشئاً عن نقص المعلومات.</li>
                  <li><strong>المشاركة والتمكين (Participation):</strong> إشراك المعارضين في صناعة القرار لتوليد شعور بملكية المبادرة.</li>
                  <li><strong>التيسير والدعم (Facilitation & Support):</strong> تقديم التدريب والدعم الإرشادي والنفسي لتخفيف القلق.</li>
                  <li><strong>التفاوض والاتفاق (Negotiation):</strong> تقديم مقايضة ومزايا عادلة للأطراف المتأثرة لقاء تعاونهم.</li>
                  <li><strong>المناورة والاستقطاب (Manipulation & Co-optation):</strong> الاستقطاب السريع وتعيين قادة المعارضة في مواقع رمزية (مع الحذر من فقدان الثقة).</li>
                  <li><strong>الإكراه الصريح (Coercion):</strong> الحسم الإلزامي بالقوة والتلويح بالعقوبات في الأزمات الحادة الطارئة فقط.</li>
                </ol>
              `
            },
            {
              pageNumber: 5,
              subHeader: "7.5 ضغوط العمل • 7.6 تحفيز الإبداع والابتكار المؤسسي",
              htmlContent: `
                <h2>7.5 إدارة ضغوط العمل والإجهاد المهني</h2>
                <p>ينشأ الإجهاد <span class="term-en">Stress</span> من صراع الأدوار (Role Conflict)، أو غموض الدور (Ambiguity)، أو العبء الزائد (Overload). وتتعامل معه الإدارة عبر التصميم المتوازن للمهام، وبرامج عافية الموظفين (EAPs)، وموازنة العمل مع الحياة الشخصية.</p>

                <h2>7.6 تحفيز الإبداع والابتكار المؤسسي</h2>
                <p><strong>الإبداع (Creativity):</strong> القدرة على توليد أفكار جديدة فريدة.<br>
                <strong>الابتكار (Innovation):</strong> المسار العملي الذي يحول الفكرة الإبداعية إلى منتج أو خدمة ذات قيمة ملموسة.</p>

                <div class="structured-diagram-grid">
                  <div class="structured-card" style="border-right: 4px solid #2563eb;">
                    <h4>متغيرات هيكلية (Structural)</h4>
                    <p>هياكل عضوية مرنة، وفرة الموارد المخصصة للتجريب، وتواصل سلس بين القطاعات.</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #0d9488;">
                    <h4>متغيرات ثقافية (Cultural)</h4>
                    <p>تقبل الغموض، التسامح مع الأخطاء غير المقصودة، والتركيز على الغايات والمخرجات.</p>
                  </div>
                  <div class="structured-card" style="border-right: 4px solid #d97706;">
                    <h4>الموارد البشرية (HR)</h4>
                    <p>التدريب التوليدي، الأمان الوظيفي، وتكريم ورعاية أبطال الأفكار (Idea Champions).</p>
                  </div>
                </div>
              `
            }
          ]
        }
      ]
    }
  ]
};
/* ── مفاتيح التخزين ────────────────────────────────────────────────── */
const LIBRARY_KEY = 'library_data';
const VIEW_KEY = 'active_view';

/* ── حالة التطبيق (متغيرات عامة على مستوى الوحدة) ──────────────────── */
let libraryData = null;
let currentBook = null;
let currentChapter = null;
let currentPage = 1;
let totalPages = 5;
let currentZoomLevel = 1;
let newlyProcessedBookId = null;

let selectedQuizDifficulty = 'medium';
let selectedQuizCount = 5;
let aiChatHistory = [];
let currentFontSize = 16.5;

/* ── أدوات مساعدة ──────────────────────────────────────────────────── */
function showToast(message, iconSvg = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'app-toast';
  toast.innerHTML = `<span>${iconSvg || '✓'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/** تعقيم النصوص المستوردة قبل إدراجها في HTML (حماية من XSS) */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/* ── الحفظ والتحميل ────────────────────────────────────────────────── */
function saveLibrary() {
  LocalStore.set(LIBRARY_KEY, libraryData);
}

function savePrefs() {
  AppPersistence.saveUserPrefs({
    theme: document.body.getAttribute('data-theme') || 'light',
    fontFamily: currentFontFamily,
    fontSize: currentFontSize
  });
}

let currentFontFamily = 'IBM Plex Sans Arabic';

/* ── الكتب الإضافية (مجلد books/) ───────────────────────────────────── */
/* في النسخة المدمجة يملأ build.ps1 هذه المصفوفة بالكتب تلقائياً */

const EXTRA_BOOKS = [];

async function loadExtraBooks() {
  let extra = [];
  if (EXTRA_BOOKS && EXTRA_BOOKS.length) {
    /* النسخة المدمجة: الكتب مضمّنة داخل الملف */
    extra = EXTRA_BOOKS;
  } else {
    /* النسخة المعيارية: تحميل من مجلد books/ عبر الخادم */
    try {
      const res = await fetch('books/manifest.json', { cache: 'no-store' });
      if (res.ok) {
        const files = await res.json();
        for (const f of files) {
          try {
            const r = await fetch('books/' + f, { cache: 'no-store' });
            if (r.ok) extra.push(await r.json());
          } catch (e) {
            console.warn('[ExtraBooks] تعذر تحميل ' + f, e);
          }
        }
      }
    } catch (e) {
      console.warn('[ExtraBooks] لا يوجد مجلد كتب إضافية (books/)', e);
    }
  }
  /* دمج حسب id — لا نستبدل الكتب الموجودة ولا نكررها */
  let added = 0;
  for (const book of extra) {
    if (book && book.id && !libraryData.books.some(b => b.id === book.id)) {
      libraryData.books.push(book);
      added++;
    }
  }
  if (added > 0) {
    saveLibrary();
    console.info('[ExtraBooks] أُضيف ' + added + ' كتاباً من مجلد books/');
  }
}

async function loadLibrary() {
  const stored = LocalStore.get(LIBRARY_KEY);
  if (stored && stored.books && stored.books.length) {
    libraryData = stored;
  } else {
    /* ترحيل من مفتاح النسخة الأحادية القديم إن وُجد */
    let legacy = null;
    try { legacy = JSON.parse(localStorage.getItem('library_platform_store_v6')); } catch (e) { legacy = null; }
    if (legacy && legacy.books && legacy.books.length) {
      libraryData = legacy;
    } else {
      libraryData = JSON.parse(JSON.stringify(DEFAULT_LIBRARY_DATA));
    }
    saveLibrary();
  }

  /* دمج الكتب الإضافية من مجلد books/ (أو المضمّنة في النسخة المدمجة) */
  await loadExtraBooks();

  currentBook = libraryData.books.find(b => b.id === libraryData.activeBookId) || libraryData.books[0];
  currentChapter = currentBook.chapters.find(c => c.id === libraryData.activeChapterId) || currentBook.chapters[0];

  renderReader();
  renderHomeLibrary();
  renderLibraryBooksDrawer();
  renderChaptersDrawer();
}

/* ── التنقل بين الواجهات ───────────────────────────────────────────── */
function showView(viewId) {
  document.querySelectorAll('.app-view-container').forEach(c => c.classList.remove('active-view'));
  document.querySelectorAll('.btn-nav-tab').forEach(b => b.classList.remove('active'));

  const target = document.getElementById(`${viewId}-view-container`);
  const tabBtn = document.getElementById(`tab-nav-${viewId}`);

  if (target) target.classList.add('active-view');
  if (tabBtn) tabBtn.classList.add('active');

  const bookBadge = document.getElementById('reader-book-badge');
  const chPill = document.getElementById('active-chapter-pill');
  if (bookBadge && chPill) {
    if (viewId === 'reader') {
      bookBadge.style.display = 'inline-flex';
      chPill.style.display = 'inline-block';
    } else {
      bookBadge.style.display = 'none';
      chPill.style.display = 'none';
    }
  }

  if (viewId === 'home') {
    renderHomeLibrary();
  } else if (viewId === 'reader') {
    goToPage(currentPage);
  }
  LocalStore.set(VIEW_KEY, viewId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── القارئ ────────────────────────────────────────────────────────── */
function renderReader() {
  if (!currentBook || !currentChapter) return;

  document.getElementById('active-book-title').textContent = currentBook.title.split('(')[0].trim();
  document.getElementById('active-chapter-pill').textContent = (currentChapter.shortTitle || currentChapter.title) + ' ▾';

  const resumeBook = document.getElementById('resume-book-name');
  const resumeCh = document.getElementById('resume-chapter-name');
  if (resumeBook) resumeBook.textContent = currentBook.title;
  if (resumeCh) resumeCh.textContent = `${currentChapter.shortTitle || currentChapter.title} • ${currentChapter.pages.length} صفحات`;

  const container = document.getElementById('reader-dynamic-container');
  totalPages = currentChapter.pages.length;
  const chIdx = currentBook.chapters.findIndex(c => c.id === currentChapter.id);
  const nextChapter = (chIdx >= 0 && chIdx < currentBook.chapters.length - 1) ? currentBook.chapters[chIdx + 1] : null;

  let html = '';
  currentChapter.pages.forEach((page, idx) => {
    const pNum = page.pageNumber || (idx + 1);
    const isLastPage = (pNum === totalPages);

    html += `
      <article class="book-page ${pNum === currentPage ? 'active-page' : ''}" id="page-${pNum}" data-page="${pNum}">
        <div class="page-header-tag">
          <span>${escapeHtml(currentBook.title.split('(')[0].trim())}</span>
          <span>${escapeHtml(page.subHeader || '')}</span>
        </div>
        <div class="page-inner-body">
          ${page.htmlContent}
          ${isLastPage && nextChapter ? `
            <div style="margin-top: 2.2rem; padding: 1.1rem 1.3rem; background: linear-gradient(135deg, var(--accent-bg), var(--bg-surface)); border: 1.5px solid var(--border-strong); border-radius: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.8rem; box-shadow: var(--shadow-sm);">
              <div>
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent); display: block;">أتممت قراءة هذا القسم بحمد الله:</span>
                <strong style="font-size: 0.96rem; color: var(--text-main);">${escapeHtml(nextChapter.shortTitle || nextChapter.title)}</strong>
              </div>
              <button class="btn-text ai-btn-highlight" onclick="nextPage()">
                <span>الانتقال للفصل التالي</span>
                <span>←</span>
              </button>
            </div>
          ` : ''}
        </div>
        <div class="page-footer-tag">
          <span>الصفحة ${pNum} من ${totalPages}</span>
          <span>${escapeHtml(currentChapter.shortTitle || currentChapter.title)}</span>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
  updatePaginationControls();
  renderTOCDrawer();
}

function goToPage(pNum) {
  currentPage = Math.max(1, Math.min(totalPages, pNum));
  document.querySelectorAll('.book-page').forEach(p => {
    const num = parseInt(p.getAttribute('data-page'), 10);
    p.classList.toggle('active-page', num === currentPage);
  });
  updatePaginationControls();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  } else {
    if (!currentBook) return;
    const chIdx = currentBook.chapters.findIndex(c => c.id === currentChapter.id);
    if (chIdx >= 0 && chIdx < currentBook.chapters.length - 1) {
      const nextCh = currentBook.chapters[chIdx + 1];
      selectChapter(nextCh.id, 1);
      showToast(`الانتقال إلى: ${nextCh.shortTitle || nextCh.title}`, '📖');
    } else {
      showToast('أتممت فصول الجزء الأول كاملة بحمد الله', '🏁');
    }
  }
}

function prevPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  } else {
    if (!currentBook) return;
    const chIdx = currentBook.chapters.findIndex(c => c.id === currentChapter.id);
    if (chIdx > 0) {
      const prevCh = currentBook.chapters[chIdx - 1];
      const lastPageNum = prevCh.pages ? prevCh.pages.length : 1;
      selectChapter(prevCh.id, lastPageNum);
      showToast(`العودة إلى: ${prevCh.shortTitle || prevCh.title}`, '📖');
    } else {
      showToast('أنت في بداية المرجع الأكاديمي', '📌');
    }
  }
}

function onScrubberInput(v) { goToPage(parseInt(v, 10)); }

function updatePaginationControls() {
  ['r-page-curr', 'm-page-curr'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = currentPage;
  });
  ['r-page-total', 'm-page-total'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = totalPages;
  });

  const scrubber = document.getElementById('mobile-scrubber');
  if (scrubber) { scrubber.max = totalPages; scrubber.value = currentPage; }

  const chIdx = currentBook ? currentBook.chapters.findIndex(c => c.id === currentChapter.id) : 0;
  const isVeryFirst = (chIdx === 0 && currentPage === 1);
  const isVeryLast = (currentBook && chIdx === currentBook.chapters.length - 1 && currentPage === totalPages);

  const dPrev = document.getElementById('d-btn-prev');
  const dNext = document.getElementById('d-btn-next');
  const fPrev = document.getElementById('float-btn-prev');
  const fNext = document.getElementById('float-btn-next');
  if (dPrev) dPrev.disabled = isVeryFirst;
  if (dNext) dNext.disabled = isVeryLast;
  if (fPrev) fPrev.disabled = isVeryFirst;
  if (fNext) fNext.disabled = isVeryLast;

  const progress = (currentPage / totalPages) * 100;
  const progressEl = document.getElementById('reading-progress');
  if (progressEl) progressEl.style.width = `${progress}%`;

  const curPageData = currentChapter?.pages?.[currentPage - 1];
  const ribbonSub = document.getElementById('r-ribbon-sub');
  if (ribbonSub && curPageData) ribbonSub.textContent = curPageData.subHeader || '';
}

/* ── المكتبة الرئيسية ──────────────────────────────────────────────── */
function renderHomeLibrary() {
  const grid = document.getElementById('home-library-grid');
  if (!grid || !libraryData) return;

  let html = '';
  libraryData.books.forEach(b => {
    const isCur = (b.id === currentBook.id);
    html += `
      <div class="shelf-book-card ${isCur ? 'is-active-book' : ''}">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <span class="chapter-badge" style="margin:0;">الجزء الأول كاملاً (${b.chapters.length} أقسام)</span>
            ${isCur ? '<span style="font-size:0.75rem; font-weight:700; color:var(--accent);">الكتاب الحالي</span>' : ''}
          </div>
          <h3 style="margin:0 0 0.4rem 0; font-size:1.15rem; color:var(--accent);">${escapeHtml(b.title)}</h3>
          <p style="margin:0 0 0.6rem 0; font-size:0.82rem; color:var(--text-muted);">${escapeHtml(b.author || '')}</p>
          <p style="margin:0 0 1rem 0; font-size:0.86rem; line-height:1.6;">${escapeHtml(b.description || '')}</p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-text ai-btn-highlight" onclick="selectBook('${b.id}')" style="flex:1; justify-content:center;">
            <span>فتح الكتاب في القارئ</span>
            <span>←</span>
          </button>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

function selectBook(bId) {
  const b = libraryData.books.find(x => x.id === bId);
  if (!b) return;
  currentBook = b;
  currentChapter = b.chapters[0];
  libraryData.activeBookId = b.id;
  libraryData.activeChapterId = currentChapter.id;
  currentPage = 1;
  saveLibrary();
  renderReader();
  showView('reader');
  closeAllSheets();
  showToast(`تم فتح: ${b.title.split('(')[0]}`);
}

function selectChapter(chId, targetPage = 1) {
  const ch = currentBook.chapters.find(x => x.id === chId);
  if (!ch) return;
  currentChapter = ch;
  libraryData.activeChapterId = ch.id;
  currentPage = targetPage;
  saveLibrary();
  renderReader();
  goToPage(targetPage);
  closeAllSheets();
  showToast(`تم الانتقال إلى: ${ch.shortTitle || ch.title}`);
}

/* ── الأدراج (Sheets) ──────────────────────────────────────────────── */
function renderLibraryBooksDrawer() {
  const list = document.getElementById('library-books-list');
  if (!list) return;
  let html = '';
  libraryData.books.forEach(b => {
    html += `
      <button class="quiz-option-btn" onclick="selectBook('${b.id}')">
        <span>${escapeHtml(b.title)}</span>
        <span style="font-size:0.75rem; color:var(--text-muted);">${b.chapters.length} أقسام</span>
      </button>
    `;
  });
  list.innerHTML = html;
}

function renderChaptersDrawer() {
  const list = document.getElementById('chapters-sheet-list');
  if (!list || !currentBook) return;
  const sheetTitle = document.getElementById('chapters-sheet-book-title');
  if (sheetTitle) sheetTitle.textContent = `فصول: ${currentBook.title}`;
  let html = '';
  currentBook.chapters.forEach(ch => {
    const isCur = (ch.id === currentChapter.id);
    html += `
      <button class="quiz-option-btn ${isCur ? 'correct' : ''}" onclick="selectChapter('${ch.id}')">
        <span>${escapeHtml(ch.title)}</span>
        <span style="font-size:0.75rem; color:var(--text-muted);">${ch.pages.length} ص</span>
      </button>
    `;
  });
  list.innerHTML = html;
}

function renderTOCDrawer() {
  const list = document.getElementById('toc-sheet-list');
  if (!list || !currentChapter) return;
  let html = '';
  currentChapter.pages.forEach((p, idx) => {
    const pNum = p.pageNumber || (idx + 1);
    html += `
      <button class="quiz-option-btn ${pNum === currentPage ? 'correct' : ''}" onclick="goToPage(${pNum}); closeAllSheets();">
        <span>ص ${pNum}: ${escapeHtml(p.subHeader || 'مبحث ' + pNum)}</span>
        <span>←</span>
      </button>
    `;
  });
  list.innerHTML = html;
}

function toggleSheet(id) {
  const el = document.getElementById(id);
  const backdrop = document.getElementById('sheet-backdrop');
  const wasActive = el?.classList.contains('active');
  closeAllSheets();
  if (!wasActive && el) {
    el.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
  }
}

function closeAllSheets() {
  document.querySelectorAll('.bottom-sheet, .ai-sheet').forEach(s => s.classList.remove('active'));
  document.getElementById('sheet-backdrop')?.classList.remove('active');
}

/* ── المعلم الذكي ──────────────────────────────────────────────────── */
function openAISheet(tab = 'chat') {
  closeAllSheets();
  document.getElementById('ai-sheet')?.classList.add('active');
  document.getElementById('sheet-backdrop')?.classList.add('active');
  switchAITab(tab);
}

function switchAITab(tab) {
  ['chat', 'quiz', 'summary'].forEach(t => {
    document.getElementById(`ai-tab-btn-${t}`)?.classList.toggle('active', t === tab);
    const v = document.getElementById(`ai-view-${t}`);
    if (v) v.style.display = (t === tab) ? 'flex' : 'none';
  });
  if (tab === 'summary') document.getElementById('summary-page-num').textContent = currentPage;
}

async function sendChatMessage() {
  const inp = document.getElementById('ai-chat-input');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';

  const thread = document.getElementById('ai-chat-thread');
  thread.innerHTML += `<div class="ai-msg user">${escapeHtml(text)}</div>`;

  const loadId = 'msg-' + Date.now();
  thread.innerHTML += `<div class="ai-msg assistant" id="${loadId}"><span class="ai-loading-pulse"></span> جارٍ استحضار الشرح الأكاديمي المتخصص...</div>`;
  thread.scrollTop = thread.scrollHeight;

  const curPageContent = currentChapter?.pages?.[currentPage - 1]?.htmlContent?.replace(/<[^>]*>?/gm, ' ').substring(0, 700) || '';
  const systemPrompt = `أنت أستاذ ومستشار أكاديمي خبير في تدريس إدارة الأعمال لمرجع "مبادئ الإدارة" لمؤلفيه ستيفن روبنز وماري كولتر (Stephen P. Robbins & Mary Coulter - الجزء الأول كاملاً: الفصول 1 إلى 7). 
أجب بلسان عربي فصيح، رصين، بيداغوجي، خالٍ تماماً من الركاكة أو العرنجية. 
اشرح بأسلوب تفاعلي سقراطي يشجع التفكير والتحليل، واذكر أمثلة تطبيقية من بيئات الأعمال المعاصرة، واذكر المصطلح التخصصي بالإنجليزية بين قوسين عند وروده أول مرة. 
سياق المرجع الحالي هو: "${currentBook?.title || 'مبادئ الإدارة'}"، الفصل: "${currentChapter?.title || ''}"، الصفحة: ${currentPage}.
مقتطف من متن الصفحة المفتوحة أمام الدارس: "${curPageContent}"`;

  aiChatHistory.push({ role: "user", parts: [{ text: text }] });
  if (aiChatHistory.length > 20) aiChatHistory = aiChatHistory.slice(-20);

  try {
    const payload = {
      contents: aiChatHistory,
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
    const data = await callGeminiAPI(payload);
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "الإدارة الرشيدة تقوم على مواءمة الموارد البشرية والمادية لتحقيق الكفاءة والفاعلية في بيئات الأعمال المعاصرة.";

    aiChatHistory.push({ role: "model", parts: [{ text: reply }] });
    if (aiChatHistory.length > 20) aiChatHistory = aiChatHistory.slice(-20);
    document.getElementById(loadId).innerHTML = escapeHtml(reply).replace(/\n/g, '<br>');
  } catch (e) {
    document.getElementById(loadId).textContent = "المدير الرشيد يوازن بين الكفاءة والفاعلية، ويقود التنوع المؤسسي ومبادرات التغيير بحصافة ومسؤولية أخلاقية، كما يوضح ذلك روبنز وكولتر.";
  }
  thread.scrollTop = thread.scrollHeight;
}

function sendQuickPrompt(t) {
  document.getElementById('ai-chat-input').value = t;
  sendChatMessage();
}

function setQuizDifficulty(diff, btn) {
  selectedQuizDifficulty = diff;
  btn.parentElement.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setQuizCount(count, btn) {
  selectedQuizCount = count;
  btn.parentElement.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

async function startCustomAIQuiz() {
  const container = document.getElementById('ai-quiz-container');
  const btn = document.getElementById('btn-run-ai-quiz');
  const scopeVal = document.getElementById('quiz-cfg-scope').value;

  let scopeTitle = "كامل الجزء الأول من المقرر (الفصول 1 إلى 7)";
  let scopeContext = "";

  if (scopeVal === 'mgmt_ch1') {
    scopeTitle = "الفصل الأول: المديرون وموقعك في بيئة العمل";
    scopeContext = "المديرون، هرم المستويات الإدارية، الكفاءة والفاعلية، وظائف فايول، أدوار مينتزبرغ، مهارات كاتز، التحولات المعاصرة.";
  } else if (scopeVal === 'mgmt_ch2') {
    scopeTitle = "الفصل الثاني: صناعة القرارات وتحديد الخيارات";
    scopeContext = "الخطوات الثماني لاتخاذ القرار، العقلانية التامة والمقيدة (هربرت سيمون)، الحدس الإداري، المشكلات المهيكلة وغير المهيكلة، التحيزات الإدراكية والتكاليف الغارقة.";
  } else if (scopeVal === 'mgmt_ch3') {
    scopeTitle = "الفصل الثالث: إدارة البيئة الخارجية وثقافة المنظمة";
    scopeContext = "المنظور الإطلاقي والرمزي لسلطة المدير، البيئة الخاصة والعامة، مصفوفة عدم التأكد، أصحاب المصلحة، الأبعاد السبعة لثقافة المنظمة، والتنشئة التنظيمية.";
  } else if (scopeVal === 'mgmt_ch4') {
    scopeTitle = "الفصل الرابع: ممارسات الإدارة في السياق العالمي";
    scopeContext = "المواقف العالمية الثلاثة (إثنوسنتري، بوليسنتري، جيوسنتري)، المنظمات الدولية، استراتيجيات الدخول، أبعاد هوفستيد الثقافية، دراسات GLOBE، والعقلية العالمية.";
  } else if (scopeVal === 'mgmt_ch5') {
    scopeTitle = "الفصل الخامس: إدارة التنوع وتكافؤ الفرص";
    scopeContext = "التنوع السطحي والعميق، منافع إدارة التنوع (الأفراد، الأداء، الاستراتيجية)، أبعاد التنوع، التمييز والتحيزات، السقف الزجاجي، مبادرات المنظمة وبرامج ERGs.";
  } else if (scopeVal === 'mgmt_ch6') {
    scopeTitle = "الفصل السادس: المسؤولية المجتمعية وأخلاقيات الأعمال";
    scopeContext = "المنظور الكلاسيكي والاجتماعي الاقتصادي، الالتزام والاستجابة والمسؤولية الاجتماعية، الإدارة الخضراء ومداخلها الأربعة، مراحل كولبرج للتطور الأخلاقي، ومحددات السلوك الأخلاقي والبرنامج المؤسسي للنزاهة.";
  } else if (scopeVal === 'mgmt_ch7') {
    scopeTitle = "الفصل السابع: إدارة التغيير والابتكار المؤسسي";
    scopeContext = "قوى التغيير الخارجية والداخلية، استعارة المياه الهادئة ونموذج ليفين، منحدرات النهر الجارف، مجالات التغيير، تقنيات التطوير التنظيمي OD، مقاومة التغيير وتقنياتها الست، ضغوط العمل، والإبداع والابتكار والمتغيرات المحفزة له.";
  } else if (scopeVal === 'current') {
    scopeTitle = currentChapter.shortTitle || currentChapter.title;
    scopeContext = currentChapter.pages?.map(p => p.subHeader || '').join(', ');
  } else {
    scopeContext = "شامل لكافة محاور الفصول من 1 إلى 7 لمبادئ الإدارة لروبنز وكولتر (الجزء الأول كاملاً).";
  }

  const diffLabel = selectedQuizDifficulty === 'mba' ? 'مستوى ماجستير إدارة الأعمال (MBA)' : (selectedQuizDifficulty === 'high' ? 'عالي ومتقدم' : 'متوسط');

  container.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem; background: var(--bg-surface); border: 1.5px dashed var(--border-color); border-radius: 14px;">
      <span class="ai-loading-pulse" style="width: 32px; height: 32px; border-width: 3px; margin-bottom: 0.8rem;"></span>
      <strong style="display: block; font-size: 1rem; color: var(--accent); margin-bottom: 0.3rem;">جارٍ صياغة وتوليد ${selectedQuizCount} أسئلة بالذكاء الاصطناعي...</strong>
      <span style="font-size: 0.82rem; color: var(--text-muted);">المستوى: ${diffLabel} • النطاق: ${scopeTitle}</span>
    </div>
  `;
  btn.disabled = true;

  const promptText = `قم بإعداد اختبار أكاديمي رصين من نوع الاختيار من متعدد يتكون من ${selectedQuizCount} أسئلة في مقرر مبادئ الإدارة (Robbins & Coulter).
النطاق المطلوب: ${scopeTitle} (المحتوى: ${scopeContext}).
مستوى الصعوبة المطلوب: ${diffLabel}.
${selectedQuizDifficulty === 'mba' ? 'ملاحظة لمستوى MBA: ركز على سيناريوهات ودراسات حالة إدارية واقعية تتطلب المفاضلة بين خيارات استراتيجية وحل معضلات قيادية مركبة في التغيير والأخلاق والتنوع.' : (selectedQuizDifficulty === 'high' ? 'ملاحظة للمستوى المتقدم: ركز على التحليل والربط بين المفاهيم والمقارنات التخصصية الدقيقة.' : 'ملاحظة للمستوى المتوسط: ركز على الفهم والتطبيق المباشر للمفاهيم الأساسية.')}
صِغ الأسئلة بلغة عربية فصيحة، مع إعطاء تعليل أكاديمي علمي واضح لكل إجابة.`;

  const quizSchema = {
    type: "ARRAY",
    items: {
      type: "OBJECT",
      properties: {
        question: { type: "STRING" },
        options: { type: "ARRAY", items: { type: "STRING" } },
        correctIndex: { type: "INTEGER" },
        explanation: { type: "STRING" }
      },
      required: ["question", "options", "correctIndex", "explanation"]
    }
  };

  try {
    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: quizSchema
      }
    };

    const response = await callGeminiAPI(payload);
    let jsonText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    let questions = JSON.parse(jsonText);

    renderGeneratedQuizQuestions(questions, scopeTitle, diffLabel);
  } catch (err) {
    const fallbackQuestions = getFallbackQuestions(scopeVal, selectedQuizDifficulty, selectedQuizCount);
    renderGeneratedQuizQuestions(fallbackQuestions, scopeTitle, diffLabel);
  } finally {
    btn.disabled = false;
  }
}

function renderGeneratedQuizQuestions(questions, scopeTitle, diffLabel) {
  const container = document.getElementById('ai-quiz-container');
  let html = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.4rem; padding-bottom:0.5rem; border-bottom:1.5px solid var(--border-color);">
      <div>
        <strong style="font-size:0.95rem; color:var(--text-main); display:block;">اختبار: ${scopeTitle}</strong>
        <span style="font-size:0.78rem; color:var(--accent); font-weight:700;">المستوى: ${diffLabel} (${questions.length} أسئلة)</span>
      </div>
      <button class="btn-text" onclick="startCustomAIQuiz()" style="font-size:0.76rem; height:30px;">إعادة التوليد ↻</button>
    </div>
  `;

  questions.forEach((q, qIdx) => {
    html += `
      <div class="highlight-card" style="margin: 0; background: var(--bg-surface); border: 1.5px solid var(--border-color); border-radius: 12px; padding: 1.1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span class="chapter-badge" style="margin: 0;">السؤال ${qIdx + 1}</span>
        </div>
        <p style="font-weight: 700; font-size: 0.94rem; margin-bottom: 0.8rem; line-height: 1.6;">${escapeHtml(q.question)}</p>
        <div class="quiz-options-group" data-correct="${q.correctIndex}">
          ${q.options.map((opt, oIdx) => `
            <button class="quiz-option-btn" onclick="handleQuizAnswerSelection(this, ${oIdx}, ${q.correctIndex}, 'q-exp-${qIdx}')">
              <span>${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
        <div id="q-exp-${qIdx}" class="highlight-card" style="display: none; margin-top: 0.8rem; font-size: 0.86rem; border-right-color: #10b981; background: var(--bg-subtle);">
          <strong style="color: #059669; display: block; margin-bottom: 0.2rem;">التعليل الأكاديمي المعتمد:</strong>
          ${escapeHtml(q.explanation)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  showToast(`تم إعداد الاختبار بنجاح (${questions.length} أسئلة)`);
}

function handleQuizAnswerSelection(btn, chosenIdx, correctIdx, expId) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);

  if (chosenIdx === correctIdx) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
    parent.querySelectorAll('.quiz-option-btn')[correctIdx]?.classList.add('correct');
  }

  const exp = document.getElementById(expId);
  if (exp) exp.style.display = 'block';
}

function getFallbackQuestions(scope, diff, count) {
  const bank = [
    {
      question: "ما الفارق الجوهري بين التنوع السطحي (Surface-Level) والتنوع العميق (Deep-Level) في المنظمات؟",
      options: [
        "التنوع السطحي يختص بالمظاهر البيولوجية والديمغرافية المرئية، بينما التنوع العميق يتعلق بالقيم والمعتقدات وأساليب التفكير",
        "التنوع السطحي يخص القيادة العليا فقط، بينما التنوع العميق يقتصر على الموظفين التنفيذيين",
        "التنوع السطحي دائم التأثير، بينما التنوع العميق يزول تماماً بعد فترة وجيزة",
        "لا يوجد فارق، فكلاهما يشيران إلى الاختلافات القانونية حصراً"
      ],
      correctIndex: 0,
      explanation: "يشير التنوع السطحي إلى الفروق المادية الظاهرة كالعمر والجنس والعرق، بينما يشمل التنوع العميق المنظومة القيمية والتوجهات الفكرية الحاكمة لديناميكيات التعاون والإنتاجية."
    },
    {
      question: "وفق نموذج لورانس كولبرج (Kohlberg)، في أي مستوى يقع المدير الذي يلتزم بالمعايير الأخلاقية حمايةً لحقوق الإنسان والعدالة الكونية حتى لو تعارضت مع اللوائح القائمة؟",
      options: [
        "المستوى قبل التقليدي (Preconventional Level)",
        "المستوى التقليدي (Conventional Level)",
        "المستوى القائم على المبادئ (Principled Level)",
        "المستوى المادي الاقتصادي"
      ],
      correctIndex: 2,
      explanation: "المستوى القائم على المبادئ (Principled Level) يمثل أرقى درجات النضج الأخلاقي حيث يحتكم الفرد إلى مبادئ العدالة الكونية المستقلة ويقدمها على اللوائح الصامتة."
    },
    {
      question: "في إدارة التغيير، ما المدلول العملي لاستعارة منحدرات النهر الجارف (White-Water Rapids Metaphor)؟",
      options: [
        "أن التغيير حدث عارض ومؤقت يفصل بين فترات طويلة من الهدوء والاستقرار",
        "أن التغيير حالة تشغيلية دائمة ومستمرة في بيئة مضطربة تتطلب المرونة وسرعة الاستجابة",
        "أن المنظمة تعمل في بيئة يمكن التنبؤ بمتغيراتها بدقة متناهية",
        "أن مقاومة التغيير يمكن القضاء عليها نهائياً بالإكراه المباشر"
      ],
      correctIndex: 1,
      explanation: "استعارة منحدرات النهر الجارف تجسد واقع القرن الحادي والعشرين حيث البيئة شديدة الاضطراب والتغيير حالة دائمة تفرض على الإدارة الابتكار والمرونة المتواصلة."
    },
    {
      question: "أي المداخل الآتية يمثل أعلى مراتب الالتزام في الإدارة الخضراء (Green Management)؟",
      options: [
        "مدخل الامتثال القانوني (Legal Approach)",
        "مدخل السوق (Market Approach)",
        "مدخل أصحاب المصلحة (Stakeholder Approach)",
        "مدخل النشاط البيئي الشامل أو الأخضر الداكن (Activist Approach)"
      ],
      correctIndex: 3,
      explanation: "مدخل النشاط البيئي الشامل (Activist / Dark Green Approach) يبادر بالابتكار الاستباقي لصيانة موارد الأرض والاستدامة الكلية دون انتظار ضغوط خارجية."
    },
    {
      question: "ما الفارق الأساسي بين الإبداع (Creativity) والابتكار (Innovation) في بيئات الأعمال؟",
      options: [
        "الإبداع هو القدرة على توليد أفكار جديدة، بينما الابتكار هو المسار العملي لتحويلها إلى منتج أو خدمة ذات قيمة ملموسة",
        "الإبداع يختص بالتسويق، بينما الابتكار مقتصر على العمليات المالية",
        "الابتكار هو الفكرة النظرية المجردة، والإبداع هو تطبيقها الصناعي",
        "كلاهما مصطلحان مترادفان تماماً لا اختلاف بينهما في التطبيق"
      ],
      correctIndex: 0,
      explanation: "الإبداع هو المنطلق الذهني لتوليد الروابط والأفكار الجديدة، في حين يمثل الابتكار الثمرة الإنتاجية والتطبيقية الواقعية النافعة للمؤسسة."
    }
  ];

  return bank.slice(0, Math.min(count, bank.length));
}

async function generateCurrentPageSummary() {
  const box = document.getElementById('ai-summary-content');
  const pageData = currentChapter?.pages?.[currentPage - 1];
  const pageText = (pageData?.htmlContent || '')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 1200);

  box.innerHTML = '<span class="ai-loading-pulse"></span> جارٍ استخلاص كبسولة المراجعة...';

  const promptText = `لخّص في 4 إلى 6 نقاط موجزة جوهر الصفحة رقم ${currentPage} من فصل "${currentChapter?.title || ''}" في مرجع "مبادئ الإدارة" (Robbins & Coulter - الجزء الأول). أبرز المصطلحات التخصصية بالإنجليزية بين قوسين عند ورودها أول مرة. النص: "${pageText}"`;

  try {
    const payload = { contents: [{ parts: [{ text: promptText }] }] };
    const data = await callGeminiAPI(payload);
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('empty');
    box.innerHTML = `
      <strong>كبسولة مراجعة الصفحة (${currentPage}) في (${escapeHtml(currentChapter.shortTitle || currentChapter.title)}):</strong>
      <div style="margin-top:0.6rem; line-height:1.9;">${escapeHtml(reply).replace(/\n/g, '<br>')}</div>
    `;
    showToast('تم استخلاص التلخيص بنجاح');
  } catch (e) {
    box.innerHTML = `
      <strong>أبرز مرتكزات الصفحة (${currentPage}) في (${escapeHtml(currentChapter.shortTitle || currentChapter.title)}):</strong>
      <ul style="margin:0.5rem 0 0 1.2rem;">
        <li>تأصيل المفاهيم العلمية بدقة وبالمصطلحات الإنجليزية التخصصية المعتمدة.</li>
        <li>التمايز الحاسم بين النماذج النظرية والواقع العملي في بيئات الأعمال.</li>
        <li>الربط المستمر بين وظائف الإدارة وتحقيق النتائج المؤسسية بكفاءة وفاعلية.</li>
      </ul>
    `;
    showToast('تعذر الاتصال بالمعلم الذكي — عُرض التلخيص المرجعي', '⚠️');
  }
}

/* ── مختبر الاستيراد ───────────────────────────────────────────────── */
function triggerDeviceUpload() {
  document.getElementById('lab-file-input').click();
}

function handleFileSelected(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const fileName = file.name;
  const cleanName = fileName.replace(/\.[^/.]+$/, "");
  const isText = file.type.includes('text') || fileName.endsWith('.txt') || fileName.endsWith('.md');

  if (!isText) {
    showToast('يدعم المختبر حالياً صيغ TXT و MD فقط — اختر ملفاً نصياً', '⚠️');
    input.value = '';
    return;
  }

  const procState = document.getElementById('lab-processing-state');
  const dropZone = document.getElementById('drop-zone');
  const succState = document.getElementById('lab-success-result');
  if (dropZone) dropZone.style.display = 'none';
  if (procState) procState.style.display = 'flex';
  if (succState) succState.style.display = 'none';

  const reader = new FileReader();
  reader.onload = function(e) {
    processImportedText(cleanName, e.target.result);
  };
  reader.onerror = function() {
    showToast('تعذر قراءة الملف', '⚠️');
    if (dropZone) dropZone.style.display = 'block';
    if (procState) procState.style.display = 'none';
  };
  reader.readAsText(file);
}

function processImportedText(title, content) {
  const procTitle = document.getElementById('proc-stage-title');
  const procDesc = document.getElementById('proc-stage-desc');
  if (procTitle) procTitle.textContent = 'جارٍ هيكلة المحتوى وإنشاء صفحات القارئ...';
  if (procDesc) procDesc.textContent = 'يتولى النظام صياغة الفصول واستخراج العناوين تلقائياً.';

  setTimeout(() => {
    const isChapterOfCurrent = title.includes('إدارة') || title.includes('Robbins') || title.toLowerCase().includes('chapter');
    let targetBook = currentBook;
    let createdChId = 'custom_ch_' + Date.now();

    const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
    const pages = [];
    const targetPages = Math.max(1, Math.min(12, Math.ceil(paragraphs.length / 8)));
    const chunkSize = Math.max(1, Math.ceil(paragraphs.length / targetPages));

    for (let i = 0; i < targetPages; i++) {
      const chunkParas = paragraphs.slice(i * chunkSize, (i + 1) * chunkSize);
      const bodyHtml = chunkParas.length > 0
        ? chunkParas.map(p => `<p>${escapeHtml(p)}</p>`).join('')
        : `<p>محتوى أكاديمي منظم ومفصل ضمن صفحات هذا القسم من المرجع.</p>`;

      pages.push({
        pageNumber: i + 1,
        subHeader: `المبحث ${i + 1}: ${title}`,
        htmlContent: `
          <div style="text-align:center; margin:1rem 0 1.6rem 0;">
            <span class="chapter-badge">محتوى مستورد تلقائياً</span>
            <h1>${escapeHtml(title)} - مبحث ${i + 1}</h1>
          </div>
          <div class="highlight-card">
            <p style="margin:0; font-weight:600;">تمت هيكلة هذا النص بيداغوجياً ليلائم تجربة القراءة والمطالعة الأكاديمية.</p>
          </div>
          ${bodyHtml}
        `
      });
    }

    const newChapter = {
      id: createdChId,
      chapterNumber: (targetBook.chapters.length || 0) + 1,
      title: `فصل مستورد: ${title}`,
      shortTitle: title.substring(0, 22),
      pages: pages
    };

    if (isChapterOfCurrent && targetBook) {
      targetBook.chapters.push(newChapter);
      newlyProcessedBookId = targetBook.id;
    } else {
      const newBookId = 'book_' + Date.now();
      const newBook = {
        id: newBookId,
        title: title,
        author: 'مؤلف مستورد / هيئة علمية',
        description: `مرجع أكاديمي مستورد تمت صياغته وهيكلته للقارئ مباشرة.`,
        chapters: [newChapter]
      };
      libraryData.books.push(newBook);
      newlyProcessedBookId = newBookId;
    }

    saveLibrary();
    renderHomeLibrary();
    renderChaptersDrawer();
    renderLibraryBooksDrawer();

    const procState = document.getElementById('lab-processing-state');
    const succState = document.getElementById('lab-success-result');
    const resTitle = document.getElementById('res-detected-title');
    const resMeta = document.getElementById('res-detected-meta');

    if (procState) procState.style.display = 'none';
    if (succState) succState.style.display = 'flex';
    if (resTitle) resTitle.textContent = `تم استيراد «${title}» بنجاح!`;
    if (resMeta) resMeta.textContent = `أُدرج المرجع في المكتبة وقُسّم إلى ${pages.length} صفحات تفاعلية.`;

    showToast('تمت الهيكلة والإدراج في المكتبة بنجاح', '📚');
  }, 700);
}

function openGoogleDriveModal() {
  toggleSheet('drive-modal');
}

async function processDriveUrl() {
  const inp = document.getElementById('drive-file-url');
  const url = inp ? inp.value.trim() : '';
  if (!url) {
    showToast('يرجى لصق رابط ملف Google Drive أولاً', '⚠️');
    return;
  }
  const idMatch = url.match(/[-\w]{25,}/);
  if (!idMatch) {
    showToast('رابط Drive غير صالح — تأكد من صيغة الرابط', '⚠️');
    return;
  }
  const fileId = idMatch[0];

  closeAllSheets();
  showView('lab');
  const dropZone = document.getElementById('drop-zone');
  const procState = document.getElementById('lab-processing-state');
  const succState = document.getElementById('lab-success-result');
  if (dropZone) dropZone.style.display = 'none';
  if (procState) procState.style.display = 'flex';
  if (succState) succState.style.display = 'none';

  try {
    const res = await fetch(`https://drive.google.com/uc?export=download&id=${fileId}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    if (!text || text.trim().length < 20) throw new Error('empty');
    processImportedText('ملف مستورد من Google Drive', text);
    showToast('تم استيراد الملف من Google Drive بنجاح', '☁️');
  } catch (err) {
    if (dropZone) dropZone.style.display = 'block';
    if (procState) procState.style.display = 'none';
    showToast('تعذر جلب الملف من Drive مباشرة (قيود المتصفح) — حمّله ثم ارفعه كملف TXT', '⚠️');
  }
}

function openNewlyProcessedBook() {
  if (newlyProcessedBookId) {
    selectBook(newlyProcessedBookId);
  } else {
    showView('reader');
  }
}

/* ── المظهر والقراءة ───────────────────────────────────────────────── */
function toggleImmersive() {
  document.body.classList.toggle('immersive-mode');
  const isImm = document.body.classList.contains('immersive-mode');
  showToast(isImm ? 'تم إخفاء الأشرطة للتفرغ للقراءة' : 'تمت استعادة أشرطة الأدوات');
}

function exitImmersive() {
  document.body.classList.remove('immersive-mode');
}

function setTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
  LocalStore.set('theme', themeName);
  ['light', 'sepia', 'dark', 'oled'].forEach(t => {
    const btn = document.getElementById(`theme-btn-${t}`);
    if (btn) btn.classList.toggle('active', t === themeName);
  });
}

function setFontFamily(fontName, btn) {
  currentFontFamily = fontName;
  document.documentElement.style.setProperty('--font-body', `'${fontName}', -apple-system, sans-serif`);
  document.documentElement.style.setProperty('--font-heading', `'${fontName}', sans-serif`);
  LocalStore.set('font_family', fontName);
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function adjustFontSize(delta) {
  currentFontSize = Math.max(13, Math.min(23, currentFontSize + delta));
  document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
  const disp = document.getElementById('font-size-display');
  if (disp) disp.textContent = `${currentFontSize}px`;
  LocalStore.set('font_size', currentFontSize);
}

/* ── نافذة تكبير الأشكال ───────────────────────────────────────────── */
function zoomDiagram(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const modal = document.getElementById('diagram-modal');
  const body = document.getElementById('diagram-modal-body');
  if (!modal || !body) return;
  currentZoomLevel = 1;
  const clone = svg.cloneNode(true);
  clone.id = svgId + '-cloned';
  clone.style.width = '92vw';
  clone.style.maxWidth = '1050px';
  clone.style.height = 'auto';
  clone.style.transition = 'transform 0.2s ease';
  clone.style.transform = `scale(${currentZoomLevel})`;
  body.innerHTML = '';
  body.appendChild(clone);
  modal.style.display = 'flex';
}

function closeDiagramModal() {
  const modal = document.getElementById('diagram-modal');
  if (modal) modal.style.display = 'none';
}

function zoomInDiagramModal() {
  currentZoomLevel = Math.min(2.5, currentZoomLevel + 0.2);
  const clone = document.querySelector('#diagram-modal-body svg');
  if (clone) clone.style.transform = `scale(${currentZoomLevel})`;
}

function zoomOutDiagramModal() {
  currentZoomLevel = Math.max(0.6, currentZoomLevel - 0.2);
  const clone = document.querySelector('#diagram-modal-body svg');
  if (clone) clone.style.transform = `scale(${currentZoomLevel})`;
}

/* ── النسخ الاحتياطي والاستعادة ────────────────────────────────────── */
function exportLibraryData() {
  const blob = new Blob([JSON.stringify(libraryData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `academic_library_${Date.now()}.json`;
  a.click();
  showToast('تم تصدير النسخة الاحتياطية بنجاح');
}

function importLibraryData() {
  const inp = document.getElementById('backup-file-input');
  if (!inp || !inp.files || !inp.files[0]) return;
  const file = inp.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || !Array.isArray(data.books) || data.books.length === 0) {
        showToast('الملف غير صالح: لا يحتوي على بيانات مكتبة', '⚠️');
        return;
      }
      libraryData = data;
      currentPage = 1;
      saveLibrary();
      loadLibrary();
      closeAllSheets();
      showView('home');
      showToast('تم استيراد النسخة الاحتياطية بنجاح', '📦');
    } catch (err) {
      showToast('تعذر قراءة الملف: ليس JSON صالحاً', '⚠️');
    }
  };
  reader.readAsText(file);
  inp.value = '';
}

function resetLibraryToDefault() {
  libraryData = JSON.parse(JSON.stringify(DEFAULT_LIBRARY_DATA));
  currentPage = 1;
  saveLibrary();
  loadLibrary();
  closeAllSheets();
  showView('home');
  showToast('تمت استعادة المجلد الشامل للأصل بنجاح');
}

/* ── التهيئة ───────────────────────────────────────────────────────── */
function initApp() {
  const savedTheme = LocalStore.get('theme') || 'light';
  setTheme(savedTheme);

  const savedFontSize = LocalStore.get('font_size');
  if (savedFontSize) {
    currentFontSize = parseFloat(savedFontSize);
    document.documentElement.style.setProperty('--font-size', `${currentFontSize}px`);
    const disp = document.getElementById('font-size-display');
    if (disp) disp.textContent = `${currentFontSize}px`;
  }

  const savedFontFamily = LocalStore.get('font_family');
  if (savedFontFamily === 'IBM Plex Sans Arabic') {
    currentFontFamily = savedFontFamily;
    document.documentElement.style.setProperty('--font-body', `'${savedFontFamily}', sans-serif`);
    document.documentElement.style.setProperty('--font-heading', `'${savedFontFamily}', sans-serif`);
  }

  loadLibrary();

  const savedView = LocalStore.get(VIEW_KEY) || 'home';
  showView(savedView);

  /* ربط التنقل بالأسهم من لوحة المفاتيح للحواسيب */
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') {
      nextPage();
    } else if (e.key === 'ArrowRight') {
      prevPage();
    } else if (e.key === 'Escape') {
      closeAllSheets();
      closeDiagramModal();
    }
  });

  /* ربط إيماءات السحب اللمسي للهواتف المحمولة */
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const activeView = document.getElementById('reader-view-container');
    if (!activeView || !activeView.classList.contains('active-view')) return;
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 50) {
      if (diffX > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }
  }, { passive: true });

  /* تفعيل السحب والإفلات في المختبر */
  const dropZone = document.getElementById('drop-zone');
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(ev => {
      dropZone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
      });
    });
    ['dragleave', 'drop'].forEach(ev => {
      dropZone.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
      });
    });
    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFileSelected({ files: files });
      }
    });
  }
}

/* ── تعريض الدوال للنطاق العام (لتعمل مع onclick المضمّن) ───────────── */
Object.assign(window, {
  showToast,
  showView,
  renderReader,
  goToPage,
  nextPage,
  prevPage,
  onScrubberInput,
  renderHomeLibrary,
  selectBook,
  selectChapter,
  renderLibraryBooksDrawer,
  renderChaptersDrawer,
  renderTOCDrawer,
  toggleSheet,
  closeAllSheets,
  openAISheet,
  switchAITab,
  sendChatMessage,
  sendQuickPrompt,
  setQuizDifficulty,
  setQuizCount,
  startCustomAIQuiz,
  renderGeneratedQuizQuestions,
  handleQuizAnswerSelection,
  getFallbackQuestions,
  generateCurrentPageSummary,
  triggerDeviceUpload,
  handleFileSelected,
  processImportedText,
  openGoogleDriveModal,
  processDriveUrl,
  openNewlyProcessedBook,
  toggleImmersive,
  exitImmersive,
  setTheme,
  setFontFamily,
  adjustFontSize,
  zoomDiagram,
  closeDiagramModal,
  zoomInDiagramModal,
  zoomOutDiagramModal,
  exportLibraryData,
  importLibraryData,
  resetLibraryToDefault,
  initApp
});

/* ── الإقلاع ───────────────────────────────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


