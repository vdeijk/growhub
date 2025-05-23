import { FormField } from './FormField';

export class InputField<T> extends FormField<T> {
  placeholder?: string;
  maxLength?: number;
  error?: string | null;
  readonly?: boolean;

  constructor(
    value: T,
    label: string,
    required: boolean = false,
    placeholder?: string,
    maxLength?: number,
    readonly?: boolean,
  ) {
    super(value, label, required);
    this.placeholder = placeholder;
    this.maxLength = maxLength;
    this.readonly = readonly;
  }

  public validateMaxLength = (): boolean => {
    if (
      this.maxLength &&
      typeof this.value === 'string' &&
      this.value.length > this.maxLength
    ) {
      this.error = `Input cannot exceed ${this.maxLength} characters`;

      return true;
    }

    return false;
  };
}
