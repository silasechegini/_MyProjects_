const IMAGE = document.querySelectorAll("img");
var GRID = document.querySelector(".grid");

const SIZES = {
    // gallery: "(max-width: 1000px) 480px, 372px",
    gallery: "(max-width: 800px) 480px, 372px",
}

function makeSrcSet(imgsrc){
    let markup = [];
    let width = 480;

    for (let i = 0; i < 3; i++) {
        markup[i] = imgsrc + "-" + width + ".png" + " " + width + "w";
        width+=240;
    }

    return markup.join();
}

for (let i = 0; i < IMAGE.length; i++) {
    let imgsrc = IMAGE[i].getAttribute("src");
    imgsrc = imgsrc.slice(0, -8);
    let srcset = makeSrcSet(imgsrc);
    IMAGE[i].setAttribute("srcset", srcset);
    console.log("source set: " + srcset);

    let type = IMAGE[i].getAttribute("data-type");
    let sizes = SIZES[type]
    IMAGE[i].setAttribute("sizes", sizes);
    console.log(type);
    console.log("sizes: " + sizes);
}

var image = document.querySelectorAll("img");


for (let i = 0 ; i < image.length; i++) {
    var newElement = document.createElement("a");
    newElement.setAttribute("href", image[i].getAttribute("src"));
    newElement.style = ("margin-left: 5px;")
    newElement.classList.add(".display");
    image[i].parentNode.insertBefore(newElement, image[i]);
    newElement.appendChild(image[i]);
    console.log(newElement);
    GRID.appendChild(newElement);
}