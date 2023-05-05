const dragArea = document.querySelector('.Drag-and-drop');
const dragText = document.querySelector('.dragdrop');

let file;

let browse_button = document.querySelector('.browse-button');
let input = document.querySelector('input');

//When browse button is clicked open up file explorer
browse_button.onclick = () => {
  input.click();
};

//Add the file
input.addEventListener('change', function(){
  file = this.files[0];
  displayFile();
})

//When file is in the drag area
dragArea.addEventListener('dragover',(event) => {
  event.preventDefault();
  dragText.textContent = "Release to upload";
});

//When file is not in the drag area
dragArea.addEventListener('dragleave',() => {
  dragText.textContent = "Drag & drop";
});

//When the file is dropped
dragArea.addEventListener('drop', (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0]; //To upload only 1 file out of chosen
  displayFile();
});

function displayFile() {
  let filetype = file.type;

  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']

  if(validExtensions.includes(filetype)){
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result; //path for uploaded file
      let imgTag = `<img src= "${fileURL}" alt="">`; //To fetch the image from the URL
      dragArea.innerHTML = imgTag; //To display
    };
    fileReader.readAsDataURL(file);
  }
  else {
    alert("This file is not valid.")
  }
}
