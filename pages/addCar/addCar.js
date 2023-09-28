
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"
//Add id to this URL to get a single user
import { makeOptions, handleHttpErrors} from "../../utils.js"

const URL = `${API_URL}/cars`

export async function initAddCar(match) {
    document.getElementById("btn-submit-car").addEventListener("click", addCar)
}

function addCar(){
    const car = {
      brand: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      pricePrDay: document.getElementById("price-pr-day").value,
      bestDiscount: document.getElementById("best-discount").value
    }

    const options = makeOptions("POST", car);
    fetch(URL, options)
    .then(handleHttpErrors)
    .then( 
      carResponse => document.getElementById("new-car-response")
      .innerText = JSON.stringify(carResponse, null, 3))
  }