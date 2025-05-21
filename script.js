// Sample product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "./assets/product1.webp",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"],
        description: "Minimalist and versatile, this classic t-shirt is crafted from premium cotton for exceptional comfort and durability. Perfect for everyday wear, it features a clean design that pairs effortlessly with any outfit.",
        rating: 4.7
    },
    {
        id: 2,
        name: "Summer Dress",
        price: 49.99,
        image: "./assets/tshirt.webp",
        category: "Women",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue", "Yellow", "Pink"],
        description: "Embrace the season with this lightweight summer dress featuring a flattering silhouette and breathable fabric. The vibrant pattern and comfortable fit make it perfect for warm days and special occasions.",
        rating: 4.5
    },
    {
        id: 3,
        name: "Leather Watch",
        price: 99.99,
        image: "./assets/product1.webp",
        category: "Accessories",
        sizes: ["One Size"],
        colors: ["Brown", "Black"],
        description: "This sophisticated timepiece combines classic design with modern functionality. Featuring genuine leather straps and precision quartz movement, it's the perfect accessory for any occasion.",
        rating: 4.8
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 79.99,
        image: "./assets/product1.webp",
        category: "Men",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "Black", "Washed Blue"],
        description: "A wardrobe staple, this premium denim jacket offers timeless style and versatility. Made from high-quality cotton with just the right amount of stretch, it provides both comfort and durability.",
        rating: 4.6
    },
    {
        id: 5,
        name: "Slim Fit Jeans",
        price: 59.99,
        image: "./assets/product1.webp",
        category: "Women",
        sizes: ["24", "26", "28", "30", "32"],
        colors: ["Dark Blue", "Light Blue", "Black"],
        description: "These slim-fit jeans combine style and comfort with their premium stretch denim fabric. The flattering cut and modern design make them perfect for both casual and dressier occasions.",
        rating: 4.4
    },
    {
        id: 6,
        name: "Cashmere Sweater",
        price: 89.99,
        image: "./assets/product1.webp",
        category: "Women",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Cream", "Gray", "Black", "Navy"],
        description: "Indulge in luxury with this ultra-soft cashmere sweater. The timeless design and exceptional warmth make it a perfect addition to your fall and winter wardrobe.",
        rating: 4.9
    },
    {
        id: 7,
        name: "Leather Boots",
        price: 129.99,
        image: "./assets/product1.webp",
        category: "Women",
        sizes: ["36", "37", "38", "39", "40", "41"],
        colors: ["Black", "Brown", "Tan"],
        description: "Step out in style with these genuine leather boots featuring a comfortable heel and durable construction. Perfect for all-day wear, they add a touch of sophistication to any outfit.",
        rating: 4.7
    },
    {
        id: 8,
        name: "Silk Scarf",
        price: 34.99,
        image: "./assets/product1.webp",
        category: "Accessories",
        sizes: ["One Size"],
        colors: ["Floral", "Geometric", "Solid"],
        description: "Elevate any outfit with this luxurious silk scarf. The premium material and elegant design make it perfect for adding a touch of sophistication to both casual and formal looks.",
        rating: 4.6
    },
    {
        id: 9,
        name: "Wool Coat",
        price: 149.99,
        image: "./assets/product1.webp",
        category: "Men",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Charcoal", "Navy", "Camel"],
        description: "Brave the cold in style with this premium wool coat. The classic design and superior insulation provide warmth without compromising on sophistication.",
        rating: 4.8
    },
    {
        id: 10,
        name: "Leather Belt",
        price: 39.99,
        image: "./assets/product1.webp",
        category: "Accessories",
        sizes: ["85cm", "90cm", "95cm", "100cm"],
        colors: ["Black", "Brown", "Tan"],
        description: "Crafted from genuine leather, this versatile belt features a timeless design and durable metal buckle. Perfect for adding a finishing touch to both casual and formal outfits.",
        rating: 4.5
    },
    {
        id: 11,
        name: "Formal Shirt",
        price: 69.99,
        image: "./assets/product1.webp",
        category: "Men",
        sizes: ["15", "15.5", "16", "16.5", "17"],
        colors: ["White", "Light Blue", "Pink", "Black"],
        description: "This crisp formal shirt is tailored from premium cotton for exceptional comfort and a polished look. The versatile design makes it perfect for both professional settings and special occasions.",
        rating: 4.6
    },
    {
        id: 12,
        name: "Designer Sunglasses",
        price: 119.99,
        image: "./assets/product1.webp",
        category: "Accessories",
        sizes: ["One Size"],
        colors: ["Black/Gold", "Tortoise", "Clear/Silver"],
        description: "Protect your eyes in style with these premium sunglasses featuring UV protection and a fashionable design. The lightweight frame ensures comfort for all-day wear.",
        rating: 4.7
    },
    {
        id: 13,
        name: "Cotton Blouse",
        price: 45.99,
        image: "./assets/product1.webp",
        category: "Women",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Blue", "Pink", "Black"],
        description: "This elegant cotton blouse combines comfort with sophistication. The breathable fabric and timeless design make it perfect for both casual days and office wear.",
        rating: 4.4
    },
    {
        id: 14,
        name: "Chino Pants",
        price: 59.99,
        image: "./assets/product1.webp",
        category: "Men",
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Khaki", "Navy", "Olive", "Black"],
        description: "These versatile chino pants offer a perfect blend of comfort and style. Made from premium cotton with a hint of stretch, they transition seamlessly from casual to smart-casual occasions.",
        rating: 4.5
    },
    {
        id: 15,
        name: "Leather Handbag",
        price: 159.99,
        image: "./assets/product1.webp",
        category: "Accessories",
        sizes: ["One Size"],
        colors: ["Black", "Brown", "Red", "Navy"],
        description: "Crafted from genuine leather, this elegant handbag combines practicality with timeless style. The spacious interior and multiple compartments keep your essentials organized.",
        rating: 4.8
    },
    {
        id: 16,
        name: "Knit Cardigan",
        price: 75.99,
        image: "./assets/product1.webp",
        category: "Women",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Gray", "Beige", "Black", "Burgundy"],
        description: "This cozy knit cardigan is perfect for layering during cooler seasons. The soft yarn and relaxed fit provide comfort while adding a touch of elegance to any outfit.",
        rating: 4.6
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
    productCard.setAttribute('data-product-id', product.id);
    
    // Make the entire card clickable to view product details
    productCard.addEventListener('click', function(e) {
        // Only navigate if the click was not on the Add to Cart button
        if (!e.target.classList.contains('add-to-cart-btn')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    
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
        // Add new product with quantity 1
        const cartItem = { ...product, quantity: 1, selectedSize: size, selectedColor: color };
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
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        cursor: pointer;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
    modal.querySelector('.product-options-price').textContent = `$${product.price.toFixed(2)}`;
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
    // Convert productId from string to number
    productId = parseInt(productId);
    
    // Find the product by ID
    const product = products.find(p => p.id === productId);
    
    // If product not found, redirect to home page
    if (!product) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get the product details container
    const productDetailsContainer = document.getElementById('product-details');
    if (!productDetailsContainer) return;
    
    // Update page title
    document.title = `${product.name} - Zagger`;
    
    // Create product details HTML
    const productDetailsHTML = `
        <div class="product-detail-layout">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-info-container">
                <h1 class="product-detail-name">${product.name}</h1>
                <div class="product-detail-rating">
                    ${generateStarRating(product.rating)}
                    <span class="rating-value">${product.rating.toFixed(1)}</span>
                </div>
                <p class="product-detail-price">$${product.price.toFixed(2)}</p>
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
    
    // Set the HTML content
    productDetailsContainer.innerHTML = productDetailsHTML;
    
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
        
        .product-detail-layout {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
        }
        
        .product-image-container {
            flex: 1;
            min-width: 300px;
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
