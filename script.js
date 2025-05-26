/* Reset & Base */
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Pretendard','Noto Sans KR',sans-serif;background:#f4f4f4;color:#333;}
button{cursor:pointer;border:none;background:none;font:inherit;}
.screen{display:none;padding:24px;}
.screen.active{display:block;}
h1,h2{margin-bottom:16px;}
.action-btn{padding:10px 20px;background:#00aaff;color:#fff;border-radius:4px;margin-top:16px;}

/* Back button */
.back-btn{display:inline-block;color:#00aaff;margin-bottom:12px;}
.back-btn:hover{text-decoration:underline;}

/* Template tabs */
.template-tabs{display:flex;gap:8px;margin-bottom:16px;}
.tab-btn{flex:1;padding:10px;background:#fff;border:1px solid #ccc;border-radius:4px;}
.tab-btn.active{background:#00aaff;color:#fff;border-color:#00aaff;}

/* Form areas */
.form-area{margin-bottom:16px;}
.field{margin-bottom:12px;}
.field label{display:block;margin-bottom:4px;font-weight:500;}
.field input[type=text],
.field textarea,
.field input[type=color]{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;}
.field textarea{resize:none;height:60px;}

/* Calendar */
#calendar-container .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
#calendar-container .day{padding:12px 0;text-align:center;background:#fff;border:1px solid #ddd;cursor:pointer;}
#calendar-container .day.header{background:#00aaff;color:#fff;cursor:default;}
#calendar-container .day.disabled{background:#f5f5f5;color:#bbb;cursor:default;}
#calendar-container .day.selected{background:#e74c3c;color:#fff;font-weight:bold;}

/* Preview area */
.preview-area{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:16px;}
.tpl-preview{position:relative;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.1);padding:16px;}
