document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const numCards = 6;
  const angleStep = 360 / numCards;
  const radius = 180;

  const items = [
    { src: "darjelling-img/img-1.jpg", caption: "" },
    { src: "darjelling-img/img-2.jpg", caption: "" },
    { src: "darjelling-img/img-3.jpg", caption: "" },
    { src: "darjelling-img/img-4.jpg", caption: "" },
    { src: "darjelling-img/img-5.jpg", caption: "" },
    { src: "darjelling-img/img-7.jpg", caption: "" },
  ];

  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.transform = `rotateX(${
      i * angleStep
    }deg) translateZ(${radius}px)`;
    card.style.backgroundImage = `url('${item.src}')`;
    card.addEventListener("click", () => openLightbox(item.src));

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.innerText = item.caption;
    card.appendChild(caption);

    carousel.appendChild(card);
  });
  carousel.addEventListener("mouseover", () => {
    clearInterval(rotationInterval);
  });
  carousel.addEventListener("mouseout", () => {
    rotationInterval = setInterval(() => {
      currentRotation += angleStep;
      carousel.style.transform = `rotateX(${currentRotation}deg)`;
    }, 3000);
  });
  let currentRotation = 0;
  let rotationInterval = setInterval(() => {
    currentRotation += angleStep;
    carousel.style.transform = `rotateX(${currentRotation}deg)`;
  }, 3000);
  let startY;
  document.addEventListener("mousedown", (e) => {
    startY = e.clientY;
    document.onmousemove = (e) => {
      const deltaY = e.clientY - startY;
      startY = e.clientY;
      currentRotation += deltaY * 0.5;
      carousel.style.transform = `rotateX(${currentRotation}deg)`;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
  document.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });
  document.addEventListener("touchmove", (e) => {
    const deltaY = e.touches[0].clientY - startY;
    startY = e.touches[0].clientY;
    currentRotation += deltaY * 0.5;
    carousel.style.transform = `rotateX(${currentRotation}deg)`;
  });
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeBtn");

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    setTimeout(() => {
      lightboxImg.src = "";
    }, 300);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === closeBtn) {
      closeLightbox();
    }
  });
});
