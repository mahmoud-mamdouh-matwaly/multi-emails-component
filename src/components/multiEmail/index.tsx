import React, { useRef } from "react";
import {
  StyledContainerTextArea,
  StyledEmail,
  StyledWrapper,
  StyledEmailContainer,
  StyledError,
} from "./styles";
import useEmailsBox from "./reducer";
import { isValid } from "./utils";
import { Props, Email } from "./types";

const MultiEmail = (props: Props) => {
  const { placeholder, getEmails, emails, labelText } = props;

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

      if (newValue && isValid(newValue, handleError, emails)) {
        getEmails([...emails, { email: newValue, edit: false }]);
        handleValue("");
        handleError(null);
      }
    }
  };

  const handleChange = (evt: { target: { value: string } }) => {
    handleValue(evt.target.value);
  };

  const handleDelete =
    (item: Email) =>
    (evt: { preventDefault: () => void; stopPropagation: () => void }) => {
      evt.preventDefault();
      evt.stopPropagation();
      getEmails(emails.filter((i) => i.email !== item.email));
    };

  const handlePaste = (evt: {
    preventDefault: () => void;
    clipboardData: { getData: (text: string) => string };
  }) => {
    evt.preventDefault();
    const paste = evt.clipboardData.getData("text");
    if (isValid(paste, handleError, emails)) {
      getEmails([...emails, { email: paste, edit: false }]);
      handleError(null);
    }
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

  const changeEditStatus =
    (index: number) =>
    (evt: { preventDefault: () => void; stopPropagation: () => void }) => {
      handleIsEdit(true);
      evt.preventDefault();
      evt.stopPropagation();
      const newArr = [...emails];
      newArr[index] = { ...newArr[index], edit: true };
      getEmails(newArr);
    };
  const handleChangedData = (newArr: Email[]) => {
    getEmails(newArr);
    handleIsEdit(false);
    handleValue("");
    handleError(null);
  };

  const onBlurEdit =
    (index: number) =>
    (evt: {
      target: { value: string };
      key: string;
      preventDefault: () => void;
    }) => {
      if (["Enter", "Tab", ","].includes(evt.key)) {
        const newValue = evt.target.value?.trim();
        const newArr = [...emails];

        if (newValue && isValid(newValue, handleError, emails)) {
          newArr[index] = { email: newValue, edit: false };
          handleChangedData(newArr);
          return;
        }
        newArr[index] = { ...newArr[index], edit: false };
        handleChangedData(newArr);
      }
    };

  return (
    <StyledWrapper>
      <label className="email-label">{labelText}</label>
      <StyledContainerTextArea
        isfocused={isFocused ? 1 : 0}
        isempty={value === "" && emails.length === 0 && !isFocused ? 1 : 0}
        onClick={() => {
          if (emailInputRef?.current) {
            emailInputRef?.current?.focus();
          }
        }}
      >
        {placeholder && emails.length === 0 && !isFocused ? (
          <span data-placeholder>{placeholder}</span>
        ) : null}
        {emails.map((item, index) => (
          <StyledEmailContainer className="tag-item" key={`${item.email}`}>
            <StyledEmail
              onClick={!isEdit ? changeEditStatus(index) : undefined}
              isedit={item.edit ? 1 : 0}
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
                  className={`email-input ${error && "has-error"}`}
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
            className={`email-input ${error && "has-error"}`}
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
