import { Description, Title } from "../../entity/Feedback";
export type FieldForValidation = {
  value: string | number;
  togglingError: (value: boolean) => void;
  fieldName: string;
};

export type FnValidations = {
  [index: string]: (value: any) => true | undefined;
};

const fields: FnValidations = {
  ["title"]: (value: string) => {
    const tratedValue = value.trim();
    if (!tratedValue || tratedValue.length > Title.maxSize) {
      return true;
    }
  },
  ["description"]: (value: string) => {
    const tratedValue = value.trim();
    if (!tratedValue || tratedValue.length > Description.maxSize) {
      return true;
    }
  },
  ["category"]: (value: string) => {
    if (!value) return true;
  },
};

function validationFields(
  fields: FnValidations,
  ...args: FieldForValidation[]
) {
  const errors: Array<Function> = [];
  args.forEach((element) => {
    const fn = fields[element.fieldName];
    const res = fn(element.value);

    if (res) errors.push(element.togglingError);
    element.togglingError(false);
  });
  if (errors.length > 0) {
    errors.map((fn) => fn(true));
    return false;
  }
}

export default validationFields;
