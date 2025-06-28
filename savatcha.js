// Global Variables
let currentUser = null
let cartItems = []

// Image mapping - sayt uchun local path, Telegram uchun real URL
const imageMapping = {
  "img/image.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-IM4GFK9InkjybSutL2whLf7vVBfDfS.png",
  "img/image-copy.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-DjL9hEWt7hHrpX5haSeTx2BS0EknZJ.png",
  "img/image-copy-2.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-2-hZJV2w3PKg1uHkloDMi1DDECBUUH6Q.png",
  "img/image-copy-3.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-3-z2pLxLC5TSlSQ1ZV4r92jrVsZ73vSa.png",
  "img/image-copy-4.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-4-Te8Y8QjIIDaXLQ2tmuxpVafEuaTsd8.png",
  "img/image-copy-5.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-5-jnHBf4k7cacZHWlNz2GN7lR3gyQycz.png",
  "img/image-copy-6.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-6-QzUH75Glar5aZMIvQcbVOcnb7OoSX1.png",
  "img/image-copy-7.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-7-shspNRqqdu3RoUCmHtDTo8EJHDdHFS.png",
  "img/image-copy-8.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-8-dKkzqET9WOvgMht2CSKk87NaIT3wHT.png",
  "img/image-copy-9.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-9-IaBzu3lj58plwgsVDdZGKQPyL79BVq.png",
  "img/image-copy-10.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-10-yGqBh5gWDzrgXRQCXTdA8xfofCZbDc.png",
  "img/image-copy-11.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-11-vmutlcoxCZpGN5L585RiUIw9YlV6My.png",
  "img/image-copy-12.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-12-r0Y0VP4C1YBAjmSIcqol72gZvJWTXx.png",
  "img/image-copy-13.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-13-XF0jhWJVHf6jqSLf1byyjzjflDNf4l.png",
  "img/image-copy-14.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-14-C0w0O6zaEPemdSuCSuDGIbkQ6qATX5.png",
  "img/image-copy-15.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-15-ibo6L2eiPB9YeegphJlkp2WeCdaaj0.png",
  "img/image-copy-16.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-16-yiZNH6XXF5Uw4XJXrxrgXEIGvNdADQ.png",
  "img/image-copy-17.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-17-Gpa6m19sEV9Eb5GszEDtXDREv7h0GV.png",
  "img/image-copy-18.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-18-fVY0H5YCYoweOS3wiTmTJsxRgmTBrh.png",
  "img/image-copy-19.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-20-3bGWyBSDeTUBNuzMTJ2PXp6RQjP6W6.png",
  "img/image-copy-20.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-21-GwVMngsGBVSEpBS3RWocBa33B8vwrK.png",
  "img/image-copy-21.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-22-et6eMTXn6cbn7ZpsmDq8Iwiwr8mTSH.png",
  "img/image-copy-22.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-23-hjEONnehos61RzWDM45VicHgGLAmWk.png",
  "img/image-copy-23.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-24-Ygj9VW5TuT9dFpc3YCa13IPSH92pGB.png",
  "img/image-copy-24.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-25-bbRvGbNtU8l3qNrQr7XHMvVFYl0Yah.png",
  "img/image-copy-25.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-26-JfX61CUUcZKwbOsEi37TyK9chM0TPz.png",
  "img/image-copy-26.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-27-QC7g2bh7MKwUmC4DnYlDO6ys55hXIf.png",
  "img/image-copy-27.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-28-2CRbogPCY3q5XQupVV6CHgDJzIza8X.png",
  "img/image-copy-28.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-29-hNW8yAapY9p2vjAmaOQMKV2BPrrLWE.png",
  "img/image-copy-29.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-30-1Ew95T90VAHtkgSDuRwFcmDiCU0Ejy.png",
  "img/image-copy-30.png":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/img/image-copy-31-HWw3TeaNzTmZqqkf70eMO2z9t02x3s.png",
}

// Products data - sayt uchun img/ path ishlatamiz
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

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = "8122147889:AAFCQwTvyB9DuDm7qkXpjBFqjtWJKadmDlw"
const TELEGRAM_CHAT_ID = "7702025887"

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadUserData()
  loadCartData()
  setupEventListeners()
  renderCartItems()
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

  // Cart Actions
  const clearCartBtn = document.getElementById("clear-cart-btn")
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart)
  }

  const checkoutBtn = document.getElementById("checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout)
  }

  const shareLocation = document.getElementById("share-location")
  if (shareLocation) {
    shareLocation.addEventListener("change", handleLocationShare)
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

// Render Cart Items
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container")
  const emptyCartMessage = document.getElementById("empty-cart-message")
  const cartSummary = document.getElementById("cart-summary")

  if (!cartItemsContainer) return

  if (cartItems.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = "block"
    if (cartSummary) cartSummary.style.display = "none"
    cartItemsContainer.innerHTML = ""
    return
  }

  if (emptyCartMessage) emptyCartMessage.style.display = "none"
  if (cartSummary) cartSummary.style.display = "block"

  cartItemsContainer.innerHTML = ""
  let total = 0
  let totalItems = 0

  cartItems.forEach((item) => {
    const product = products.find((p) => p.id === item.productId)
    if (!product) return

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
    const itemTotal = discountedPrice * item.quantity
    total += itemTotal
    totalItems += item.quantity

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item-page"
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-name">${product.name}</h3>
        <p class="cart-item-category">${product.category}</p>
        <div class="cart-item-price">
          <span class="current-price">$${discountedPrice.toFixed(2)}</span>
          ${product.discount ? `<span class="original-price">$${product.price.toFixed(2)}</span>` : ""}
        </div>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${item.quantity - 1})">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${item.quantity + 1})">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="item-total">$${itemTotal.toFixed(2)}</div>
        <button class="remove-item-btn" onclick="removeFromCart('${item.productId}')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `

    cartItemsContainer.appendChild(cartItem)
  })

  // Update summary
  const totalItemsEl = document.getElementById("total-items")
  const totalPriceEl = document.getElementById("total-price")

  if (totalItemsEl) totalItemsEl.textContent = totalItems.toString()
  if (totalPriceEl) totalPriceEl.textContent = "$" + total.toFixed(2)
}

// Cart Functions
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

  if (!shareLocation || !locationInfo) return

  if (shareLocation.checked) {
    if (navigator.geolocation) {
      showLoading()

      // Yuqori aniqlik bilan joylashuvni olish
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          const accuracy = position.coords.accuracy

          // Joylashuvni saqlash
          window.userLocation = {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
          }

          const locationText = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          locationInfo.innerHTML = `
            <strong>📍 Joylashuv:</strong> ${locationText}<br>
            <small>Aniqlik: ${Math.round(accuracy)} metr</small>
          `
          locationInfo.style.display = "block"
          hideLoading()

          showToast("Joylashuv muvaffaqiyatli olindi!", "success")
        },
        (error) => {
          console.error("Error getting location:", error)
          let errorMessage = "Joylashuvni olishda xatolik"

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Joylashuv ruxsati berilmagan"
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Joylashuv ma'lumoti mavjud emas"
              break
            case error.TIMEOUT:
              errorMessage = "Joylashuvni olish vaqti tugadi"
              break
          }

          locationInfo.textContent = errorMessage
          locationInfo.style.display = "block"
          hideLoading()
          showToast(errorMessage, "error")
        },
        options,
      )
    } else {
      locationInfo.textContent = "Geolokatsiya qo'llab-quvvatlanmaydi"
      locationInfo.style.display = "block"
      showToast("Geolokatsiya qo'llab-quvvatlanmaydi", "error")
    }
  } else {
    locationInfo.style.display = "none"
    window.userLocation = null
  }
}

// Telegram uchun rasm URL olish funksiyasi
function getTelegramImageUrl(localImagePath) {
  return imageMapping[localImagePath] || localImagePath
}

async function handleCheckout() {
  const installationRequired = document.getElementById("installation-required")
  const shareLocation = document.getElementById("share-location")
  const locationInfo = document.getElementById("location-info")

  if (!installationRequired || !installationRequired.checked) {
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

  try {
    let total = 0

    // 1. Har bir tovar uchun rasm + ma'lumotlar yuborish
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i]
      const product = products.find((p) => p.id === item.productId)

      if (product) {
        const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
        const itemTotal = discountedPrice * item.quantity
        total += itemTotal

        // Har bir tovar uchun caption tayyorlash
        let caption = `📦 ${product.name}\n\n`
        caption += `🏷️ Kategoriya: ${product.category}\n`
        caption += `💰 Narx: $${discountedPrice.toFixed(2)}`

        if (product.discount) {
          caption += ` (${product.discount}% chegirma)\n`
          caption += `💸 Eski narx: $${product.price.toFixed(2)}\n`
        } else {
          caption += `\n`
        }

        caption += `📊 Miqdor: ${item.quantity}\n`
        caption += `💵 Jami: $${itemTotal.toFixed(2)}`

        // Telegram uchun to'g'ri rasm URL olish
        const telegramImageUrl = getTelegramImageUrl(product.image)

        console.log(`Yuborilayotgan rasm: ${product.name}`)
        console.log(`Sayt uchun: ${product.image}`)
        console.log(`Telegram uchun: ${telegramImageUrl}`)

        // Tovar rasmini yuborish
        const photoResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            photo: telegramImageUrl,
            caption: caption,
          }),
        })

        if (!photoResponse.ok) {
          const errorData = await photoResponse.json()
          console.error("Telegram rasm xatoligi:", errorData)
          showToast(`Rasm yuborishda xatolik: ${product.name}`, "error")
        } else {
          console.log(`✅ Rasm muvaffaqiyatli yuborildi: ${product.name}`)
        }
      }
    }

    // 2. Agar joylashuv ulashilgan bo'lsa, uni haqiqiy location sifatida yuborish
    if (shareLocation && shareLocation.checked && window.userLocation) {
      console.log("📍 Joylashuv yuborilmoqda...")

      const locationResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          latitude: window.userLocation.latitude,
          longitude: window.userLocation.longitude,
        }),
      })

      if (locationResponse.ok) {
        console.log("✅ Joylashuv muvaffaqiyatli yuborildi")

        // Joylashuv haqida xabar
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: "📍 Mijozning joylashuvi yuqorida ko'rsatilgan",
          }),
        })
      } else {
        console.error("❌ Joylashuv yuborishda xatolik")
      }
    }

    // 3. Umumiy buyurtma xulosasi
    let summaryMessage = "📋 BUYURTMA XULOSASI\n\n"
    summaryMessage += `👤 Mijoz: ${currentUser.name}\n`
    summaryMessage += `📞 Telefon: ${currentUser.phone}\n\n`
    summaryMessage += `📦 Jami mahsulotlar: ${cartItems.length} xil\n`
    summaryMessage += `📊 Jami miqdor: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)} ta\n`
    summaryMessage += `💰 UMUMIY SUMMA: $${total.toFixed(2)}\n\n`
    summaryMessage += `✅ Ustanovka: ${installationRequired.checked ? "Ha (majburiy)" : "Yo'q"}\n`

    if (shareLocation && shareLocation.checked && window.userLocation) {
      summaryMessage += `📍 Joylashuv: Ulashilgan\n`
    }

    summaryMessage += "\n🎯 Buyurtma tayyor! Mijoz bilan bog'laning."

    console.log("📋 Buyurtma xulosasi yuborilmoqda...")

    // Umumiy xabarni yuborish
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: summaryMessage,
        parse_mode: "HTML",
      }),
    })

    if (response.ok) {
      console.log("✅ Buyurtma muvaffaqiyatli yuborildi!")
      showToast("Buyurtma muvaffaqiyatli yuborildi!", "success")
      cartItems = []
      saveCartData()
      renderCartItems()
      updateUI()

      // 3 soniyadan keyin bosh sahifaga o'tish
      setTimeout(() => {
        window.location.href = "index.html"
      }, 3000)
    } else {
      throw new Error("Telegram API error")
    }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    showToast("Xatolik yuz berdi. Qayta urinib ko'ring.", "error")
  } finally {
    hideLoading()
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

function updateUI() {
  // Update cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountEl = document.getElementById("cart-count")
  if (cartCountEl) {
    cartCountEl.textContent = cartCount.toString()
    cartCountEl.classList.toggle("show", cartCount > 0)
  }

  // Update wishlist count
  const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]")
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
window.updateQuantity = updateQuantity
window.removeFromCart = removeFromCart
