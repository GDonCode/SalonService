
const headers = document.getElementsByClassName("accordion_header");
const scrollbuttons = document.getElementsByClassName("service_scroll_button");

Array.from(scrollbuttons).forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-scroll-target');
        const targetElement = document.getElementById(target);

        // Calculate the position of the target element minus 120px
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 119.5;

        // Scroll to the calculated position
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});


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
    const service_duration = document.getElementById("service_duration");
    const total_cost = document.getElementById("total_cost");

    // Update Service Duration
    let mins = Booking.TotalDuration * 60;
    if (Booking.TotalDuration < 1){
        service_duration.textContent = `${mins} Minutes`;
    }
    else if (Booking.TotalDuration === 1){
        service_duration.textContent = `${Booking.TotalDuration} Hour`;
    }
    else {
        service_duration.textContent = `${Booking.TotalDuration} Hours`;
    }

    // Update Total Cost
    total_cost.textContent = `$${Booking.TotalCost.toLocaleString()}`;

    console.log(Booking);  // Log the saved booking object

    //Update Selected Services 
    const ul = document.querySelector('ul');
    Booking.Services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Service Name:</strong> ${service.name} &nbsp; <strong>Service Price:</strong> $${service.price.toLocaleString()} &nbsp; <strong>Service Duration:</strong> ${service.time}hr/s`;
        ul.appendChild(li);;
    });
    // DIV HEIGHT CALCULATIONS
    const main = document.getElementsByTagName("main");
    const sticky_totalDiv = document.querySelector(".sticky_total");
    const booking_container = document.querySelector(".booking_container");
    const form = document.querySelector('form');
   

// Remove Service Function
function RmvService() {
    document.querySelectorAll('.remove--service').forEach(button => {
        button.addEventListener('click', function() {
            serviceDiv = this.parentElement;
            serviceDiv.style.display = 'none';
        })
    })
}
}

function confirmBooking() {
    //const Booking = JSON.parse(localStorage.getItem("Booking")) || {};

    const form = document.querySelector('.form');
    if (form.checkValidity()) {
        // Proceed with booking confirmation logic
        alert('Form is valid, proceed with submission!');
    } else {
        // Trigger the browser's default validation
        form.reportValidity();  // This triggers the tooltips
    }
    
    //Booking.FirstName = document.getElementById("first-name").value;
    //Booking.LastName = document.getElementById("last-name").value;
   // Booking.Email = document.getElementById("email").value;
    //Booking.Phone = document.getElementById("phone").value;
    //Booking.Date = document.getElementById("date").value;
    //Booking.Time = document.getElementById("time").value;
    //Booking.Notes = document.getElementById("message").value;
    //Booking.BookingID = Math.floor(Math.random() * 100000);

    console.log(Booking);
    //localStorage.setItem("Booking", JSON.stringify(Booking));
}



function toggleMenu() {
    const menu_button = document.getElementById('menu_button');

    if (menu_button.src.includes("hamburger.png")){
        menu_button.src = "media/cancel.png";
    }
    else {
        menu_button.src = "media/hamburger.png";
    }
}

function expandCustomizer () {
    const braids_checkbox = document.getElementById("braids");
    const customizer = document.getElementById("braid-customizer");
    const info_section = document.querySelector("accordion_info");

    if (braids_checkbox.checked){
        customizer.classList.add("expanded");
        info_section.style.maxHeight = (info_section.scrollHeight + customizer.scrollHeight ) + "px";
    }
    else {
        customizer.classList.remove("expanded");
        customizer.style.maxHeight = "null";
    }
}
