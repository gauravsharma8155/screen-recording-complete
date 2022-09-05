console.log("This console for popup js ");

let screen = document.getElementById('screen').addEventListener("click", () => {
    console.log("this is consile");

    let block = document.getElementById("block");
    console.log(block);
    block.style.display = 'block';

    let footer = document.getElementById("footer");
    console.log(footer);
    footer.style.display = 'none'


    var img = document.getElementById("example1");
    console.log(img.getAttribute("src")); // "images/foo.png"
    console.log(img.src);

    if (img.src == "chrome-extension://ijijdpiccobkldjgafnbaoilkigogcco/Vector.png") {
        let btn_recording = document.getElementById("btn_recording").addEventListener("click", async()=>{
            console.log("this is console");

            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: recording,
            })
        })
    
    }
    else {
        alert("image source not match")
    }

    async function recording() {


        let stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        })
    
        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
            ? "video/webm; codecs=vp9"
            : "video/webm"
        let mediaRecorder = new MediaRecorder(stream, {
            mimeType: mime
        })
    
        let chunks = []
        mediaRecorder.addEventListener('dataavailable', function (e) {
            chunks.push(e.data)
        })
    
        mediaRecorder.addEventListener('stop', function () {
            let blob = new Blob(chunks, {
                type: chunks[0].type
            })
            console.log(blob);
            let body = document.querySelector("body");
            console.log(body)
    
            let append1 = document.createElement("video");
            append1.className = 'top'
            append1.src = URL.createObjectURL(blob)
            append1.controls = true
            append1.height = 400;
            append1.width = 400;
            console.log(append1, "append1");
            body.appendChild(append1);
    
    
        })
        mediaRecorder.start();
    
    }
})
