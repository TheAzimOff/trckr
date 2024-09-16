// Individual regex patterns for each rule
const lengthRegex = /.{8,}/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;

function validatePassword(password: string, confirmPassword: string) {
  const rules = [
    { test: lengthRegex, message: "be at least 8 characters long" },
    { test: lowercaseRegex, message: "contain at least one lowercase letter" },
    { test: digitRegex, message: "contain at least one digit" },
  ];

  const failedRules = rules
    .filter(rule => !rule.test.test(password))
    .map(rule => rule.message);
  if (password !== confirmPassword) {
    failedRules.push("match with the confirmed password");
  }
  return {
    isValid: failedRules.length === 0,
    failedRules: failedRules,
  };
}
export default validatePassword;
