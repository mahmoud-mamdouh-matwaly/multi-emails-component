import styled, { css } from "styled-components";
  interface ContainerTextAreaProps {
  isfocused?: number;
  isempty?: number;
}
 
  interface isEditProps {
  isedit: number;
}
export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #7d8fb0;
  margin-top: 8px;
  & label {
    font-size: 14px;
    margin-bottom: 9px;
    display: inline-block;
  }
`;

export const StyledContainerTextArea = styled.div<ContainerTextAreaProps>`
  margin: 0;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.21428571em;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  font-size: 13px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  height: 98px;
  padding: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(1, 1, 1, 0.3);

    :hover {
      background-color: rgba(1, 1, 1, 0.5);
    }

    border-radius: 4px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
  ${(props: ContainerTextAreaProps) =>
    props.isfocused &&
    css`
      & span[data-placeholder] {
        display: none;
      }
    `}
  ${(props: ContainerTextAreaProps) =>
    props.isempty &&
    css`
      & span[data-placeholder] {
        display: inline;
        color: #9ea4b0;
      }
    `}  
  & email-input {
    width: auto;
    outline: none;
    border: 0 none;
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    padding: 0.4em 0.1em;
    color: rgb(125, 143, 176);
    font-size: 13px;
  }
`;

export const StyledEmailContainer = styled.div`
  display: flex;
  align-items: center;
  &::after {
    content: " ";
    width: 2px;
    height: 12px;
    background-color: #d7dfeb;
    margin-right: 10px;
  }
`;

export const StyledEmail = styled.div<isEditProps>`
  color: #5b7aa6;
  font-size: 12px;
  background-color: #f2f6f8;
  padding: 3px 9px 3px 9px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 4px;
  & button {
    background-color: transparent;
    border: 0;
    color: #3a7bce;
    cursor: pointer;
    font-size: 14px;
    width: 12px;
    height: 12px;
    margin-left: 12px;
    padding: 0;
    line-height: 11px;
  }
  ${(props: isEditProps) =>
    props.isedit &&
    css`
      pointer-events: none;
    `}
`;

export const StyledError = styled.p`
  color: #e8474d;
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 12px;
`;
