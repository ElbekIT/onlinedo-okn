// Global Variables
let currentUser = null
let cartItems = []
let wishlistItems = []
let currentProduct = null
let currentQuantity = 1

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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadUserData()
  loadCartData()
  loadWishlistData()
  loadSelectedProduct()
  setupEventListeners()
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

function loadSelectedProduct() {
  const selectedProductId = localStorage.getItem("selectedProductId")
  if (!selectedProductId) {
    // Agar mahsulot ID yo'q bo'lsa, bosh sahifaga qaytarish
    window.location.href = "index.html"
    return
  }

  currentProduct = products.find((p) => p.id === selectedProductId)
  if (!currentProduct) {
    // Agar mahsulot topilmasa, bosh sahifaga qaytarish
    window.location.href = "index.html"
    return
  }

  renderProductDetail()
  renderRelatedProducts()
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

  // Product Actions
  const wishlistBtnDetail = document.getElementById("wishlist-btn-detail")
  if (wishlistBtnDetail) {
    wishlistBtnDetail.addEventListener("click", toggleWishlistDetail)
  }

  const likeBtnDetail = document.getElementById("like-btn-detail")
  if (likeBtnDetail) {
    likeBtnDetail.addEventListener("click", likeProductDetail)
  }

  const addToCartDetail = document.getElementById("add-to-cart-detail")
  if (addToCartDetail) {
    addToCartDetail.addEventListener("click", addToCartDetailHandler)
  }

  const buyNowDetail = document.getElementById("buy-now-detail")
  if (buyNowDetail) {
    buyNowDetail.addEventListener("click", buyNowDetailHandler)
  }

  // Quantity Controls
  const decreaseQty = document.getElementById("decrease-qty")
  if (decreaseQty) {
    decreaseQty.addEventListener("click", () => updateQuantityDetail(-1))
  }

  const increaseQty = document.getElementById("increase-qty")
  if (increaseQty) {
    increaseQty.addEventListener("click", () => updateQuantityDetail(1))
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

// Render Product Detail
function renderProductDetail() {
  if (!currentProduct) return

  const discountedPrice = currentProduct.discount
    ? currentProduct.price * (1 - currentProduct.discount / 100)
    : currentProduct.price

  const likes = getLikes(currentProduct.id)
  const hasLiked = hasUserLiked(currentProduct.id)
  const isInWishlist = wishlistItems.includes(currentProduct.id)

  // Update breadcrumb
  const productCategory = document.getElementById("product-category")
  const productNameBreadcrumb = document.getElementById("product-name-breadcrumb")
  if (productCategory) productCategory.textContent = currentProduct.category
  if (productNameBreadcrumb) productNameBreadcrumb.textContent = currentProduct.name

  // Update main image
  const mainProductImage = document.getElementById("main-product-image")
  if (mainProductImage) {
    mainProductImage.src = currentProduct.image
    mainProductImage.alt = currentProduct.name
  }

  // Update badges
  const productBadgesDetail = document.getElementById("product-badges-detail")
  if (productBadgesDetail) {
    productBadgesDetail.innerHTML = ""
    if (currentProduct.isNew) {
      productBadgesDetail.innerHTML += '<span class="product-badge badge-new">Yangi</span>'
    }
    if (currentProduct.isPopular) {
      productBadgesDetail.innerHTML += '<span class="product-badge badge-popular">Ommabop</span>'
    }
    if (currentProduct.discount) {
      productBadgesDetail.innerHTML += `<span class="product-badge badge-discount">-${currentProduct.discount}%</span>`
    }
  }

  // Update product name
  const productNameDetail = document.getElementById("product-name-detail")
  if (productNameDetail) productNameDetail.textContent = currentProduct.name

  // Update prices
  const currentPriceDetail = document.getElementById("current-price-detail")
  const originalPriceDetail = document.getElementById("original-price-detail")
  const discountBadgeDetail = document.getElementById("discount-badge-detail")

  if (currentPriceDetail) currentPriceDetail.textContent = "$" + discountedPrice.toFixed(2)

  if (currentProduct.discount) {
    if (originalPriceDetail) {
      originalPriceDetail.textContent = "$" + currentProduct.price.toFixed(2)
      originalPriceDetail.style.display = "inline"
    }
    if (discountBadgeDetail) {
      discountBadgeDetail.textContent = "-" + currentProduct.discount + "%"
      discountBadgeDetail.style.display = "inline"
    }
  } else {
    if (originalPriceDetail) originalPriceDetail.style.display = "none"
    if (discountBadgeDetail) discountBadgeDetail.style.display = "none"
  }

  // Update likes
  const likesCountDetail = document.getElementById("likes-count-detail")
  const likeBtnDetail = document.getElementById("like-btn-detail")
  if (likesCountDetail) likesCountDetail.textContent = likes.toString()
  if (likeBtnDetail) {
    likeBtnDetail.classList.toggle("liked", hasLiked)
    likeBtnDetail.disabled = hasLiked
  }

  // Update wishlist button
  const wishlistBtnDetail = document.getElementById("wishlist-btn-detail")
  if (wishlistBtnDetail) {
    wishlistBtnDetail.classList.toggle("active", isInWishlist)
  }

  // Update description
  const productDescriptionText = document.getElementById("product-description-text")
  if (productDescriptionText) {
    productDescriptionText.textContent = currentProduct.description || "Bu mahsulot haqida batafsil ma'lumot."
  }

  // Update features
  const productFeaturesList = document.getElementById("product-features-list")
  if (productFeaturesList && currentProduct.features) {
    productFeaturesList.innerHTML = ""
    currentProduct.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      productFeaturesList.appendChild(li)
    })
  }
}

// Render Related Products
function renderRelatedProducts() {
  const relatedProductsGrid = document.getElementById("related-products-grid")
  if (!relatedProductsGrid || !currentProduct) return

  // O'xshash mahsulotlarni topish (bir xil kategoriya)
  const relatedProducts = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4)

  relatedProductsGrid.innerHTML = ""

  relatedProducts.forEach((product) => {
    const productCard = createProductCard(product)
    relatedProductsGrid.appendChild(productCard)
  })
}

// Create Product Card for Related Products
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

// Product Detail Functions
function updateQuantityDetail(change) {
  currentQuantity = Math.max(1, currentQuantity + change)
  const quantityDisplay = document.getElementById("quantity-display")
  if (quantityDisplay) {
    quantityDisplay.textContent = currentQuantity.toString()
  }
}

function toggleWishlistDetail() {
  if (!currentProduct) return

  const index = wishlistItems.indexOf(currentProduct.id)
  if (index > -1) {
    wishlistItems.splice(index, 1)
    showToast("Yoqtirganlardan olib tashlandi", "warning")
  } else {
    wishlistItems.push(currentProduct.id)
    showToast("Yoqtirganlarga qo'shildi!", "success")
  }

  saveWishlistData()
  renderProductDetail()
  updateUI()
}

function likeProductDetail() {
  if (!currentProduct || hasUserLiked(currentProduct.id)) return

  const currentLikes = getLikes(currentProduct.id)
  const newLikes = currentLikes + 1

  try {
    localStorage.setItem("likes_" + currentProduct.id, newLikes.toString())
    localStorage.setItem("user_liked_" + currentProduct.id, "true")
  } catch (error) {
    console.error("Error saving likes:", error)
  }

  renderProductDetail()
}

function addToCartDetailHandler() {
  if (!currentProduct) return

  const existingItem = cartItems.find((item) => item.productId === currentProduct.id)

  if (existingItem) {
    existingItem.quantity += currentQuantity
  } else {
    cartItems.push({
      productId: currentProduct.id,
      quantity: currentQuantity,
    })
  }

  saveCartData()
  updateUI()
  showToast(`${currentQuantity} ta mahsulot savatchaga qo'shildi!`, "success")

  // Miqdorni qayta 1 ga o'rnatish
  currentQuantity = 1
  const quantityDisplay = document.getElementById("quantity-display")
  if (quantityDisplay) {
    quantityDisplay.textContent = "1"
  }
}

function buyNowDetailHandler() {
  if (!currentProduct) return

  // Avval savatchaga qo'shish
  addToCartDetailHandler()

  // Keyin savatcha sahifasiga o'tish
  setTimeout(() => {
    window.location.href = "savatcha.html"
  }, 1000)
}

// Related Product Functions
function openProductDetail(productId) {
  localStorage.setItem("selectedProductId", productId)
  window.location.reload()
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
  renderRelatedProducts()
  updateUI()
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

  renderRelatedProducts()
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
window.openProductDetail = openProductDetail
window.toggleWishlist = toggleWishlist
window.addToCart = addToCart
window.likeProduct = likeProduct
