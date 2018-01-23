function getIngredient() {

  let foodName = document.getElementById('ingredient').value
  if (foodName === '') {
    return alert('Please enter an ingredient')
  }

  let foodInfo = document.getElementById('foodinformationtable')
  foodInfo.innerHTML = ''; //clears table

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      var rowCount = 0;
      var limitcount = response.count;
      if (limitcount > 15) limitcount = 15;
      for (var i = 0; i < limitcount; i+=3) {
        var row = foodInfo.insertRow(rowCount);
        rowCount++;
        var cell1 = row.insertCell(i%3);
        cell1.innerHTML = `
        <img src="${response.recipes[i].image_url}" width="100%" height = "75%" overflow = "hidden" >
        <h1> <a href="${response.recipes[i].f2f_url}">${response.recipes[i].title}</a> </h1>
			  <ul></ul>`;
        if(i+1 >= limitcount) break;
        var cell2 = row.insertCell((i+1)%3);
        cell2.innerHTML = `
        <img src="${response.recipes[i+1].image_url}"width="100%"  height = "75%" overflow = "hidden">
        <h1> <a href="${response.recipes[i+1].f2f_url}">${response.recipes[i+1].title}</a> </h1>
			  <ul></ul>`;
        if(i+2 >= limitcount) break;
        var cell3 = row.insertCell((i+2)%3);
        cell3.innerHTML = `
        <img src="${response.recipes[i+2].image_url}"width="100%"  height = "75%" overflow = "hidden">
        <h1> <a href="${response.recipes[i+2].f2f_url}">${response.recipes[i+2].title}</a> </h1>
			  <ul></ul>`;
      }
    }
  }
  xhr.open('GET', `/recipes?ingredients=${foodName}`, true);
  xhr.send()
}

//Attach Enter-key Handler
const ENTER = 13
document.getElementById("ingredient")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
      document.getElementById("submit").click();
    }
  });
