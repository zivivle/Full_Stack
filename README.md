<h1 align="middle">자바스크립트를 이용한 Spread Sheet 앱 만들기</h1>
</p><br>


<div align="center">
  
  <h1>📑 프로젝트 소개 및 개요</h1>




 <p align="middle">자바스크립트를 이용해서 Spread Sheet 앱을 만들어 보았습니다. </p>


 <img align="center" src="#">

</div><br>

<details open>
<summary><h2>📂 파일 구조</h2></summary>
<div markdown="1">


```
├─index.html
├─script.js
├─style.css
```

</div>
</details>

<br>
<h2>개인 프로젝트</h2>


 <img src="https://github.com/FrontEnd-Team3/movie-trailer-project/assets/123865139/663c4b42-dc55-4e95-8f02-c0424c1f92ec" width="118"> 
                                                지성경:(https://github.com/zivivle)                                                

<br><br>

<h2>✔️ 요구사항 구현 내용</h2>

<details open>
<summary> 1. 최종 결과물이 아래 이미지와 같아야 한다. </summary>
<div markdown="1">
  <br>
  - 아래 참고용 이미지를 참고하여 페이지를 구현하였습니다.
  <br>
  <br>
  
<img width="612" alt="스크린샷 2023-08-29 오전 10 45 37" src="https://lh4.googleusercontent.com/QEGbVCrNKZ_f937yLnQtjQ6U3J9IJkqdiKKzVqpBoPWZh05zFFTQQSHeaLEwNPM3uGTQmHt0jhCuC_-wQqSQX8R-qi0AjB8Eo3asgK6fRmd9hACNq1QhSBMJjKQ1Gi7YdU42Xt3jIKvXwDuAp3CdY7E">

</div>
</details>
<details open>
<summary> 2. 셀에 포커스 시 해당 셀의 헤더를 하이라이트하는 기능 </summary>
<div markdown="1">
<br>
<br>
  
```
- updateFocusedCell 함수를 만들어 현재 포커스된 입력 필드를 기반으로 해당 셀의 위치를 확인하고 그에 따라 셀의 이름(예: A1, B2 등)을 표시했습니다.
- 이 함수 내에서 highlightRowAndColumn 함수를 호출하여 해당 셀의 행과 열에 해당하는 헤더를 하이라이트했습니다.
- highlightRowAndColumn 함수에서 특정 행과 열의 헤더를 가져와 highlight 클래스를 추가하여 스타일을 적용했습니다.

```
</div>
</details>

<details open>
<summary> 3. 스프레드시트의 데이터를 Excel 파일로 내보내는 기능 </summary>
<div markdown="1">
<br>
<br>
  
```  
- exportToExcel 함수로 웹페이지의 스프레드시트 데이터를 Excel 파일로 내보내는 기능을 처리했습니다.
- prepareTableData 함수를 통해 각 셀의 입력 필드 값들을 텍스트로 변환했습니다.
- XLSX 라이브러리의 함수들을 사용하여 테이블 데이터를 워크시트로 변환하고, 워크북에 워크시트를 추가한 다음, 이 워크북을 Excel 파일로 저장합니다.

```
</div>
</details>

<details open>
<summary> 4. 구글 스프레드시트에서 동일한 데이터가 나오도록 Excel 파일 생성 </summary>
<div markdown="1">
<br>
<br>
  
```
- 이 부분에서 XLSX 라이브러리를 사용했습니다.
- XLSX.utils.table_to_sheet 함수를 사용하여 웹페이지의 테이블 데이터를 워크시트 형식으로 변환할 수 있었고
- 다시 XLSX.write 함수를 사용하여 Excel 파일로 저장하였습니다.
- 생성된 Excel 파일을 구글 스프레드시트로 가져오면 웹페이지의 테이블 데이터와 동일한 데이터를 볼 수 있습니다.

```
</div>
</details>
