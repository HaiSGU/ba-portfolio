
document.addEventListener("DOMContentLoaded", () => {
    // Create modal elements
    const modal = document.createElement("div");
    modal.style.cssText = "display:none; position:fixed; z-index:9999; left:0; top:0; width:100%; height:100%; overflow:auto; background-color:rgba(0,0,0,0.85); align-items:center; justify-content:center; backdrop-filter: blur(5px);";
    
    const img = document.createElement("img");
    img.style.cssText = "max-width:90%; max-height:90%; border-radius:8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); object-fit: contain;";
    
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = "position:absolute; top:20px; right:30px; color:#fff; font-size:40px; font-weight:bold; cursor:pointer; font-family: sans-serif;";
    
    modal.appendChild(closeBtn);
    modal.appendChild(img);
    document.body.appendChild(modal);

    // Add click event to all relevant image links and inline images
    document.querySelectorAll("img.responsive-img, a[href$='.png'], a[href$='.jpg']").forEach(el => {
        // Exclude the github link or pure text if not an artifact
        if (el.tagName === 'A' && !el.classList.contains('artifact-chip') && !el.querySelector('img')) return;
        
        el.style.cursor = "zoom-in";
        el.addEventListener("click", (e) => {
            e.preventDefault();
            let src = "";
            if (el.tagName === "IMG") src = el.src;
            else if (el.tagName === "A") src = el.href;
            
            if (src) {
                img.src = src;
                modal.style.display = "flex";
                document.body.style.overflow = 'hidden'; // prevent background scrolling
            }
        });
    });

    // Close modal logic
    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = '';
        img.src = "";
    };
    
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if(e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape" && modal.style.display === "flex") closeModal();
    });
});
