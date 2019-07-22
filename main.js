function button(){
  let element=document.querySelector(`.main`);

  /*
  for (var i = 1; i>0; i = i-0.00001) {
    element.style.opacity = `${i}`;
  }
  */

  element.style.display="none";
  let elem=document.querySelector(`.sec`);
  elem.style.display="inline";
  elem.style.textAlign="center";
}
