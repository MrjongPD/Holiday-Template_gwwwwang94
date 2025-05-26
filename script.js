/* …기존 리셋/헤더/버튼 스타일… */

/* 달력 그리드 */
#calendar-container {
  max-width: 360px;
  margin: 24px auto;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.calendar .day {
  position: relative;
  padding: 12px 0;
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  user-select: none;
}
.calendar .day.disabled {
  color: #bbb;
  cursor: default;
  background: #f5f5f5;
}
.calendar .day.selected {
  background: #e74c3c;
  color: #fff;
  font-weight: bold;
}

/* 요일 헤더 */
.calendar .day.header {
  background: #6ec1a4;
  color: #fff;
  cursor: default;
}
