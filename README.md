
<h1 align="middle">HTML, CSS를 이용해서 넷플릭스 사이트 만들기</h1>
</p><br>

<div align="center">
  
  <h1>📑 프로젝트 소개 및 개요</h1>

 <p align="middle">HTML, CSS 활용하여 최종 이미지에 맞는 넷플릭스 사이트 구현하기 </p>

</div><br>

<details>
<summary><h2>📂 파일 구조</h2></summary>
<div markdown="1">

```
├─img
│  └─사용 이미지파일들 저장
│  
├─index.html
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

<details>
<summary> 1. 최종 결과물 참고용 이미지대로 구현</summary>
<div markdown="1">
  <br>
  - 아래 참고용 이미지를 참고하여 페이지를 구현하였습니다.
  <br>
  <br>
<img src="https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lesson/les_muzda_1692020153094/2816d433c6dbf3a09b47a51221fc5bde1952da02e082ae2216f53fde344001e7.png" />

</div>
</details>
<details>
<summary> 2. Flex Box를 이용하여 영화를 나열하기 </summary>
<div markdown="1">
<br>
  
  - Flex Box의 justify-content를 사용하여 영화를 나열하였습니다.
```  
#imgBox {
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
}
```
    
</div>
</details>
<details>
<summary> 3. 영화에 마우스를 호버 하면 영화 이미지의 크기가 크게 변경될 수 있도록 하기</summary>
<div markdown="1">
<br>
  
  - 영화 이미지를 호버 했을 때 이미지가 커지도록 아래와 같이 구현하였습니다.
  - transition, transform을 사용하여 부드럽게 변하도록 하였습니다.
```  
#imgBox img {
  width: 170px;
  transition: transform 0.2s ease-in-out;
}

#imgBox img:hover {
  transform: scale(1.2);
  cursor: pointer;
}
```
<br>
추가 구현 사항: 버튼에도 호버/액티브 효과를 주었고 transition, transform을 사용하여 부드럽게 변하도록 하였습니다.

```  
buttons button {
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

buttons button:hover {
  background-color: rgba(36, 161, 202, 0.41);
  cursor: pointer;
}

buttons button:active {
  background-color: rgba(159, 29, 103, 0.41);
  cursor: pointer;
}
```
</div>
</details>
