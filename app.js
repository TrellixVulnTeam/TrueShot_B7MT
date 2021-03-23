// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch"),
    flipBtn = document.querySelector('#flip-btn');

// Set constraints for the video stream

var constraints = { video: { facingMode: shouldFaceUser ? 'user' : 'environment' }, audio: false };

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
  
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

/*
//flip camera button
flipBtn.addEventListener('click', function(){
    // we need to flip, stop everything
    cameraView.pause()
    cameraView.srcObject = null
    // toggle \ flip
    shouldFaceUser = !shouldFaceUser;
    cameraStart();
  })
*/
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);