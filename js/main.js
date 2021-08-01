class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList;
        
        

        this.displayTitleForm();

        // listen for submit button click
        let submitTitleBtn = document.querySelector('#title-submit-btn');
        submitTitleBtn.addEventListener('click', e => this.handleTitleSubmitClick(e));

        
        
    }

    displayTitleForm(){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" placeholder="Give your list a name" required aria-label=".form-control-lg">
            <button id="title-submit-btn" class="btn btn-outline-dark" type="button">create</button>
        </form>
        `

        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
    }

    displayEmptyTitleAlert(){
        let header = document.querySelector('header');
        let alertHTML = 
        `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            List Title cannot be blank.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        header.insertAdjacentHTML('beforeend', alertHTML);
    }

    handleTitleSubmitClick(e){
        let form = document.querySelector('form');
        // select the input field and grab the value
        let titleInput = form.querySelector('#list-title-input') .value;

        if (titleInput === "") {
            this.displayEmptyTitleAlert();
        } else {
            console.log(`title collected: ${titleInput}`);
        // create a new list object
        let newList = new List(titleInput);
        this.currentList = newList;

        // add to the app's list of lists
        this.lists.push(newList);
        }
        
    }


 
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

