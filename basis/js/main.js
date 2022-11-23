// alert('проверка');
document.getElementById('btn').addEventListener('click', showDiv);
let myDiv = true;
function showDiv() {
   let isShow1 = document.getElementById('moon');
   let isShow2 = document.getElementById('mars');
   if (myDiv) {
      isShow1.style.display = 'none';
      isShow2.style.display = 'block';
      // isShow2.style.display = 'grid';
      myDiv = true;
   } else {
      isShow1.style.display = 'block';
      // isShow1.style.display = 'grid';
      isShow2.style.display = 'none';
      myDiv = false;
   }
}


