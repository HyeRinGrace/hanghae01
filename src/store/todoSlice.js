// 액션 타입 정의
const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const COMPLETE_TODO = 'todo/COMPLETE_TODO';
const INCOMPLETE_TODO = 'todo/INCOMPLETE_TODO';

// 액션 생성자 함수
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

// delete
export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});


//complete
export const completeTodo = (id) => ({
  type: COMPLETE_TODO,
  payload: id,
});

//incomplete
export const incompleteTodo = (id) => ({
  type: INCOMPLETE_TODO,
  payload: id,
});

// 초기 상태
const initialState = {
  todos: [],
  done: [],
};

// 리듀서 함수
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        done: state.done.filter(todo => todo.id !== action.payload),
      };
    case COMPLETE_TODO:
      const completedTodo = state.todos.find(todo => todo.id === action.payload);
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        done: completedTodo ? [...state.done, completedTodo] : state.done,
      };
    case INCOMPLETE_TODO:
      const incompleteTodo = state.done.find(todo => todo.id === action.payload);
      return {
        ...state,
        todos: incompleteTodo ? [...state.todos, incompleteTodo] : state.todos,
        done: state.done.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
