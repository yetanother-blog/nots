import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import { createRef, forwardRef, useEffect } from 'react';
import { Label } from '../label/label';
import { FormWrapper } from '../form-wrapper/form-wrapper';
import { FormFieldStyle } from '../form-field-style/form-field-style';
import { clsx } from 'clsx';

export type CheckboxProps = {
  label?: ReactNode;
  isError?: boolean;
  helperText?: ReactNode;
  indeterminate?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = forwardRef(
  (
    {
      label,
      isError,
      indeterminate = false,
      helperText,
      ...inputProps
    }: CheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputRef = ref ?? createRef<HTMLInputElement>();

    useEffect(() => {
      if (!inputRef || inputRef instanceof Function || !inputRef.current) {
        return;
      }

      inputRef.current.indeterminate = indeterminate;
    }, [indeterminate, inputRef]);

    const interdeterminateClasses =
      'indeterminate:after:bg-indeterminate indeterminate:border-nots-grey-800 indeterminate:bg-nots-grey-800 indeterminate:after:block indeterminate:hover:border-nots-primary-700 indeterminate:hover:nots-ws-primary-700 indeterminate:after:h-[24px] indeterminate:after:w-[24px]';

    const interdeterminateClassesDark =
      'dark:indeterminate:after:invert dark:indeterminate:border-nots-grey-50 dark:indeterminate:bg-white dark:indeterminate:hover:border-nots-grey-100 dark:indeterminate:hover:bg-nots-grey-100';

    const checkedClasses =
      'checked:after:bg-checkmark checked:border-nots-grey-800 checked:bg-nots-grey-800 checked:after:block checked:hover:border-nots-grey-600 checked:hover:bg-nots-grey-600 checked:after:h-[13px] checked:after:w-[13px]';

    const checkedClassesDark =
      'dark:checked:border-nots-grey-50 dark:checked:bg-white dark:checked:after:invert dark:checked:hover:border-nots-grey-100 dark:checked:hover:bg-nots-grey-100';

    const disabledClasses =
      'disabled:border-nots-grey-100 disabled:bg-nots-grey-50 disabled:checked:border-nots-grey-700 disabled:checked:bg-nots-grey-700';

    const disabledClassesDark =
      'dark:disabled:border-nots-grey-700 dark:disabled:bg-nots-grey-700 dark:disabled:checked:border-nots-grey-700 dark:disabled:checked:bg-nots-grey-200 dark:disabled:checked:after:opacity-30';

    const classes = clsx(
      `peer grid h-7 w-7 shrink-0 appearance-none cursor-pointer place-content-center after:hidden after:content-['']`,
      interdeterminateClasses,
      interdeterminateClassesDark,
      checkedClasses,
      checkedClassesDark,
      disabledClasses,
      disabledClassesDark
    );

    return (
      <FormWrapper isError={isError} helperText={helperText}>
        <div className="flex gap-2">
          <FormFieldStyle
            as="input"
            isError={isError}
            className={classes}
            ref={inputRef}
            type="checkbox"
            {...inputProps}
          />
          {label && (
            <Label
              htmlFor={inputProps.id}
              className="cursor-pointer pt-[4px] peer-disabled:pointer-events-none"
            >
              {label}
            </Label>
          )}
        </div>
      </FormWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';
