import { Rule } from "antd/lib/form";

type RuleType =
  | "required"
  | "email"
  | "min-8-characters"
  | "min-topup"
  | "max-topup";

export function generateFormRules(
  formName: string,
  rules: Array<RuleType> = []
): Rule[] {
  const formRules: Rule[] = [];
  if (rules.includes("required")) {
    formRules.push({
      required: true,
      message: `${formName} harus diisi.`,
    });
  }
  if (rules.includes("email")) {
    formRules.push({
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: `${formName} format tidak valid.`,
    });
  }

  if (rules.includes("min-8-characters")) {
    formRules.push({
      pattern: /^.{8,}$/,
      message: `${formName} minimal 8 karakter`,
    });
  }

  if (rules.includes("min-topup")) {
    formRules.push({
      validator: validateMinimumTopup,
    });
  }

  if (rules.includes("max-topup")) {
    formRules.push({
      validator: validateMaksTopup,
    });
  }
  return formRules;
}

const validateMinimumTopup = (_: any, value: number) => {
  if (value && +value >= 10000) {
    return Promise.resolve();
  }
  return Promise.reject("Minimum nominal topup Rp10.000");
};

const validateMaksTopup = (_: any, value: number) => {
  if (value && +value <= 1000000) {
    return Promise.resolve();
  }
  return Promise.reject("Maksimum nominal topup Rp1.000.000");
};
