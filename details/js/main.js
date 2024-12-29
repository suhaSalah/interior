// فتح نموذج الطلب
function openForm(button) {
    const overlay = document.getElementById("orderFormOverlay");
    if (overlay) {
        const templateCard = button.closest(".template-card");
        if (templateCard) {
            const templateTitle = templateCard.querySelector("h5")?.innerText || "No Title";
            document.getElementById("templateTitle").value = templateTitle;
            overlay.style.display = "flex";
        } else {
            console.error("Template card not found for the button");
        }
    } else {
        console.error("Overlay not found");
    }
}


// إغلاق النموذج
function closeForm() {
    const overlay = document.getElementById("orderFormOverlay");
    if (overlay) overlay.style.display = "none";
}

// إرسال الطلب عبر واتساب
function sendOrder() {
    const form = document.getElementById("orderForm");
    if (!form) return;

    const templateTitle = form.templateTitle?.value || 'No Title';
    const buyerName = form.buyerName?.value || 'Anonymous';
    const email = form.email?.value || 'No Email';
    const phone = form.phone?.value || 'No Phone';
    const currency = form.currency?.value || 'Not Specified';
    const paymentMethod = form.paymentMethod?.value || 'Not Specified';

    const message = `Order Details:\n
    Template Title: ${templateTitle}\n
    Name: ${buyerName}\n
    Email: ${email}\n
    WhatsApp: ${phone}\n
    Currency: ${currency}\n
    Payment Method: ${paymentMethod}`;

    const whatsappNumber = "249116175476";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    closeForm();
}
// إرسال رسالة عامة عبر واتساب
const sendBtn = document.getElementById('send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const name = document.getElementById('name')?.value || 'Anonymous';
        const email = document.getElementById('email')?.value || 'No Email';
        const subject = document.getElementById('subject')?.value || 'No Subject';
        const message = document.getElementById('message')?.value || 'No Message';

        if (!name || !email || !subject || !message) {
            alert('Please fill in all the fields.');
            return;
        }

        const whatsappNumber = '+249116175476';
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=*
            Subject:* ${encodeURIComponent(subject)}%0A
            *Name:* ${encodeURIComponent(name)}%0A
            *Email:* ${encodeURIComponent(email)}%0A
            *Message:* ${encodeURIComponent(message)}`;

        window.open(whatsappLink, '_blank');
    });
}

// Scroll and Dot Logic
const scrollContainer = document.querySelector('.scroll-container');
const scrollRow = document.querySelector('.scroll-row');
const cards = [...document.querySelectorAll('.card')];
const dots = document.querySelectorAll('.dot');

let isScrolling = false;

// Clone cards for infinite scroll
cards.forEach(card => {
    const cloneBefore = card.cloneNode(true);
    const cloneAfter = card.cloneNode(true);
    scrollRow.prepend(cloneBefore);
    scrollRow.append(cloneAfter);
});

// Adjust scroll position to the middle
scrollContainer.scrollLeft = 0;

// Infinite scrolling logic
scrollContainer.addEventListener('scroll', () => {
    if (isScrolling) return;

    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollRow.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;

    if (scrollLeft <= 0) {
        isScrolling = true;
        scrollContainer.scrollLeft = scrollLeft + scrollWidth / 3;
        isScrolling = false;
    } else if (scrollLeft + containerWidth >= scrollWidth) {
        isScrolling = true;
        scrollContainer.scrollLeft = scrollLeft - scrollWidth / 3;
        isScrolling = false;
    }

    updateActiveDot();
});

// Function to update active dot based on visible card
function updateActiveDot() {
    const containerWidth = scrollContainer.offsetWidth;
    const centerPosition = scrollContainer.scrollLeft + containerWidth ;

    let activeIndex = 0;
    cards.forEach((card, index) => {
        const cardStart = card.offsetLeft;
        const cardEnd = card.offsetLeft + card.offsetWidth;

        // console.log(cardEnd)
        // console.log(cardStart)

        if (centerPosition >= cardStart && centerPosition <= cardEnd) {
            activeIndex = index % dots.length;
            
        }
    });

    // Remove 'active' class from all dots and add it to the active one
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === activeIndex) {
            dot.classList.add('active');
        }
    });
}

// Add scroll event listener to update active dot
scrollContainer.addEventListener('scroll', updateActiveDot);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        console.log(`تم الضغط على النقطة رقم ${index}`);
        // console.log(`تم الضغط على النقطة رقم ${activeIndex}`);
        const targetIndex = parseInt(dot.dataset.target);
        console.log(`تم الضغط على النقطة رقم ${targetIndex}`);
        const cardWidth = cards[0].offsetWidth;
        const scrollTo = (scrollRow.offsetWidth / 7) + (targetIndex * cardWidth);
        scrollContainer.scrollLeft = scrollTo;
    });
});


// Initialize active dot when the page loads
updateActiveDot();
