// Global Variables
let currentUser = null
let cartItems = []
let wishlistItems = []

// Products data (same as main script)
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "img/image.png",
    category: "Electronics",
    isNew: true,
    discount: 20,
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    image: "img/image-copy.png",
    category: "Electronics",
    isPopular: true,
  },
  {
    id: "3",
    name: "Luxury Leather Jacket",
    price: 199.99,
    image: "img/image-copy-2.png",
    category: "Fashion",
    discount: 15,
  },
  {
    id: "4",
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "img/image-copy-3.png",
    category: "Electronics",
    isNew: true,
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 599.99,
    image: "img/image-copy-4.png",
    category: "Photography",
  },
  {
    id: "6",
    name: "Comfortable Running Shoes",
    price: 89.99,
    image: "img/image-copy-5.png",
    category: "Sports",
    isPopular: true,
    discount: 25,
  },
  {
    id: "7",
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    image: "img/image-copy-6.png",
    category: "Electronics",
    isNew: true,
    discount: 10,
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    price: 159.99,
    image: "img/image-copy-7.png",
    category: "Fashion",
    isPopular: true,
  },
  {
    id: "9",
    name: "Fitness Tracker Band",
    price: 129.99,
    image: "img/image-copy-8.png",
    category: "Electronics",
    isNew: true,
    discount: 30,
  },
  {
    id: "10",
    name: "Casual T-Shirt",
    price: 29.99,
    image: "img/image-copy-9.png",
    category: "Fashion",
    isPopular: true,
  },
  {
    id: "11",
    name: "Smartphone Case",
    price: 24.99,
    image: "img/image-copy-10.png",
    category: "Electronics",
    discount: 40,
  },
  {
    id: "12",
    name: "Coffee Maker Machine",
    price: 179.99,
    image: "img/image-copy-11.png",
    category: "Home",
    isNew: true,
  },
  {
    id: "13",
    name: "Wireless Mouse",
    price: 49.99,
    image: "img/image-copy-12.png",
    category: "Electronics",
    isPopular: true,
    discount: 15,
  },
  {
    id: "14",
    name: "Digital Camera",
    price: 899.99,
    image: "img/image-copy-13.png",
    category: "Photography",
    isNew: true,
  },
  {
    id: "15",
    name: "Baseball Cap",
    price: 19.99,
    image: "img/image-copy-14.png",
    category: "Fashion",
    discount: 25,
  },
  {
    id: "16",
    name: "Laptop Backpack",
    price: 69.99,
    image: "img/image-copy-15.png",
    category: "Fashion",
    isPopular: true,
  },
  {
    id: "17",
    name: "Gaming Controller",
    price: 89.99,
    image: "img/image-copy-16.png",
    category: "Electronics",
    isNew: true,
    discount: 20,
  },
  {
    id: "18",
    name: "LED Desk Lamp",
    price: 39.99,
    image: "img/image-copy-17.png",
    category: "Home",
    discount: 35,
  },
  {
    id: "19",
    name: "Portable Charger",
    price: 34.99,
    image: "img/image-copy-18.png",
    category: "Electronics",
    isPopular: true,
  },
  {
    id: "20",
    name: "Winter Coat",
    price: 129.99,
    image: "img/image-copy-19.png",
    category: "Fashion",
    isNew: true,
    discount: 40,
  },
]

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadUserData()
  loadCartData()
  loadWishlistData()
  setupEventListeners()
  renderWishlistItems()
  updateUI()
})

// Load Data Functions
function loadUserData() {
  try {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      currentUser = JSON.parse(savedUser)
      updateUserGreeting()
    } else {
      showUserModal()
    }
  } catch (error) {
    console.error("Error loading user data:", error)
    showUserModal()
  }
}

function loadCartData() {
  try {
    const savedCart = localStorage.getItem("cartItems")
    if (savedCart) {
      cartItems = JSON.parse(savedCart)
    }
  } catch (error) {
    console.error("Error loading cart data:", error)
    cartItems = []
  }
}

function loadWishlistData() {
  try {
    const savedWishlist = localStorage.getItem("wishlistItems")
    if (savedWishlist) {
      wishlistItems = JSON.parse(savedWishlist)
    }
  } catch (error) {
    console.error("Error loading wishlist data:", error)
    wishlistItems = []
  }
}

// Event Listeners
function setupEventListeners() {
  // User Modal
  const accountBtn = document.getElementById("account-btn")
  if (accountBtn) {
    accountBtn.addEventListener("click", showUserModal)
  }

  const closeUserModal = document.getElementById("close-user-modal")
  if (closeUserModal) {
    closeUserModal.addEventListener("click", hideUserModal)
  }

  const userForm = document.getElementById("user-form")
  if (userForm) {
    userForm.addEventListener("submit", handleUserRegistration)
  }

  const deleteAccountBtn = document.getElementById("delete-account-btn")
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", handleDeleteAccount)
  }

  // Close modals on backdrop click
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })
}

// Render Wishlist Items
function renderWishlistItems() {
  const wishlistItemsContainer = document.getElementById("wishlist-items-container")
  const emptyWishlistMessage = document.getElementById("empty-wishlist-message")

  if (!wishlistItemsContainer) return

  if (wishlistItems.length === 0) {
    if (emptyWishlistMessage) emptyWishlistMessage.style.display = "block"
    wishlistItemsContainer.innerHTML = ""
    return
  }

  if (emptyWishlistMessage) emptyWishlistMessage.style.display = "none"
  wishlistItemsContainer.innerHTML = ""

  wishlistItems.forEach((productId) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
    const likes = getLikes(product.id)
    const hasLiked = hasUserLiked(product.id)

    const wishlistItem = document.createElement("div")
    wishlistItem.className = "product-card"
    wishlistItem.innerHTML = `
      <div class="product-image" onclick="openProductDetail('${product.id}')">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="product-badges">
          ${product.isNew ? '<span class="product-badge badge-new">Yangi</span>' : ""}
          ${product.isPopular ? '<span class="product-badge badge-popular">Ommabop</span>' : ""}
          ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ""}
        </div>
        <button class="wishlist-btn active" onclick="event.stopPropagation(); removeFromWishlist('${product.id}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="product-info" onclick="openProductDetail('${product.id}')">
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
          <button class="like-btn ${hasLiked ? "liked" : ""}" onclick="event.stopPropagation(); likeProduct('${product.id}')" ${hasLiked ? "disabled" : ""}>
            <i class="fas fa-heart"></i>
            <span>${likes}</span>
          </button>
        </div>
      </div>
      <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
        <i class="fas fa-shopping-cart"></i>
        Savatchaga qo'shish
      </button>
    `

    wishlistItemsContainer.appendChild(wishlistItem)
  })
}

// Wishlist Functions
function removeFromWishlist(productId) {
  const index = wishlistItems.indexOf(productId)
  if (index > -1) {
    wishlistItems.splice(index, 1)
    saveWishlistData()
    renderWishlistItems()
    updateUI()
    showToast("Yoqtirganlardan olib tashlandi", "warning")
  }
}

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

function openProductDetail(productId) {
  // Mahsulot ID ni localStorage ga saqlash
  localStorage.setItem("selectedProductId", productId)
  // Tovar sahifasiga o'tish
  window.location.href = "tovar.html"
}

function likeProduct(productId) {
  if (hasUserLiked(productId)) return

  const currentLikes = getLikes(productId)
  const newLikes = currentLikes + 1

  try {
    localStorage.setItem("likes_" + productId, newLikes.toString())
    localStorage.setItem("user_liked_" + productId, "true")
  } catch (error) {
    console.error("Error saving likes:", error)
  }

  renderWishlistItems()
}

function getLikes(productId) {
  try {
    const savedLikes = localStorage.getItem("likes_" + productId)
    return savedLikes ? Number.parseInt(savedLikes, 10) : Math.floor(Math.random() * 100) + 10
  } catch (error) {
    console.error("Error getting likes:", error)
    return Math.floor(Math.random() * 100) + 10
  }
}

function hasUserLiked(productId) {
  try {
    return localStorage.getItem("user_liked_" + productId) === "true"
  } catch (error) {
    console.error("Error checking user likes:", error)
    return false
  }
}

// User Functions
function showUserModal() {
  const userModal = document.getElementById("user-modal")
  if (!userModal) return

  const title = document.getElementById("user-modal-title")
  const nameInput = document.getElementById("user-name")
  const phoneInput = document.getElementById("user-phone")
  const saveBtn = document.getElementById("save-user-btn")
  const deleteBtn = document.getElementById("delete-account-btn")

  if (currentUser) {
    if (title) title.textContent = "Akkaunt ma'lumotlari"
    if (nameInput) nameInput.value = currentUser.name
    if (phoneInput) phoneInput.value = currentUser.phone
    if (saveBtn) saveBtn.textContent = "Yangilash"
    if (deleteBtn) deleteBtn.style.display = "block"
  } else {
    if (title) title.textContent = "Ro'yxatdan o'tish"
    if (nameInput) nameInput.value = ""
    if (phoneInput) phoneInput.value = ""
    if (saveBtn) saveBtn.textContent = "Saqlash"
    if (deleteBtn) deleteBtn.style.display = "none"
  }

  userModal.classList.add("active")
}

function hideUserModal() {
  const userModal = document.getElementById("user-modal")
  if (userModal) {
    userModal.classList.remove("active")
  }
}

function handleUserRegistration(e) {
  e.preventDefault()

  const nameInput = document.getElementById("user-name")
  const phoneInput = document.getElementById("user-phone")

  if (!nameInput || !phoneInput) return

  const name = nameInput.value.trim()
  const phone = phoneInput.value.trim()

  if (!name || !phone) {
    showToast("Iltimos, barcha maydonlarni to'ldiring!", "error")
    return
  }

  currentUser = { name: name, phone: phone }

  try {
    localStorage.setItem("user", JSON.stringify(currentUser))
  } catch (error) {
    console.error("Error saving user data:", error)
    showToast("Ma'lumotlarni saqlashda xatolik!", "error")
    return
  }

  updateUserGreeting()
  hideUserModal()
  showToast("Ma'lumotlar saqlandi!", "success")
}

function handleDeleteAccount() {
  if (confirm("Haqiqatan ham akkauntni o'chirmoqchimisiz?")) {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("cartItems")
      localStorage.removeItem("wishlistItems")

      // Clear likes data
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith("likes_") || key.startsWith("user_liked_")) {
          localStorage.removeItem(key)
        }
      })

      location.reload()
    } catch (error) {
      console.error("Error deleting account:", error)
      showToast("Akkauntni o'chirishda xatolik!", "error")
    }
  }
}

function updateUserGreeting() {
  const userGreeting = document.getElementById("user-greeting")
  if (userGreeting) {
    if (currentUser) {
      userGreeting.textContent = "Salom, " + currentUser.name + "!"
    } else {
      userGreeting.textContent = ""
    }
  }
}

// Utility Functions
function saveCartData() {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  } catch (error) {
    console.error("Error saving cart data:", error)
  }
}

function saveWishlistData() {
  try {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
  } catch (error) {
    console.error("Error saving wishlist data:", error)
  }
}

function updateUI() {
  // Update cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountEl = document.getElementById("cart-count")
  if (cartCountEl) {
    cartCountEl.textContent = cartCount.toString()
    cartCountEl.classList.toggle("show", cartCount > 0)
  }

  // Update wishlist count
  const wishlistCountEl = document.getElementById("wishlist-count")
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlistItems.length.toString()
    wishlistCountEl.classList.toggle("show", wishlistItems.length > 0)
  }
}

function showLoading() {
  const loading = document.getElementById("loading")
  if (loading) {
    loading.style.display = "flex"
  }
}

function hideLoading() {
  const loading = document.getElementById("loading")
  if (loading) {
    loading.style.display = "none"
  }
}

function showToast(message, type) {
  const toastContainer = document.getElementById("toast-container")
  if (!toastContainer) return

  type = type || "success"

  const toast = document.createElement("div")
  toast.className = "toast " + type
  toast.textContent = message

  toastContainer.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}

// Global functions for onclick handlers
window.removeFromWishlist = removeFromWishlist
window.addToCart = addToCart
window.openProductDetail = openProductDetail
window.likeProduct = likeProduct
