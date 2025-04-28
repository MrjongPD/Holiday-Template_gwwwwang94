
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

document.getElementById('prev').addEventListener('click', () => {
  if (currentIndex > 0) {
    slides[currentIndex].classList.remove('active');
    currentIndex--;
    slides[currentIndex].classList.add('active');
    slides[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    slides[currentIndex].classList.remove('active');
    currentIndex++;
    slides[currentIndex].classList.add('active');
    slides[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
});
