// shopping-cart.js
// Complete shopping cart functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the shopping cart
    initializeCart();
});

function initializeCart() {
    // Get all cart items
    const cartItems = document.querySelectorAll('.cart-item');
    
    // Attach event listeners to each cart item
    cartItems.forEach(item => {
        attachItemEventListeners(item);
    });
    
    // Update total price initially
    updateTotalPrice();
}

function attachItemEventListeners(item) {
    // Quantity buttons
    const plusBtn = item.querySelector('.plus-btn');
    const minusBtn = item.querySelector('.minus-btn');
    const quantitySpan = item.querySelector('.quantity');
    
    // Delete button
    const deleteBtn = item.querySelector('.delete-btn');
    
    // Like button (heart)
    const likeBtn = item.querySelector('.like-btn');
    
    // Add event listeners
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            increaseQuantity(item, quantitySpan);
        });
    }
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            decreaseQuantity(item, quantitySpan);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            deleteItem(item);
        });
    }
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            toggleLike(likeBtn);
        });
    }
}

// Increase quantity function
function increaseQuantity(item, quantitySpan) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;
    
    // Update item subtotal
    updateItemSubtotal(item, currentQuantity);
    
    // Update total price
    updateTotalPrice();
}

// Decrease quantity function
function decreaseQuantity(item, quantitySpan) {
    let currentQuantity = parseInt(quantitySpan.textContent);
    
    // Prevent quantity from going below 1
    if (currentQuantity > 1) {
        currentQuantity--;
        quantitySpan.textContent = currentQuantity;
        
        // Update item subtotal
        updateItemSubtotal(item, currentQuantity);
        
        // Update total price
        updateTotalPrice();
    }
}

// Update individual item subtotal
function updateItemSubtotal(item, quantity) {
    const priceElement = item.querySelector('.item-price');
    const subtotalElement = item.querySelector('.item-subtotal');
    
    if (priceElement && subtotalElement) {
        // Extract price (assuming format like "$25.99" or "25.99")
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        let subtotal = price * quantity;
        
        // Format subtotal with 2 decimal places
        subtotalElement.textContent = '$' + subtotal.toFixed(2);
    }
}

// Delete item from cart
function deleteItem(item) {
    // Add fade-out animation
    item.style.transition = 'opacity 0.3s ease';
    item.style.opacity = '0';
    
    // Remove after animation
    setTimeout(() => {
        item.remove();
        updateTotalPrice();
        
        // Check if cart is empty
        checkEmptyCart();
    }, 300);
}

// Toggle like button
function toggleLike(likeBtn) {
    // Toggle between liked and unliked states
    likeBtn.classList.toggle('liked');
    
    // Change color (you can customize this)
    if (likeBtn.classList.contains('liked')) {
        likeBtn.style.color = '#ff0000'; // Red when liked
        likeBtn.style.fill = '#ff0000'; // For SVG icons
    } else {
        likeBtn.style.color = '#ccc'; // Gray when not liked
        likeBtn.style.fill = '#ccc'; // For SVG icons
    }
}

// Update total price
function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.querySelector('.total-price');
    
    if (!totalPriceElement) return;
    
    let total = 0;
    
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const priceElement = item.querySelector('.item-price');
        
        if (priceElement) {
            let price = parseFloat(priceElement.textContent.replace('$', ''));
            total += price * quantity;
        }
    });
    
    // Format total with 2 decimal places
    totalPriceElement.textContent = '$' + total.toFixed(2);
}

// Check if cart is empty
function checkEmptyCart() {
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartItems.length === 0) {
        // Create empty cart message
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px';
        emptyMessage.innerHTML = '<h3>Your cart is empty</h3><p>Continue shopping to add items</p>';
        
        // Add to cart container
        if (cartContainer) {
            cartContainer.appendChild(emptyMessage);
        }
    }
}

// Additional helper function to update quantities from input fields
function updateQuantityFromInput(input, item) {
    let newQuantity = parseInt(input.value);
    
    // Validate input
    if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
        input.value = 1;
    }
    
    // Update quantity display
    const quantitySpan = item.querySelector('.quantity');
    if (quantitySpan) {
        quantitySpan.textContent = newQuantity;
    }
    
    // Update item subtotal
    updateItemSubtotal(item, newQuantity);
    
    // Update total price
    updateTotalPrice();
}

// Function to handle bulk actions (if needed)
function addBulkActionListeners() {
    // Select all button
    const selectAllBtn = document.querySelector('.select-all');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.item-select');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        });
    }
    
    // Delete selected button
    const deleteSelectedBtn = document.querySelector('.delete-selected');
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', function() {
            const selectedItems = document.querySelectorAll('.item-select:checked');
            selectedItems.forEach(checkbox => {
                const item = checkbox.closest('.cart-item');
                if (item) {
                    deleteItem(item);
                }
            });
        });
    }
}

// Initialize bulk actions if they exist
addBulkActionListeners();
