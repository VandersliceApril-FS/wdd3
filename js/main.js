class Main{
    constructor() {
        // when a new list is created, add it to this array to access later.
        this.lists = [];
        this.currentList = [];
        this.completedItems = [];
        this.listContainer = document.querySelector('#list-container');
        this.listTotal = 0;
        this.main = document.querySelector('main');
        this.myStorage = window.localStorage;
        
        

        this.displayTitleForm();
        
        // listen for title submission
        // let submitTitleBtn = document.querySelector('#title-submit-btn');
        // submitTitleBtn.addEventListener('click', e => this.createList());

        // listen for form submission
        this.formModal = document.querySelector('#add-item-modal');
        let submitBtn = this.formModal.querySelector('#modal-submit-btn');
        submitBtn.addEventListener("click", e => this.createListItem(this.currentList));

    }

    createList(e){
        // listen for title submission
        

        let listTitleField = document.querySelector('#list-title-input');
        let newList = new List();
        newList.title = listTitleField.value;
        this.lists.push(newList);
        console.log(this.lists);
        newList.displayTitle();
        
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

        let submitTitleBtn = document.querySelector('#title-submit-btn');
        submitTitleBtn.addEventListener('click', e => this.createList(e));
    }


    displayListItems(arr){
        // reset list container html to avoid duplicates
        this.resetHTML(this.listContainer);
        
        if(arr.length !== 0) {
            // loop through the array and display each item in the html
            arr.forEach(item => {
                console.log(item.name);
                let htmlToAdd = 
                    `   
                    <li class="list-group-item pb-0" data-js="${item.idNumber}">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="completed" value="true" id="isComplete">
                                <label class="form-check-label" for="isComplete">
                                    <div class="d-flex">
                                        <section id="item-photo-container">
                                            <img id="item-photo" src="${item.imageSource}" alt="item photo">
                                        </section>
                                        <section id="item-info" class="w-100" >
                                            <div class="d-flex justify-content-between mb-0">
                                                <h2 id="item-name">${item.name}</h2>
                                                <h2 id="item-cost">$ ${item.getTotalCost().toFixed(2)}</h2>
                                            </div>
                                            <p id="item-store">${item.store}</p>
                                            <p id="item-quantity">Qty: ${item.quantity}</p>
                                        </section>
                                    </div>
                                </label>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline-dark btn-sm border-0" id="delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </li>
                    `;
                this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
                let listItem = document.querySelector(`[data-js = "${item.idNumber}"]`);

                let deleteButton = listItem.querySelector('#delete-btn');
                deleteButton.addEventListener("click", e => this.deleteItem(listItem));

                
                let checkbox = listItem.querySelector('#isComplete');
                checkbox.addEventListener("input", e => this.markComplete(item));
            })
        };
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

