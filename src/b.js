function number() {
  var div = document.createElement("div");
  div.setAttribute("id", "number");
  div.innerHTML = 0;
  document.body.appendChild(div);
}
export default number;