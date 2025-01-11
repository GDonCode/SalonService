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


function RmvService() {
    document.querySelectorAll('.remove--service').forEach(button => {
        button.addEventListener('click', function() {
            serviceDiv = this.parentElement;
            serviceDiv.style.display = 'none';
        })
    })
}

const checkboxes = document.querySelectorAll('.ui-checkbox');

function SelectService() {
    let totalPrice = 0;
    let totalTime = 0;
    let selectedServices = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          totalPrice += parseFloat(checkbox.dataset.price);
          totalTime += parseFloat((checkbox.dataset.time));
          selectedServices.push(checkbox.dataset.name);
        }
      });

    console.log(`Services booked: ${selectedServices}`);
    console.log(`Total Cost: $${totalPrice.toLocaleString()}`);
    if (totalTime > 1) {
        console.log(`Total Time: ${totalTime} Hours`);
    }
    else {
        console.log(`Total Time: ${totalTime} Hour`);
    }
}

