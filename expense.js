function saveToLocalStorage(event){
    event.preventDefault();

    let userDetails = {
        Add_Expense_Amount : document.getElementById('number').value,
        Description : document.getElementById('description').value,
        Choose_Category : document.getElementById('category').value
    }

    // showNewUserOnScreen(userDetails) 

    // axios.get("https://crudcrud.com/api/04d975795ace4032b07f4e3579f1b8e9/appointmentData/63e4d35381b3ab03e8475453")
    // .then(response => showNewUserOnScreen(response))
    // .catch(err => console.error(err));

 
    axios.post("https://crudcrud.com/api/04d975795ace4032b07f4e3579f1b8e9/appointmentData", userDetails)
    .then((response) => {
        showNewUserOnScreen(response.data);
    })
    .catch((err)=> {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
        console.log(err);
    })


    // let userDetails_serialized=JSON.stringify(userDetails);

    // localStorage.setItem(userDetails.Add_Expense_Amount , userDetails_serialized);

    // to clear the form
    document.getElementById('number').value = "";
    document.getElementById('description').value = "";
    

}

window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("https://crudcrud.com/api/04d975795ace4032b07f4e3579f1b8e9/appointmentData")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
            showNewUserOnScreen(response.data[i]);
        }
      })
      .catch((err) => console.log(err));

      // const localStorageObj = localstorage;
      // const localstoragekeys = Object.keys(localStorageObj);

      // for (var i=0; i< localstoragekeys.length; i++){
        //  const key = localstoragekeys[i];
        // const userDetailsString = localStorageObj[key];
        // const userDetailsObj = JSON.parse(userDetailsString);
        // showNewUserOnScreen(userDetailsObj);
      //}
  });

function showNewUserOnScreen (userDetails) {
    const d = document.getElementById('ul')
    const li = `<li id='${userDetails.Add_Expense_Amount}'>'${userDetails.Add_Expense_Amount}','${userDetails.Description}','${userDetails.Choose_Category}'
    <button onclick = "editUser('${ userDetails.Add_Expense_Amount}','${userDetails.Description}','${userDetails.Choose_Category}')"> Edit </button> 
   <button onclick = "deleteUser('${userDetails.Add_Expense_Amount}')"> Delete </button>

    </li>`
    d.innerHTML = d.innerHTML + li;

}

function deleteUser(number) {
    let child = document.getElementById(number);
    let parent = document.getElementById('ul');
    parent.removeChild(child);
    localStorage.removeItem(number)
}

function editUser(number, description, category){
    document.getElementById('number').value = number;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
    
    deleteUser(number);
}

