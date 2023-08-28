import React, { useRef } from "react";
import { StyledContainerTextArea, StyledWrapper, StyledEmailContainer, StyledError } from "./styles";
import useEmailsBox from "./reducer";
import { isValid } from "./utils";
import { Props } from "./types";
import EmailsView from "./emails-view";

const MultiEmail = (props: Props) => {
  const { placeholder, getEmails, emails, labelText } = props;

  const emailInputRef = useRef<HTMLInputElement>(null);

  const { value, handleValue, error, handleError, isFocused, handleIsFocused, handleIsEdit, isEdit } = useEmailsBox();

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

  const handlePaste = (evt: { preventDefault: () => void; clipboardData: { getData: (text: string) => string } }) => {
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
        {placeholder && emails.length === 0 && !isFocused ? <span data-placeholder>{placeholder}</span> : null}
        <EmailsView emails={emails} emailInputRef={emailInputRef} getEmails={getEmails} />
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
