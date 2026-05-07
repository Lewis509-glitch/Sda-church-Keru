const button = document.querySelector(".btn")

button.addEventListener('click', () => {
    alert("Feature coming soon")
})
  
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