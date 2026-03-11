const createEventBtn = document.getElementById("create-folder-btn");
const eventsContainer = document.getElementById("events-container");
const createNewOrderBtn = document.getElementById("btn-new-order");
const orderListWrapper = document.querySelectorAll(".order-list-wrapper");
const tbody = document.querySelector("tbody");
const deleteBtns = document.querySelectorAll(".btn-delete");
const editBtns = document.querySelectorAll(".btn-edit");

const slugify = (name) => name.replace(/\s+/g, '-').toLowerCase();

if (createEventBtn) {
    createEventBtn.addEventListener("click", () => {
        const eventName = prompt("Enter folder name (E.g: Christmas Eve):")
        if (!eventName) return

        // Send folder name to backend, which create a new Google Sheets Worksheet
        fetch("dashboard/api/create-sheet", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ sheetName: slugify(eventName) })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                alert(`${eventName} created.`)
            } else {
                alert("Failed to create event.")
            }
        })
        .catch(err => console.error(err))
    });
};

if (createNewOrderBtn) {
    createNewOrderBtn.addEventListener("click", (e) => {
        const eventName = e.target.dataset.event;
        window.location.href = `/orders/${eventName}/new`;
    });
};

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

if (deleteBtns) {
    deleteBtns.forEach(btn => btn.addEventListener("click", (e) => {
        console.log(e.target)

        const button = e.target.closest(".btn-delete");
        if(!button) return;

        const sheetTitle = button.dataset.sheetTitle;
        const orderId = button.dataset.orderId;

        if (!orderId || !sheetTitle) return

        fetch(`${sheetTitle}/api/delete-order`, {
            method: "DELETE",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                sheetName: slugify(sheetTitle),
                orderId: slugify(orderId)
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Order successfully deleted.")
                window.location.reload()
            } else {
                alert("ERROR: Could not delete order.")
            }
        })
        .catch(err => console.error(err))
    }))
}

if(editBtns) {
    editBtns.forEach(btn => btn.addEventListener("click", (e) => {
        console.log(e.target)
        const row = e.target.closest(".order-list-wrapper");
        if(!row) return;

        const sheetTitle = row.dataset.sheetTitle;
        const orderId = row.dataset.orderId;

        console.log(sheetTitle, orderId)

        window.location.href = `/orders/${sheetTitle}/${orderId}/edit`
    }))
}