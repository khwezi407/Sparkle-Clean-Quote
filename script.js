const form = document.getElementById('quote-form');
const roomsInput = document.getElementById('rooms');
const serviceInput = document.getElementById('service-type');
const extrasInputs = document.querySelectorAll('.extra');
const totalPriceElement = document.getElementById('total-price');


const basePrices= {
    standard: 50,
    deep: 80,
    move:100
};

function calculateTotal() {
    const rooms = parseInt(roomsInput.value) || 0;
    const serviceType = serviceInput.value;
    let extraTotal = 0;

  
    extrasInputs.forEach(extra => {
        if (extra.checked) {
            extraTotal += parseInt(extra.value); 
        }
    });

    const basePrice = basePrices[serviceType];
    const total = (rooms * basePrice) + extraTotal;

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
} 

roomsInput.addEventListener('input', calculateTotal);
serviceInput.addEventListener('change',calculateTotal);
extrasInputs.forEach(extra => {
    extra.addEventListener('change', calculateTotal);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thank you! Your booking for ${totalPriceElement.textContent} has been received.`);
});
calculateTotal(); 