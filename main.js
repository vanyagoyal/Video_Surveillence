video = "";
status = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
}

function setup(){
    canvas = createCanvas(480 , 480);
    canvas.center();
    video.hide();
}

function draw(){
    image(video , 0 , 0 , 480 , 480);
     if (status != ""){
         objectDetector.detect(video , gotResult);

         for(i = 0; i < objects.length; i++){
             document.getElementById("status").innerHTML = "Status : Object Detected!";
             document.getElementById("objects").innerHTML = "No. Of Objects : " + objects.length;

             fill('#fec7ff');

             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);

             noFill();
             stroke('#fec7ff');
             rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
         }
     }

}

function modelLoaded(){
    console.log("coco ssd Model Loaded!!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}