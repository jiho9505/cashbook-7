


<h2 align="center">http://13.125.6.141:8080/</h3>

<p align="center">
이 프로젝트는 가계부 서비스를 제공하는 웹 애플리케이션이며, 약 2주의 기간동안 (7/26 ~ 8/6) 개발을 진행하였습니다.<br>
저희 팀의 가장 중요한 가치는 도전이었습니다.<br>
저희는 저번 프로젝트에 구현한 결과에 비해 개인적 성장이 늘어나지 않았다고 느껴, <br>
이번 프로젝트에서는 프로젝트의 퀄리티를 약간 희생하더라도 개인의 성장에 초점을 맞추기 위해 노력했습니다.<br> 
아래는 저희가 구현한 기능에 대한 설명이 이어지며,<br>
각자 개발 이후 성장적인 측면에서 남긴 부산물을 하이퍼링크로 달아두겠습니다.<br>
</p>

---

## Features

이 애플리케이션은 총 4개의 페이지 (메인, 가계부 내역, 통계, 달력) 로 이루어져 있습니다.
각 페이지는 다음과 같은 기능을 제공합니다.

## 메인 페이지

* 버튼을 클릭 시, github OAuth 요청을 합니다.
* 서버는 해당 요청을 받아 access, refresh token을 반환하며, access는 JS 코드 내에, refresh 는 localStorage에 보관합니다.
* 원활한 서비스 경험을 위해 회원가입 시 샘플 데이터를 넣어줍니다.

## 내역 페이지




* 유저의 해당 월에 해당하는 잔고를 보여줍니다
* 유저의 결제 수단들을 보여주며 각 카드에 지출,수입의 돈 단위가 기록됩니다.
* 결제 수단 클릭 시 해당 달 결제수단 기준으로 필터링이 됩니다.
* 내역부분은 유저의 수입,지출 내역을 보여줍니다.
* 카테고리를 클릭하면 카테고리 별로 필터링, 날짜를 클릭하면 날짜별로 필터링, 소비 or 지출을 클릭하면 소비 지출별로 필터링을 받을 수 있습니다.
* 내역의 + 버튼은 내역을 등록할 수 있는 모달을 띄웁니다.
* 모달에서 모든 유효성 검사를 통과하면 새로운 내역을 생성할 수 있습니다.
* 새로 생성된 내역은 내역페이지에 업로드 됩니다.

https://user-images.githubusercontent.com/50862052/128458609-bed0de6d-8be1-49c6-b270-fb3fc8169621.mov

### 내역 등록 모달  
https://user-images.githubusercontent.com/50862052/128458623-061bd913-721f-4541-8f39-f6013963e328.mov

## 통계 내역 페이지
> 사용자의 가계부 내역에 대한 통계 데이터를 보여줍니다. 총 3개의 섹션 (총 지출, 소비 추이, 최근 내역)으로 구성됩니다.


 


### 총 지출 섹션
> 해당 월의 지출 카테고리를 분석하여 도넛 차트로 보여줍니다.

* 영역을 클릭 시, 소비 추이 그래프가 변합니다.
* 왼쪽 헤더의 월을 변경 시 도넛 차트도 변경됩니다.

### 소비 추이 섹션
> 해당 월, 카테고리로 필터링 된 데이터를 분석하여 곡선 그래프로 보여줍니다.

* 최고, 최저 데이터를 분석하여 5등분하여 데이터를 보여줍니다.

### 최근 내역
> 해당 월의 최근 3개 내역을 보여줍니다.

https://user-images.githubusercontent.com/19240202/128441123-4afcd192-317a-4b19-bb97-c04eaa826399.mov

---

## 달력 페이지

* 현재 월에 해당하는 데이터를 분석하여 총 지출, 수입을 보여줍니다.
* 영역이 있는 곳을 클릭 시, 모달이 띄워집니다.
* 해당 모달에는 해당 일 수입 및 지출과, 해당 일에 발생할 가계부 내역을 보여줍니다.

https://user-images.githubusercontent.com/19240202/128441054-4f229210-5b63-4545-bc2d-f144a2b321c2.mov

---

## Resources
> 2주 간 프로젝트를 하며 얻은 산출물 들입니다.

* [Figma 디자인 개선 시안](https://www.figma.com/file/e0cbT6DcLrcxQxKm1dFrfG/woowa-ledge?node-id=0%3A1)
* [SVG 왕초보와 함께하는 그래프/차트 만들기 - 1. 도넛 차트](https://jhpa.tistory.com/8)
* [SVG 왕초보와 함께하는 그래프/차트 만들기 - 2. 직선, 곡선 그래프](https://jhpa.tistory.com/9)
* [프로젝트를 하면서 필요했던 공부들](https://github.com/woowa-techcamp-2021/cashbook-7/wiki/Study-lists)

---

## License

MIT 2021 © [jonghopark95](https://github.com/jonghopark95), [jiho9505](https://github.com/jiho9505)
