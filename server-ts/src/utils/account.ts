

export const createAccountNumber = () => {
  const accountNumber = new Date().getTime().toString() + Math.random().toString().substring(2, 10);
  return "16-0001-" + accountNumber;
};