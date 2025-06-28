// Global Variables
let currentUser = null
let cartItems = []
let wishlistItems = []
let currentPage = "home"

// Sample Products Data
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "img/headphones.jpg",
    category: "Electronics",
    isNew: true,
    discount: 20,
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    image: "img/smartwatch.jpg",
    category: "Electronics",
    isPopular: true,
  },
  {
    id: "3",
    name: "Luxury Leather Jacket",
    price: 199.99,
    image: "img/jacket.jpg",
    category: "Fashion",
    discount: 15,
  },
  {
    id: "4",
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "img/keyboard.jpg",
    category: "Electronics",
    isNew: true,
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 599.99,
    image: "img/lens.jpg",
    category: "Photography",
  },
  {
    id: "6",
    name: "Comfortable Running Shoes",
    price: 89.99,
    image: "img/shoes.jpg",
    category: "Sports",
    isPopular: true,
    discount: 25,
  },
  {
    id: "7",
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    image: "img/speaker.jpg",
    category: "Electronics",
    isNew: true,
    discount: 10,
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    price: 159.99,
    image: "img/sunglasses.jpg",
    category: "Fashion",
    isPopular: true,
  },
]

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = "8122147889:AAFCQwTvyB9DuDm7qkXpjBFqjtWJKadmDlw"
const TELEGRAM_CHAT_ID = "7702025887"

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadUserData()
  loadCartData()
  loadWishlistData()
  setupEventListeners()
  renderProducts()
  updateUI()
})

// Load User Data from localStorage
function loadUserData() {
  const savedUser = localStorage.getItem("user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUserGreeting()
  } else {
    showUserModal()
  }
}

// Load Cart Data from localStorage
function loadCartData() {
  const savedCart = localStorage.getItem("cartItems")
  if (savedCart) {
    cartItems = JSON.parse(savedCart)
  }
}

// Load Wishlist Data from localStorage
function loadWishlistData() {
  const savedWishlist = localStorage.getItem("wishlistItems")
  if (savedWishlist) {
    wishlistItems = JSON.parse(savedWishlist)
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const page = this.dataset.page
      switchPage(page)
    })
  })

  // User Modal
  document.getElementById("account-btn").addEventListener("click", showUserModal)
  document.getElementById("close-user-modal").addEventListener("click", hideUserModal)
  document.getElementById("user-form").addEventListener("submit", handleUserRegistration)
  document.getElementById("delete-account-btn").addEventListener("click", handleDeleteAccount)

  // Cart Modal
  document.getElementById("cart-btn").addEventListener("click", showCartModal)
  document.getElementById("close-cart-modal").addEventListener("click", hideCartModal)
  document.getElementById("clear-cart-btn").addEventListener("click", clearCart)
  document.getElementById("checkout-btn").addEventListener("click", handleCheckout)
  document.getElementById("share-location").addEventListener("change", handleLocationShare)

  // Wishlist Modal
  document.getElementById("wishlist-btn").addEventListener("click", showWishlistModal)
  document.getElementById("close-wishlist-modal").addEventListener("click", hideWishlistModal)

  // Search
  document.getElementById("search-input").addEventListener("input", handleSearch)

  // Close modals on backdrop click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })
}

// Switch Page
function switchPage(page) {
  currentPage = page

  // Update navigation
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page)
  })

  // Update pages
  document.querySelectorAll(".page").forEach((pageEl) => {
    pageEl.classList.toggle("active", pageEl.id === `${page}-page`)
  })

  // Render products for specific pages
  if (page === "new") {
    renderFilteredProducts("new", document.getElementById("new-products-grid"))
  } else if (page === "popular") {
    renderFilteredProducts("popular", document.getElementById("popular-products-grid"))
  } else if (page === "sale") {
    renderFilteredProducts("sale", document.getElementById("sale-products-grid"))
  }
}

// Render Products
function renderProducts() {
  renderAllProducts(document.getElementById("products-grid"))
}

function renderAllProducts(container) {
  container.innerHTML = ""
  products.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

function renderFilteredProducts(filter, container) {
  container.innerHTML = ""
  let filteredProducts = []

  if (filter === "new") {
    filteredProducts = products.filter((p) => p.isNew)
  } else if (filter === "popular") {
    filteredProducts = products.filter((p) => p.isPopular)
  } else if (filter === "sale") {
    filteredProducts = products.filter((p) => p.discount)
  }

  filteredProducts.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

// Create Product Card
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  const likes = getLikes(product.id)
  const hasLiked = hasUserLiked(product.id)
  const isInWishlist = wishlistItems.includes(product.id)

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
            <div class="product-badges">
                ${product.isNew ? '<span class="product-badge badge-new">Yangi</span>' : ""}
                ${product.isPopular ? '<span class="product-badge badge-popular">Ommabop</span>' : ""}
                ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ""}
            </div>
            <button class="wishlist-btn ${isInWishlist ? "active" : ""}" onclick="toggleWishlist('${product.id}')">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <span class="rating-text">(4.8)</span>
            </div>
            <div class="product-price">
                <span class="price-current">$${discountedPrice.toFixed(2)}</span>
                ${product.discount ? `<span class="price-original">$${product.price.toFixed(2)}</span>` : ""}
            </div>
            <div class="product-likes">
                <button class="like-btn ${hasLiked ? "liked" : ""}" onclick="likeProduct('${product.id}')" ${hasLiked ? "disabled" : ""}>
                    <i class="fas fa-heart"></i>
                    <span>${likes}</span>
                </button>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                <i class="fas fa-shopping-cart"></i>
                Savatchaga qo'shish
            </button>
        </div>
    `

  return card
}

// Product Functions
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const existingItem = cartItems.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({
      productId: productId,
      quantity: 1,
    })
  }

  saveCartData()
  updateUI()
  showToast("Mahsulot savatchaga qo'shildi!", "success")
}

function toggleWishlist(productId) {
  if (wishlistItems.includes(productId)) {
    wishlistItems = wishlistItems.filter((id) => id !== productId)
    showToast("Mahsulot yoqtirganlardan olib tashlandi", "warning")
  } else {
    wishlistItems.push(productId)
    showToast("Mahsulot yoqtirganlarga qo'shildi!", "success")
  }

  saveWishlistData()
  updateUI()
  renderProducts()

  // Update current page products if needed
  if (currentPage === "new") {
    renderFilteredProducts("new", document.getElementById("new-products-grid"))
  } else if (currentPage === "popular") {
    renderFilteredProducts("popular", document.getElementById("popular-products-grid"))
  } else if (currentPage === "sale") {
    renderFilteredProducts("sale", document.getElementById("sale-products-grid"))
  }
}

function likeProduct(productId) {
  if (hasUserLiked(productId)) return

  const currentLikes = getLikes(productId)
  const newLikes = currentLikes + 1

  localStorage.setItem(`likes_${productId}`, newLikes.toString())
  localStorage.setItem(`user_liked_${productId}`, "true")

  renderProducts()

  // Update current page products if needed
  if (currentPage === "new") {
    renderFilteredProducts("new", document.getElementById("new-products-grid"))
  } else if (currentPage === "popular") {
    renderFilteredProducts("popular", document.getElementById("popular-products-grid"))
  } else if (currentPage === "sale") {
    renderFilteredProducts("sale", document.getElementById("sale-products-grid"))
  }
}

function getLikes(productId) {
  const savedLikes = localStorage.getItem(`likes_${productId}`)
  return savedLikes ? Number.parseInt(savedLikes) : Math.floor(Math.random() * 100) + 10
}

function hasUserLiked(productId) {
  return localStorage.getItem(`user_liked_${productId}`) === "true"
}

// User Functions
function showUserModal() {
  const modal = document.getElementById("user-modal")
  const title = document.getElementById("user-modal-title")
  const nameInput = document.getElementById("user-name")
  const phoneInput = document.getElementById("user-phone")
  const saveBtn = document.getElementById("save-user-btn")
  const deleteBtn = document.getElementById("delete-account-btn")

  if (currentUser) {
    title.textContent = "Akkaunt ma'lumotlari"
    nameInput.value = currentUser.name
    phoneInput.value = currentUser.phone
    saveBtn.textContent = "Yangilash"
    deleteBtn.style.display = "block"
  } else {
    title.textContent = "Ro'yxatdan o'tish"
    nameInput.value = ""
    phoneInput.value = ""
    saveBtn.textContent = "Saqlash"
    deleteBtn.style.display = "none"
  }

  modal.classList.add("active")
}

function hideUserModal() {
  document.getElementById("user-modal").classList.remove("active")
}

function handleUserRegistration(e) {
  e.preventDefault()

  const name = document.getElementById("user-name").value.trim()
  const phone = document.getElementById("user-phone").value.trim()

  if (!name || !phone) {
    showToast("Iltimos, barcha maydonlarni to'ldiring!", "error")
    return
  }

  currentUser = { name, phone }
  localStorage.setItem("user", JSON.stringify(currentUser))

  updateUserGreeting()
  hideUserModal()
  showToast("Ma'lumotlar saqlandi!", "success")
}

function handleDeleteAccount() {
  if (confirm("Haqiqatan ham akkauntni o'chirmoqchimisiz?")) {
    localStorage.removeItem("user")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("wishlistItems")

    // Clear likes data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("likes_") || key.startsWith("user_liked_")) {
        localStorage.removeItem(key)
      }
    })

    location.reload()
  }
}

function updateUserGreeting() {
  const greeting = document.getElementById("user-greeting")
  if (currentUser) {
    greeting.textContent = `Salom, ${currentUser.name}!`
  } else {
    greeting.textContent = ""
  }
}

// Cart Functions
function showCartModal() {
  renderCartItems()
  document.getElementById("cart-modal").classList.add("active")
}

function hideCartModal() {
  document.getElementById("cart-modal").classList.remove("active")
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items")
  const emptyCart = document.getElementById("empty-cart")
  const cartFooter = document.getElementById("cart-footer")
  const cartTotal = document.getElementById("cart-total")
  const cartItemsCount = document.getElementById("cart-items-count")

  if (cartItems.length === 0) {
    emptyCart.style.display = "block"
    cartFooter.style.display = "none"
    cartItemsContainer.innerHTML = ""
    return
  }

  emptyCart.style.display = "none"
  cartFooter.style.display = "block"

  cartItemsContainer.innerHTML = ""
  let total = 0

  cartItems.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
    const itemTotal = discountedPrice * item.quantity
    total += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
            <div class="cart-item-info">
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">$${discountedPrice.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart('${item.productId}')">
                <i class="fas fa-times"></i>
            </button>
        `

    cartItemsContainer.appendChild(cartItem)
  })

  cartTotal.textContent = `$${total.toFixed(2)}`
  cartItemsCount.textContent = cartItems.length
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }

  const item = cartItems.find((item) => item.productId === productId)
  if (item) {
    item.quantity = newQuantity
    saveCartData()
    renderCartItems()
    updateUI()
  }
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.productId !== productId)
  saveCartData()
  renderCartItems()
  updateUI()
  showToast("Mahsulot savatchadan olib tashlandi", "warning")
}

function clearCart() {
  if (confirm("Savatchani tozalamoqchimisiz?")) {
    cartItems = []
    saveCartData()
    renderCartItems()
    updateUI()
    showToast("Savatcha tozalandi", "success")
  }
}

function handleLocationShare() {
  const shareLocation = document.getElementById("share-location")
  const locationInfo = document.getElementById("location-info")

  if (shareLocation.checked) {
    if (navigator.geolocation) {
      showLoading()
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const locationText = `${latitude}, ${longitude}`
          locationInfo.textContent = `Joylashuv: ${locationText}`
          locationInfo.style.display = "block"
          hideLoading()
        },
        (error) => {
          console.error("Error getting location:", error)
          locationInfo.textContent = "Joylashuv olinmadi"
          locationInfo.style.display = "block"
          hideLoading()
          showToast("Joylashuvni olishda xatolik yuz berdi", "error")
        },
      )
    } else {
      locationInfo.textContent = "Geolokatsiya qo'llab-quvvatlanmaydi"
      locationInfo.style.display = "block"
      showToast("Geolokatsiya qo'llab-quvvatlanmaydi", "error")
    }
  } else {
    locationInfo.style.display = "none"
  }
}

async function handleCheckout() {
  const installationRequired = document.getElementById("installation-required")
  const shareLocation = document.getElementById("share-location")
  const locationInfo = document.getElementById("location-info")

  if (!installationRequired.checked) {
    showToast('Iltimos, "Ustanovka qilib berilsin" ni belgilang!', "error")
    return
  }

  if (!currentUser) {
    showToast("Iltimos, avval ro'yxatdan o'ting!", "error")
    return
  }

  if (cartItems.length === 0) {
    showToast("Savatcha bo'sh!", "error")
    return
  }

  showLoading()

  let message = "🛒 Yangi buyurtma!\n\n"
  message += `👤 Mijoz: ${currentUser.name}\n`
  message += `📞 Telefon: ${currentUser.phone}\n\n`
  message += "📦 Mahsulotlar:\n"

  let total = 0
  cartItems.forEach((item, index) => {
    const product = products.find((p) => p.id === item.productId)
    if (product) {
      const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
      const itemTotal = discountedPrice * item.quantity
      total += itemTotal

      message += `${index + 1}. ${product.name}\n`
      message += `   💰 Narx: $${discountedPrice.toFixed(2)}\n`
      message += `   📊 Miqdor: ${item.quantity}\n`
      message += `   💵 Jami: $${itemTotal.toFixed(2)}\n\n`
    }
  })

  message += `💰 Umumiy summa: $${total.toFixed(2)}\n`
  message += `✅ Ustanovka: ${installationRequired.checked ? "Ha" : "Yo'q"}\n`

  if (shareLocation.checked && locationInfo.textContent) {
    message += `📍 ${locationInfo.textContent}\n`
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (response.ok) {
      showToast("Buyurtma muvaffaqiyatli yuborildi!", "success")
      cartItems = []
      saveCartData()
      renderCartItems()
      updateUI()
      hideCartModal()
    } else {
      throw new Error("Telegram API error")
    }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    showToast("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.", "error")
  } finally {
    hideLoading()
  }
}

// Wishlist Functions
function showWishlistModal() {
  renderWishlistItems()
  document.getElementById("wishlist-modal").classList.add("active")
}

function hideWishlistModal() {
  document.getElementById("wishlist-modal").classList.remove("active")
}

function renderWishlistItems() {
  const wishlistItemsContainer = document.getElementById("wishlist-items")
  const emptyWishlist = document.getElementById("empty-wishlist")
  const wishlistItemsCount = document.getElementById("wishlist-items-count")

  if (wishlistItems.length === 0) {
    emptyWishlist.style.display = "block"
    wishlistItemsContainer.innerHTML = ""
    wishlistItemsCount.textContent = "0"
    return
  }

  emptyWishlist.style.display = "none"
  wishlistItemsContainer.innerHTML = ""

  wishlistItems.forEach((productId) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

    const wishlistItem = document.createElement("div")
    wishlistItem.className = "wishlist-item"
    wishlistItem.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/250x150?text=No+Image'">
                <button class="remove-wishlist-btn" onclick="toggleWishlist('${product.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="wishlist-item-info">
                <h3 class="wishlist-item-name">${product.name}</h3>
                <p class="wishlist-item-price">$${discountedPrice.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart('${product.id}')">
                    <i class="fas fa-shopping-cart"></i>
                    Savatchaga qo'shish
                </button>
            </div>
        `

    wishlistItemsContainer.appendChild(wishlistItem)
  })

  wishlistItemsCount.textContent = wishlistItems.length
}

// Search Function
function handleSearch() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase()
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const productName = card.querySelector(".product-name").textContent.toLowerCase()
    if (productName.includes(searchTerm)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

// Utility Functions
function saveCartData() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

function saveWishlistData() {
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
}

function updateUI() {
  // Update cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  document.getElementById("cart-count").textContent = cartCount

  // Update wishlist count
  document.getElementById("wishlist-count").textContent = wishlistItems.length

  // Show/hide badges
  const cartBadge = document.querySelector("#cart-btn .badge")
  const wishlistBadge = document.querySelector("#wishlist-btn .badge")

  cartBadge.style.display = cartCount > 0 ? "flex" : "none"
  wishlistBadge.style.display = wishlistItems.length > 0 ? "flex" : "none"
}

function showLoading() {
  document.getElementById("loading").style.display = "flex"
}

function hideLoading() {
  document.getElementById("loading").style.display = "none"
}

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container")
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.textContent = message

  toastContainer.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

// Global functions for onclick handlers
window.addToCart = addToCart
window.toggleWishlist = toggleWishlist
window.likeProduct = likeProduct
window.updateQuantity = updateQuantity
window.removeFromCart = removeFromCart
