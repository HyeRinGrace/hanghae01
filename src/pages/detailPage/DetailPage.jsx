import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const DetailPageWrapper = styled.div`
  margin: 100px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
`;

const Title = styled.h2`
  color: #333;
`;

const Content = styled.p`
  color: #555;
`;

const Status = styled.p`
  color: ${props => (props.done ? '#0c7a43' : '#dc3545')};
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #bfc0c2;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
`;

const DetailPage = () => {
  // URL에서 전달된 id 값을 가져옴.
  const { id } = useParams();
  
  // Redux store에서 todos와 done 배열을 가져옴
  const todos = useSelector(state => state.todos.todos);
  const done = useSelector(state => state.todos.done);
  
  // todos와 done 배열을 합쳐서 전체 아이템 목록을 만듬.
  const allItems = [...todos, ...done];
  
  // 일치하는 아이템을 찾기.
  const selectedItem = allItems.find(item => item.id === parseInt(id));
  
  // selectedItem이 존재하면 해당 아이템의 정보를 표시.
  return (
    <DetailPageWrapper>
      {selectedItem ? (
        <div>
          <Title>제목: {selectedItem.title}</Title>
          <Content>내용: {selectedItem.text}</Content>
          <Status done={selectedItem.done}>
            상태: {selectedItem.done ? '완료' : '작업중'}
          </Status>
          <BackButton to="/">이전으로 돌아가기</BackButton>
        </div>
      ) : (
        <p>해당 아이템을 찾을 수 없습니다.</p>
      )}
    </DetailPageWrapper>
  );
};

export default DetailPage;
