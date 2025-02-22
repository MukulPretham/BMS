document.querySelector(".search-route").addEventListener("click", async () => {
    let fromElement = document.getElementById("fromLocation");
    let toElement = document.getElementById("toLocation");
    let response = await fetch(`/buses?from=${fromElement.value}&to=${toElement.value}`);
    let busList = await response.json();
    let list = document.querySelector(".list");
    list.innerHTML = " "
    for (const element of busList) {
        let child = document.createElement("div");
        child.innerHTML = `<div class="listItems">
            <ol>
                <li>Id: ${element._id}</li>
                <li>from: ${element.fromAddress}</li>
                <li>to: ${element.toAddress}</li>
                <li>duration: ${element.duration}mins</li>
                <li>price: ${element.fare}</li>
            </ol>
            <button class="book" data-id="${element._id}">Book now</button>
        </div>`
        list.append(child);
        // child.querySelector(".book").addEventListener("click",()=>{
        //     console.log(`booked: ${element._id}`);
        // })
    }
})
document.querySelector(".list").addEventListener("click", async (e) => {
    if (e.target.classList.contains("book")) {
        const bookingId = e.target.getAttribute("data-id");
        // window.location.href = `/booking.html`;
        window.location.href = `/booking?_id=${bookingId}`;
    }
});

