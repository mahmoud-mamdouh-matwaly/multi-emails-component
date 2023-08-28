import React from "react";
import { StyledEmail, StyledEmailContainer } from "./styles";
import useEmailsBox from "./reducer";
import { EmailsViewProps, Email } from "./types";
import { isValid } from "./utils";

const EmailsView = (props: EmailsViewProps) => {
  const { emails, emailInputRef, getEmails } = props;
  const { value, handleValue, error, handleError, handleIsEdit, isEdit } = useEmailsBox();

  const handleChange = (evt: { target: { value: string } }) => {
    handleValue(evt.target.value);
  };

  const handleDelete = (item: Email) => (evt: { preventDefault: () => void; stopPropagation: () => void }) => {
    evt.preventDefault();
    evt.stopPropagation();
    getEmails(emails.filter((i) => i.email !== item.email));
  };

  const changeEditStatus = (index: number) => (evt: { preventDefault: () => void; stopPropagation: () => void }) => {
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
  const onBlurEdit = (index: number) => (evt: { target: { value: string }; key: string; preventDefault: () => void }) => {
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
    <>
      {emails.map((item, index) => (
        <StyledEmailContainer className="tag-item" key={`${item.email}`}>
          <StyledEmail onClick={!isEdit ? changeEditStatus(index) : undefined} isedit={item.edit ? 1 : 0}>
            {!item.edit && (
              <>
                <span>{item.email}</span>
                <button type="button" className="button" onClick={handleDelete(item)}>
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
      ;
    </>
  );
};

export default EmailsView;
