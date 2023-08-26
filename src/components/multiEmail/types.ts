export interface Email {
  email: string;
  edit: boolean;
}

export type Props = {
  placeholder: string;
  getEmails: (emails: Email[]) => void;
  emails: Email[];
  labelText: string;
};

export interface ContainerTextAreaProps {
  isfocused?: number;
  isempty?: number;
}

export interface isEditProps {
  isedit: number;
}
