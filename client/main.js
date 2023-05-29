
document.addEventListener("DOMContentLoaded", function () {
    initJs()
})


function initJs() {
    let contentList = document.getElementById("contactList")   // div element to show contact list //

    let saveButton = document.getElementById("btnSave")        // save contact button //

    let emailInput = document.getElementById("email")          // input to enter new contact details //

    const baseUrl = "http://localhost:3000"                   // base url of Node Js Api //


    // click listener to add new record //

    saveButton.addEventListener('click', (event) => {
        console.log("adding new contact")
        checkInputValidation();
    })

    /**
     * Method to validate basic field validation for email address input
     */
    function checkInputValidation() {
        const fieldValue = emailInput.value;
        console.log(`current input value ${fieldValue}`)
        if (fieldValue.indexOf("@") == -1) {                //  regex can be used to check complete email address validation //
            alert("Invalid Email Address")
        } else {
            saveContact(fieldValue);
        }
    }

    /**
     * Method to save new contact
     * @param {*} fieldValue 
     */
    async function saveContact(fieldValue) {
        console.log("calling save contact api")
        const restBody = { "email": fieldValue }
        const promiseResult = await fetch(`${baseUrl}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restBody)
        })
        const result = await promiseResult.json()
        console.log(`New contact added is `, result)

        emailInput.value = ""                      // clear input field
        refreshContactList()                       // refresh contact list

    }

    // Immediate Invoke Function //

    // This will call, whenever page loaded //
    (function () {
        console.log("In the IIFE -- let's go!");
        refreshContactList();
    })();


    /**
     * Method to delete contact record
     * @param {*} fieldValue 
     */
    async function deleteContact(fieldValue) {
        if (confirm("Do you want to delete?")) {
            console.log("calling delete contact api")
            const promiseResult = await fetch(`${baseUrl}/contacts/${fieldValue}`, {
                method: 'DELETE',
            })
            const result = await promiseResult.json()
            console.log("Contact Deleted is ", result)
            refreshContactList()
        }

    }

    /**
     * Method to render the records on DOM
     * @param {*} recordsList 
     */
    function updateUI(recordsList) {

        contentList.innerHTML = "";  // removing previous children from DOM

        for (let i = 0; i < recordsList.length; i++) {

            let container = document.createElement('div');                // create a child div element
            container.setAttribute("style", "display:flex;margin:10px;justify-content:center")   // add some styles

            let label = document.createElement('p');                      // create paragraph sub-child
            label.innerHTML = recordsList[i].email;                       // update its value
            label.setAttribute("style", "margin:5px;width:250px")                     // add some styles

            let deleteBtn = document.createElement('button')              // create button sub-child
            deleteBtn.setAttribute("style", "margin:5px;width:50px;height:25px;padding:5px;background: red;color: white")   // add some styles
            deleteBtn.innerHTML = "Delete"                                // update Button text

            deleteBtn.addEventListener('click', function () {             // Add Click listener on button to delete record
                deleteContact(recordsList[i].createdDate)
            })

            container.appendChild(label)                                  // add sub child <p> and <button> to <div> parent
            container.appendChild(deleteBtn)
            contentList.appendChild(container)                            // add <div> to content list div

            // repeat process for all records //
        }
    }

    /**
     * Method to fetch contact list from server
     */
    async function refreshContactList() {
        console.log("calling get contacts list api")
        const promiseResult = await fetch(`${baseUrl}/contacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await promiseResult.json()
        console.log("Contact List ", result)
        updateUI(result)
    }
}

