status=""
video=""
objects= []


function preload(){

    video= createVideo("video.mp4")
    video.hide()
}

function setup(){

    canvas= createCanvas(480,380)
    canvas.center()

}

function draw(){

    image(video,0,0,480,380)
    
    if(status != ""){

        object_detector.detect(video,gotResults)
        for(i=0; i<objects.length; i++){

            document.getElementById("status").innerHTML="objects detected"
            document.getElementById("objects").innerHTML="Number of objects detected are ="+ objects.length
            fill("#FF0000")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
        
    }


    

}

function gotResults(error,results){

    if(error){

        console.log(error)
    }else{

        console.log(results)
        objects=results
    }

}


function start(){

    object_detector= ml5.objectDetector('cocossd',modelloaded)
    document.getElementById("status").innerHTML="status = detecting objects"
}

function modelloaded(){

    console.log("model is loaded")
    status= true;
    video.loop()
    video.speed(1)
    video.volume(0)
}