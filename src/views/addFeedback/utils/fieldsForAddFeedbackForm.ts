import { Title, Description } from "../../../entity/Feedback";
import { FnValidations } from "../../utils/validationFields";

export const fields: FnValidations = {
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
