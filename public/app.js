const createEventBtn = document.getElementById("create-folder-btn");
const eventsContainer = document.getElementById("events-container");
const createNewOrderBtn = document.getElementById("btn-new-order");
const orderListWrapper = document.querySelectorAll(".order-list-wrapper");
const tbody = document.querySelector("tbody");

function titleCase(str) {
  // Convert the entire string to lowercase first to ensure consistency
  return str
    .toLowerCase()
    .split(' ') // Split the string into an array of words by space
    .map(word => {
      // Capitalize the first letter and concatenate with the rest of the word in lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' '); // Join the words back into a single string with spaces
}

if (createEventBtn) {
    createEventBtn.addEventListener("click", () => {
        const eventName = prompt("Enter folder name (E.g: Christmas Eve):")
        if (!eventName) return

    eventName =  titleCase(eventName)

        // Send folder name to backend, which create a new Google Sheets Worksheet
        fetch("dashboard/api/create-sheet", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ sheetName: eventName })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) alert(`${eventName} created.`)
        });
    });
};

if (createNewOrderBtn) {
    createNewOrderBtn.addEventListener("click", (e) => {
        const eventName = e.target.dataset.event;
        console.log(eventName);
        window.location.href = `/orders/${eventName}/new`;
    });
};

// if (orderListWrapper) {
//     orderListWrapper.forEach(order => {
//         order.addEventListener("click", (e) => {
//             console.log(e.target)
//         });
//     })
// }

if (tbody) {
    tbody.addEventListener("click", (e) => {
        if (e.target.closest(".btn-action")) return;
        console.log(e.target)

        const row = e.target.closest(".order-list-wrapper");
        if (!row) return;

        const orderId = row.dataset.orderId;
        const sheetTitle = row.dataset.sheetTitle;

        console.log(orderId, sheetTitle);

        window.location.href = `/orders/${sheetTitle}/${orderId}`
    });
};