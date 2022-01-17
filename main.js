song1 = "";
song2 = "";
song1_status = "";
song2_status = "";





function preload(){
    song1 = loadSound("Jingle.mp3");
    song2 = loadSound("Jugnu.mp3");
}

leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized");

}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("red");
    stroke("aqua");
    if( scoreRightWrist > 0.2)
    {
     circle(rightWristX , rightWristY , 20);
     song2.stop();
     if(song1_status == false){
        song1.play();
        document.getElementById("play").innerHTML = "Playing jingle bell song ";
     }
    }

    if( scoreLeftWrist > 0.2)
    {
     circle(leftWristX , leftWristY , 20);
     song1.stop();
     if(song2_status == false){
        song2.play();
        document.getElementById("play").innerHTML = "Playing Jungu song ";
     }
    
     
    }
}




function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.setVolume(1);
    song2.rate(1);
    
}

function stop(){
    song1.stop();
    song2.stop();
}



function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}