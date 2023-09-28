import { API_URL } from "../../settings.js";
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptionsToken } from "../../utils.js";
const URL = API_URL + "/cars/admin";

export async function initCars() {

  const cars = await getCars();
  const listItems = cars
    .map((car) => `
  <tr> 
  <td>  ${car.id} </td>
  <td>  ${car.brand} </td>  
  <td>  ${car.model} </td>  
  <td>  ${car.pricePrDay} </td>  
  <td>  ${car.bestDiscount} </td>  
  </tr>
    `)
    .join("");
  document.getElementById("table-rows").innerHTML 
  = sanitizeStringWithTableRows(listItems);
}

async function getCars() {
  const options = makeOptionsToken("GET", null, true)
  const cars = await fetch(URL, options).then(handleHttpErrors);
  return cars;
}
