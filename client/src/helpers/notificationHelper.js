export const notificationHelper = (array) => {
  let obj = {};
  array.forEach((e) => {
    if (obj[e.chat._id] === undefined) {
      obj[e.chat._id] = { freq: 1, data: e };
    } else {
      obj[e.chat._id] = { freq: obj[e.chat._id].freq + 1, data: e };
    }
  });

  return Object.values(obj);
};

export const notificationFreq = (array) => {
  let arr = notificationHelper(array);
  let total = 0;
  arr.forEach((e) => (total += e.freq));
  return total;
};
