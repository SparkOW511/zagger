// Sample product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "./assets/product1.webp",
        category: "Men"
    },
    {
        id: 2,
        name: "Summer Dress",
        price: 49.99,
        image: "./assets/tshirt.webp",
        category: "Women"
    },
    {
        id: 3,
        name: "Leather Watch",
        price: 99.99,
        image: "./assets/product1.webp",
        category: "Accessories"
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 79.99,
        image: "./assets/product1.webp",
        category: "Men"
    },
    {
        id: 5,
        name: "Slim Fit Jeans",
        price: 59.99,
        image: "./assets/product1.webp",
        category: "Women"
    },
    {
        id: 6,
        name: "Cashmere Sweater",
        price: 89.99,
        image: "./assets/product1.webp",
        category: "Women"
    },
    {
        id: 7,
        name: "Leather Boots",
        price: 129.99,
        image: "./assets/product1.webp",
        category: "Women"
    },
    {
        id: 8,
        name: "Silk Scarf",
        price: 34.99,
        image: "./assets/product1.webp",
        category: "Accessories"
    },
    {
        id: 9,
        name: "Wool Coat",
        price: 149.99,
        image: "./assets/product1.webp",
        category: "Men"
    },
    {
        id: 10,
        name: "Leather Belt",
        price: 39.99,
        image: "./assets/product1.webp",
        category: "Accessories"
    },
    {
        id: 11,
        name: "Formal Shirt",
        price: 69.99,
        image: "./assets/product1.webp",
        category: "Men"
    },
    {
        id: 12,
        name: "Designer Sunglasses",
        price: 119.99,
        image: "./assets/product1.webp",
        category: "Accessories"
    },
    {
        id: 13,
        name: "Cotton Blouse",
        price: 45.99,
        image: "./assets/product1.webp",
        category: "Women"
    },
    {
        id: 14,
        name: "Chino Pants",
        price: 59.99,
        image: "./assets/product1.webp",
        category: "Men"
    },
    {
        id: 15,
        name: "Leather Handbag",
        price: 159.99,
        image: "./assets/product1.webp",
        category: "Accessories"
    },
    {
        id: 16,
        name: "Knit Cardigan",
        price: 75.99,
        image: "./assets/product1.webp",
        category: "Women"
    }
];

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
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Add highlight class if this is the newly added item
        if (highlightItemId && item.id === parseInt(highlightItemId)) {
            cartItem.classList.add('new-item');
        }
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
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

// Display products by category
function displayProductsByCategory(category, containerId) {
    const productGrid = document.getElementById(containerId);
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => product.category === category);
    
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
    
    // Create and add image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    productCard.appendChild(img);
    
    // Create and add product name
    const name = document.createElement('h3');
    name.textContent = product.name;
    productCard.appendChild(name);
    
    // Create and add price
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${product.price.toFixed(2)}`;
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
        addToCart(productId, this);
        
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
        addToCart(productId, this);
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
function addToCart(productId, buttonElement = null) {
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

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
        // Increment quantity if product already in cart
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new product with quantity 1
        product.quantity = 1;
        cart.push(product);
    }
    
    updateCartIcon();
    
    // Save cart to local storage
    saveCartToLocalStorage();
    
    // Update cart contents without showing it
    updateCartDisplay(product.id, false);
    
    // Just show a notification instead of opening the cart
    showNotification('Product added to cart!');
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
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="cart-total-value">$0.00</span>
                </div>
                <button class="checkout-btn">Checkout</button>
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
    
    // Initialize cart
    setupCartEvents();
    
    // Update cart icon and display with items from local storage
    updateCartIcon();
    updateCartDisplay();
    
    // Display products based on current page
    const womenProductsGrid = document.getElementById('women-products-grid');
    const menProductsGrid = document.getElementById('men-products-grid');
    const allProductsGrid = document.getElementById('all-products-grid');
    
    if (womenProductsGrid) {
        console.log("Displaying women's products");
        displayProductsByCategory('Women', 'women-products-grid');
    } else if (menProductsGrid) {
        console.log("Displaying men's products");
        displayProductsByCategory('Men', 'men-products-grid');
    } else if (allProductsGrid) {
        console.log("Displaying all products");
        displayProducts();
    } else {
        console.log("No product grid found on page");
    }
    
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
    `;
    document.head.appendChild(quantityStyle);
});

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
        transition: transform 0.3s ease;
        position: relative;
    }

    .product-card:hover {
        transform: translateY(-5px);
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
`;
document.head.appendChild(style);
