# ════════════════════════════════════════════════════════════════════
# build.ps1 — دمج مشروع وَنِيس في ملف HTML واحد قابل للنقل
# ─────────────────────────────────────────────────────────────────────
# • يدمج: styles.css داخل <style>، و storage.js + script.js داخل <script>
# • الناتج يُفتح بنقرة مزدوجة (file://) دون خادم محلي.
# • يبقى خارج الدمج: خط Google Fonts (رابط CDN)، manifest.json،
#   أيقونات assets/ — لأن المتصفح يتطلبها ملفات/روابط خارجية.
# • سجل الخدمة (sw.js) يبقى لكنه يعطّل نفسه تلقائياً على file://.
#
# الاستخدام:
#   powershell -ExecutionPolicy Bypass -File build.ps1
#   powershell -ExecutionPolicy Bypass -File build.ps1 -OutputName "نسخة-مدمجة.html"
# ════════════════════════════════════════════════════════════════════

param(
  [string]$OutputName = 'ونيس-مدمج.html'
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Read-Utf8([string]$path) {
  return [System.IO.File]::ReadAllText($path, $utf8)
}

# 1) قراءة المصادر
$html    = Read-Utf8 (Join-Path $root 'index.html')
$css     = Read-Utf8 (Join-Path $root 'styles.css')
$storage = Read-Utf8 (Join-Path $root 'storage.js')
$script  = Read-Utf8 (Join-Path $root 'script.js')

# 1b) دمج الكتب الإضافية من مجلد books/ (تُضمَّن في النسخة المدمجة)
$booksDir = Join-Path $root 'books'
$manifestPath = Join-Path $booksDir 'manifest.json'
$extraBooksJson = '[]'
if (Test-Path -LiteralPath $manifestPath) {
  $manifest = Read-Utf8 $manifestPath | ConvertFrom-Json
  $bookTexts = @()
  foreach ($f in $manifest) {
    $fp = Join-Path $booksDir $f
    if (-not (Test-Path -LiteralPath $fp)) {
      Write-Error "ملف الكتاب المذكور في manifest.json غير موجود: $f"
      exit 1
    }
    $raw = Read-Utf8 $fp
    try { $null = $raw | ConvertFrom-Json } catch {
      Write-Error "ملف الكتاب ليس JSON صالحاً: $f"
      exit 1
    }
    $bookTexts += $raw.Trim()
  }
  if ($bookTexts.Count -gt 0) {
    $extraBooksJson = '[' + ($bookTexts -join ',') + ']'
    # حماية من كسر السكربت المضمّن إذا احتوى المحتوى على وسم إغلاق السكربت
    $extraBooksJson = $extraBooksJson.Replace('</script>', '<\/script>')
  }
}
if (-not $script.Contains('let EXTRA_BOOKS = [];')) {
  Write-Error "علامة EXTRA_BOOKS غير موجودة في script.js — راجع الكود."
  exit 1
}
$script = $script.Replace('let EXTRA_BOOKS = [];', 'const EXTRA_BOOKS = ' + $extraBooksJson + ';')

# 2) تحويل storage.js من وحدة ES إلى سكربت كلاسيكي (إزالة export)
$storage = $storage.Replace('export const ', 'const ')
$storage = $storage.Replace('export default {', 'const __wanisDefaultExport = {')

# 3) إزالة سطر الاستيراد من script.js
$script = [regex]::Replace($script, '(?m)^import\s+\{[^}]*\}\s+from\s+''\./storage\.js'';\s*$', '')

# 4) دمج السكربتين (storage أولاً ثم المنطق)
$combinedJs = $storage + "`n`n" + $script

# 5) حقن CSS والسكربت في HTML
$html = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>`n$css`n</style>")
$html = $html.Replace('<script type="module" src="script.js"></script>', '')
$html = $html.Replace('</body>', "<script>`n$combinedJs`n</script>`n</body>")

# 6) كتابة الناتج
$outPath = Join-Path $root $OutputName
[System.IO.File]::WriteAllText($outPath, $html, $utf8)

# 7) تقرير وتحقق سريع
$sizeKB = [math]::Round((Get-Item $outPath).Length / 1KB, 1)
$hasImport  = $html -match '(?m)^\s*import\s'
$hasExport  = $html -match 'export\s+(const|default|function|class)'
$hasCssRef  = $html.Contains('href="styles.css"')
$hasJsRef   = $html.Contains('src="script.js"')
$hasStyle   = $html.Contains('<style>')
$hasInline  = $html.Contains('<script>')
$hasExtra   = $html.Contains('const EXTRA_BOOKS = ')
$hasOldMark = $html.Contains('let EXTRA_BOOKS = [];')

Write-Output "تم الدمج: $outPath ($sizeKB KB)"
Write-Output "── تحقق ──"
Write-Output ("  بقايا import : " + $(if ($hasImport)  { 'خطأ!' } else { 'لا يوجد ✓' }))
Write-Output ("  بقايا export : " + $(if ($hasExport)  { 'خطأ!' } else { 'لا يوجد ✓' }))
Write-Output ("  مرجع styles.css خارجي: " + $(if ($hasCssRef) { 'خطأ!' } else { 'أُزيل ✓' }))
Write-Output ("  مرجع script.js خارجي: " + $(if ($hasJsRef)  { 'خطأ!' } else { 'أُزيل ✓' }))
Write-Output ("  <style> مضمّن: " + $hasStyle)
Write-Output ("  <script> مضمّن: " + $hasInline)
Write-Output ("  كتب books/ مضمّنة: " + $(if ($hasExtra) { 'نعم ✓' } else { 'خطأ!' }))
Write-Output ("  بقايا علامة EXTRA_BOOKS: " + $(if ($hasOldMark) { 'خطأ!' } else { 'لا يوجد ✓' }))

if ($hasImport -or $hasExport -or $hasCssRef -or $hasJsRef -or -not $hasExtra -or $hasOldMark) {
  Write-Output "⚠️  توجد بقايا — راجع المصادر قبل النشر."
  exit 1
}
Write-Output "الملف جاهز: افتحه بنقرة مزدوجة أو شاركه مباشرة."