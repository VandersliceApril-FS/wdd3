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
        let htmlToAdd = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" placeholder="Give your list a name"  aria-label=".form-control-lg" required>
            <button id="title-submit-btn" class="btn btn-outline-dark" type="button">create</button>
        </form>
        `

        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
    }

    handleTitleSubmitClick(e){
        let form = document.querySelector('form');
        // select the input field and grab the value
        let titleInput = form.querySelector('#list-title-input') .value;
        console.log(`title collected: ${titleInput}`);
        // create a new list object
        let newList = new List(titleInput);
        this.currentList = newList;

        // add to the app's list of lists
        this.lists.push(newList);
    }


    markComplete(itemToComplete) {

        let markCompleted = document.querySelector(`[data-js = "${itemToComplete.idNumber}"]`);
        markCompleted.classList.add("completed");
        
    }

    deleteItem(itemToDelete){
        this.currentList.splice(itemToDelete.idNumber, 1);
        
        
        this.displayListItems(this.currentList);
        
        this.getListTotal();
        this.displayTotal();
        this.toggleInstructions();
    }

    

    

    toggleInstructions(){
        if(this.currentList.length !== 0) {
            document.querySelector('#instructions').style.display = 'none';  
         } 
    }
 
}


// starts the app 
(()=>{
    console.log("page loaded");
    const main = new Main();
})();

