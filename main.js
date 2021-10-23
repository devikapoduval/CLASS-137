video=""
status=""
objects=[]
function preload() {
    video=createVideo("video.mp4")
    video.hide()
}

function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    
}

function draw(){
    image(video,0,0,480,380)
    if (status != "") {
        objectDetector.detect(video,gotResult)
        for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="Status= Objects Detected"
        document.getElementById("number_of_objcts").innerHTML="Number of objects="+ objects.length
        
        fill("#390040")
        percent=floor(objects[i].confidence * 100)
        text(objects[i].label+" "+ percent +"%", objects[i].x, objects[i].y)
        stroke("#E05263")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

}

function gotResult(error,result) {
    if (error) {
       console.log(error) 
    } else {
        console.log(result)
      objects=result
    }
}


function start(){
    objectDetector=ml5.objectDetector("cocossd",modelloaded)
    document.getElementById("status").innerHTML="Status= Detecting Objects"
}

function modelloaded(){
    console.log("model Loaded")
    status=true
    video.loop()
    video.speed(1)
    video.volume(0)
}

