document.addEventListener("DOMContentLoaded", async () => {
    // Get the _id from the URL
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("_id");
    let response = await fetch(`/buses/bookings/${bookingId}`);
    let data = await response.json();
    let list = document.getElementsByTagName("section")[0];
    let listItem = document.createElement("div");
    listItem.innerHTML = `<div class="listItems">
            <ol>
                <li>From :${data.fromAddress}</li>
                <li>To: ${data.toAddress}</li>
                <li>Price: ${data.fare}</li>
                <li>Available_Seats: ${data.Available_Seats}</li>
            </ol>
            <button class="bookNow">Book Now</button>
        </div>`
    list.appendChild(listItem);
});