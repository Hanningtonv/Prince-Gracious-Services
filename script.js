/* ==========================================================================
   1. PAGE ROUTING & TAB NAVIGATION
   ========================================================================== */
function switchTab(pageId) {
  // Hide all sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(`page-${pageId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update active status on desktop navigation buttons
  const desktopBtns = document.querySelectorAll('.nav-btn');
  desktopBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Find matching desktop button and activate
  const activeDesktopBtn = Array.from(desktopBtns).find(btn => 
    btn.getAttribute('onclick').includes(`'${pageId}'`)
  );
  if (activeDesktopBtn) {
    activeDesktopBtn.classList.add('active');
  }

  // Update active status on mobile navigation buttons
  const mobileBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  const activeMobileBtn = Array.from(mobileBtns).find(btn => 
    btn.getAttribute('onclick').includes(`'${pageId}'`)
  );
  if (activeMobileBtn) {
    activeMobileBtn.classList.add('active');
  }

  // Close mobile drawer if open
  const drawer = document.getElementById('mobileDrawer');
  if (drawer.classList.contains('open')) {
    drawer.classList.remove('open');
  }

  // Scroll smooth to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   2. MOBILE DRAWER TOGGLE
   ========================================================================== */
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileDrawer');
  drawer.classList.toggle('open');
}

/* ==========================================================================
   3. INSTANT PRICING ESTIMATOR
   ========================================================================== */
const priceMatrix = {
  office: { small: "KES 3,000 - 5,000", medium: "KES 6,000 - 10,000", large: "KES 12,000+" },
  kitchen: { small: "KES 2,000 - 3,500", medium: "KES 4,000 - 6,000", large: "KES 7,000+" },
  carpet: { small: "KES 1,500 - 2,500", medium: "KES 3,000 - 5,000", large: "KES 6,000+" },
  fumigation: { small: "KES 2,500 - 4,000", medium: "KES 4,500 - 7,000", large: "KES 8,000+" },
  house: { small: "KES 2,500 - 4,000", medium: "KES 4,500 - 7,500", large: "KES 8,500+" }
};

function calculateEstimate() {
  const service = document.getElementById('serviceSelect').value;
  const size = document.getElementById('sizeSelect').value;
  const priceDisplay = document.getElementById('estimatedPrice');

  if (service && size && priceMatrix[service]) {
    priceDisplay.textContent = priceMatrix[service][size];
  } else {
    priceDisplay.textContent = "Select options above";
  }
}

/* ==========================================================================
   4. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================================================
   5. WHATSAPP BOOKING SUBMISSION
   ========================================================================== */
function handleBookingSubmit(event) {
  event.preventDefault();

  const serviceSelect = document.getElementById('serviceSelect');
  const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
  
  const sizeSelect = document.getElementById('sizeSelect');
  const sizeText = sizeSelect.options[sizeSelect.selectedIndex].text;
  
  const custName = document.getElementById('custName').value.trim();
  const custLocation = document.getElementById('custLocation').value.trim();
  const estimatedPrice = document.getElementById('estimatedPrice').textContent;

  const phoneNumber = "254740470804"; // Prince-Gracious contact number

  // Trigger smooth feedback popup
  showToast("Redirecting to WhatsApp to finalize your booking...");

  // Format WhatsApp message text
  const message = `Hello *Prince-Gracious Services*! 👋\n\nI would like to make a booking inquiry:\n\n👤 *Name:* ${custName}\n📍 *Location:* ${custLocation}\n🧹 *Service:* ${serviceText}\n📐 *Property Size:* ${sizeText}\n💰 *Estimated Quote:* ${estimatedPrice}\n\nPlease confirm availability and details. Thank you!`;

  // Encode text for URL format
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp in a new tab after a brief delay for the toast effect
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
  }, 800);
}