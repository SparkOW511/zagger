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
        image: "./assets/product1.webp",
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
    }
];

// Cart functionality
let cart = [];

// Display products
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartIcon();
        showNotification('Product added to cart!');
    }
}

// Update cart icon
function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.length);
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
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
