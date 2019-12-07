var slider = document.getElementById("myRange12");
var output = document.getElementById("defense4");
output1.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}
