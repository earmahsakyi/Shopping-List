const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList  = document.querySelector('#item-list');
const clearBtn  = document.querySelector('#clear');
const filter = document.querySelector('#filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

const displayItems = () => {
    const itemFromStorage = getItemsFromStorage();
    itemFromStorage.forEach( item => addItemToDom(item));
    checkUI();
}


const addItem = e => {
    e.preventDefault();
    const newitem = itemInput.value;
    // form validation
    if (newitem === ''){
        alert('Please enter an item')
        return;
    }

    // check for editmode 
    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStore(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode =false;
    }else {
        if (ifitemExists(newitem)){
            alert('That Item Already exits')
            return;
        }
    }


    addItemToDom(newitem);
     // add li to th e Dom

     //add item to localStorage
     addItemToStorge(newitem);
    checkUI();

    itemInput.value = '';

    //console.log(li);
    
}

const addItemToDom = (item) => {
    //create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
     const button = createButton('remove-item btn-link text-red')
     li.appendChild(button);
    
     itemList.appendChild(li);
}

const getItemsFromStorage = (item) => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
   return itemsFromStorage;
}


const addItemToStorge = (item) => {
    const itemsFromStorage = getItemsFromStorage()

   
    // Add new item to array
    itemsFromStorage.push(item);

    //convert to JSON string and seet to localSotrage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}


const createButton = (bClass) => {
    const button = document.createElement('button');
    button.className = bClass;
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark'
    button.appendChild(icon);
    return button;
}

const onClickItem = e => {
    const del = e.target.parentElement.classList.contains('remove-item')
    if (del){
        removeItem(e.target.parentElement.parentElement);
    }else {
        setItemToEdit(e.target)

    }
}

const setItemToEdit = item => {
    isEditMode = true;
    
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

    item.classList.add ('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Upadte Item';
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}

const removeItem = (item)  => {
    if (confirm('Are you sure ?') ){
        //Remove item from DOM
        item.remove();
    
        //remove Item from storage
        removeItemFromStore(item.textContent)

         checkUI();
    }
    

}

const removeItemFromStore = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    //filter items to be removed 

    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    // reset to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

} 

const onClear = e => {

    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        
    }
    localStorage.removeItem('items')
    checkUI();
}
const ifitemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);

}

const onFilter = e => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1){
            item.style.display = 'flex'
        }else{
            item.style.display = 'none'
        }
    })
    //console.log(text)
  

}
const checkUI = () => {
    itemInput.value ='';
    const items = itemList.querySelectorAll('li');
    
    if (items.length ===  0) {
        clearBtn.style.display = 'none';
        filter.style.display = 'none';
    }else {
        clearBtn.style.display = 'block';
        filter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'
    isEditMode = false;
}

const init = () => {
   //events Listeners
itemForm.addEventListener('submit' ,addItem);
itemList.addEventListener('click' ,onClickItem);
clearBtn.addEventListener('click', onClear)
filter.addEventListener('input', onFilter);
document.addEventListener('DOMContentLoaded',displayItems)

checkUI(); 
}

init();
