const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList  = document.querySelector('#item-list');

const addItem = e => {
    e.preventDefault();
    const newitem = itemInput.value;
    // form validation
    if (newitem === ''){
        alert('Please enter an item')
    }
    //create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newitem));
     const button = createButton('remove-item btn-link text-red')
     li.appendChild(button);
    
     itemList.appendChild(li);

    itemInput.value = '';

    console.log(li);
    
}
const createButton = (bClass) => {
    const button = document.createElement('button');
    button.className = bClass;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark'
    button.appendChild(icon);
    return button;
}


//events Listeners
itemForm.addEventListener('submit' ,addItem);