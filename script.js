
const headers = document.getElementsByClassName("accordion_header");
const scrollbuttons = document.getElementsByClassName("service_scroll_button");

Array.from(scrollbuttons).forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-scroll-target');
        document.getElementById(target).scrollIntoView({
            behavior: 'smooth'
        })
    })
})


for (let i = 0; i < headers.length; i++) {
    headers[i].onclick = service_dropdown_function;
}

function service_dropdown_function() {
    const down_arrow = this.querySelector(".accordion_down_icon");

    if (down_arrow.style.transform === "rotateZ(180deg)") {
        down_arrow.style.transform = "rotateZ(0deg)";
    } else {
        down_arrow.style.transform = "rotateZ(180deg)";
    }

    const info_section = this.nextElementSibling;
    if (info_section.classList.contains("expanded")) {
        info_section.classList.remove("expanded");
    } else {
        info_section.classList.add("expanded");
    }
}

// SERVICES PAGE LOGIC  SERVICES PAGE LOGIC  SERVICES PAGE LOGIC  SERVICES PAGE LOGIC  SERVICES PAGE LOGIC SERVICES PAGE LOGIC
const checkboxes = document.querySelectorAll('.ui-checkbox');

function SelectService() {
    // Create Booking Object
    Booking = {
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Services: [],
        Date: "",
        Time: "",
        Notes: "",
        TotalCost: 0,
        TotalDuration: 0,
        BookingID: ""
    }

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const service = {
                name: checkbox.dataset.name,
                price: checkbox.dataset.price,
                time: checkbox.dataset.time
            };
            Booking.Services.push(service);
            Booking.TotalCost += parseFloat(service.price);
            Booking.TotalDuration += parseFloat(service.time);
        }
    });

    // Console Logs for Testing
    Booking.Services.forEach(service => {
        console.log(`Service booked: ${service.name}`);
    });
    console.log(`Total Cost: $${Booking.TotalCost.toLocaleString()}`);
    if (Booking.TotalDuration > 1) {
        console.log(`Total Time: ${Booking.TotalDuration} Hours`);
    }
    else {
        console.log(`Total Time: ${Booking.TotalDuration} Hour`);
    }

    // Store Booking Object in Local Storage
    localStorage.setItem("Booking", JSON.stringify(Booking));
    window.location.href = "booking.html"; 
}



// BOOKING PAGE LOGIC   BOOKING PAGE LOGIC  BOOKING PAGE LOGIC  BOOKING PAGE LOGIC  BOOKING PAGE LOGIC BOOKING PAGE LOGIC 

window.onload = function() {
    const Booking = JSON.parse(localStorage.getItem("Booking")) || {};
    console.log(Booking);  // Access the saved booking object
};


// Remove Service Function
function RmvService() {
    document.querySelectorAll('.remove--service').forEach(button => {
        button.addEventListener('click', function() {
            serviceDiv = this.parentElement;
            serviceDiv.style.display = 'none';
        })
    })
}
