document.getElementById('trackForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const trackingNumber = this.trackingNumber.value.trim();
    const resultDiv = document.getElementById('trackingResult');
    resultDiv.innerHTML = `<p>Loading...</p>`; // Optional loading indicator
  
    try {
      const response = await fetch(`/track/${trackingNumber}`);
      const data = await response.json();
  
      if (response.ok) {
        resultDiv.innerHTML = `
          <p><strong>Tracking Number:</strong> ${data.tracking_number}</p>
          <p><strong>Sender Name:</strong> ${data.sender_name}</p>
          <p><strong>Sender Address:</strong> ${data.sender_address}</p>
          <p><strong>Receiver Name:</strong> ${data.receiver_name}</p>
          <p><strong>Receiver Address:</strong> ${data.receiver_address}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Weight:</strong> ${data.weight} kg</p>
          <p><strong>Shipping Method:</strong> ${data.shipping_method}</p>
          <p><strong>Total Cost:</strong> ${data.total_cost}</p>
        `;
  
        // Reset form after data is displayed
        this.reset();
      } else {
        resultDiv.innerHTML = `<p class="text-danger">${data.error}</p>`;
      }
    } catch (err) {
      resultDiv.innerHTML = `<p class="text-danger">Error fetching package data.</p>`;
    }
  });
  
