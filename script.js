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
let Booking;

window.onload = function () {
    if (window.location.pathname === "/services.html") { 
        // Create blank booking object or get booking object if it is already made
        let Booking = JSON.parse(sessionStorage.getItem("Booking")) || {
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            Services: [],
            Date: "",
            Time: "",
            Message: "",
            TotalCost: 0,
            TotalDuration: 0,
            BookingID: ""
        };

        // Add or Remove service name, price and duration to Booking object if checked or unchecked
        const checkboxes = Array.from(document.getElementsByClassName("ui-checkbox"));
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function() {
                if(checkbox.checked){
                    Booking.Services.push(checkbox.dataset.name);
                    Booking.TotalDuration += parseFloat(checkbox.dataset.time);
                    Booking.TotalCost += parseFloat(checkbox.dataset.price);
                }else {
                    // Remove data when unchecked
                    const index = Booking.Services.indexOf(checkbox.dataset.name);
                    if (index > -1) {
                        Booking.Services.splice(index, 1); // Remove service
                    }
                    Booking.TotalDuration -= parseFloat(checkbox.dataset.time);
                    Booking.TotalCost -= parseFloat(checkbox.dataset.price);
                }
                sessionStorage.setItem("Booking", JSON.stringify(Booking));
                console.log(Booking);
            });
        });
    }
    if(window.location.pathname === "/booking.html"){
        let Booking = JSON.parse(sessionStorage.getItem("Booking"));
        console.log(Booking);

        // Sticky Div
        document.getElementById("service_duration").innerHTML = Booking.TotalDuration + " Hour/s";
        document.getElementById("total_cost").innerHTML = Booking.TotalCost.toLocaleString("en-US", {style:"currency", currency:"USD"});

        // Populate the Services List
        const ul = document.getElementById("services_list");
        Booking.Services.forEach(serviceName => {
            const li = document.createElement('li');

            // Find the checkbox element to get the price and time
            const checkbox = document.querySelector(`.ui-checkbox[data-name="${serviceName}"]`);
            console.log(checkbox);
            if (checkbox) {
                const price = parseFloat(checkbox.dataset.price).toLocaleString("en-US", { style: "currency", currency: "USD" });
                const time = checkbox.dataset.time + " mins";

                // Set the text content of the <li> element
                li.textContent = `Service Name: ${serviceName}, Price = ${price}, Time = ${time}`;
            } else {
                // Fallback in case the checkbox is not found
                li.textContent = `Service Name: ${serviceName}`;
            }

            ul.appendChild(li);
        });
    }
};



//'Book Now' button on Services Page
function BookNowbutton(){ 
    //get booking item
    let Booking = JSON.parse(sessionStorage.getItem("Booking"));
    if (Booking != null){
        sessionStorage.setItem("Booking", JSON.stringify(Booking));
        window.location.href="booking.html";
    }
    else {
        window.alert("Please select a service before proceeding with Booking.");
    }
}




//Confirm Booking 
function confirmBooking(){
    let Booking = JSON.parse(sessionStorage.getItem("Booking"));

    Booking.FirstName = document.getElementById("first-name").value;
    Booking.LastName = document.getElementById("last-name").value;
    Booking.Email = document.getElementById("email").value;
    Booking.Phone = document.getElementById("phone").value;
    Booking.Date = document.getElementById("date").value;
    Booking.Time = document.getElementById("time").value;
    Booking.Message = document.getElementById("message").value;
    Booking.BookingID = Math.floor(100000 + Math.random() * 900000);

    sessionStorage.setItem("Booking", JSON.stringify(Booking));
    console.log(Booking);
}
//Reset Booking
function resetBooking(){
    sessionStorage.removeItem("Booking");
    window.location.href = "services.html";
}



//TOGGLE MOBILE MENU 
const menu_button = document.getElementById('hamburger');
menu_button.addEventListener('click', () => {
    const img = document.getElementById('MenuIMG');
    if (img.src.includes("hamburger.png")){
        img.src = "media/cancel.png";
    }
    else {
        img.src = "media/hamburger.png";
    }

    const nav = document.querySelector('.MOBILE_nav-links');
    nav.classList.toggle('active');
});



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


const DatePickr = flatpickr("#booking-date", {
    enableTime: false,
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    minDate: "today", 
    disable: [
        function(date){
            return(date.getDay() ===  0);
        }
    ], 
    onChange: function(selectedDates) {
        // Adjust time picker based on the selected date
        updateTimePicker(selectedDates[0]);
    }
});

const TimePickr = flatpickr("#booking-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    minTime: "9:00",
    maxTime: "18:30",
    time_24hr: false,
})

// Function to update time picker based on the selected date
function updateTimePicker(date) {
    if (date.getDay() === 6) { // Saturday
        // Set minTime to 10:00 for Saturday
        TimePickr.set("minTime", "10:00");
        // Reset the time if the selected time is less than the new minTime
        if (TimePickr.selectedDates && TimePickr.selectedDates[0]) {
            let selectedTime = TimePickr.selectedDates[0].toTimeString().slice(0, 5); // Extract hour:minute
            if (selectedTime < "10:00") {
                TimePickr.setDate("10:00", true); // Reset time to 10:00 if it's less than the new minTime
            }
        }
    } else {
        // Set minTime to 9:00 for other days
        TimePickr.set("minTime", "9:00");
        // Reset the time if the selected time is less than the new minTime
        if (TimePickr.selectedDates && TimePickr.selectedDates[0]) {
            let selectedTime = TimePickr.selectedDates[0].toTimeString().slice(0, 5);
            if (selectedTime < "09:00") {
                TimePickr.setDate("09:00", true); // Reset time to 9:00 if it's less than the new minTime
            }
        }
    }
}