class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];
        this.completedItems = [];
        this.listContainer = document.querySelector('#list-container');
        this.main = document.querySelector('main');
        this.myStorage = window.localStorage;
        
        

        this.displayTitleForm();
        

        // listen for form submission
        this.formModal = document.querySelector('#add-item-modal');
        let submitBtn = this.formModal.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem(this.currentList));

    }

    displayTitleForm(){
        let titleContainer = document.querySelector('#list-title-container');
        this.resetHTML(titleContainer);
        let htmlToAdd = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" placeholder="Give your list a name"  aria-label=".form-control-lg" required>
            <button id="title-submit-btn" class="btn btn-outline-dark" type="button">create</button>
        </form>
        `

        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);

        // listen for submit button click
        let submitTitleBtn = document.querySelector('#title-submit-btn');

        submitTitleBtn.addEventListener('click', e => this.handleTitleSubmitClick(e));
    }

    handleTitleSubmitClick(e){
        let form = document.querySelector('form');
        // select the input field and grab the value
        let titleInput = form.querySelector('#list-title-input') .value;
        console.log(`title collected: ${titleInput}`);
        // create a new list object
        let newList = new List(titleInput);


        // add to the app's list of lists
        this.lists.push(newList);

        this.displayAddButton(); // check to make sure one isn't already there

        let htmlToAdd = 
        `
        <section id="total-container"  class="d-flex w-100 justify-content-between mt-3 fixed-bottom">
            <h3>Total</h3>
            <h3 class="total"><span>$</span>0</h3>
        </section>
        `
        this.main.insertAdjacentHTML('beforeend', htmlToAdd);
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

    displayTotal(){
        
        if(!this.listTotal){
            console.error("no list total", this.listTotal);
        }
        let listTotalContainer = document.querySelector('#total-container');
        
        this.resetHTML(listTotalContainer);
    
        let htmlToAdd = 
        `
        <h3>Total</h3>
        <h3 class="total"><span>$</span>${Number(this.listTotal).toFixed(2)}</span></h3>
        `
        listTotalContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
        
    }

    

    displayAddButton(){
        let htmlToAdd = 
        `
            <!-- Button to trigger modal -->
            <div id="add-btn-container" class="d-flex justify-content-end">
                <p id="instructions">Add an item to this list.</p>    
                <button id="add-item-btn" type="button" class="btn btn-dark btn-lg rounded-circle" data-bs-toggle="modal" data-bs-target="#add-item-modal">+</button>
            </div>
        `;
        let listSection = document.querySelector('#list-section');

        listSection.insertAdjacentHTML('afterend', htmlToAdd);
    }

    resetHTML(element){
        element.innerHTML = "";
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

