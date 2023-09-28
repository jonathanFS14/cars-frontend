import { API_URL} from "../../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptionsToken} from "../../../utils.js";

//Add id to this URL to get a single user
const URL = `${API_URL}/cars`

export function initFindEditCar(){
document.getElementById("btn-fetch-car").addEventListener("click", findCar)
document.getElementById("btn-submit-edited-car").addEventListener("click", editCar)
document.getElementById("btn-delete-car").addEventListener("click", deleteCar)
}

async function findCar(){
  document.getElementById("error").innerText = ""
  document.getElementById("succes").innerText = ""
  const form = document.getElementById('car-form');
  const id = document.getElementById("car-id-input").value
  try {
    const options = makeOptionsToken("GET", null, true);
  const car = await fetch(URL + "/" + id, options)
  .then(handleHttpErrors)
      form.brand.value = car.brand;
      form.model.value = car.model;
      form.pricePrDay.value = car.pricePrDay;
      form.bestDiscount.value = car.bestDiscount;
} catch(e){
  document.getElementById("error").innerText = e.message
}
}

async function editCar(evt){
    evt.preventDefault();
    const id = document.getElementById("car-id-input").value
    const form = document.getElementById('car-form');
      const updatedCar = {
        brand: form.brand.value.trim(),
        model: form.model.value.trim(),
        pricePrDay: parseFloat(form.pricePrDay.value),
        bestDiscount: parseInt(form.bestDiscount.value)
      };
  
      const options = makeOptionsToken("PUT", updatedCar, true);
      fetch(URL + "/" + id, options)
      .then(handleHttpErrors)
      .then(document.getElementById("succes").innerText = "Car updated successfully!")
      form.reset();
}

async function deleteCar(evt){
  evt.preventDefault();
  const id = document.getElementById("car-id-input").value
  const options = makeOptionsToken("DELETE", null, true);
  fetch(URL + "/" + id, options)
  .then(handleHttpErrors)
  //.then(document.getElementById("succes").innerText = "Car deleted successfully!")
  .catch(err => document.getElementById("error").innerText = err)
  const form = document.getElementById('car-form');
  document.getElementById("succes").innerText = "Car deleted successfully!"
  form.reset();

}
