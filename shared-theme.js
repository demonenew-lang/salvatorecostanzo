// Shared Theme Switcher & Accessibility Manager
// Handles 10 themes and persists choice across sub-sites via localStorage

(function() {
    const themes = [
        { id: 'dark', name: 'Scuro (Default)', icon: 'ðŸŒ™' },
        { id: 'light', name: 'Giorno (Chiaro)', icon: 'â˜€ï¸' },
        { id: 'contrast-yellow', name: 'Contrasto Giallo', icon: 'ðŸŸ¡' },
        { id: 'contrast-blue', name: 'Contrasto Blu', icon: 'ðŸ”µ' },
        { id: 'sepia', name: 'Sepia', icon: 'ðŸ“œ' },
        { id: 'forest', name: 'Verde Foresta', icon: 'ðŸŒ²' },
        { id: 'purple', name: 'Notte Viola', icon: 'ðŸŸ£' },
        { id: 'contrast-green', name: 'Contrasto Verde', icon: 'ðŸŸ¢' },
        { id: 'charcoal', name: 'Grigio Carbone', icon: 'ðŸŒ‘' },
        { id: 'slate-paper', name: 'Carta Lavagna', icon: 'ðŸ““' }
    ];

    let currentIdx = 0;
    try {
        const savedTheme = localStorage.getItem('hub-theme');
        if (savedTheme) {
            const foundIdx = themes.findIndex(t => t.id === savedTheme);
            if (foundIdx !== -1) {
                currentIdx = foundIdx;
            }
        }
    } catch (e) {
        console.warn("Storage access not available");
    }

    // Apply active theme immediately before DOM is fully loaded to prevent flash
    const initialTheme = themes[currentIdx];
    if (initialTheme.id !== 'dark') {
        document.documentElement.setAttribute('data-theme', initialTheme.id);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Double-check body theme application
        if (initialTheme.id !== 'dark') {
            document.body.setAttribute('data-theme', initialTheme.id);
        }

        // Dynamically inject the theme switcher button
        const switcherBtn = document.createElement('button');
        switcherBtn.id = 'themeSwitcher';
        switcherBtn.className = 'theme-btn';
        switcherBtn.setAttribute('aria-label', 'Cambia tema per accessibilitÃ ');
        switcherBtn.innerHTML = 
            <span class="theme-btn-icon"> + initialTheme.icon + </span>
            <span class="theme-btn-text">Tema:  + initialTheme.name + </span>
        ;
        
        // Insert as first child of body to guarantee tab accessibility order
        document.body.insertBefore(switcherBtn, document.body.firstChild);

        // Click listener to rotate through themes
        switcherBtn.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % themes.length;
            const nextTheme = themes[currentIdx];
            applyTheme(nextTheme);
        });

        function applyTheme(theme) {
            // Remove data-theme from both html and body
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');

            if (theme.id !== 'dark') {
                document.documentElement.setAttribute('data-theme', theme.id);
                document.body.setAttribute('data-theme', theme.id);
            }

            // Save to storage
            try {
                localStorage.setItem('hub-theme', theme.id);
            } catch (e) {}

            // Update button UI
            const textEl = switcherBtn.querySelector('.theme-btn-text');
            const iconEl = switcherBtn.querySelector('.theme-btn-icon');
            if (textEl) textEl.textContent = 'Tema: ' + theme.name;
            if (iconEl) iconEl.textContent = theme.icon;
        }
    });
})();

// Scroll To Top Button
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('scrollTopBtn')) {
        const btn = document.createElement('button');
        btn.id = 'scrollTopBtn';
        btn.className = 'scroll-top-btn';
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        btn.setAttribute('aria-label', 'Torna in cima');
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Dynamic Lightbox logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Lightbox HTML if it doesn't exist
    if (!document.getElementById('dynamic-lightbox')) {
        const lb = document.createElement('div');
        lb.id = 'dynamic-lightbox';
        lb.innerHTML = '<button id="dynamic-lightbox-close">&times;</button><img id="dynamic-lightbox-img" src="" alt="Enlarged Image">';
        document.body.appendChild(lb);
        
        // Close events
        lb.addEventListener('click', (e) => {
            if(e.target.id === 'dynamic-lightbox' || e.target.id === 'dynamic-lightbox-close') {
                lb.classList.remove('active');
                setTimeout(() => { lb.style.display = 'none'; }, 300);
            }
        });
    }

    // 2. Attach click events to images
    const lightbox = document.getElementById('dynamic-lightbox');
    const lbImg = document.getElementById('dynamic-lightbox-img');
    
    const images = document.querySelectorAll('main img, .imTextObject img');
    images.forEach(img => {
        if (img.parentElement.tagName.toLowerCase() !== 'a' && !img.closest('#dynamic-lightbox')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lbImg.src = img.src;
                lightbox.style.display = 'flex';
                // Trigger reflow
                void lightbox.offsetWidth;
                lightbox.classList.add('active');
            });
        }
    });
});