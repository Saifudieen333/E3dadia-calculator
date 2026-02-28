// Array of study tips for Thanawiya Amma students (WITHOUT numbering)
const studyTips = [
  "ركز على حل نماذج الامتحانات السابقة – 70% من الأسئلة بتكون بنفس النمط!",
  "خلي جدول مذاكرة منتظم: 3 ساعات دراسة + 30 دقيقة راحة = أفضل نتيجة",
  "مذاكرة جماعية مع زملائك تساعدك تفهم أسرع وتكتشف أخطاءك",
  "استخدم تقنية بومودورو: 25 دقيقة دراسة + 5 دقائق راحة",
  "النوم 7-8 ساعات يومياً ضروري – الدماغ بيحفظ المعلومات أثناء النوم!",
  "اشرب مية كتير أثناء المذاكرة – الجفاف بيأثر على التركيز",
  "حدد أهداف يومية صغيرة: 'هذا اليوم هحل 20 مسألة رياضيات'",
  "متحفظش في الليلة الأخيرة قبل الامتحان – راجع بس اللي درسته",
  "اللغة الإنجليزية: اقرأ القطع بسرعة واستخرج الكلمات المفتاحية أولاً",
  "الوقت في الامتحان ذهبي – خصص 5 دقائق في النهاية لمراجعة الإجابات",
  "الإيجابية مهمة: قول لنفسك 'أنا مستعد' مش 'أتمنى أن أنجح'",
];

// Track if result is showing
let isResultShowing = false;

// Show random tip on page load
window.onload = function() {
  showRandomTip();
};

// Function to show random tip
function showRandomTip() {
  const randomIndex = Math.floor(Math.random() * studyTips.length);
  const tip = studyTips[randomIndex];
  document.getElementById('tip-text').textContent = tip;
}

// Main calculation function - Fully Dynamic (no page reload needed)
function calculate() {
  // Get input values
  const currentInput = document.getElementById('current');
  const targetInput = document.getElementById('target');

  const current = parseFloat(currentInput.value);
  const target = parseFloat(targetInput.value);

  // Get result elements
  const resultBox = document.getElementById('result');
  const resultValue = document.getElementById('result-value');
  const resultText = document.getElementById('result-text');

  // Validate inputs
  if (isNaN(current) || isNaN(target)) {
    showError("⚠️ من فضلك أدخل رقمين صحيحين");
    return;
  }

  if (current < 0 || current > 100 || target < 0 || target > 100) {
    showError("⚠️ الأرقام لازم تكون بين 0 و 100");
    return;
  }

  if (target < current * 0.4) {
    showError("❌ الدرجة المستهدفة منطقية! المجموع النهائي مش ممكن يبقى أقل من 40% من المعدل الحالي");
    return;
  }

  // Hide result box first (smooth transition)
  resultBox.classList.remove('show');

  // Small delay for smooth animation
  setTimeout(() => {
    // Calculate needed final exam score
    // Formula: Overall = (Current × 0.4) + (Final × 0.6)
    // Therefore: Final = (Target - (Current × 0.4)) / 0.6
    const needed = (target - (current * 0.4)) / 0.6;

    // Display result with appropriate styling
    resultBox.classList.remove('result-success', 'result-warning', 'result-danger');

    if (needed > 100) {
      // Impossible scenario
      resultBox.classList.add('result-danger');
      resultValue.textContent = "مستحيل ❌";
      resultText.innerHTML = `أقصى درجة ممكن توصلها هي <strong>${((current * 0.4) + 60).toFixed(1)}%</strong><br>حاول تخفض هدفك أو ركز أكتر في المواد اللي عليها وزن أكبر`;
    } else if (needed <= 0) {
      // Already achieved
      resultBox.classList.add('result-success');
      resultValue.textContent = "مبروك! 🎉";
      resultText.innerHTML = `أنت بالفعل وصلت للدرجة المستهدفة!<br>حتى لو صفر في الامتحان النهائي هتوصّل لـ <strong>${target}%</strong>`;
    } else if (needed <= 70) {
      // Easy to achieve
      resultBox.classList.add('result-success');
      resultValue.textContent = `${needed.toFixed(1)}%`;
      resultText.innerHTML = `✅ هدف سهل!<br>ركز في المذاكرة المنظمة ومتضغطش على نفسك`;
    } else if (needed <= 85) {
      // Moderate difficulty
      resultBox.classList.add('result-warning');
      resultValue.textContent = `${needed.toFixed(1)}%`;
      resultText.innerHTML = `⚠️ هدف متوسط<br>خليك منتظم في المذاكرة وحل نماذج كتير`;
    } else {
      // Hard to achieve
      resultBox.classList.add('result-danger');
      resultValue.textContent = `${needed.toFixed(1)}%`;
      resultText.innerHTML = `⚠️ هدف صعب!<br>هتحتاج تركيز عالي ومذاكرة يومية. ابدأ دلوقتي!`;
    }

    // Show result box with animation
    resultBox.classList.add('show');

    // Show new random tip after calculation
    showRandomTip();

    // Set flag
    isResultShowing = true;
  }, 300);
}

// Function to show error message
function showError(message) {
  const resultBox = document.getElementById('result');
  const resultValue = document.getElementById('result-value');
  const resultText = document.getElementById('result-text');

  // Hide first
  resultBox.classList.remove('show');

  setTimeout(() => {
    resultBox.classList.remove('result-success', 'result-warning', 'result-danger');
    resultBox.classList.add('result-danger');
    resultValue.textContent = "خطأ";
    resultText.innerHTML = message;
    resultBox.classList.add('show');

    // Show new tip
    showRandomTip();
  }, 300);
}

// Allow Enter key to trigger calculation
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    calculate();
  }
});

// Add "Calculate Again" functionality - Clear inputs and result
document.getElementById('current').addEventListener('input', function() {
  clearResult();
});

document.getElementById('target').addEventListener('input', function() {
  clearResult();
});

function clearResult() {
  const resultBox = document.getElementById('result');
  if (isResultShowing) {
    resultBox.classList.remove('show');
    isResultShowing = false;
  }
}
// ========== ADDED: WhatsApp Share Function ==========
function shareOnWhatsApp() {
  const currentUrl = window.location.href;
  const message = `حاسبة الاعدادية 🎓\nاعرف بالظبط المطلوب منك في الامتحان النهائي عشان توصل للدرجة اللي حلمت بيها!\n${currentUrl}\n\n#الاعدادية #ُE3dadia`;

  const whatsappUrl = `https://today-study-focus.netlify.app/?text=${encodeURIComponent(message)}`;

  // Show toast notification
  showToast("تم فتح واتساب! شارك الرابط مع زملائك 📱");

  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
}

// ========== ADDED: Toast Notification Function ==========
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.classList.add('show');

  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}



// Enhance the calculate function to show share prompt
const originalCalculate = window.calculate;
window.calculate = function() {
  originalCalculate();

  // After 1 second, show subtle prompt to share
  setTimeout(() => {
    const resultBox = document.getElementById('result');
    if (resultBox.classList.contains('show')) {
      // Add subtle animation to share button
      const shareBox = document.querySelector('.share-box');
      if (shareBox) {
        shareBox.style.animation = 'pulse 1s ease';
        setTimeout(() => {
          shareBox.style.animation = '';
        }, 1000);
      }
    }
  }, 1000);

};
