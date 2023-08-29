<h1 align="middle">자바스크립트를 이용해서 github finder 앱 만들기</h1>
</p><br>


<img align="center" src="https://github.com/zivivle/Full_Stack/assets/123868471/dc827f61-fc43-46ae-bffc-ec9dffe41a3c">


<div align="center">
  
  <h1>📑 프로젝트 소개 및 개요</h1>




 <p align="middle">자바스크립트를 이용해서 github finder 앱을 만들어 보았습니다. </p>


 <img align="center" src="#">

</div><br>

<details open>
<summary><h2>📂 파일 구조</h2></summary>
<div markdown="1">


```
├─img
│  └─사용 이미지파일들 저장
│  
├─index.html
├─script.js
├─style.css
```

</div>
</details>

<br>
<h2>개인 과제</h2>


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
  
<img width="612" alt="스크린샷 2023-08-29 오전 10 45 37" src="https://github.com/zivivle/Full_Stack/assets/123868471/4b4317c1-aef7-4eba-ae2a-855eb7d9460f">

</div>
</details>
<details open>
<summary> 2. 자바스크립트를 OOP를 이용해서 구현 </summary>
<div markdown="1">
<br>
<br>
  
```
1. 캡슐화

GitHub 사용자에 대한 다양한 정보와 관련된 메서드를 GithubUser 클래스의 내부에 포함하여 구현하였고 내부 데이터와 이 데이터를 조작하는 방법을 함께 캡슐화하여 외부로부터 데이터를 보호하였습니다.
클래스 내의 변수들 (this.searchInput, this.spinnerIcon 등)은 내부 메서드에서만 접근 가능하며 외부에서는 직접적으로 접근할 수 없도록 하였습니다.

2. 추상화

클래스는 복잡한 로직을 내부에 숨기고 간단한 인터페이스만 노출되도록 하였습니다.
예를 들어, fetchUserInfo 메서드는 API 요청, 에러 처리, 사용자 정보 표시 등의 여러 과정을 추상화하여 단 한 번의 메서드 호출로 처리할 수 있게 하였습니다.

3. 모듈화

여러 작은 메서드로 나누어 각 메서드는 하나의 구체적인 작업만을 수행하도록 하였습니다.
예를 들어, showSpinner, hideSpinner, updateUserTags 등은 각자 특정 작업을 수행하도록 하였습니다.

4. 단일 책임 원칙

GithubUser 클래스는 GitHub 사용자에 관련된 모든 작업을 담당하고 있고,
각 메서드도 최대한 하나의 기능만을 수행하도록 설계하였습니다.

```
</div>
</details>

<details open>
<summary> 3. 비동기 통신을 이용합니다. </summary>
<div markdown="1">
<br>
<br>
  
```  
- async/await 문법을 사용하여 비동기 처리를 하였습니다.
fetchUserInfo, fetchUserRepos 에서 사용하였으며, async/await 문법을 사용해서 가독성있는 형태로 작성하려 노력하였습니다.

```
</div>
</details>

<details open>
<summary> 4. 위에 기능 외에 잔디밭 기능, Spinner 기능 등 원하는 기능을 추가합니다. </summary>
<div markdown="1">
<br>
<br>
  
```
잔디밭 기능, Spinner 기능도 추가하여 구현하였습니다.

```
</div>
</details>
