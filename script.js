// — 스크린 전환
const screens = document.querySelectorAll('.screen');
function show(id){ screens.forEach(s=>s.id===id?s.classList.add('active'):s.classList.remove('active')); }
document.querySelectorAll('.menu a').forEach(a=>{ a.onclick = e=>{ e.preventDefault(); show(a.dataset.screen); }; });
document.getElementById('start-btn').onclick = ()=> show('template-screen');
document.querySelectorAll('.back-btn').forEach(b=> b.onclick = ()=> {
  if(document.getElementById('preview-screen').classList.contains('active')) show('creation-screen');
  else if(document.getElementById('creation-screen').classList.contains('active')) show('template-screen');
  else show('main-screen');
});

// — 탭 및 폼 삽입
let chosenTpl='poster';
document.querySelectorAll('.tab-btn').forEach(btn=>{ btn.onclick = ()=>{
  document.querySelectorAll('.tab-btn').forEach(x=> x.classList.remove('active'));
  btn.classList.add('active');
  chosenTpl = btn.dataset.tpl;
};});
document.getElementById('tpl-next-btn').onclick = ()=>{
  injectForm(chosenTpl);
  show('creation-screen');
};

function injectForm(tpl){
  const c = document.getElementById('customize-container');
  let html = '';
  if(tpl==='poster'){
    html = `
      <label>치과 이름: <input type="text" id="clinic-name" placeholder="OOO치과"></label>
      <label>제목 문구: <input type="text" id="poster-title" placeholder="2025년 휴진안내"></label>
      <label>상단 메시지: <textarea id="poster-msg" rows="2">진료에 참고 부탁드립니다.</textarea></label>
      <label>시작일: <input type="date" id="start-date"></label>
      <label>종료일: <input type="date" id="end-date"></label>`;
  } else if(tpl==='calendar'){
    html = `
      <label>월 선택: <input type="month" id="cal-month"></label>
      <label>반나절 옵션:
        <select id="half-day"><option value="">전체</option>
        <option value="am">오전만 휴진</option>
        <option value="pm">오후만 진료</option></select>
      </label>`;
  } else if(tpl==='weekday'){
    html = `
      <label>표시 월: <input type="month" id="wb-month"></label>
      <label>휴진 색상: <input type="color" id="wb-color" value="#FFD166"></label>`;
  } else if(tpl==='simple'){
    html = `
      <label>표시 문구: <input type="text" id="simple-title" placeholder="휴진 안내"></label>
      <label>시작일: <input type="date" id="simple-start"></label>
      <label>종료일: <input type="date" id="simple-end"></label>`;
  }
  c.innerHTML = html;
}

// — 미리보기 전환
document.getElementById('preview-btn').onclick = ()=>{
  show('preview-screen');
  renderTemplate(chosenTpl);
};

// — 렌더 방식 분기
function renderTemplate(tpl){
  ['poster','calendar','weekday','simple'].forEach(t=> document.getElementById('tpl-'+t).style.display='none');
  document.getElementById('tpl-'+tpl).style.display='block';
  window['render'+capitalize(tpl)]();
}
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

// — 포스터형
function renderPoster(){
  const name = document.getElementById('clinic-name').value;
  const title= document.getElementById('poster-title').value;
  const msg  = document.getElementById('poster-msg').value;
  const sd   = document.getElementById('start-date').value;
  const ed   = document.getElementById('end-date').value;
  document.getElementById('tpl-poster').innerHTML = `
    <div class="poster-bg">
      <h1>${name}</h1><h2>${title}</h2>
      <p class="dates">${sd} ~ ${ed}</p><p class="msg">${msg}</p>
    </div>`;
}

// — 달력형
function renderCalendar(){
  const [y,m] = document.getElementById('cal-month').value.split('-');
  const half  = document.getElementById('half-day').value;
  const year=+y, month=+m-1;
  const firstDow = new Date(year,month,1).getDay();
  const lastDate = new Date(year,month+1,0).getDate();
  const holidays = ['2025-02-09','2025-02-10','2025-02-11','2025-09-17','2025-09-18','2025-09-19'].map(s=>new Date(s));
  let html = `<div class="cal-header">${year}년 ${month+1}월</div><div class="cal-grid">`;
  for(let i=0;i<firstDow;i++) html += `<div class="cal-cell empty"></div>`;
  for(let d=1; d<=lastDate; d++){
    const cur=new Date(year,month,d);
    const isHoliday = holidays.some(h=>h.getTime()===cur.getTime());
    const halfClass = (!isHoliday && half) ? ' half-'+half : '';
    html += `<div class="cal-cell${isHoliday?' holiday':''}${halfClass}">${d}</div>`;
  }
  html += `</div>`;
  document.getElementById('tpl-calendar').innerHTML = html;
}

// — 요일박스형
function renderWeekday(){
  const [y,m] = document.getElementById('wb-month').value.split('-');
  const color = document.getElementById('wb-color').value;
  const sd = new Date(y,m-1,1), ed=new Date(y,m,0);
  const days=['일','월','화','수','목','금','토'];
  let html=`<div class="wb-grid">`;
  days.forEach((dow,i)=>{
    html+=`<div class="wb-col"><strong>${dow}</strong><ul>`;
    let cur=new Date(sd);
    while(cur<=ed){
      if(cur.getDay()===i) html+=`<li style="background:${color}">${cur.getDate()}</li>`;
      cur.setDate(cur.getDate()+1);
    }
    html+=`</ul></div>`;
  });
  html+=`</div>`;
  document.getElementById('tpl-weekday').innerHTML = html;
}

// — 심플형
function renderSimple(){
  const title = document.getElementById('simple-title').value;
  const sd    = document.getElementById('simple-start').value;
  const ed    = document.getElementById('simple-end').value;
  let html=`<h3>${title}</h3><ul class="simple-list">`;
  let cur=new Date(sd);
  while(cur<=new Date(ed)){
    const dow=['일','월','화','수','목','금','토'][cur.getDay()];
    html += `<li>${cur.getFullYear()}-${cur.getMonth()+1}-${cur.getDate()} (${dow})</li>`;
    cur.setDate(cur.getDate()+1);
  }
  html+=`</ul>`;
  document.getElementById('tpl-simple').innerHTML = html;
}

// — 다운로드 (html2canvas)
document.getElementById('download-btn').onclick = ()=>{
  const root = document.querySelector('.tpl-preview:not([style*="display: none"])');
  html2canvas(root,{scale:2}).then(canvas=>{
    const link=document.createElement('a');
    link.href=canvas.toDataURL();
    link.download='휴진안내.png';
    link.click();
  });
};