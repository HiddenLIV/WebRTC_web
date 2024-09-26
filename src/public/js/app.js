// 프론트 엔드
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
let myStream;
let muted = false;
let cameraOff = false;

async function getCameras(){
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);
        const cameras = devices.filter((device)=>device.kind === "videoinput");
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.push({deviceId: '123123123', label:'test카메라'})
        console.log(cameras);
        cameras.forEach((camera)=>{
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if(currentCamera.label == camera.label){
                option.selected = true;
            }
            cameraSelect.appendChild(option);
        })

    } catch (error) {
        console.log(error)
    }
}

async function getMedia(deviceId){
    const initialConstraints = {
        audio : true,
        video: { facingMode : "user"}
    }

    const cameraConstraints = {
        audio : true,
        video: { deviceId: { exact: deviceId}}
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstraints : initialConstraints);
        console.log(myStream);
        myFace.srcObject = myStream;
        if(!deviceId){
            getCameras();
        }

    } catch (error) {
        console.log(error)
    }
}

getMedia();

function handleMuteClick(){
    console.log(myStream.getAudioTracks())
    myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled
    });
    if(!muted){
        muteBtn.innerText = "UnMute"
        muted = true
    }
    else {
        muteBtn.innerText = "Mute"
        muted = false
    }
}

function handleCameraClick(){
    console.log(myStream.getVideoTracks())
    myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled
    });
    if(!cameraOff){
        cameraBtn.innerText = "Turn Camera On"
        cameraOff = true
    }
    else {
        cameraBtn.innerText = "Turn Camera Off"
        cameraOff = false
    }
}

async function handleCameraChange(){
    console.log(cameraSelect.value);
    await getMedia(cameraSelect.value)
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);
