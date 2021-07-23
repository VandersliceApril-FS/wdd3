class List{
    constructor(t){
        this.title = t;
        this.items = [];
        this.listTotal;
    }

    createList(){
        let newList = new List();
        newList.title = document.querySelector('#list-title-input').value;
        this.displayListTitle(newList.title);
    }

    displayListTitle(title){
        let titleContainer = document.querySelector('#list-title-container');
        titleContainer.innerHTML = "";
        let htmlToAdd = 
        `
            <h1 id="list-title" class="col">${title}</h1>
            <button id="title-submit-btn" class="col-3 btn btn-outline-dark btn-sm" type="button">Edit</button>
        `
        titleContainer.insertAdjacentHTML('afterbegin', htmlToAdd);
    }

    displayListItems(arr){
        // reset list container to avoid duplicates
        this.resetHTML(this.listContainer);
        
        // loop through the array and display each item in the html
        arr.forEach(item => {
        let htmlToAdd = 
        `
        <li class="list-group-item">
            <div class="row">
                <p  class="col">${item.name}</p>
                <p class="col total">$ ${item.cost}</p>
            </div>
            <p>${item.store}</p>
        
            <p class="col">Qty: ${item.quantity}</p>
            <button class="btn btn-sm btn-outline-secondary col-3" id="more">...</button>
        </li>
        `;
        this.listContainer.insertAdjacentHTML('afterbegin', htmlToAdd);    
        }); 
    }
}