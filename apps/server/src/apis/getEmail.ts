export const getEmail = () => {
  return Session.getActiveUser().getEmail();
};
