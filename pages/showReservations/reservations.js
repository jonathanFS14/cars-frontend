import { API_URL,FETCH_NO_API_ERROR } from "../../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, makeOptionsToken } from "../../../utils.js"


export async function initListReservationsAll() {
  document.getElementById("error").innerText = ""
  try {
    const URL = API_URL + "/reservations/reservations-for-authenticated"
    const options = makeOptionsToken("GET", null, true)
    const reservations = await fetch(URL, options).then(handleHttpErrors)
    const rows = reservations.map(res =>  {
      return `
    <tr>
      <td>${res.car.id}</td>
      <td>${res.car.brand}</td>
      <td>${res.car.model}</td>
      <td>${res.reservationDateStart}</td>
      <td>${res.reservationDateEnd}</td>
      <td>${res.car.pricePrDay}</td>
    </tr>
   `}).join("\n")
    const safeRows = sanitizeStringWithTableRows(rows)
    document.getElementById("tablerows").innerHTML = safeRows
  } catch (err) {
    if (err.apiError) {
      document.getElementById("error").innerText = err.apiError.message
    } else {
      document.getElementById("error").innerText = err.message + FETCH_NO_API_ERROR
      console.error(err.message + FETCH_NO_API_ERROR)
    }
  }
}


