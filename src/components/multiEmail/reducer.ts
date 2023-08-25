import { useReducer } from 'react';
const initialState = {
  value: '',
  isFocused: false,
  isEdit: false,
  error: null,
};

const reducer = (state: any, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'SET_VAlUE':
      return {
        ...state,
        value: action.payload,
      };
    case 'SET_IS_FOCUSED':
      return {
        ...state,
        isFocused: action.payload,
      };
    case 'SET_IS_EDIT':
      return {
        ...state,
        isEdit: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default function useEmailsBox() {
  const [{ value, isFocused, isEdit, error }, dispatch] = useReducer(reducer, initialState);

  const handleValue = (value: any) => {
    dispatch({ type: 'SET_VAlUE', payload: value });
  };
  const handleIsFocused = (value: any) => {
    dispatch({ type: 'SET_IS_FOCUSED', payload: value });
  };
  const handleIsEdit = (value: any) => {
    dispatch({ type: 'SET_IS_EDIT', payload: value });
  };
  const handleError = (value: any) => {
    dispatch({ type: 'SET_ERROR', payload: value });
  };

  return { handleValue, handleIsFocused, handleIsEdit, handleError, value, isFocused, isEdit, error };
}
