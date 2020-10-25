window.onload = function() {
    let savedMemes = JSON.parse(localStorage.getItem("memes")) || [];

    let memeForm = document.querySelector("#memeForm");
    let memeGallery = document.querySelector("#memeGallery");
    let memeRow = document.querySelector("#memeRow");

    //recpvers the JSON file on page load
    for (let i = 0; i < savedMemes.length; i++) {
        addMemeDOM(savedMemes[i]);
    }

    //helper function to add new meme to JSON
    function addMemeJSON(imgUrl, topText, bottomText) {
        let newMeme = {
            imgUrl,
            topText,
            bottomText,
            id: Date.now()
        };

        savedMemes.push(newMeme);
        addMemeDOM(newMeme);
    }

    //helper function to add new meme to the DOM
    function addMemeDOM(memeObj) {
        //add meme image
        let imgElement = document.createElement("img");

        imgElement.onload = function() {    //wait for image to load
            //add bootsrap column
            let col = document.createElement("div");
            col.className = "col-12 col-md-6";
            col.id = memeObj.id;

            memeRow.appendChild(col);

            //add meme container
            let memeDiv = document.createElement("div");
            memeDiv.className = "meme";

            col.appendChild(memeDiv);
                       
            imgElement.className = "rounded mx-auto my-3 d-block";

            memeDiv.appendChild(imgElement);

            //set max width of meme text to be 90% of the meme image width
            let imgWidth = imgElement.width;
            let maxImgWidth = imgWidth * 0.90;  

            //add meme top text
            let topTextDiv  = document.createElement('div');
            topTextDiv.className = 'textAlign memeFont topText';
            topTextDiv.style.maxWidth = maxImgWidth + 'px';
            topTextDiv.innerText = memeObj.topText;

            memeDiv.appendChild(topTextDiv);

            //add meme bottom text
            let bottomTextDiv  = document.createElement('div');
            bottomTextDiv.className = 'textAlign memeFont bottomText';
            bottomTextDiv.style.maxWidth = maxImgWidth + 'px';
            bottomTextDiv.innerText = memeObj.bottomText;

            memeDiv.appendChild(bottomTextDiv);

            //add meme delete button
            let deleteButton = document.createElement('button');
            deleteButton.className = 'btn trashBtn';

            memeDiv.appendChild(deleteButton);

            let trashIcon = document.createElement('i');
            trashIcon.className = 'fas fa-trash-alt fa-5x';

            deleteButton.appendChild(trashIcon);
        };

        imgElement.src = memeObj.imgUrl;
    }


    //event listener for form submit
    memeForm.addEventListener('submit', function(event) {
        
        event.preventDefault();
        
        let imgUrlInput = document.querySelector('#imageUrlInput');
        let topTextInput = document.querySelector('#topTextInput');
        let bottomTextInput = document.querySelector('#bottomTextInput');

        let imgUrlVal = imgUrlInput.value.trim();
        let topTextVal = topTextInput.value.trim();
        let bottomTextVal = bottomTextInput.value.trim();

        if (imgUrlVal !== '') {
            addMemeJSON(imgUrlVal, topTextVal, bottomTextVal);
            memeForm.reset();

            localStorage.setItem("memes", JSON.stringify(savedMemes));    
        }
    });

    //event listener for delete meme click
    memeGallery.addEventListener('click', function(event) {

        if (event.target.classList.contains('fa-trash-alt')) {
            let memeId = event.target.parentNode.parentNode.parentNode.id;
            document.getElementById(memeId).remove();

            savedMemes = savedMemes.filter(function(val) {
                return val.id.toString() !== memeId;
            });
        
            localStorage.setItem("memes", JSON.stringify(savedMemes));
        }
    });



}