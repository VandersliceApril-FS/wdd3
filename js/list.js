class List{
    constructor(t){
        this.title = t;
        this.items = [];
        this.listTotal;
    }

    createListItem(arr){
        // create a new list item object
        let newItem = new ListItemDO();

        //gather the data from the form
        
        newItem.name =  document.querySelector('#name-field').value;
        newItem.cost = Number(document.querySelector('#cost-field').value);
        newItem.store = document.querySelector('#store-field').value;
        newItem.quantity = Number(document.querySelector('#quantity-field').value);
        
        if(document.querySelector('#image-link').value == "") {
            newItem.imageSource = 'images/box.jpg';
        } else {
            newItem.imageSource = document.querySelector('#image-link').value;
        }
        
        
        // add the item to the currentList
        arr.push(newItem);
        
        // give the new item an ID number using the item's index in the array
        newItem.idNumber = arr.indexOf(newItem);

        // update local storage
        this.saveToLocal();
        // update the list total
        this.getListTotal();
        this.displayTotal();
        // call the function to display items in the html
        this.displayListItems(arr);
        document.querySelector('form').reset();
        this.toggleInstructions();
    }

    displayTitle(){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${this.title}</h1>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
        
        let listTitle = document.querySelector("#list-title");
        listTitle.addEventListener('click', e => this.editListTitle(this.title));
    }

    editListTitle(oldTitle) {
        let titleContainer = document.querySelector('#list-title-container');
        let htmlToAdd = 
        `
        <form id="title-form" class="d-flex">
            <input id="list-title-input" class="form-control" type="text" value="${oldTitle}"  aria-label=".form-control-lg" required>
            <button id="title-submit-btn" class="btn btn-outline-dark" type="button">create</button>
        </form>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
        let listTitleField = document.querySelector('#list-title-input');
        
        newList.title = listTitleField.value;

        this.displayListTitle();

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

    getListTotal(){
        this.listTotal = 0;
        this.currentList.forEach(item => {
            this.listTotal = this.listTotal + item.getTotalCost();
        });
    }
}