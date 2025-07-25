export const generateVerificationToken = () => {
  return Math.floor(Math.random() * 900000).toString();
};
