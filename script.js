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
    headers[i].onclick = testfunction;
}

function testfunction() {
    const down_arrow = this.querySelector(".accordion_down_icon");

    if (down_arrow.style.transform === "rotateZ(180deg)") {
        down_arrow.style.transform = "rotateZ(0deg)";
    } else {
        down_arrow.style.transform = "rotateZ(180deg)";
    }

    console.log("Its Working");
}

function hair_icon_click() {

}