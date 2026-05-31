const button = document.querySelector(".btn");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");
const aside = document.querySelector("aside");
const asideMenu = document.querySelector(".side-menu ul");
const footerDate = document.getElementById("current-year");
const joinBtn = document.querySelector(".join");
const overlay = document.querySelector(".overlay");
const authToken = localStorage.getItem('authToken');
const userRole = localStorage.getItem('userRole');
const isAdmin = authToken && userRole === 'admin';

// Set the current year in the footer
if (footerDate) {
    footerDate.textContent = new Date().getFullYear();
}

if (joinBtn) {
    joinBtn.style.display = 'none';
}

const renderAdminNav = () => {
    if (!navLinks) return;

    const existingItem = document.getElementById('admin-nav-item');
    const href = isAdmin ? 'admin.html' : 'admin-login.html';
    const text = isAdmin ? 'Admin Console' : 'Admin Login';

    const itemHtml = `<a href="${href}"><i class='bx bx-shield-quarter'></i><span>${text}</span></a>`;

    if (existingItem) {
        existingItem.innerHTML = itemHtml;
    } else {
        const listItem = document.createElement('li');
        listItem.id = 'admin-nav-item';
        listItem.innerHTML = itemHtml;
        navLinks.appendChild(listItem);
    }

    if (asideMenu) {
        const existingAsideItem = document.getElementById('admin-aside-item');
        if (existingAsideItem) {
            existingAsideItem.innerHTML = itemHtml;
        } else {
            const asideItem = document.createElement('li');
            asideItem.id = 'admin-aside-item';
            asideItem.innerHTML = itemHtml;
            asideMenu.appendChild(asideItem);
        }
    }
};

renderAdminNav();

const notificationLink = document.querySelector('.announcements a');
let notificationBadge;
if (notificationLink) {
    notificationBadge = document.createElement('span');
    notificationBadge.className = 'notification-badge';
    notificationLink.appendChild(notificationBadge);

    const updateNotificationIndicator = async () => {
        try {
            const response = await fetch('/api/announcements');
            const data = await response.json();
            const count = Array.isArray(data.announcements) ? data.announcements.length : 0;
            if (count > 0) {
                notificationBadge.style.display = 'flex';
                notificationBadge.textContent = count > 9 ? '9+' : count;
            } else {
                notificationBadge.style.display = 'none';
            }
        } catch (error) {
            notificationBadge.style.display = 'none';
        }
    };

    updateNotificationIndicator();
}

if (joinBtn) {
    joinBtn.style.display = 'none';
}

const openMenu = () => {
    if (!aside) return;
    aside.style.display = "block";
    aside.classList.remove("slide-out");
    aside.classList.add("slide-in");
};

const closeMenu = () => {
    if (!aside) return;
    aside.classList.remove("slide-in");
    aside.classList.add("slide-out");
    setTimeout(() => {
        if (aside.classList.contains("slide-out")) {
            aside.style.display = "none";
        }
    }, 300);
};

if (menu) {
    menu.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from immediately triggering the document listener
        const isOpen = aside && aside.classList.contains("slide-in");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

// 3. Auto-close when clicking outside the aside section
document.addEventListener("click", (e) => {
    if (!aside || !menu) return;
    if (!aside.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
    }
});


// 4. Auto-close when the user scrolls
// window.addEventListener("scroll", () => {
//     closeMenu();
// }, { passive: true }); // Optimizes scroll performance


// button.addEventListener('click', () => {
//     alert("Feature coming soon")
// })
  
  // Sabbath Countdown Logic
        function updateSabbathCountdown() {
            const now = new Date();
            
            // Calculate time until next Friday at 18:00 (Sunset Proxy)
            const dayOfWeek = now.getDay(); 
            let daysUntilFriday = 5 - dayOfWeek;
            
            // If it's past Friday 6 PM or it's Saturday, aim for next week's Friday
            if (daysUntilFriday < 0 || (daysUntilFriday === 0 && now.getHours() >= 18)) {
                daysUntilFriday += 7; 
            }
            
            const nextFriday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFriday);
            nextFriday.setHours(18, 0, 0, 0);

            const diff = nextFriday - now;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);

            // Determine if it's currently Sabbath
            if (dayOfWeek === 6 || (dayOfWeek === 5 && now.getHours() >= 18)) {
                document.getElementById("sabbath-countdown").innerText = "It's Sabbath! Welcome.";
                document.getElementById("sabbath-countdown").style.color = "#fff";
            } else {
                document.getElementById("sabbath-countdown").innerText = `${days}d ${hours}h ${minutes}m`;
            }
        }

        // Initialize and set interval
        updateSabbathCountdown();
        setInterval(updateSabbathCountdown, 60000); // Refresh every minute