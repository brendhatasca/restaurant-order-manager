const createFolderBtn = document.getElementById("create-folder-btn");

createFolderBtn.addEventListener("click", () => {
    const folderName = prompt("Enter folder name (E.g: Christmas Eve):")
    if (!folderName) return

    console.log(folderName)

    // Send folder name to backend, which create a new Google Sheets Worksheet
    fetch("/api/create-sheet", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ sheetName: folderName })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) alert(`Folder ${folderName} created.`)
    });
});