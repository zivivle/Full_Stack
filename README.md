<h1 align="middle">자바스크립트를 이용해서 Todo 앱 만들기</h1>
</p><br>

<img align="center" src="https://github.com/zivivle/Full_Stack/assets/123868471/16aa2a38-6704-4ab9-bb57-c7cbe077d443">

<div align="center">
  
  <h1>📑 프로젝트 소개 및 개요</h1>


 <p align="middle">자바스크립트 기능을 이용해서 Todo 앱을 만들어 보았습니다. </p>

 

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
<img width="900" alt="스크린샷 2023-08-25 오후 12 06 07" src="https://github.com/zivivle/Full_Stack/assets/123868471/a09f9881-10a2-4ea8-940a-a1c59c277917">

</div>
</details>
<details open>
<summary> 2. 변수명을 최대한 명확하게 하며, 함수는 최소한의 단위로 나눠서 사용한다. </summary>
<div markdown="1">
<br>
2) 변수명을 명확하게 사용하고자 노력하였고, 함수는 최소한의 단위로 관심사 분리하여 사용하고 노력하였습니다.
<br>
  
```  
// modal 열기
addModalButton.addEventListener('click', showModal);

function showModal() {
  modalBox[0].classList.remove('hidden');
  modalBackground[0].classList.remove('hidden');
}

// modal 닫기
modalCloseBtn.addEventListener('click', hiddenModal);

function hiddenModal() {
  modalBox[0].classList.add('hidden');
  modalBackground[0].classList.add('hidden');
}
```
    
</div>
</details>
<details open>
<summary> 3. 페이지를 새로고침 해도 데이터가 지속될 수 있도록 localStorage를 이용 </summary>
<div markdown="1">
<br>
3) 페이지를 새로고침 해도 task 데이터가 지속될 수 있도록 localStorage를 사용하여 구현하였습니다. <br>
   + 추가로 로컬 스토리지에 데이터가 없을 때 empty-data UI를 보여주도록 하였습니다.
<br>
  
```  
=> 페이지가 로드 되었을 때 로컬 스토리지 데이터를 확인하는 로직을 추가 하였습니다.
document.addEventListener('DOMContentLoaded', function () {
  loadingTasks();
});

=> loadingTasks() 함수가 localStorage 데이터를 참고하여 todos라는 변수로 updateUI() 함수에 데이터를 뿌려주도록 하였습니다. 
function loadingTasks() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(updateUI);
  }
}

=> todo list를 추가하는 addTask 함수에서도 추가 버튼이 눌릴 때 마다 localStorage에 task를 저장하도록 하였고
   loadingTasks() 함수와 마찬가지로 todos라는 변수로 updateUI() 함수에 데이터를 뿌려주도록 하였습니다. 
// todo task 추가
function addTask() {
  if (todoInput.value === '') {
    alert('TODO 리스트를 작성해주세요');
    return;
  }
  if (todoInput.value) {
    let task = {
      id: new Date().getTime(),
      text: todoInput.value,
      completed: false,
    };

    // localStorage에 task 저장
    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));

    // UI 업데이트
    updateUI(task);

    // 입력창 초기화
    ...
  }
}
```

</div>
</details>
