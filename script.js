const basePrices = { standard: 50, deep: 80, move: 100 };

const form = document.getElementById('quote-form');
const roomsInput = document.getElementById('rooms');
const serviceInput = document.getElementById('service-type');
const extrasInputs = document.querySelectorAll('.extra');
const totalPriceEl = document.getElementById('total-price');
const quoteTotalHidden = document.getElementById('quote-total');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const visitCountEl = document.getElementById('visit-count');

function calculateTotal() {
  const rooms = parseInt(roomsInput.value) || 0;
  const serviceType = serviceInput.value;
  let extraTotal = 0;
  
  extrasInputs.forEach(extra => {
    if (extra.checked) extraTotal += parseInt(extra.value);
  });
  
  const total = (rooms * basePrices[serviceType]) + extraTotal;
  totalPriceEl.textContent = `$${total.toFixed(2)}`;
  quoteTotalHidden.value = total.toFixed(2);
  return total;
}

roomsInput.addEventListener('input', calculateTotal);
serviceInput.addEventListener('change', calculateTotal);
extrasInputs.forEach(extra => {
  extra.addEventListener('change', calculateTotal);
});

async function fetchVisitorCount() {
  visitCountEl.textContent = '000'; 
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const formData = {
    full_name: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    preferred_contact: document.getElementById('preferred-contact').value,
    notes: document.getElementById('notes').value,
    rooms: document.getElementById('rooms').value,
    service_type: document.getElementById('service-type').value,
    extras: Array.from(document.querySelectorAll('.extra:checked')).map(cb => cb.value),
    quote_total: quoteTotalHidden.value,
    timestamp: new Date().toISOString()
  };
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    formMessage.className = 'form-message success';
    formMessage.textContent = '✅ Demo mode: Form data ready for backend integration!';
    console.log('Form data to send:', formData);
    
  } catch (err) {
    console.error('Submission error:', err);
    formMessage.className = 'form-message error';
    formMessage.textContent = '⚠️ Error submitting. Check console for details.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book This Price';
    
    setTimeout(() => {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }, 5000);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  calculateTotal();
  fetchVisitorCount();
});
