const canvas = document.querySelector("#mycanvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 382,
};
let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        anime();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;
  }
}

function anime() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#trigger",
      start: "top top",
      end: "bottom bottom",
      scrub: 5,
    },
  });
  tl.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}

preloadImages();
