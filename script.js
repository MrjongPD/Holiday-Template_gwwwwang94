/* 리셋 + 폰트 */
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Pretendard','Noto Sans KR',sans-serif;background:#f4f4f4;color:#333;}
button{cursor:pointer;border:none;background:none;font:inherit;}
.screen{display:none;padding:24px;}
.screen.active{display:block;}
h1,h2{margin-bottom:16px;}
.action-btn{padding:10px 20px;background:#00aaff;color:#fff;border-radius:4px;margin-top:16px;}

/* 뒤로가기 */
.back-btn{display:inline-block;color:#00aaff;margin-bottom:12px;}
.back-btn:hover{text-decoration:underline;}

/* 폼 */
#poster-form .field{margin-bottom:12px;}
#poster-form label{display:block;margin-bottom:4px;font-weight:500;}
#poster-form input[type=text],
#poster-form textarea,
#poster-form input[type=color]{
  width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;
}
#poster-form textarea{height:60px;resize:none;}

/* 포스터 미리보기 */
#poster-preview{
  width:600px;height:800px;
  margin:24px auto;
  position:relative;
  font-family:'Pretendard','Noto Sans KR',sans-serif;
  --primary: #00aaff;
  --bg-url: url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e');
}
#poster-preview .bg{
  position:absolute;top:0;left:0;width:100%;height:100%;
  background: var(--bg-url) center/cover no-repeat;
  filter: brightness(0.7);
}
#poster-preview .content{
  position:absolute;top:0;left:0;width:100%;height:100%;
  padding:40px 30px;
  color:#fff;
  display:flex;flex-direction:column;justify-content:space-between;
}
#poster-preview .header{
  text-align:center;
}
#poster-preview .header h1{
  font-size:2.2rem;letter-spacing:-1px;
  color:var(--primary);margin-bottom:8px;
}
#poster-preview .header p{
  font-size:1rem;line-height:1.4;
}
#poster-preview .period-box{
  background:#fff;color:#333;
  display:flex;justify-content:space-between;
  padding:16px;border-radius:8px;
}
#poster-preview .period-box .item{
  text-align:center;flex:1;
}
#poster-preview .period-box .item:not(:last-child){
  border-right:1px solid #eee;
}
#poster-preview .period-box .label{
  font-size:0.9rem;color:#666;margin-bottom:4px;
}
#poster-preview .period-box .value{
  font-size:1.5rem;font-weight:700;color:var(--primary);
}
#poster-preview .footer{
  text-align:right;font-size:0.9rem;color:#ddd;
}

/* 반응형 */
@media(max-width:640px){
  #poster-preview{width:90vw;height:120vw;}
}
