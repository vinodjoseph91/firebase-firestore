const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");


function renderCafe(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent ='x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    cafeList.appendChild(li);

    // Adding a click event to the cross added above
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        // getting the id of the selected item
        let id = e.target.parentElement.getAttribute('data-id');
        // deleting the value from the firebase db
        db.collection('cafes').doc(id).delete();
    })

}

//method to fetch data from firebase db ='cafes' using .get() => its an async call 
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        // iterating each doc,actual document data can be read using doc.data() method
        renderCafe(doc);
    })
})

//saving data to firebase db
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';
})