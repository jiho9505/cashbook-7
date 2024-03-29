import { COLORS_BY_CATEGORY } from '@src/static/constants';
import { ExpenditureIcon, IncomeIcon } from '@src/static/image-urls';
import {
  CalendarData,
  CalendarModalData,
  Date,
  Day,
  DayInfos,
  HTMLText,
  Month,
  Offset,
  ServerHistoryData,
  TargetDateInfos,
  Year,
} from '@src/types';
import handleEvent from '@src/utils/handleEvent';
import { createDOMWithSelector, formatDataIntoWon, formatDateAsTwoLetters } from '@src/utils/helper';

import './Calendar.scss';

const ALL_DAY_ON_CALENDAR = 42;

export default class CalendarView {
  calendarData: CalendarData;
  dayObj: { year: Year; month: Month };
  $tbody: HTMLElement;
  $calendarTable: HTMLElement;
  $totalMoney: HTMLElement;

  constructor({ parent, currentYear, currentMonth, currentCalendarData }) {
    this.calendarData = this.processServerDataIntoCalendarData(currentCalendarData);
    this.dayObj = { year: currentYear, month: currentMonth };

    this.$calendarTable = createDOMWithSelector('table', '.calendar__table');
    this.$totalMoney = createDOMWithSelector('div', '.calendar__total-money');

    parent.appendChild(this.$calendarTable);
    parent.appendChild(this.$totalMoney);

    this.render();

    document.addEventListener('click', (e) => this.handleModal(e, this));
  }

  /**
   * 캘린더 내에 history가 있는 영역을 클릭할 경우,
   * 해당 날자의 데이터와 함께 모달을 Open 합니다.
   * 이외의 영역을 클릭할 경우,
   * 모달을 Close 합니다.
   */
  handleModal(e: Event, { dayObj, calendarData }: CalendarView) {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.closest('.content__calendar__modal')) return;
    if (!e.target.closest('.contain-data')) return handleEvent.fire('opencalendarmodal', { command: 'close' });

    const target = e.target.closest('.contain-data') as HTMLElement;
    const targetDay = target.dataset.day;
    const { year, month } = dayObj;

    const data: CalendarModalData = {
      date: { year, month, date: targetDay },
      dayData: calendarData.dayData[`${year}-${formatDateAsTwoLetters(month)}-${formatDateAsTwoLetters(targetDay)}`],
    };
    const { top, left } = target.getBoundingClientRect();

    handleEvent.fire('opencalendarmodal', { command: 'open', data, pos: { top, left } });
  }

  render() {
    this.$calendarTable.innerHTML = `
      <thead>
      ${this.getDayDOM()}
      </thead>
      <tbody>
      ${this.getFullDateOnCalendarDOM(this.dayObj)}
      </tbody>
    `;

    this.$totalMoney.innerHTML = `
      <div class='calendar__total-money--expenditure'>
        <img src=${ExpenditureIcon} alt='expenditure'>
        <span>${formatDataIntoWon(this.calendarData.totalExpenditure)}</span>
      </div>
      <div class='calendar__total-money--income'>
        <img src=${IncomeIcon} alt='income'>
        <span>${formatDataIntoWon(this.calendarData.totalIncome)}</span>
      </div>
    `;
  }

  /**
   * 캘린더 상단에 요일 표기를 위한 DOM을 반환합니다.
   */
  getDayDOM(): HTMLText {
    return `
      <tr>
        <td>SUN</td><td>MON</td><td>TUE</td>
        <td>WED</td><td>THU</td><td>FRI</td><td>SAT</td>
      </tr>
    `;
  }

  /**
   * 달력의 모든 날짜 DOM을 생성합니다.
   * 1. 지난 달의 마지막 날짜, 이번 달의 마지막 날짜, 이번 1일의 요일을 얻습니다.
   * 2. 요일 데이터와 1일의 offset을 얻습니다.
   * 3. 모든 달력 데이터에 Offset을 적용시킵니다.
   * 4. 총 42개에 해당하는 지난달, 현재, 다음 달 데이터를 얻습니다.
   * 5. 달력을 주 단위로 분할합니다.
   * 6. 분할한 달력을 DOM으로 변환합니다.
   */
  getFullDateOnCalendarDOM(date: TargetDateInfos): HTMLText {
    const { year: TARGET_YEAR, month: TARGET_MONTH } = date;

    const lastDateOnPrevMonth: Date = new Date(TARGET_YEAR, TARGET_MONTH - 1, 0).getDate();
    const lastDateOnCurrentMonth: Date = new Date(TARGET_YEAR, TARGET_MONTH, 0).getDate();
    const startDayOnCurrentMonth: Day = new Date(TARGET_YEAR, TARGET_MONTH - 1, 1).getDay();

    const dayOffset: Offset = this.getDayOffset(startDayOnCurrentMonth);
    const calendarWithOffset: Offset[] = this.getCalendarWithOffset(dayOffset);
    const calendar: DayInfos[] = this.getCalendar(calendarWithOffset, lastDateOnPrevMonth, lastDateOnCurrentMonth);
    const splitedCalendar: DayInfos[][] = this.getSplitedCalendar(calendar);
    const $calendarDOM = this.getCalendarDOM(splitedCalendar).join('');

    return $calendarDOM;
  }

  /**
   * Calendar Data를 순회하며,
   * week에 해당하는 모든 <tr> 태그를 얻고 반환합니다.
   */
  getCalendarDOM(data: DayInfos[][]) {
    return data.reduce((acc, week) => [...acc, this.getWeekDOM(week)], []);
  }

  /**
   * 배열을 순회하며,
   * tr 태그에 해당하는 weekDOM을 생성합니다.
   * ex)
   *     <tr>
   *        <td><span>1</span></td>
   *        <td><span>2</span></td>
   *        ...
   *     </tr>
   *
   * 만약, 해당 일에 해당하는 calendarData가 있을 경우,
   * 색깔을 표시하기 위해 DOM을 생성해서 넣어줍니다.
   */
  getWeekDOM(week: DayInfos[]): HTMLText {
    const $tr = createDOMWithSelector('tr');

    week.forEach(({ day, isCurrentMonthDate }) => {
      const $td = createDOMWithSelector('td');
      if (!isCurrentMonthDate) $td.classList.add('not-current-month-date');

      const $span = createDOMWithSelector('span');
      $span.innerText = `${day}`;
      $td.appendChild($span);

      if (isCurrentMonthDate) {
        $td.setAttribute('data-day', day.toString());
        const { year, month } = this.dayObj;
        const dayFormat = `${year}-${formatDateAsTwoLetters(month)}-${formatDateAsTwoLetters(day)}`;

        if (dayFormat in this.calendarData.dayData) {
          $td.classList.add('contain-data');

          const $containCategory = createDOMWithSelector('div', '.contain-category');
          const categoryColorDOMs = this.getCategoryColorDOMs(dayFormat);

          $containCategory.innerHTML = categoryColorDOMs;
          $td.appendChild($containCategory);
        }
      }

      $tr.appendChild($td);
    });

    return $tr.outerHTML;
  }

  /**
   * 데이터에서 dayFormat 키에 해당하는 category를 가져와서,
   * DOM으로 변경한 후 반환합니다.
   */
  getCategoryColorDOMs = (dayFormat: string): HTMLText => {
    return this.calendarData.dayData[dayFormat].containCategory
      .map((cat) => `<div class='contain-category__color' style='background-color:${COLORS_BY_CATEGORY[cat]}'></div>`)
      .join('');
  };

  /**
   * 달력을 일주일 단위로 분할합니다.
   */
  getSplitedCalendar(calendar: DayInfos[]): DayInfos[][] {
    const DAY_PER_WEEK = 7;
    const CHUNK = DAY_PER_WEEK;

    const splitedCalendar = [];

    for (let i = 0; i < calendar.length; i += CHUNK) {
      splitedCalendar.push(calendar.slice(i, i + CHUNK));
    }

    return splitedCalendar;
  }

  /**
   * 이전 달 날짜들, 이번 달 날짜들, 다음 달 날짜들을 구분하여
   * Date 데이터로 만듭니다.
   */
  getCalendar(calendarWithOffset: Offset[], lastDateOnPrevMonth: Date, lastDateOnCurrentMonth: Date): DayInfos[] {
    const splitedPoint1: Day = calendarWithOffset.findIndex((offset) => offset === 0);
    const prevMonthDays: DayInfos[] = calendarWithOffset
      .splice(0, splitedPoint1 + 1)
      .reduce((acc, offset) => [...acc, { day: offset + lastDateOnPrevMonth, isCurrentMonthDate: false }], []);

    const splitedPoint2: Day = calendarWithOffset.findIndex((offset) => offset === lastDateOnCurrentMonth);
    const nextMonthDays: DayInfos[] = calendarWithOffset
      .splice(splitedPoint2 + 1)
      .reduce((acc, offset) => [...acc, { day: offset - lastDateOnCurrentMonth, isCurrentMonthDate: false }], []);

    const currentMonthDays: DayInfos[] = calendarWithOffset //
      .reduce((acc, offset) => [...acc, { day: offset, isCurrentMonthDate: true }], []);

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  /**
   * 달력에서 보여지는 date 들이
   * 1일을 기준으로 얼마나 차이나는 지 계산하여 반환합니다.
   * 만약, 첫번째 수요일이 1이라면
   * 월요일은 -1, 화요일은 0, ... 이 됩니다.
   */
  getCalendarWithOffset(offset: Offset): Offset[] {
    return [...new Array(ALL_DAY_ON_CALENDAR).keys()].map((idx) => idx - offset);
  }

  /**
   * 달의 첫 날의 요일을 계산하여,
   * 요일과 날짜의 차이값 dayOffset을 반환합니다.
   */
  getDayOffset(day: Day): Offset {
    const dayIdx = day === 6 ? 0 : day;
    const FIRST_DATE = 1;
    return dayIdx - FIRST_DATE;
  }

  /**
   * 서버의 데이터를 받아,
   * View 를 위해 사용할 데이터를 가공합니다.
   * 서버 데이터를 iterate 하며 CalendarDataType에 맞게 공정을 거칩니다.
   *
   * FIXME: 현재 더 좋은 로직이 생각나지 않고,
   * 시간이 없기에 그냥 넘어가지만
   * 리팩토링을 한다면 더 좋은 로직으로 개선할 수 있다고 생각합니다.
   */
  processServerDataIntoCalendarData(history: ServerHistoryData[]) {
    const calendarData: CalendarData = {
      dayData: {},
      totalIncome: 0,
      totalExpenditure: 0,
    };

    history.forEach(({ price, historyContent, expenditureDay, category: { name: categoryName } }) => {
      if (!calendarData.dayData[expenditureDay])
        calendarData.dayData[expenditureDay] = {
          detail: [{ price, category: categoryName, historyContent }],
          containCategory: [categoryName],
          dayTotalIncome: categoryName === 'income' ? price : 0,
          dayTotalExpenditure: categoryName === 'income' ? 0 : price,
        };
      else {
        calendarData.dayData[expenditureDay].detail.push({ price, category: categoryName, historyContent });

        if (!calendarData.dayData[expenditureDay].containCategory.includes(categoryName))
          calendarData.dayData[expenditureDay].containCategory.push(categoryName);

        categoryName === 'income'
          ? (calendarData.dayData[expenditureDay].dayTotalIncome += price)
          : (calendarData.dayData[expenditureDay].dayTotalExpenditure += price);
      }

      if (categoryName === 'income') calendarData.totalIncome += price;
      else calendarData.totalExpenditure += price;
    });

    return calendarData;
  }
}
