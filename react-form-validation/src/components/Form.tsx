import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";

type Props = {
  method: string;
  validators: ((formValue: any) => string | void)[];
};

export const requireField = (fieldName) => (formValue) => {
  return formValue[fieldName]?.length ? "" : fieldName + " field is required";
};
export const minMaxLength = (fieldName, minLength, maxLength) => (formValue) => {
  return formValue[fieldName]?.length > minLength && formValue[fieldName]?.length < maxLength
    ? ""
    : "Field must be between " + minLength + " and " + maxLength + " characters";
};

export const checkLoginAndPassword = () => (formValue) => {
  return formValue['username'] && formValue['password'] ? '' : 'Username or password is required';
}

export default function Form({ method, children, validators = [] }: React.PropsWithChildren<Props>) {
  const [formValue, setFormValue] = useState({} as { [_: string]: any });
  const [formErrors, setFormErrors] = useState([] as string[]);

  useEffect(() => {
    const errors = [];
    for (const validator of validators) {
      const error = validator(formValue);
      if (error) {
        errors.push(error);
      }
    }

    setFormErrors(errors);
  }, [formValue]);

  const handleChange = useCallback(
    ({ target, type }) => {
      setFormValue({ ...formValue, [target.name]: type === "checkbox" ? target.checked : target.value });
    },
    [formValue]
  );

  return (
    <form method={method}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.type === "input") {
          return React.cloneElement<any>(child, { onChange: handleChange });
        }

        return child;
      })}
      {JSON.stringify(formErrors)}
    </form>
  );
}
