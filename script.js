// script.js

// Function to generate PDF invoice
function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);

    // Header
    doc.text("TheSeller.lk", 10, 10);
    doc.setFontSize(12);
    doc.text("Contact: info@theseller.lk | +94 70 366 9199", 10, 20);
    doc.text("Invoice", 10, 40);
    doc.setFontSize(10);
    doc.text("Date: " + new Date().toLocaleDateString(), 10, 50);
    doc.text("--------------------------------------------------------", 10, 55);

    const selectedProducts = [];
    let total = 0;

    // Mapping product IDs to names
    const productNames = {
        1: "Fogg 120ml - Black",
        2: "Red Rose - Rollar",
        3: "Fogg Master - OAK | 150ml",
        4: "Hair Duster",
        5: "Fogg 120ml - Purple",
        6: "Fogg Master - Marcro | 150ml",
        7: "Fogg Master - Agar | 150ml" // Added new product
    };

    for (let i = 1; i <= 7; i++) {
        const checkbox = document.getElementById(`product${i}`);
        const quantityInput = document.getElementById(`quantity${i}`);
        if (checkbox && checkbox.checked) {
            const price = parseFloat(checkbox.value);
            const quantity = parseInt(quantityInput.value);
            const linePrice = price * quantity;
            const productName = productNames[i] || `Product ${i}`;
            selectedProducts.push(`${productName}: Qty: ${quantity}, Rs. ${linePrice.toFixed(2)}`);
            total += linePrice;
        }
    }

    if (selectedProducts.length === 0) {
        alert('Please select at least one product.');
    } else {
        let yOffset = 65;
        selectedProducts.forEach(product => {
            doc.text(product, 10, yOffset);
            yOffset += 10;
        });

        // Add total
        doc.text(`Total: Rs. ${total.toFixed(2)}`, 10, yOffset + 10);

        // Footer
        yOffset += 20;
        doc.text("Thank you for shopping with us!", 10, yOffset);
        doc.text("For any queries, please contact us at TheSeller.lk", 10, yOffset + 10);

        // Save the PDF
        doc.save("invoice.pdf");
    }
}

