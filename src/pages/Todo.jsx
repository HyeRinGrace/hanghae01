import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, completeTodo, incompleteTodo } from '../store/todoSlice';
import styled from 'styled-components'; // styled-components import
import { useNavigate } from 'react-router-dom';


const Header = styled.h1`
  margin-top: 30px;
  margin-bottom: 30px;
  color: #333;
`;

const InputContainer = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgb(213, 211, 211);
  margin-right: 100px;
  border-radius: 20px;
  height: 80px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MoveContext = styled.div`
    background-color: #000000;
    color: #fbfbfb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 13px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ListContainer = styled.div`
  margin-top: 50px;
  max-width: 1200px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
  border: 3px solid #0d7f39;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const FinishedList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
  border: 3px solid #000000;
  border-radius: 10px;
  margin-bottom: 8px;
  opacity: 0.4;
  cursor: pointer;

`

const DoneListContainer = styled.div`
  margin-top: 50px;
  max-width: 1200px;
  margin-bottom: 50px;
`;

const DeleteButton = styled.button`
  background-color: none;
  border: 3px solid #dc3545;
  color: #dc3545;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
  width: auto;
`;

const CompleteButton = styled.button`
  background-color: none;
  border: 3px solid #0c7a43;
  color: #0c7a43;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: auto;
`;

const NotCompleteButton = styled.button`
  background-color: none;
  border: 3px solid #082975;
  color: #082975;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: auto;
`;


function Todo() {
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const moveDetail = (id) => {
    navigate(`/detail/${id}`);
  }

  // todoSlice에서 값 가져오기
  const todos = useSelector(state => state.todos.todos);
  const done = useSelector(state => state.todos.done);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim() === '') {
      alert('할 일을 입력하세요.');
      return;
    }

    //newItem 넣어주기
    const newItem = {
      id: Date.now(),
      title: title,
      text: input,
      done: false,
    };

    dispatch(addTodo(newItem));
    setInput('');
    setTitle('');
  };

  // 상태 업데이트
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleDone = (id) => {
    dispatch(completeTodo(id));
  };

  const handleIncomplete = (id) => {
    dispatch(incompleteTodo(id));
  };

  return (
    <Container>
      <Header className='header'>TODO LIST</Header>
      <InputContainer className='inputContainer'>
        <Col>
          <Form.Control
            type='text'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={handleTitleChange}
          />
        </Col>
        <Col>
          <Form.Control
            type='text'
            placeholder='할 일을 입력하세요'
            value={input}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          <AddButton className='addButton' onClick={handleAdd}>
            추가
          </AddButton>
        </Col>
      </InputContainer>
      <ListContainer className='ListContainer'>
        {todos.length > 0 ? <h2>Working...</h2> : null}
        <Row>
          {todos.map((item) => (
            <Col key={item.id}>
              <List className="List">
                <div>
                    <MoveContext className='moveContext' onClick={() => moveDetail(item.id)}>상세페이지 이동</MoveContext>
                    <h4>제목 : {item.title}</h4>
                </div>
                <span>{item.text}</span>
                
                
                <DeleteButton className='deleteButton' onClick={() => handleDelete(item.id)}>
                  삭제
                </DeleteButton>
                <CompleteButton className='completeButton' onClick={() => handleDone(item.id)}>
                  완료
                </CompleteButton>
              </List>
            </Col>
          ))}
        </Row>
      </ListContainer>
      <DoneListContainer className='DoneListContainer'>
        {done.length > 0 ? <h2>Finished.</h2> : null}
        <Row>
          {done.map((item) => (
            <Col key={item.id}>
              <FinishedList className='Finished'>
                <h4>제목: {item.title}</h4>
                <span>{item.text}</span>
                <DeleteButton className='deleteButton' onClick={() => handleDelete(item.id)}>
                  삭제
                </DeleteButton>
                <NotCompleteButton className='notCompleteButton' onClick={() => handleIncomplete(item.id)}>
                  미완료
                </NotCompleteButton>
              </FinishedList>
            </Col>
          ))}
        </Row>
      </DoneListContainer>
    </Container>
  );
}

export default Todo;
