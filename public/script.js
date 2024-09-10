document.addEventListener('DOMContentLoaded', function() {
  const numberForm = document.getElementById('numberForm');
  const discountCode = document.getElementById('discountCode');
  const responseMessage = document.getElementById('responseMessage');
  const crepeAnimation = document.getElementById('crepeAnimation');
  const thankyouText = document.getElementById('thankyouText');
  const container = document.querySelector('.container'); // Select the container to hide it later

  numberForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show thank you message
    responseMessage.textContent = "Thank you for signing up!";

    // Hide the form and the entire white box (container)
    container.style.display = 'none';

    // Show the crepe animation and thank you text
    crepeAnimation.style.display = 'block';
    thankyouText.style.display = 'block';

    // Show the discount code "Joaquin" after form submission
    discountCode.style.display = 'block';
  });
});
