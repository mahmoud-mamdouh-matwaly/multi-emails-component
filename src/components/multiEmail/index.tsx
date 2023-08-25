import React, { useRef } from "react";
import {
  StyledContainerTextArea,
  StyledEmail,
  StyledWrapper,
  StyledEmailContainer,
  StyledError,
} from "./styles";
import useEmailsBox from "./reducer";
interface Email{
  email: string,
  edit: boolean
}
 
type Props = {
  placeholder: string;
  getEmails: (emails: Email[]) => void;
  emails: Email[];
}

const MultiEmail = (props: Props) => {
  const { placeholder, getEmails, emails } = props;
  console.log("🚀 ~ file: index.tsx:23 ~ MultiEmail ~ emails:", emails)

  const emailInputRef = useRef<HTMLInputElement>(null);

  const {
    value,
    handleValue,
    error,
    handleError,
    isFocused,
    handleIsFocused,
    handleIsEdit,
    isEdit,
  } = useEmailsBox();
  const handleKeyDown = (evt: any) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      const newValue = evt.target.value?.trim();

      if (newValue && isValid(newValue)) {
        getEmails([...emails, { email: newValue, edit: false }]);
        handleValue("");
        handleError(null);
      }
    }
  };

  const handleChange = (evt: {target: {value: string}}) => {
    handleValue(evt.target.value);
  };

  const handleDelete = (item: Email) => (evt: {preventDefault: () => void, stopPropagation: () => void}) => {
    evt.preventDefault();
    evt.stopPropagation();
    getEmails(emails.filter((i) => i.email !== item.email));
  };

  const handlePaste = (evt: {preventDefault: () => void, clipboardData: {getData: (text: string) => string} } ) => {
    evt.preventDefault();

    const paste = evt.clipboardData.getData("text");

    if (isValid(paste)) {
      getEmails([...emails, { email: paste, edit: false }]);
      handleError(null);
    }
  };

  const isValid = (email: string) => {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      handleError(error);

      return false;
    }

    return true;
  };

  const isInList = (email: string) => {
    return emails?.find((item) => item.email?.includes(email));
  };

  const isEmail = (email: string) => {
    // eslint-disable-next-line no-useless-escape
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  const handleOnFocus = () => {
    handleIsFocused(true);
  };

  const handleOnBlur = () => {
    if (emails.length === 0 && !value) {
      handleIsFocused(false);
    }

    handleValue("");
  };

  const changeEditStatus = (index: number) => (evt: {preventDefault: () => void, stopPropagation: () => void}) => {
    handleIsEdit(true);
    evt.preventDefault();
    evt.stopPropagation();
    const newArr = [...emails];
    newArr[index] = { ...newArr[index], edit: true };
    getEmails(newArr);
  };

  const onBlurEdit = (index: number) => (evt: {target: {value: string}, key: string, preventDefault: () => void}) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      const newValue = evt.target.value?.trim();
      const newArr = [...emails];
      if (emails.some((item) => item.email === newValue) && isValid(newValue)) {
        newArr[index] = { ...newArr[index], edit: false };
        getEmails(newArr);
        handleIsEdit(false);
        handleValue("");
        handleError(null);
        return;
      }
      if (newValue && isValid(newValue)) {
        newArr[index] = { email: newValue, edit: false };
        getEmails(newArr);
        handleIsEdit(false);
        handleValue("");
        handleError(null);
        return;
      }
      newArr[index] = { ...newArr[index], edit: false };
      getEmails(newArr);
      handleIsEdit(false);
      handleValue("");
    }
  };

  return (
    <StyledWrapper>
      <label>Emails *</label>
      <StyledContainerTextArea
        isFocused={isFocused}
        isEmpty={!!(value === "" && emails.length === 0 && !isFocused)}
        onClick={() => {
          if (emailInputRef?.current) {
           emailInputRef?.current?.focus();
          }
        }}
      >
        {placeholder && emails.length === 0 ? (
          <span data-placeholder>{placeholder}</span>
        ) : null}
        {emails.map((item, index) => (
          <StyledEmailContainer className="tag-item" key={`${item.email}`}>
            <StyledEmail
              onClick={!isEdit ? changeEditStatus(index) : undefined}
              isEdit={item.edit}
            >
              {!item.edit && (
                <>
                  <span>{item.email}</span>
                  <button
                    type="button"
                    className="button"
                    onClick={handleDelete(item)}
                  >
                    &times;
                  </button>
                </>
              )}
              {item.edit && (
                <input
                  ref={emailInputRef!}
                  className={`input ${error && " has-error"}`}
                  value={value || item.email}
                  name="email"
                  onChange={handleChange}
                  onKeyDown={(e) => onBlurEdit(index)}
                />
              )}
            </StyledEmail>
          </StyledEmailContainer>
        ))}
        {!isEdit && (
          <input
            ref={emailInputRef!}
            className={`input ${error && " has-error"}`}
            data-testid="multiEmails"
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
        )}
      </StyledContainerTextArea>
      {error && <StyledError>{error}</StyledError>}
    </StyledWrapper>
  );
};

export { MultiEmail };
