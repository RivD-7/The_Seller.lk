// Updated JavaScript for invoice generation
function generateInvoice() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);

    // Header
    doc.setFontSize(20);
    doc.text("TheSeller.lk", 10, 10);
    doc.setFontSize(12);
    doc.text("Contact: info@theseller.lk | +94 70 366 9199", 10, 20);
    doc.text("--------------------------------------------------------", 10, 25);

    doc.setFontSize(16);
    doc.text("Invoice", 10, 40);
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 50);
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
        7: "Fogg Master - Agar | 150ml",
        8: "Vacuum Flask - 500ml",
        9: "Bottle Umbrella",
        10: "Carotone Body Lotion 215ml",
        11: "Carotone Brightening Cream 135ml",
        12: "Dalfour - Gold | 300ml",
        13: "AHA Serum - 30ml",
	14: "Axe - Musk"
    };

    for (let i = 1; i <= 14; i++) {
        const checkbox = document.getElementById(`product${i}`);
        const quantityInput = document.getElementById(`quantity${i}`);
        if (checkbox && checkbox.checked) {
            const price = parseFloat(checkbox.value);
            const quantity = parseInt(quantityInput.value);
            const linePrice = price * quantity;
            const productName = productNames[i] || `Product ${i}`;
            selectedProducts.push({
                name: productName,
                qty: quantity,
                price: linePrice.toFixed(2)
            });
            total += linePrice;
        }
    }

    if (selectedProducts.length === 0) {
        alert('Please select at least one product.');
    } else {
        let yOffset = 65;

        // Table header
        doc.setFontSize(12);
        doc.text("Item", 10, yOffset);
        doc.text("Qty", 150, yOffset, { align: "right" });
        doc.text("Price", 190, yOffset, { align: "right" });
        doc.text("--------------------------------------------------------", 10, yOffset + 10);

        // Table rows
        yOffset += 20;
        selectedProducts.forEach(product => {
            doc.text(product.name, 10, yOffset);
            doc.text(`${product.qty}`, 150, yOffset, { align: "right" });
            doc.text(`Rs. ${product.price}`, 190, yOffset, { align: "right" });
            yOffset += 10;
        });

        // Add total
        doc.text("--------------------------------------------------------", 10, yOffset);
        yOffset += 10;
        doc.setFontSize(14);
        doc.text(`Total: Rs. ${total.toFixed(2)}`, 10, yOffset);

        // Footer
        yOffset += 20;
        doc.setFontSize(12);
        doc.text("Thank you for shopping with TheSeller.lk!", 10, yOffset);
        doc.text("We appreciate your business and hope to serve you again.", 10, yOffset + 10);
        doc.text("For any queries, please contact us at info@theseller.lk", 10, yOffset + 20);

        // Save the PDF
        doc.save("invoice.pdf");
    }
}
