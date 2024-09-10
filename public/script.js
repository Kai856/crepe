document.getElementById('numberForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const responseMessage = document.getElementById('responseMessage');

  try {
    // Store data in Firestore
    await database.collection('subscribers').add({
      name: name,
      phoneNumber: phoneNumber,
      timestamp: new Date().toISOString()
    });

    responseMessage.textContent = "Name and phone number stored successfully!";
    responseMessage.style.color = "green";

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('phoneNumber').value = '';

    // Hide the form
    document.querySelector('.container').style.display = 'none';

    // Display the crepe animation
    document.getElementById('crepeAnimation').style.display = 'block';
    document.getElementById('thankyouText').style.display = 'block';
  } catch (error) {
    responseMessage.textContent = "Error storing the information: " + error;
    responseMessage.style.color = "red";
  }
});
