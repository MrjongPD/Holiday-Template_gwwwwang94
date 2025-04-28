
let angle = 0;
let logo = document.getElementById('logo');
let isDragging = false, offsetX, offsetY;

logo.addEventListener('mousedown', function(e) {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    logo.style.left = (e.pageX - preview.offsetLeft - offsetX) + 'px';
    logo.style.top = (e.pageY - preview.offsetTop - offsetY) + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});

function rotateLogo() {
  angle += 15;
  logo.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}

function generate() {
  const title = document.getElementById('title').value;
  const message = document.getElementById('message').value;
  document.getElementById('prevTitle').innerText = title;
  document.getElementById('prevMessage').innerText = message;

  const size = document.getElementById('canvasSize').value;
  const preview = document.getElementById('preview');
  if (size === '1080x1920') {
    preview.style.width = '1080px';
    preview.style.height = '1920px';
  } else if (size === '1920x1080') {
    preview.style.width = '1920px';
    preview.style.height = '1080px';
  } else if (size === '1080x1080') {
    preview.style.width = '1080px';
    preview.style.height = '1080px';
  } else if (size === 'A4-portrait') {
    preview.style.width = '794px';
    preview.style.height = '1123px';
  } else if (size === 'A4-landscape') {
    preview.style.width = '1123px';
    preview.style.height = '794px';
  }
}

function download() {
  html2canvas(document.querySelector("#preview")).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = "휴진시안.png";
    link.click();
  });
}

document.getElementById('logoUpload').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    logo.innerHTML = `<img src="${event.target.result}" style="width:150px;">`;
  }
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('logoSize').addEventListener('input', function() {
  if (logo.firstChild) {
    logo.firstChild.style.width = this.value + 'px';
  }
});

document.getElementById('bgUpload').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const style = document.getElementById('bgStyle').value;
    if (style === 'cover') {
      preview.style.background = `url('${event.target.result}') no-repeat center/cover`;
    } else {
      preview.style.background = `url('${event.target.result}') no-repeat center`;
    }
  }
  reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('bgStyle').addEventListener('change', function() {
  document.getElementById('bgUpload').dispatchEvent(new Event('change'));
});
