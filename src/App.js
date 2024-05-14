import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState(''); //input 상태
  const [arr, setArr] = useState([]); //arr 배열 상태
  const [done, setDone] = useState([]); //doneList 상태

  //input값 저장하는 함수
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //추가 버튼 클릭 시, 배열에 추가되는 함수 + 빈값 방지, 초기화 부분 추가
  const handleAdd = () => {
    if (input.trim() === '') {
      alert('할 일을 입력하세요.');
      return;
    }
    setArr([...arr, input]);
    setInput('');
  };

  // 삭제 버튼 클릭 시, 동작하는 함수 
  const handleDelete = (itemToDelete) => {
    // 아이템 삭제
    setArr(arr.filter((item) => item !== itemToDelete));
    
    // Done 리스트에서 해당 아이템이 있는지 확인하고 제거
    if (done.includes(itemToDelete)) {
      setDone(done.filter((item) => item !== itemToDelete));
    }
  };

  // 리스트 클릭 시, 동작하는 함수
  const handleDone = (item) => {
    if (!done.includes(item)) {
      setDone([...done, item]); // Done 리스트에 추가
    } else {
      setDone(done.filter((doneItem) => doneItem !== item)); // Done 리스트에서 제거
    }
  };

  //렌더링 부분
  return (
    <div className="App">
      <h1 className='header'>TODO LIST</h1>
      <div className="inputContainer">
        <input
          className="input"
          type="text"
          placeholder="할 일을 입력하세요"
          value={input}
          onChange={handleChange}
        />
        <button className="button" onClick={handleAdd}>
          추가
        </button>
        <p className='warningText'>* 리스트 선택 시, Done리스트로 추가됩니다. *</p>
      </div>

      <div className='ListContainer'>
        {arr.length > 0 ? <h3>Do</h3> : <h3></h3>}
        <div>
          {arr.map((item, index) => (
            <li
              key={index}
              className={done.includes(item) ? 'List done' : 'List'}
              onClick={() => handleDone(item)}
            >
              {item}
              <button onClick={() => handleDelete(item)}>삭제</button>
            </li>
          ))}
        </div>
      </div>

      <div className='DoneListContainer'>
        {done.length > 0? <h3>Done</h3> : <h3></h3>}
        <div>
          {done.map((item, index) => (
            <li key={index} className='List'>
              {item}
              <button onClick={() => handleDelete(item)}>삭제</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;