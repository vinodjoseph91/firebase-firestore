const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");


function renderCafe(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);
    cafeList.appendChild(li);

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
    db.collections('cafes').add({
        name : form.name.value,
        city : form.city.value
    });
})