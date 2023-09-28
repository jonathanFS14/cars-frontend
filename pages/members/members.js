import { API_URL } from "../../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../../utils.js";
const URL = API_URL + "/members"

export async function initMembers(){

    const members = await getMember();
    const listItems = members
      .map((member) => `
    <tr> 
    <td>  ${member.username} </td>
    <td>  ${member.email} </td>  
    <td>  ${member.firstName} </td>  
    <td>  ${member.ranking} </td>  
    </tr>
      `)
      .join("");
    document.getElementById("tbl-body").innerHTML 
    = sanitizeStringWithTableRows(listItems);
  }
  
  async function getMember() {
    const member = await fetch(URL).then(handleHttpErrors);
    return member;
  }
  