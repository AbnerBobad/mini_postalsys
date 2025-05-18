document.getElementById('cal_btn').addEventListener('click', function() {
    // Get user inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const shippingMethod = document.getElementById('shippingMethod').value;

    // Cost per 10 kg
    const costPerUnitWeight = 2.5;

    // Shipping method fees
    let shippingFee = 0;
    if (shippingMethod === 'oneDay') {
        shippingFee = 10;
    } else if (shippingMethod === 'twoDay') {
        shippingFee = 7;
    }

    // Calculate total cost (using the weight of the package)
    const totalCost = (weight * costPerUnitWeight) + shippingFee;

    // Display result
    document.getElementById('result').innerHTML = `Total Shipping Cost: $${totalCost.toFixed(2)}`;

    // Reset the form input fields after calculation
    document.getElementById('weight').value = '';  // Reset weight input
    document.getElementById('shippingMethod').selectedIndex = 0;  // Reset shipping method to default (One-Day)
});

