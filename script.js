const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models/tiny_face_detector_model-weights_manifest.json'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models/'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models/face_recognition_model-weights_manifest.json'),
  faceapi.nets.faceExpressionNet.loadFromUri('models/')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    console.log("11111")
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())//.withFaceLandmarks().withFaceExpressions()
    console.log("22222")
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    console.log("33333")
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    console.log("44444")
    faceapi.draw.drawDetections(canvas, resizedDetections)
    console.log("55555")
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 3000)
})

//startVideo();
