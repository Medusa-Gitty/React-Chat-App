export const getSender = (loggedUser, usersArray) => {
  return usersArray[0]._id === loggedUser._id
    ? usersArray[1].name
    : usersArray[0].name;
};
