// script.js

document.addEventListener('DOMContentLoaded', () => {
  //— 변수 선언
  let selectedTpl = 'poster';
  const screens    = document.querySelectorAll('.screen');
  const tabs       = document.querySelectorAll('.tab-btn');
  const backBtns   = document.querySelectorAll('.back-btn');
  const navLinks   = document.querySelectorAll('.menu a[data-screen]');
  const startBtn   = document.getElementById('start-btn');
  const nextBtn    = document.getElementById('tpl-next-btn');
  const previewBtn = document.getElementById('preview-btn');
  const downloadBtn= document.getElementById('download-btn');
  const customize  = document.getElementById('customize-container');
  const previewDiv = document.getElementById('preview');

  //— 화면 전환 함수
  function showScreen(id) {
    screens.forEach(s => s.id === id
      ? s.classList.add('active')
      : s.classList.remove('active')
    );
  }

  //— 네비게이션 메뉴 클릭시
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      showScreen(a.dataset.screen);
    });
  });

  //— 시작 버튼
  startBtn.addEventListener('click', () => {
    showScreen('template-screen');
  });

  //— 뒤로 가기 버튼
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const curr = btn.closest('.screen').id;
      if (curr === 'template-screen')    showScreen('main-screen');
      else if (curr === 'creation-screen') showScreen('template-screen');
      else if (curr === 'preview-screen')  showScreen('creation-screen');
    });
  });

  //— 탭 선택 로직
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      // 탭 버튼 상태
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTpl = btn.dataset.tpl;
    });
  });

  //— "다음" 클릭 → 커스터마이즈 영역에 입력폼 생성
  nextBtn.addEventListener('click', () => {
    showScreen('creation-screen');

    // 기존 내용 지우고
    customize.innerHTML = '';

    // 템플릿별 폼 예시: 제목, 날짜, 사유
    const fields = [
      { label: '제목', type: 'text', name: 'title', placeholder: '예) 6월 1일 휴진 안내' },
      { label: '날짜', type: 'date', name: 'date' },
      { label: '사유', type: 'text', name: 'reason', placeholder: '예) 내부 교육' }
    ];

    fields.forEach(f => {
      const wrap = document.createElement('div');
      wrap.classList.add('field');
      wrap.innerHTML = `
        <label>${f.label}</label>
        <input type="${f.type}" name="${f.name}" placeholder="${f.placeholder||''}" />
      `;
      customize.append(wrap);
    });
  });

  //— "미리보기" 클릭 → preview-screen & 내용 렌더
  previewBtn.addEventListener('click', () => {
    showScreen('preview-screen');

    // 모든 tpl-preview 숨기기
    previewDiv.querySelectorAll('.tpl-preview')
      .forEach(div => div.style.display = 'none');

    // 보여줄 영역
    const target = document.getElementById('preview-' + selectedTpl);
    target.style.display = 'block';

    // 폼 값 읽어서 간단 렌더링
    const title  = customize.querySelector('input[name=title]').value;
    const date   = customize.querySelector('input[name=date]').value;
    const reason = customize.querySelector('input[name=reason]').value;

    target.innerHTML = `
      <h3>${title}</h3>
      <p>날짜: ${date}</p>
      <p>사유: ${reason}</p>
    `;
  });

  //— "이미지로 저장" 클릭 → html2canvas 사용
  downloadBtn.addEventListener('click', () => {
    // 현재 보이는 tpl-preview 요소
    const visible = Array.from(previewDiv.children)
      .find(div => div.style.display === 'block');
    if (!visible) return alert('미리보기를 먼저 확인해주세요.');

    html2canvas(visible)
      .then(canvas => {
        const link = document.createElement('a');
        link.download = `${selectedTpl}-휴진안내.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .catch(err => console.error(err));
  });

});  
