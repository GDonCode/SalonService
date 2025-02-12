//SERVICE SELECTOR LOGIC  SERVICE SELECTOR LOGIC  SERVICE SELECTOR LOGIC  SERVICE SELECTOR LOGIC  SERVICE SELECTOR LOGIC  SERVICE SELECTOR LOGIC

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

// SERVICE ACCORDION LOGIC
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



window.onload = function () {
    if (window.location.pathname.includes("services.html")) { 
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
        console.log(Booking);
        document.querySelectorAll('.ui-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateBooking(this);
            });
        });
        // Select all service checkboxes
        const checkboxes = document.querySelectorAll(".ui-checkbox");

        // Restore checkbox states from storage
        checkboxes.forEach((checkbox) => {
            const storedState = sessionStorage.getItem(checkbox.id);
            if (storedState === "true") {
                checkbox.checked = true;
            }
        });

        // Add event listener to store checkbox states on change
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                sessionStorage.setItem(checkbox.id, checkbox.checked);
            });
        });
        // Add or Remove service name, price and duration to Booking object if checked or unchecked
        function updateBooking(checkbox) {
            const serviceName = checkbox.getAttribute("data-name");
            const servicePrice = parseFloat(checkbox.getAttribute("data-price"));
            const serviceDuration = parseFloat(checkbox.getAttribute("data-time"));
        
            if (checkbox.checked) {
                // Add the service to the Booking object
                Booking.Services.push({
                    name: serviceName,
                    price: servicePrice,
                    duration: serviceDuration
                });
                Booking.TotalCost += servicePrice;
                Booking.TotalDuration += serviceDuration;
            } else {
                // Remove the service from the Booking object
                Booking.Services = Booking.Services.filter(service => service.name !== serviceName);
                Booking.TotalCost -= servicePrice;
                Booking.TotalDuration -= serviceDuration;
            }
            sessionStorage.setItem("Booking", JSON.stringify(Booking));
        }
    }
    
    if(window.location.pathname.includes("booking.html")){
        // Retrieve the Booking object from sessionStorage
        let Booking = JSON.parse(sessionStorage.getItem("Booking")) || {
            TotalCost: 0,
            TotalDuration: 0,
            Services: []
        };
        console.log(Booking);
        // Update the Total Duration
        const serviceDurationElement = document.getElementById("service_duration");
        if (serviceDurationElement) {
            serviceDurationElement.textContent = `${Booking.TotalDuration} hours`;
        }

        // Update the Total Cost
        const totalCostElement = document.getElementById("total_cost");
        if (totalCostElement) {
            totalCostElement.textContent = `$${Booking.TotalCost.toFixed(2)}`;
        }
        updateServicesList();
        // Update the list of selected services
        function updateServicesList() {
            const servicesListElement = document.getElementById("services_list");
            servicesListElement.innerHTML = ""; // Clear the list before updating
        
            Booking.Services.forEach((service, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<strong>${service.name}</strong>  ($${service.price.toFixed(2)}) (${service.duration} hr/s)`;
        
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.classList.add("service_remove-button");
                removeButton.type = "button";
        
                // Correct removal function
                removeButton.addEventListener("click", () => {
                    console.log(`Removing service: ${service.name}`);
        
                    // Remove the service at the correct index
                    Booking.Services.splice(index, 1);
        
                    // Update totals
                    Booking.TotalCost = Booking.Services.reduce((sum, s) => sum + s.price, 0);
                    Booking.TotalDuration = Booking.Services.reduce((sum, s) => sum + s.duration, 0);
        
                    // Save updated Booking object
                    sessionStorage.setItem("Booking", JSON.stringify(Booking));
        
                    console.log("Updated Booking:", Booking);
        
                    // Refresh the UI
                    updateServicesList();
                });
        
                listItem.appendChild(removeButton);
                servicesListElement.appendChild(listItem);
            });
        
            // Update totals in UI
            document.getElementById("service_duration").textContent = `${Booking.TotalDuration} hours`;
            document.getElementById("total_cost").textContent = `$${Booking.TotalCost.toFixed(2)}`;
        }
    }
};




//'Book Now' button on Services Page
function BookNowbutton(){ 
    //get booking item
    let Booking = JSON.parse(sessionStorage.getItem("Booking"));
    if (Booking != null){
        sessionStorage.setItem("Booking", JSON.stringify(Booking));
        window.location.href="booking.html";
        console.log(Booking);
    }
    else {
        window.alert("Please select a service before proceeding with Booking.");
    }
}




//Confirm Booking 
async function confirmBooking(){
    let Booking = JSON.parse(sessionStorage.getItem("Booking"));

    Booking.FirstName = document.getElementById("first-name").value;
    Booking.LastName = document.getElementById("last-name").value;
    Booking.Email = document.getElementById("email").value;
    Booking.Phone = document.getElementById("phone").value;
    Booking.Date = document.getElementById("booking-date").value;
    Booking.Time = document.getElementById("booking-time").value;
    Booking.Message = document.getElementById("message").value;
    Booking.BookingID = Math.floor(100000 + Math.random() * 900000);

    sessionStorage.setItem("Booking", JSON.stringify(Booking));

    const response = await fetch('http://192.168.0.2:8080/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Booking)
    });

    const result = await response.text();
    console.log(result);
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




