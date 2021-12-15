const oldArr = [
  { title: "a", check: false },
  { title: "b", check: false },
  { title: "c", check: false },
  { title: "d", check: false },
  { title: "e", check: false },
  { title: "f", check: false },
];

const obj = { title: "b", check: true };

console.log(oldArr);
oldArr.map((el) => {
  if (el.title === obj.title) {
    el.check = obj.check;
    return el;
  }
  return el;
});
