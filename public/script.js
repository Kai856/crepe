document.addEventListener('DOMContentLoaded', function() {
  const numberForm = document.getElementById('numberForm');
  const nameInput = document.getElementById('name');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const responseMessage = document.getElementById('responseMessage');
  const crepeAnimation = document.getElementById('crepeAnimation');
  const thankyouText = document.getElementById('thankyouText');
  const container = document.querySelector('.container');
  const discountCode = document.getElementById('discountCode');

  numberForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const name = nameInput.value;
    const phoneNumber = phoneNumberInput.value;

    // Validate input
    if (name === "" || phoneNumber === "") {
      responseMessage.textContent = "Please fill out all fields.";
      return;
    }

    // Upload data to Firebase Firestore
    db.collection("signups").add({
      name: name,
      phoneNumber: phoneNumber,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      // Success feedback
      responseMessage.textContent = "Thank you for signing up!";
      container.style.display = 'none';
      crepeAnimation.style.display = 'block';
      thankyouText.style.display = 'block';
      discountCode.style.display = 'block';
    })
    .catch((error) => {
      responseMessage.textContent = `Error: ${error.message}`;
    });
  });
});
