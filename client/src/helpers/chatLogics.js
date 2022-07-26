export const getSender = (loggedUser, usersArray) => {
  return usersArray[0]._id === loggedUser._id
    ? usersArray[1].name
    : usersArray[0].name;
};
export const getSenderFull = (loggedUser, usersArray) => {
  return usersArray[0]._id === loggedUser._id ? usersArray[1] : usersArray[0];
};
