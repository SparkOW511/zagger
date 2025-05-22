// Product data will be loaded from JSON
let products = [];

// Fetch products from JSON file
async function fetchProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            products = await response.json();
            console.log(`Loaded ${products.length} products from JSON`);
            
            // Initialize the products on the page if we're on a product listing page
            if (document.getElementById('women-products-grid') || 
                document.getElementById('men-products-grid') || 
                document.getElementById('new-products-grid') || 
                document.getElementById('accessories-products-grid') || 
                document.getElementById('sale-products-grid') || 
                document.getElementById('search-results-grid') || 
                document.getElementById('all-products-grid')) {
                initializeProducts();
            }
            
            resolve(products);
        } catch (error) {
            console.error('Error loading products:', error);
            reject(error);
        }
    });
}

// Cart functionality
let cart = [];

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar.classList.contains('active')) {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }
}

// Toggle user account sidebar
function toggleUserAccount() {
    const accountSidebar = document.querySelector('.account-sidebar');
    const overlay = document.querySelector('.account-overlay');
    
    if (accountSidebar.classList.contains('active')) {
        accountSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        accountSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close cart when clicking on overlay
function setupCartEvents() {
    const cartIcon = document.querySelector('.fa-shopping-bag');
    const closeBtn = document.querySelector('.close-cart');
    const overlay = document.querySelector('.cart-overlay');
    
    if (cartIcon) cartIcon.parentElement.addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
    
    if (closeBtn) closeBtn.addEventListener('click', toggleCart);
    if (overlay) overlay.addEventListener('click', toggleCart);
    
    // Add click handler for category links if they use buttons
    document.querySelectorAll('.category-link').forEach(link => {
        if (link.tagName === 'BUTTON') {
            link.addEventListener('click', function() {
                if (this.getAttribute('data-href')) {
                    window.location.href = this.getAttribute('data-href');
                }
            });
        }
    });
    
    // Setup user account events
    const userIcon = document.querySelector('.fa-user');
    const closeAccountBtn = document.querySelector('.close-account');
    const accountOverlay = document.querySelector('.account-overlay');
    
    if (userIcon) userIcon.parentElement.addEventListener('click', function(e) {
        e.preventDefault();
        toggleUserAccount();
    });
    
    if (closeAccountBtn) closeAccountBtn.addEventListener('click', toggleUserAccount);
    if (accountOverlay) accountOverlay.addEventListener('click', toggleUserAccount);
}

// Update cart display
function updateCartDisplay(highlightItemId = null, openCart = false) {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-value');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        // Use salePrice instead of price for calculations
        total += item.salePrice * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Add highlight class if this is the newly added item
        if (highlightItemId && item.id === parseInt(highlightItemId)) {
            cartItem.classList.add('new-item');
        }
        
        // Format price display based on sale status
        let priceDisplay = '';
        if (item.price !== item.salePrice) {
            priceDisplay = `<span class="original-price">$${item.price.toFixed(2)}</span> <span class="sale-price">$${item.salePrice.toFixed(2)}</span>`;
        } else {
            priceDisplay = `$${item.price.toFixed(2)}`;
        }
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">${priceDisplay}</p>
                <p class="cart-item-variant">${item.selectedColor}${item.selectedSize ? ', Size ' + item.selectedSize : ''}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        
        // If this is the newly added item and we're opening the cart, scroll to it
        if (openCart && highlightItemId && item.id === parseInt(highlightItemId)) {
            setTimeout(() => {
                cartItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });
    
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Only open the cart if specifically requested
    if (openCart) {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.cart-overlay');
        
        if (cartSidebar && overlay) {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Update item quantity in cart
function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        // Remove item if quantity is 0
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
            return;
        }
        
        updateCartDisplay();
        saveCartToLocalStorage();
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartIcon();
    
    // Save cart to local storage after removing item
    saveCartToLocalStorage();
}

// Show custom confirmation modal
function showConfirmModal(message, onConfirm, onCancel) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <p>${message}</p>
            <div class="modal-buttons">
                <button class="modal-button cancel-button">Cancel</button>
                <button class="modal-button confirm-button">Confirm</button>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Center modal
    modal.style.top = `${window.scrollY + window.innerHeight/2 - modal.offsetHeight/2}px`;
    
    // Add event listeners
    const confirmButton = modal.querySelector('.confirm-button');
    const cancelButton = modal.querySelector('.cancel-button');
    
    confirmButton.addEventListener('click', () => {
        closeModal();
        if (onConfirm) onConfirm();
    });
    
    cancelButton.addEventListener('click', () => {
        closeModal();
        if (onCancel) onCancel();
    });
    
    overlay.addEventListener('click', () => {
        closeModal();
        if (onCancel) onCancel();
    });
    
    // Add modal styles if they don't exist
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }
            
            .confirm-modal {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                background-color: white;
                z-index: 1001;
                width: 90%;
                max-width: 400px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .modal-content {
                padding: 2rem;
                font-family: "Times New Roman", Times, serif;
            }
            
            .modal-content p {
                margin: 0 0 1.5rem;
                text-align: center;
                font-size: 1.1rem;
            }
            
            .modal-buttons {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .modal-button {
                flex: 1;
                padding: 0.8rem;
                border: none;
                font-family: "Times New Roman", Times, serif;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                font-size: 0.9rem;
            }
            
            .confirm-button {
                background-color: #000;
                color: white;
            }
            
            .confirm-button:hover {
                background-color: #333;
            }
            
            .cancel-button {
                background-color: #f5f5f5;
                color: #333;
                border: 1px solid #ddd;
            }
            
            .cancel-button:hover {
                background-color: #eaeaea;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Close modal function
    function closeModal() {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
    }
}

// Toggle between normal cart footer and empty cart confirmation
function toggleEmptyCartConfirm() {
    const normalFooter = document.getElementById('cart-normal-footer');
    const confirmFooter = document.getElementById('cart-confirm-footer');
    
    if (normalFooter.style.display === 'none') {
        // Switch back to normal footer
        normalFooter.style.display = 'block';
        confirmFooter.style.display = 'none';
    } else {
        // Switch to confirmation footer
        normalFooter.style.display = 'none';
        confirmFooter.style.display = 'block';
    }
}

// Empty the entire cart
function emptyCart() {
    if (cart.length === 0) return;
    
    // Show confirmation within cart footer
    toggleEmptyCartConfirm();
}

// Actually empty the cart after confirmation
function confirmEmptyCart() {
    cart = [];
    updateCartDisplay();
    updateCartIcon();
    saveCartToLocalStorage();
    showNotification('Your cart has been emptied.');
    
    // Return to normal footer
    toggleEmptyCartConfirm();
}

// Update cart icon
function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-bag');
    if (cartIcon) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.setAttribute('data-count', totalItems);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Add mobile menu button
function addMobileMenuButton() {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.onclick = toggleMobileMenu;
    navContainer.insertBefore(mobileMenuButton, navContainer.firstChild);
}

// Function to check if a product is new (less than 1 week old)
function isNewProduct(product) {
    const publishDate = new Date(product.publishDate);
    
    // Use 5/22/2025 as the reference date
    const currentDate = new Date('2025-05-22');
    const oneWeekAgo = new Date('2025-05-22');
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return publishDate >= oneWeekAgo;
}

// Display products by category
function displayProductsByCategory(category, containerId) {
    const productGrid = document.getElementById(containerId);
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    let filteredProducts;
    
    if (category === 'New') {
        // For the "New" category, filter products by date
        filteredProducts = products.filter(product => isNewProduct(product));
    } else {
        // For other categories, filter by category name
        filteredProducts = products.filter(product => product.category === category);
    }
    
    filteredProducts.forEach(product => {
        createProductCard(product, productGrid);
    });
}

// Display all products
function displayProducts() {
    const productGrid = document.querySelector('#all-products-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';

    products.forEach(product => {
        createProductCard(product, productGrid);
    });
}

// Create a product card with reliable button handling
function createProductCard(product, container) {
    // Create main card element
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);
    
    // Make the entire card clickable to view product details
    productCard.addEventListener('click', function(e) {
        // Only navigate if the click was not on the Add to Cart button
        if (!e.target.classList.contains('add-to-cart-btn')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    
    // Create and add image container with potential new badge
    const imgContainer = document.createElement('div');
    imgContainer.className = 'product-image-container';
    
    // Add "New" badge if product is new
    if (isNewProduct(product)) {
        const newBadge = document.createElement('span');
        newBadge.className = 'new-badge';
        newBadge.textContent = 'NEW';
        imgContainer.appendChild(newBadge);
    }
    
    // Create and add image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    imgContainer.appendChild(img);
    
    productCard.appendChild(imgContainer);
    
    // Create and add product name
    const name = document.createElement('h3');
    name.textContent = product.name;
    productCard.appendChild(name);
    
    // Create and add price
    const price = document.createElement('p');
    price.className = 'price';
    
    // Check if product is on sale
    if (product.price !== product.salePrice) {
        price.innerHTML = `<span class="original-price">$${product.price.toFixed(2)}</span> <span class="sale-price">$${product.salePrice.toFixed(2)}</span>`;
        
        // Add sale badge if on sale
        const saleBadge = document.createElement('span');
        saleBadge.className = 'sale-badge';
        saleBadge.textContent = 'SALE';
        imgContainer.appendChild(saleBadge);
    } else {
        price.textContent = `$${product.price.toFixed(2)}`;
    }
    
    productCard.appendChild(price);
    
    // Create button container to isolate button from card hover effects
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'relative';
    buttonContainer.style.zIndex = '10';
    
    // Create and add button with multiple event listeners for better reliability
    const button = document.createElement('button');
    button.className = 'add-to-cart-btn';
    button.textContent = 'Add to Cart';
    button.setAttribute('data-product-id', product.id);
    
    // Use both mousedown and click events for better reliability
    button.addEventListener('mousedown', function(e) {
        e.stopPropagation(); // Prevent event from bubbling to card
    });
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from bubbling to card
        console.log(`Button clicked for product ${product.id}`);
        
        // Get product ID directly from the button's dataset
        const productId = this.getAttribute('data-product-id');
        
        // Show size/color selection modal instead of adding directly
        showProductOptionsModal(productId, this);
        
        // Return false to prevent any default behavior
        return false;
    });
    
    // Touch events for mobile devices
    button.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
    
    button.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const productId = this.getAttribute('data-product-id');
        showProductOptionsModal(productId, this);
    });
    
    buttonContainer.appendChild(button);
    productCard.appendChild(buttonContainer);
    
    // Add the complete card to the container
    container.appendChild(productCard);
    
    // Double-check that the button is clickable by adding a fallback click handler to the container
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = e.target.getAttribute('data-product-id');
            addToCart(productId, e.target);
        }
    });
}

// Add to cart functionality
function addToCart(productId, buttonElement = null, selectedSize = '', selectedColor = '') {
    productId = parseInt(productId);
    console.log(`Adding product ID ${productId} to cart`);
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
    }
    
    console.log(`Found product:`, product);
    
    // Add ripple effect if button element is provided
    if (buttonElement) {
        try {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            buttonElement.appendChild(ripple);
            
            // Add success animation class
            buttonElement.classList.add('button-added');
            
            // Remove ripple and animation class after animation completes
            setTimeout(() => {
                if (ripple.parentNode === buttonElement) {
                    buttonElement.removeChild(ripple);
                }
                buttonElement.classList.remove('button-added');
            }, 1000);
        } catch (error) {
            console.error("Error during button animation:", error);
        }
    }

    // If no size or color is specified, use the first available ones
    const size = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : '');
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : '');

    // Check if product with same ID, size and color already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
    );
    
    if (existingItemIndex !== -1) {
        // Increment quantity if product already in cart with same size and color
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new product with quantity 1, making sure to include price and salePrice
        const cartItem = { 
            ...product, 
            quantity: 1, 
            selectedSize: size, 
            selectedColor: color 
        };
        cart.push(cartItem);
    }
    
    updateCartIcon();
    
    // Save cart to local storage
    saveCartToLocalStorage();
    
    // Update cart contents without showing it
    updateCartDisplay(product.id, false);
    
    // Only show the generic notification if we don't have size and color specified
    if (!selectedSize && !selectedColor) {
        showNotification('Product added to cart!');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    
    // Load cart from local storage
    loadCartFromLocalStorage();
    
    // Add cart sidebar HTML
    const cartHTML = `
        <div class="cart-overlay"></div>
        <div class="cart-sidebar">
            <div class="cart-header">
                <h2>Shopping Cart</h2>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items"></div>
            <p class="empty-cart-message">Your cart is empty</p>
            
            <!-- Normal cart footer -->
            <div class="cart-footer" id="cart-normal-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="cart-total-value">$0.00</span>
                </div>
                <div class="cart-buttons">
                    <button class="empty-cart-btn">Empty Cart</button>
                    <button class="checkout-btn">Checkout</button>
                </div>
            </div>
            
            <!-- Empty cart confirmation -->
            <div class="cart-footer cart-confirm-footer" id="cart-confirm-footer" style="display: none;">
                <div class="confirm-message">
                    <p>Are you sure you want to empty your cart?</p>
                </div>
                <div class="cart-buttons">
                    <button class="cancel-empty-btn">Cancel</button>
                    <button class="confirm-empty-btn">Confirm</button>
                </div>
            </div>
        </div>
    `;
    
    // Product options modal HTML
    const productOptionsHTML = `
        <div class="product-options-overlay" style="display: none;"></div>
        <div class="product-options-modal" style="display: none;">
            <div class="product-options-header">
                <h3>Select Options</h3>
                <button class="close-options">&times;</button>
            </div>
            <div class="product-options-content">
                <div class="product-options-info">
                    <img class="product-options-image" src="" alt="Product Image">
                    <div class="product-options-details">
                        <h4 class="product-options-name"></h4>
                        <p class="product-options-price"></p>
                    </div>
                </div>
                
                <div class="product-options-selections">
                    <div class="color-selection">
                        <h3>Color</h3>
                        <div class="options-color-list"></div>
                    </div>
                    
                    <div class="size-selection">
                        <h3>Size</h3>
                        <div class="options-size-list"></div>
                    </div>
                </div>
            </div>
            <div class="product-options-footer">
                <button class="add-to-cart-with-options">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add user account sidebar HTML
    const accountHTML = `
        <div class="account-overlay"></div>
        <div class="account-sidebar">
            <div class="account-header">
                <h2>My Account</h2>
                <button class="close-account">&times;</button>
            </div>
            <div class="account-content">
                <button class="account-btn sign-in-btn">Sign In</button>
                <button class="account-btn join-btn">Join</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', cartHTML);
    document.body.insertAdjacentHTML('beforeend', accountHTML);
    document.body.insertAdjacentHTML('beforeend', productOptionsHTML);
    
    // Add empty cart button functionality
    const emptyCartBtn = document.querySelector('.empty-cart-btn');
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', emptyCart);
    }
    
    // Add cancel and confirm buttons functionality
    const cancelEmptyBtn = document.querySelector('.cancel-empty-btn');
    const confirmEmptyBtn = document.querySelector('.confirm-empty-btn');
    
    if (cancelEmptyBtn) {
        cancelEmptyBtn.addEventListener('click', toggleEmptyCartConfirm);
    }
    
    if (confirmEmptyBtn) {
        confirmEmptyBtn.addEventListener('click', confirmEmptyCart);
    }
    
    // Initialize cart
    setupCartEvents();
    
    // Setup search functionality
    setupSearchEvents();
    
    // Update cart icon and display with items from local storage
    updateCartIcon();
    updateCartDisplay();
    
    // Add mobile menu button
    addMobileMenuButton();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add CSS for quantity controls
    const quantityStyle = document.createElement('style');
    quantityStyle.textContent = `
        .cart-item-variant {
            font-size: 0.8rem;
            color: #666;
            margin: 0.2rem 0 0.5rem;
            font-style: italic;
            font-family: "Times New Roman", Times, serif;
        }
    
        .quantity-controls {
            display: flex;
            align-items: center;
            margin: 0.5rem 0;
        }
        
        .quantity-btn {
            background: #f5f5f5;
            border: 1px solid #ddd;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-family: "Times New Roman", Times, serif;
        }
        
        .quantity-btn:hover {
            background: #eaeaea;
        }
        
        .item-quantity {
            margin: 0 0.5rem;
            min-width: 20px;
            text-align: center;
        }
        
        .cart-buttons {
            display: flex;
            gap: 10px;
            width: 100%;
        }
        
        .checkout-btn, .empty-cart-btn {
            padding: 0.8rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-family: "Times New Roman", Times, serif;
            border: none;
            text-transform: uppercase;
        }
        
        .checkout-btn {
            background-color: #000;
            color: white;
            flex: 2;
        }
        
        .empty-cart-btn {
            background-color: #f5f5f5;
            color: #333;
            flex: 1;
            border: 1px solid #ddd;
        }
        
        .checkout-btn:hover {
            background-color: #333;
        }
        
        .empty-cart-btn:hover {
            background-color: #eaeaea;
        }
        
        .cart-confirm-footer {
            background-color: #f8f8f8;
            border-top: 1px solid #eee;
        }
        
        .confirm-message {
            text-align: center;
            margin-bottom: 1rem;
            font-family: "Times New Roman", Times, serif;
        }
        
        .confirm-message p {
            margin: 0;
            padding: 0.5rem;
            font-size: 1rem;
        }
        
        .cancel-empty-btn {
            background-color: #f5f5f5;
            color: #333;
            border: 1px solid #ddd;
            flex: 1;
            padding: 0.8rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-family: "Times New Roman", Times, serif;
            text-transform: uppercase;
        }
        
        .confirm-empty-btn {
            background-color: #c00;
            color: white;
            border: none;
            flex: 1;
            padding: 0.8rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-family: "Times New Roman", Times, serif;
            text-transform: uppercase;
        }
        
        .cancel-empty-btn:hover {
            background-color: #eaeaea;
        }
        
        .confirm-empty-btn:hover {
            background-color: #a00;
        }
    `;
    document.head.appendChild(quantityStyle);
    
    // Fetch products from JSON
    fetchProducts();
});

// Function to initialize products on the page after data is loaded
function initializeProducts() {
    // Display products based on current page
    const womenProductsGrid = document.getElementById('women-products-grid');
    const menProductsGrid = document.getElementById('men-products-grid');
    const newProductsGrid = document.getElementById('new-products-grid');
    const accessoriesProductsGrid = document.getElementById('accessories-products-grid');
    const saleProductsGrid = document.getElementById('sale-products-grid');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const allProductsGrid = document.getElementById('all-products-grid');
    
    if (womenProductsGrid) {
        console.log("Displaying women's products");
        displayProductsByCategory('Women', 'women-products-grid');
    } else if (menProductsGrid) {
        console.log("Displaying men's products");
        displayProductsByCategory('Men', 'men-products-grid');
    } else if (newProductsGrid) {
        console.log("Displaying new products");
        displayProductsByCategory('New', 'new-products-grid');
    } else if (accessoriesProductsGrid) {
        console.log("Displaying accessories");
        displayProductsByCategory('Accessories', 'accessories-products-grid');
    } else if (saleProductsGrid) {
        console.log("Displaying sale products");
        displaySaleProducts();
    } else if (searchResultsGrid) {
        console.log("Displaying search results");
        displaySearchResults();
    } else if (allProductsGrid) {
        console.log("Displaying all products");
        displayProducts();
    } else {
        console.log("No product grid found on page");
    }
}

// Show product options modal for selecting size and color
function showProductOptionsModal(productId, buttonElement) {
    productId = parseInt(productId);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
    }
    
    // Get modal elements
    const modal = document.querySelector('.product-options-modal');
    const overlay = document.querySelector('.product-options-overlay');
    const closeBtn = document.querySelector('.close-options');
    const addToCartBtn = document.querySelector('.add-to-cart-with-options');
    
    // Set product details in modal
    modal.querySelector('.product-options-name').textContent = product.name;
    
    // Format price display based on sale status
    const priceContainer = modal.querySelector('.product-options-price');
    if (product.price !== product.salePrice) {
        priceContainer.innerHTML = `<span class="original-price">$${product.price.toFixed(2)}</span> <span class="sale-price">$${product.salePrice.toFixed(2)}</span>`;
    } else {
        priceContainer.textContent = `$${product.price.toFixed(2)}`;
    }
    
    modal.querySelector('.product-options-image').src = product.image;
    
    // Generate color options
    const colorList = modal.querySelector('.options-color-list');
    colorList.innerHTML = '';
    
    product.colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'options-color-btn';
        colorBtn.textContent = color;
        colorBtn.setAttribute('data-color', color);
        
        colorBtn.addEventListener('click', function() {
            // Remove selected class from all color buttons
            colorList.querySelectorAll('.options-color-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked button
            this.classList.add('selected');
        });
        
        colorList.appendChild(colorBtn);
    });
    
    // Generate size options
    const sizeList = modal.querySelector('.options-size-list');
    sizeList.innerHTML = '';
    
    product.sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'options-size-btn';
        sizeBtn.textContent = size;
        sizeBtn.setAttribute('data-size', size);
        
        sizeBtn.addEventListener('click', function() {
            // Remove selected class from all size buttons
            sizeList.querySelectorAll('.options-size-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selected class to clicked button
            this.classList.add('selected');
        });
        
        sizeList.appendChild(sizeBtn);
    });
    
    // Select first options by default
    if (colorList.firstChild) {
        colorList.firstChild.classList.add('selected');
    }
    
    if (sizeList.firstChild) {
        sizeList.firstChild.classList.add('selected');
    }
    
    // Set up add to cart button
    addToCartBtn.onclick = function() {
        const selectedColor = modal.querySelector('.options-color-btn.selected')?.getAttribute('data-color') || product.colors[0];
        const selectedSize = modal.querySelector('.options-size-btn.selected')?.getAttribute('data-size') || product.sizes[0];
        
        addToCart(productId, buttonElement, selectedSize, selectedColor);
        closeOptionsModal();
    };
    
    // Set up close button
    closeBtn.onclick = closeOptionsModal;
    overlay.onclick = closeOptionsModal;
    
    // Show modal
    modal.style.display = 'block';
    overlay.style.display = 'block';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Function to close the modal
    function closeOptionsModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add modal styles if they don't exist
    if (!document.getElementById('options-modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'options-modal-styles';
        modalStyles.textContent = `
            .product-options-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }
            
            .product-options-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                z-index: 1001;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                font-family: "Times New Roman", Times, serif;
            }
            
            .product-options-header {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .product-options-header h3 {
                margin: 0;
                font-weight: 400;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 1.1rem;
            }
            
            .close-options {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #333;
            }
            
            .product-options-content {
                padding: 1.5rem;
            }
            
            .product-options-info {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            
            .product-options-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
            }
            
            .product-options-details {
                margin-left: 1rem;
            }
            
            .product-options-name {
                margin: 0 0 0.5rem;
                font-weight: 400;
                font-size: 1rem;
            }
            
            .product-options-price {
                margin: 0;
                font-size: 1rem;
                color: #333;
            }
            
            .product-options-selections > div {
                margin-bottom: 1.5rem;
            }
            
            .product-options-selections h3 {
                margin: 0 0 0.8rem;
                font-weight: 400;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .options-color-list, .options-size-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .options-color-btn, .options-size-btn {
                border: 1px solid #ddd;
                background: white;
                padding: 0.5rem 1rem;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: "Times New Roman", Times, serif;
            }
            
            .options-color-btn:hover, .options-size-btn:hover {
                border-color: #999;
            }
            
            .options-color-btn.selected, .options-size-btn.selected {
                background: #000;
                color: white;
                border-color: #000;
            }
            
            .product-options-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
            }
            
            .add-to-cart-with-options {
                width: 100%;
                background-color: #000;
                color: white;
                border: none;
                padding: 1rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                font-family: "Times New Roman", Times, serif;
            }
            
            .add-to-cart-with-options:hover {
                background-color: #333;
            }
            
            @media (max-width: 480px) {
                .product-options-modal {
                    width: 95%;
                }
                
                .product-options-content {
                    padding: 1rem;
                }
                
                .product-options-info {
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// Generate star rating HTML based on rating value
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Display product details on product page
function displayProductDetails(productId) {
    // If products haven't loaded yet, wait for them
    if (products.length === 0) {
        console.log("Products not loaded yet, waiting to display details");
        setTimeout(() => displayProductDetails(productId), 100);
        return;
    }
    
    // Convert productId from string to number
    productId = parseInt(productId);
    
    // Find the product by ID
    const product = products.find(p => p.id === productId);
    
    // If product not found, redirect to home page
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        window.location.href = 'index.html';
        return;
    }
    
    // Get the product details container
    const productDetailsContainer = document.getElementById('product-details');
    if (!productDetailsContainer) return;
    
    // Update page title
    document.title = `${product.name} - Zagger`;
    
    // Format price display based on sale status
    let priceHTML = '';
    if (product.price !== product.salePrice) {
        priceHTML = `
            <p class="product-detail-price">
                <span class="original-price">$${product.price.toFixed(2)}</span>
                <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
                <span class="sale-label">SALE</span>
            </p>
        `;
    } else {
        priceHTML = `<p class="product-detail-price">$${product.price.toFixed(2)}</p>`;
    }
    
    // Create product details HTML
    const productDetailsHTML = `
        <div class="product-detail-layout">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                ${isNewProduct(product) ? '<span class="new-badge">NEW</span>' : ''}
            </div>
            <div class="product-info-container">
                <h1 class="product-detail-name">${product.name}</h1>
                <div class="product-detail-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-value">${product.rating.toFixed(1)}</span>
                </div>
                ${priceHTML}
                <p class="product-detail-category">Category: ${product.category}</p>
                
                <div class="product-detail-options">
                    <div class="size-selection">
                        <h3>Size</h3>
                        <div class="size-options">
                            ${product.sizes.map(size => `<button class="size-option">${size}</button>`).join('')}
                        </div>
                    </div>
                    
                    <div class="color-selection">
                        <h3>Color</h3>
                        <div class="color-options">
                            ${product.colors.map(color => `<button class="color-option" data-color="${color.toLowerCase().replace('/', '-')}">${color}</button>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="product-detail-actions">
                    <button class="product-detail-add-to-cart" data-product-id="${product.id}">ADD TO CART</button>
                </div>
                
                <div class="product-detail-description">
                    <h2>Product Details</h2>
                    <p>${product.description}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add similar products section HTML
    const similarProductsHTML = `
        <div class="similar-products-section">
            <h2>You May Also Like</h2>
            <div class="product-grid" id="similar-products-grid"></div>
        </div>
    `;
    
    // Set the HTML content
    productDetailsContainer.innerHTML = productDetailsHTML + similarProductsHTML;
    
    // Display similar products
    displaySimilarProducts(product);
    
    // Add event listeners for size buttons
    const sizeButtons = productDetailsContainer.querySelectorAll('.size-option');
    if (sizeButtons.length > 0) {
        // Select the first size by default
        sizeButtons[0].classList.add('selected');
        
        sizeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                sizeButtons.forEach(btn => btn.classList.remove('selected'));
                // Add selected class to clicked button
                this.classList.add('selected');
            });
        });
    }
    
    // Add event listeners for color buttons
    const colorButtons = productDetailsContainer.querySelectorAll('.color-option');
    if (colorButtons.length > 0) {
        // Select the first color by default
        colorButtons[0].classList.add('selected');
        
        colorButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                colorButtons.forEach(btn => btn.classList.remove('selected'));
                // Add selected class to clicked button
                this.classList.add('selected');
            });
        });
    }
    
    // Add event listener for add to cart button
    const addToCartBtn = productDetailsContainer.querySelector('.product-detail-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const selectedSize = productDetailsContainer.querySelector('.size-option.selected')?.textContent || '';
            const selectedColor = productDetailsContainer.querySelector('.color-option.selected')?.textContent || '';
            
            // Pass the selected size and color to the addToCart function
            addToCart(productId, this, selectedSize, selectedColor);
            
            // Show specific notification
            showNotification(`Added ${product.name} (${selectedColor}, Size ${selectedSize}) to cart!`);
            return false;
        });
    }
    
    // Add product detail styles
    const productDetailStyle = document.createElement('style');
    productDetailStyle.textContent = `
        .product-details-container {
            max-width: 1200px;
            margin: 6rem auto 2rem;
            padding: 1rem;
        }
        
        .similar-products-section {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
        }
        
        .similar-products-section h2 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 1.5rem;
            font-weight: 300;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .product-detail-layout {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
        }
        
        .product-image-container {
            flex: 1;
            min-width: 300px;
            position: relative;
        }
        
        .product-detail-image {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        
        .product-info-container {
            flex: 1;
            min-width: 300px;
        }
        
        .product-detail-name {
            font-family: "Times New Roman", Times, serif;
            font-weight: 400;
            font-size: 1.5rem;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            letter-spacing: 1px;
        }
        
        .product-detail-rating {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .product-detail-rating .fa-star, 
        .product-detail-rating .fa-star-half-alt {
            color: #ffc107;
            margin-right: 2px;
        }
        
        .product-detail-rating .far.fa-star {
            color: #e0e0e0;
            margin-right: 2px;
        }
        
        .rating-value {
            margin-left: 8px;
            font-size: 0.9rem;
            color: #666;
        }
        
        .product-detail-price {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            font-family: "Times New Roman", Times, serif;
        }
        
        .original-price {
            text-decoration: line-through;
            color: #999;
            margin-right: 10px;
        }
        
        .sale-price {
            color: #c00;
            font-weight: bold;
        }
        
        .sale-label {
            display: inline-block;
            background-color: #c00;
            color: white;
            padding: 2px 6px;
            font-size: 0.7rem;
            margin-left: 10px;
            vertical-align: middle;
        }
        
        .product-detail-category {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 1.5rem;
            font-family: "Times New Roman", Times, serif;
        }
        
        .product-detail-options {
            margin-bottom: 2rem;
        }
        
        .size-selection, .color-selection {
            margin-bottom: 1.5rem;
        }
        
        .product-detail-options h3 {
            font-family: "Times New Roman", Times, serif;
            font-weight: 400;
            font-size: 1rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .size-options, .color-options {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .size-option, .color-option {
            border: 1px solid #ddd;
            background: white;
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            cursor: pointer;
            font-family: "Times New Roman", Times, serif;
            transition: all 0.2s ease;
        }
        
        .size-option:hover, .color-option:hover {
            border-color: #000;
        }
        
        .size-option.selected, .color-option.selected {
            background: #000;
            color: white;
            border-color: #000;
        }
        
        .product-detail-add-to-cart {
            background-color: #000;
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-family: "Times New Roman", Times, serif;
            width: 100%;
        }
        
        .product-detail-add-to-cart:hover {
            background-color: #333;
        }
        
        .product-detail-description {
            margin-top: 3rem;
            padding-top: 1.5rem;
            border-top: 1px solid #eee;
        }
        
        .product-detail-description h2 {
            font-family: "Times New Roman", Times, serif;
            font-weight: 400;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            letter-spacing: 1px;
        }
        
        .product-detail-description p {
            font-family: "Times New Roman", Times, serif;
            line-height: 1.6;
            color: #444;
        }
        
        @media (max-width: 768px) {
            .product-detail-layout {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(productDetailStyle);
}

// Add CSS for notifications and mobile menu
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #000;
        color: white;
        padding: 1rem 2rem;
        font-family: "Times New Roman", Times, serif;
        font-size: 0.9rem;
        letter-spacing: 1px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #000;
        cursor: pointer;
        font-family: "Times New Roman", Times, serif;
    }

    /* Add padding for category pages */
    .women-products, .men-products, .accessories-products, .new-products, .sale-products {
        margin-top: 60px !important;
        padding-top: 1rem;
    }

    /* Add padding for main page featured products */
    .featured-products {
        padding-top: 3rem;
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }

        .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            padding: 2rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .nav-links.active {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .nav-links li {
            margin: 1.5rem 0;
        }
    }

    .product-card {
        background: white;
        border-radius: 0;
        padding: 0;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        cursor: pointer;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .product-image-container {
        position: relative;
        overflow: hidden;
    }

    .new-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: #000;
        color: white;
        padding: 5px 10px;
        font-size: 0.7rem;
        font-weight: bold;
        letter-spacing: 1px;
        z-index: 2;
        font-family: "Times New Roman", Times, serif;
    }
    
    .sale-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #c00;
        color: white;
        padding: 5px 10px;
        font-size: 0.7rem;
        font-weight: bold;
        letter-spacing: 1px;
        z-index: 2;
        font-family: "Times New Roman", Times, serif;
    }

    .product-card img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

    .product-card h3 {
        margin: 1rem 0;
        font-family: "Times New Roman", Times, serif;
        font-weight: 400;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 0 1.5rem;
    }

    .price {
        color: #000;
        font-weight: 400;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        padding: 0 1.5rem;
        font-family: "Times New Roman", Times, serif;
    }
    
    .original-price {
        text-decoration: line-through;
        color: #999;
        margin-right: 10px;
    }
    
    .sale-price {
        color: #c00;
        font-weight: bold;
    }

    .add-to-cart {
        width: calc(100% - 3rem);
        margin: 0 1.5rem 1.5rem;
        padding: 0.8rem;
        background-color: #000;
        color: white;
        border: none;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-family: "Times New Roman", Times, serif;
    }

    .add-to-cart:hover {
        background-color: #333;
    }
    
    .no-products-message {
        text-align: center;
        padding: 3rem 1rem;
        font-family: "Times New Roman", Times, serif;
        font-size: 1.2rem;
        color: #666;
        width: 100%;
    }
    
    /* Search Slider Styles */
    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .search-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .search-slider {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        z-index: 2000;
        overflow-y: auto;
        padding: 20px;
    }
    
    .search-slider.active {
        right: 0;
    }
    
    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e5e5;
    }
    
    .search-header h2 {
        font-size: 1.5rem;
        font-weight: 300;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin: 0;
    }
    
    .close-search {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #000;
    }
    
    .search-container {
        flex: 1;
    }
    
    .search-input-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        padding: 0.5rem 0;
    }
    
    .search-icon {
        color: #777;
        margin-right: 0.5rem;
    }
    
    .search-input {
        flex: 1;
        border: none;
        padding: 0.5rem 0;
        font-size: 1rem;
        font-family: "Times New Roman", Times, serif;
        outline: none;
    }
    
    .popular-searches,
    .helpful-links {
        margin-bottom: 2.5rem;
    }
    
    .popular-searches h3,
    .helpful-links h3 {
        margin-bottom: 1rem;
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
        color: #333;
    }
    
    .search-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .search-links li {
        margin-bottom: 0.8rem;
    }
    
    .search-links a {
        color: #333;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s ease;
    }
    
    .search-links a:hover {
        color: #000;
        text-decoration: underline;
    }
    
    @media (max-width: 480px) {
        .search-slider {
            width: 100%;
            right: -100%;
        }
    }
`;
document.head.appendChild(style);

// Function to check if a product is on sale
function isOnSale(product) {
    return product.price !== product.salePrice;
}

// Display products on sale
function displaySaleProducts() {
    const productGrid = document.getElementById('sale-products-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    // Filter products that are on sale (price differs from salePrice)
    const saleProducts = products.filter(product => isOnSale(product));
    
    if (saleProducts.length === 0) {
        // If no sale products, display a message
        const noSaleMessage = document.createElement('div');
        noSaleMessage.className = 'no-products-message';
        noSaleMessage.textContent = 'There are currently no products on sale.';
        productGrid.appendChild(noSaleMessage);
        return;
    }
    
    // Display each sale product
    saleProducts.forEach(product => {
        createProductCard(product, productGrid);
    });
}

// Toggle search slider
function toggleSearch() {
    const searchSlider = document.querySelector('.search-slider');
    const overlay = document.querySelector('.search-overlay');
    
    if (searchSlider.classList.contains('active')) {
        searchSlider.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    } else {
        searchSlider.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.querySelector('.search-input').focus();
        
        // Load top rated products if not already loaded
        if (!document.querySelector('#popular-products-list').children.length) {
            displayTopRatedProducts();
        }
    }
}

// Display top rated products in the popular searches section
function displayTopRatedProducts() {
    const popularList = document.getElementById('popular-products-list');
    if (!popularList) return;
    
    // Clear the list first
    popularList.innerHTML = '';
    
    // Sort products by rating (highest first)
    const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    
    // Take top 5 products
    const topRatedProducts = sortedProducts.slice(0, 5);
    
    // Add each product as a list item
    topRatedProducts.forEach(product => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `product.html?id=${product.id}`;
        link.textContent = product.name;
        
        // Add click event to handle the link click
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = this.href;
            toggleSearch(); // Close the search slider
        });
        
        listItem.appendChild(link);
        popularList.appendChild(listItem);
    });
}

// Check if a product matches the search query
function productMatchesSearch(product, searchQuery) {
    searchQuery = searchQuery.toLowerCase();
    
    // Search in product name
    if (product.name.toLowerCase().includes(searchQuery)) {
        return true;
    }
    
    // Search in product description
    if (product.description && product.description.toLowerCase().includes(searchQuery)) {
        return true;
    }
    
    // Search in product category
    if (product.category.toLowerCase().includes(searchQuery)) {
        return true;
    }
    
    // Check if search query is a color that product has
    if (product.colors && product.colors.some(color => color.toLowerCase().includes(searchQuery))) {
        return true;
    }
    
    return false;
}

// Display search results
function displaySearchResults() {
    // Get the search query from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    // If no search query provided, redirect to home page
    if (!searchQuery) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display the search query
    const searchQueryDisplay = document.getElementById('search-query-display');
    if (searchQueryDisplay) {
        searchQueryDisplay.textContent = searchQuery;
    }
    
    // Set document title
    document.title = `Search: ${searchQuery} - Zagger`;
    
    // Check if products are loaded
    if (products.length === 0) {
        console.log("Products not loaded yet, waiting to display search results");
        setTimeout(() => displaySearchResults(), 100);
        return;
    }
    
    // Get products grid
    const resultsGrid = document.getElementById('search-results-grid');
    if (!resultsGrid) return;
    
    // Filter products that match the search query
    const matchingProducts = products.filter(product => productMatchesSearch(product, searchQuery));
    
    // If no matching products found
    if (matchingProducts.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = `No products found matching "${searchQuery}". Please try a different search.`;
        resultsGrid.appendChild(noResultsMessage);
        return;
    }
    
    // Display matching products
    matchingProducts.forEach(product => {
        createProductCard(product, resultsGrid);
    });
}

// Add search events
function setupSearchEvents() {
    const searchIcons = document.querySelectorAll('.fa-search');
    const closeBtn = document.querySelector('.close-search');
    const overlay = document.querySelector('.search-overlay');
    const searchInput = document.querySelector('.search-input');
    
    // Add click event to all search icons (there might be multiple across the site)
    if (searchIcons.length > 0) {
        searchIcons.forEach(icon => {
            icon.parentElement.addEventListener('click', function(e) {
                e.preventDefault();
                toggleSearch();
            });
        });
    }
    
    if (closeBtn) closeBtn.addEventListener('click', toggleSearch);
    if (overlay) overlay.addEventListener('click', toggleSearch);
    
    // Add functionality to search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Redirect to search results page with search query as parameter
                    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
                    toggleSearch(); // Close the search slider
                }
            }
        });
    }
}

// Get similar products for a given product
function getSimilarProducts(product, maxCount = 4) {
    // Find products in the same category
    let similarProducts = products.filter(p => 
        p.id !== product.id && // Exclude current product
        p.category === product.category // Same category
    );
    
    // If not enough products, add some from other categories
    if (similarProducts.length < maxCount) {
        const otherProducts = products.filter(p => 
            p.id !== product.id && // Exclude current product
            p.category !== product.category // Different category
        );
        
        // Sort by rating to get the best products
        otherProducts.sort((a, b) => b.rating - a.rating);
        
        // Add enough products to reach maxCount
        similarProducts = [...similarProducts, ...otherProducts.slice(0, maxCount - similarProducts.length)];
    }
    
    // Sort by rating and limit to maxCount
    similarProducts.sort((a, b) => b.rating - a.rating);
    return similarProducts.slice(0, maxCount);
}

// Display similar products on product detail page
function displaySimilarProducts(product) {
    const similarProductsContainer = document.getElementById('similar-products-grid');
    if (!similarProductsContainer) return;
    
    const similarProducts = getSimilarProducts(product);
    
    similarProductsContainer.innerHTML = '';
    
    similarProducts.forEach(similarProduct => {
        createProductCard(similarProduct, similarProductsContainer);
    });
}
