// 화면 전환
const screens = document.querySelectorAll('.screen');
function show(id) {
  screens.forEach(s=> s.id===id ? s.classList.add('active') : s.classList.remove('active'));
}
document.querySelectorAll('.menu a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    show(a.getAttribute('data-screen'));
  });
});
document.getElementById('start-btn').addEventListener('click', ()=> show('creation-screen'));
document.querySelectorAll('.back-btn').forEach(b=>{
  b.addEventListener('click', ()=> show('main-screen'));
});

// 슬라이더 제어
const slides = document.querySelectorAll('.slide');
let idx=0;
document.getElementById('prev').onclick = ()=>{
  if(idx>0) { slides[idx--].classList.remove('active'); slides[idx].scrollIntoView({behavior:'smooth',inline:'center'}); slides[idx].classList.add('active'); }
};
document.getElementById('next').onclick = ()=>{
  if(idx<slides.length-1) { slides[idx++].classList.remove('active'); slides[idx].scrollIntoView({behavior:'smooth',inline:'center'}); slides[idx].classList.add('active'); }
};

// 템플릿 선택
let chosenTpl=null;
document.querySelectorAll('.tpl').forEach(el=>{
  el.onclick = ()=>{
    document.querySelectorAll('.tpl').forEach(x=> x.classList.remove('selected'));
    el.classList.add('selected');
    chosenTpl = el.getAttribute('data-tpl');
  };
});
document.getElementById('tpl-select-btn').onclick = ()=>{
  if(chosenTpl) {
    alert(chosenTpl + ' 템플릿이 선택되었습니다.');
    show('main-screen');
  } else alert('템플릿을 선택하세요.');
};

// 로그인/회원가입 토글
document.getElementById('show-signup').onclick = e=>{
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
};

// 프리뷰 실시간 반영
const titleIn  = document.getElementById('title-input');
const titleOut = document.getElementById('title-preview');
const sdIn     = document.getElementById('start-date');
const edIn     = document.getElementById('end-date');
const dateOut  = document.getElementById('date-preview');
const logoUp   = document.getElementById('logo-upload');
const logoPrev = document.getElementById('logo-preview');
const fontSel  = document.getElementById('font-select');
const sizeSel  = document.getElementById('font-size');
const colorIn  = document.getElementById('font-color');
const boldChk  = document.getElementById('font-bold');

function updatePreview(){
  titleOut.innerText = titleIn.value || '여기에 제목이 표시됩니다';
  dateOut.innerText  = sdIn.value && edIn.value
    ? `${sdIn.value} ~ ${edIn.value}` : '휴진기간이 표시됩니다';
  titleOut.style.fontFamily = fontSel.value;
  titleOut.style.fontSize   = sizeSel.value + 'px';
  titleOut.style.color      = colorIn.value;
  titleOut.style.fontWeight = boldChk.checked ? '700' : '400';
}
[titleIn,sdIn,edIn,fontSel,sizeSel,colorIn,boldChk].forEach(el=> el.addEventListener('input', updatePreview));

// 로고 업로드 프리뷰
logoUp.onchange = e=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    logoPrev.innerHTML = `<img src="${ev.target.result}">`;
  };
  reader.readAsDataURL(file);
};

// 다운로드 (html2canvas)
document.getElementById('download-btn').onclick = ()=>{
  const preview = document.getElementById('preview');
  preview.style.backgroundColor = '#fff';
  html2canvas(preview, {scale:2}).then(canvas=>{
    const sd = sdIn.value.replace(/-/g,'');
    const ed = edIn.value.replace(/-/g,'');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `휴진안내_${sd}_${ed}.png`;
    link.click();
  });
};