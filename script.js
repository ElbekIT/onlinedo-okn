// Global Variables
let currentUser = null
let cartItems = []
let wishlistItems = []
let currentPage = "home"

// Kengaytirilgan mahsulotlar ma'lumotlar bazasi
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "img/image.png",
    category: "Electronics",
    isNew: true,
    discount: 20,
    description:
      "Yuqori sifatli simsiz quloqchinlar. Shovqinni bekor qilish texnologiyasi va 30 soat batareya muddati.",
    features: ["Bluetooth 5.0", "Shovqinni bekor qilish", "30 soat batareya", "Tez zaryadlash"],
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    image: "img/image-copy.png",
    category: "Electronics",
    isPopular: true,
    description: "Zamonaviy aqlli soat. Salomatlik monitoringi, GPS va suv o'tkazmaydigan dizayn.",
    features: ["GPS", "Yurak urishi monitori", "Suv o'tkazmaydi", "7 kun batareya"],
  },
  {
    id: "3",
    name: "Luxury Leather Jacket",
    price: 199.99,
    image: "img/image-copy-2.png",
    category: "Fashion",
    discount: 15,
    description: "Haqiqiy teri kurtka. Yumshoq va bardoshli, har qanday ob-havo uchun mos.",
    features: ["100% haqiqiy teri", "Yumshoq astar", "Zamonaviy dizayn", "Har faslga mos"],
  },
  {
    id: "4",
    name: "Gaming Mechanical Keyboard",
    price: 149.99,
    image: "img/image-copy-3.png",
    category: "Electronics",
    isNew: true,
    description: "Professional gaming klaviaturasi. RGB yoritish va mexanik tugmalar.",
    features: ["Mexanik tugmalar", "RGB yoritish", "Anti-ghosting", "USB-C ulanish"],
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 599.99,
    image: "img/image-copy-4.png",
    category: "Photography",
    description: "Professional fotografiya uchun obyektiv. Yuqori aniqlik va tez fokus.",
    features: ["85mm f/1.4", "Tez avtofokus", "Optik stabilizatsiya", "Professional sifat"],
  },
  {
    id: "6",
    name: "Comfortable Running Shoes",
    price: 89.99,
    image: "img/image-copy-5.png",
    category: "Sports",
    isPopular: true,
    discount: 25,
    description: "Yugurish uchun qulay poyabzal. Yengil va nafas oladigan material.",
    features: ["Yengil dizayn", "Nafas oladigan", "Amortizatsiya", "Slip-resistant"],
  },
  {
    id: "7",
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    image: "img/image-copy-6.png",
    category: "Electronics",
    isNew: true,
    discount: 10,
    description: "Portativ Bluetooth karnay. Kuchli bass va 12 soat musiqa ijrosi.",
    features: ["Bluetooth 5.0", "12 soat batareya", "Suv o'tkazmaydi", "360° tovush"],
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    price: 159.99,
    image: "img/image-copy-7.png",
    category: "Fashion",
    isPopular: true,
    description: "Dizayner quyosh ko'zoynaklari. UV himoya va zamonaviy uslub.",
    features: ["100% UV himoya", "Polarizatsiyalangan", "Yengil ramka", "Zamonaviy dizayn"],
  },
  {
    id: "9",
    name: "Fitness Tracker Band",
    price: 129.99,
    image: "img/image-copy-8.png",
    category: "Electronics",
    isNew: true,
    discount: 30,
    description: "Fitness kuzatuvchi band. Qadamlar, yurak urishi va uyqu monitoringi.",
    features: ["Qadam hisoblagich", "Yurak urishi", "Uyqu monitori", "5 kun batareya"],
  },
  {
    id: "10",
    name: "Casual T-Shirt",
    price: 29.99,
    image: "img/image-copy-9.png",
    category: "Fashion",
    isPopular: true,
    description: "Qulay kundalik futbolka. 100% paxta va yumshoq to'qima.",
    features: ["100% paxta", "Yumshoq to'qima", "Yuvishga chidamli", "Turli ranglar"],
  },
  // Qo'shimcha mahsulotlar...
  {
    id: "11",
    name: "Smartphone Case",
    price: 24.99,
    image: "img/image-copy-10.png",
    category: "Electronics",
    discount: 40,
    description: "Telefon uchun himoya g'ilofi. Tushishdan himoya va zamonaviy dizayn.",
    features: ["Tushishdan himoya", "Wireless charging", "Aniq teshiklar", "Yengil vazn"],
  },
  {
    id: "12",
    name: "Coffee Maker Machine",
    price: 179.99,
    image: "img/image-copy-11.png",
    category: "Home",
    isNew: true,
    description: "Avtomatik kofe mashinasi. Professional sifatda kofe tayyorlash.",
    features: ["15 bar bosim", "Avtomatik", "Sut ko'piklagich", "Programmable"],
  },
  {
    id: "13",
    name: "Wireless Mouse",
    price: 49.99,
    image: "img/image-copy-12.png",
    category: "Electronics",
    isPopular: true,
    discount: 15,
    description: "Simsiz kompyuter sichqonchasi. Aniq harakat va uzoq batareya muddati.",
    features: ["2.4GHz simsiz", "Aniq sensor", "6 oy batareya", "Ergonomik dizayn"],
  },
  {
    id: "14",
    name: "Digital Camera",
    price: 899.99,
    image: "img/image-copy-13.png",
    category: "Photography",
    isNew: true,
    description: "Professional raqamli kamera. 4K video va yuqori aniqlikdagi suratlar.",
    features: ["24MP sensor", "4K video", "Wi-Fi ulanish", "Optik stabilizatsiya"],
  },
  {
    id: "15",
    name: "Baseball Cap",
    price: 19.99,
    image: "img/image-copy-14.png",
    category: "Fashion",
    discount: 25,
    description: "Sport kepkasi. Quyoshdan himoya va sport uslubi.",
    features: ["Quyoshdan himoya", "Nafas oladigan", "Sozlanuvchi", "Sport uslubi"],
  },
  {
    id: "16",
    name: "Laptop Backpack",
    price: 69.99,
    image: "img/image-copy-15.png",
    category: "Fashion",
    isPopular: true,
    description: "Noutbuk uchun ryukzak. Ko'p cho'ntakli va qulay tashish.",
    features: ["Laptop bo'limi", "USB port", "Suv o'tkazmaydi", "Ergonomik"],
  },
  {
    id: "17",
    name: "Gaming Controller",
    price: 89.99,
    image: "img/image-copy-16.png",
    category: "Electronics",
    isNew: true,
    discount: 20,
    description: "Gaming kontroller. Wireless ulanish va aniq boshqaruv.",
    features: ["Wireless", "Vibration", "20 soat batareya", "Aniq joystick"],
  },
  {
    id: "18",
    name: "LED Desk Lamp",
    price: 39.99,
    image: "img/image-copy-17.png",
    category: "Home",
    discount: 35,
    description: "LED stol chirog'i. Sozlanuvchi yorug'lik va zamonaviy dizayn.",
    features: ["LED yorug'lik", "Sozlanuvchi", "USB zaryadlash", "Ko'z himoyasi"],
  },
  {
    id: "19",
    name: "Portable Charger",
    price: 34.99,
    image: "img/image-copy-18.png",
    category: "Electronics",
    isPopular: true,
    description: "Portativ zaryadlovchi. Tez zaryadlash va katta sig'im.",
    features: ["10000mAh", "Tez zaryadlash", "2 USB port", "LED indikator"],
  },
  {
    id: "20",
    name: "Winter Coat",
    price: 129.99,
    image: "img/image-copy-19.png",
    category: "Fashion",
    isNew: true,
    discount: 40,
    description: "Qishki palto. Issiq va zamonaviy dizayn.",
    features: ["Issiq astar", "Suv o'tkazmaydi", "Ko'p cho'ntak", "Zamonaviy uslub"],
  },
]

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = "8122147889:AAFCQwTvyB9DuDm7qkXpjBFqjtWJKadmDlw"
const TELEGRAM_CHAT_ID = "7702025887"

// DOM Elements
const elements = {
  userGreeting: null,
  accountBtn: null,
  cartCount: null,
  wishlistCount: null,
  searchInput: null,
  productsGrid: null,
  newProductsGrid: null,
  popularProductsGrid: null,
  saleProductsGrid: null,
  userModal: null,
  loading: null,
  toastContainer: null,
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeElements()
  loadUserData()
  loadCartData()
  loadWishlistData()
  setupEventListeners()
  renderProducts()
  updateUI()
})

// Initialize DOM Elements
function initializeElements() {
  elements.userGreeting = document.getElementById("user-greeting")
  elements.accountBtn = document.getElementById("account-btn")
  elements.cartCount = document.getElementById("cart-count")
  elements.wishlistCount = document.getElementById("wishlist-count")
  elements.searchInput = document.getElementById("search-input")
  elements.productsGrid = document.getElementById("products-grid")
  elements.newProductsGrid = document.getElementById("new-products-grid")
  elements.popularProductsGrid = document.getElementById("popular-products-grid")
  elements.saleProductsGrid = document.getElementById("sale-products-grid")
  elements.userModal = document.getElementById("user-modal")
  elements.loading = document.getElementById("loading")
  elements.toastContainer = document.getElementById("toast-container")
}

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
  // Navigation
  const navBtns = document.querySelectorAll(".nav-btn")
  navBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      switchPage(this.dataset.page)
    })
  })

  // User Modal
  if (elements.accountBtn) {
    elements.accountBtn.addEventListener("click", showUserModal)
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

  // Search
  if (elements.searchInput) {
    elements.searchInput.addEventListener("input", handleSearch)
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

// Page Navigation
function switchPage(page) {
  currentPage = page

  // Update nav buttons
  const navBtns = document.querySelectorAll(".nav-btn")
  navBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page)
  })

  // Update pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((pageEl) => {
    pageEl.classList.toggle("active", pageEl.id === page + "-page")
  })

  // Render filtered products
  if (page === "new") {
    renderFilteredProducts("new", document.getElementById("new-products-grid"))
  } else if (page === "popular") {
    renderFilteredProducts("popular", document.getElementById("popular-products-grid"))
  } else if (page === "sale") {
    renderFilteredProducts("sale", document.getElementById("sale-products-grid"))
  } else if (page === "electronics") {
    renderCategoryProducts("Electronics", document.getElementById("electronics-products-grid"))
  } else if (page === "fashion") {
    renderCategoryProducts("Fashion", document.getElementById("fashion-products-grid"))
  } else if (page === "home-category") {
    renderCategoryProducts("Home", document.getElementById("home-products-grid"))
  } else if (page === "sports") {
    renderCategoryProducts("Sports", document.getElementById("sports-products-grid"))
  } else if (page === "photography") {
    renderCategoryProducts("Photography", document.getElementById("photography-products-grid"))
  }
}

// Render Products
function renderProducts() {
  if (elements.productsGrid) {
    renderAllProducts(elements.productsGrid)
  }
}

function renderAllProducts(container) {
  if (!container) return

  container.innerHTML = ""
  products.forEach((product) => {
    const productCard = createProductCard(product)
    container.appendChild(productCard)
  })
}

function renderFilteredProducts(filter, container) {
  if (!container) return

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

function renderCategoryProducts(category, container) {
  if (!container) return

  container.innerHTML = ""
  const categoryProducts = products.filter((p) => p.category === category)

  categoryProducts.forEach((product) => {
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
    <div class="product-image" onclick="openProductDetail('${product.id}')">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <div class="product-badges">
        ${product.isNew ? '<span class="product-badge badge-new">Yangi</span>' : ""}
        ${product.isPopular ? '<span class="product-badge badge-popular">Ommabop</span>' : ""}
        ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ""}
      </div>
      <button class="wishlist-btn ${isInWishlist ? "active" : ""}" onclick="event.stopPropagation(); toggleWishlist('${product.id}')">
        <i class="fas fa-heart"></i>
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

  return card
}

// Product Functions
function openProductDetail(productId) {
  // Mahsulot ID ni localStorage ga saqlash
  localStorage.setItem("selectedProductId", productId)
  // Tovar sahifasiga o'tish
  window.location.href = "tovar.html"
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

function toggleWishlist(productId) {
  const index = wishlistItems.indexOf(productId)

  if (index > -1) {
    wishlistItems.splice(index, 1)
    showToast("Yoqtirganlardan olib tashlandi", "warning")
  } else {
    wishlistItems.push(productId)
    showToast("Yoqtirganlarga qo'shildi!", "success")
  }

  saveWishlistData()
  updateUI()
  renderProducts()

  // Update current page products
  if (currentPage === "new" && elements.newProductsGrid) {
    renderFilteredProducts("new", elements.newProductsGrid)
  } else if (currentPage === "popular" && elements.popularProductsGrid) {
    renderFilteredProducts("popular", elements.popularProductsGrid)
  } else if (currentPage === "sale" && elements.saleProductsGrid) {
    renderFilteredProducts("sale", elements.saleProductsGrid)
  }
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

  renderProducts()

  // Update current page products
  if (currentPage === "new" && elements.newProductsGrid) {
    renderFilteredProducts("new", elements.newProductsGrid)
  } else if (currentPage === "popular" && elements.popularProductsGrid) {
    renderFilteredProducts("popular", elements.popularProductsGrid)
  } else if (currentPage === "sale" && elements.saleProductsGrid) {
    renderFilteredProducts("sale", elements.saleProductsGrid)
  }
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
  if (!elements.userModal) return

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

  elements.userModal.classList.add("active")
}

function hideUserModal() {
  if (elements.userModal) {
    elements.userModal.classList.remove("active")
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
  if (elements.userGreeting) {
    if (currentUser) {
      elements.userGreeting.textContent = "Salom, " + currentUser.name + "!"
    } else {
      elements.userGreeting.textContent = ""
    }
  }
}

// Search Function
function handleSearch() {
  if (!elements.searchInput) return

  const searchTerm = elements.searchInput.value.toLowerCase()
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const productName = card.querySelector(".product-name")
    if (productName) {
      const name = productName.textContent.toLowerCase()
      if (name.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    }
  })
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
  if (elements.cartCount) {
    elements.cartCount.textContent = cartCount.toString()
    elements.cartCount.classList.toggle("show", cartCount > 0)
  }

  // Update wishlist count
  if (elements.wishlistCount) {
    elements.wishlistCount.textContent = wishlistItems.length.toString()
    elements.wishlistCount.classList.toggle("show", wishlistItems.length > 0)
  }
}

function showLoading() {
  if (elements.loading) {
    elements.loading.style.display = "flex"
  }
}

function hideLoading() {
  if (elements.loading) {
    elements.loading.style.display = "none"
  }
}

function showToast(message, type) {
  if (!elements.toastContainer) return

  type = type || "success"

  const toast = document.createElement("div")
  toast.className = "toast " + type
  toast.textContent = message

  elements.toastContainer.appendChild(toast)

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast)
    }
  }, 3000)
}

// Global functions for onclick handlers
window.addToCart = addToCart
window.toggleWishlist = toggleWishlist
window.likeProduct = likeProduct
window.openProductDetail = openProductDetail
