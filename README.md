
# Multi Email Component [![npm version](https://img.shields.io/badge/https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmulti-emails-component)](https://www.npmjs.com/package/multi-emails-component)

A react component to format multiple email easily.

The user can type emails one by one or paste them,
and can be edited and removed one of them, and have validation about the type of email and duplicate email

```
import { useCallback, useState } from 'react';
import { MultiEmail } from 'multi-emails-component';
const mockData = [
    {email: 'example@gmail.com', edit: false}, 
    {email: 'example-new@gmail.com', edit: false}
    ];

const App = () => {
    const [emails, setEmails] = useState(mockData);

    const getEmails = useCallback(email => {
        setEmails(email);
    }, []);

    return (
        <MultiEmail 
            placeholder="Add emails comma separated" 
            getEmails={getEmails} 
            emails={emails} 
            labelText="Emails *"
        /> 
    )
}
```
