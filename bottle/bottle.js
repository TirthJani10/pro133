Status = "";
bottle_image = "";
objects = [];

function preload(){
    bottle_image = loadImage("bottle.webp");
}

function setup(){
    canvas = createCanvas(640,640);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bottle_image,0,0,640,640);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("successbtn").innerHTML = "There is 1 object in the image from which cocossd model has detected 1 object.";
            fill("#fc0303");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x - 800, objects[i].y - 520);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x - 800, objects[i].y - 520, objects[i].width - 910, objects[i].height - 2640);
        }
    }
}