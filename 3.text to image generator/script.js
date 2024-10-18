const key = "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";
const inputText = document.getElementById("input");
const image =  document.getElementById("image");
const GenBtn =  document.getElementById("btn");
const ResetBtn =  document.getElementById("reset");
const downloadBtn =  document.getElementById("download");




async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer  ${key}` 

			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob(); 
    image.style.display= "block"
	return result;
}
async function generate(){


query().then((response) => {
	const  objectUrl = URL.createObjectURL(response);
    image.src = objectUrl;
	downloadBtn.addEventListener("click", ()=>{
		downloadBtn(objectUrl)
	})
});
}

GenBtn.addEventListener("click" , ()=>{
    generate();

});

inputText.addEventListener("keydown" , (e)=>{
    if(e.key == "Enter")
    {
        generate();

    }
})

ResetBtn.addEventListener ("click", ()=>{
	inputText.value = ""
	window.location.reload();
})

function  download(objectUrl){

	fetch(objectUrl).then(res=>res.blob())
	.then(file=>{
		let a = document.createElement("a");
		a.href = URL.createObjectURL(file);
		a.document = new Date().getTime();
		a.click();
	})
}

