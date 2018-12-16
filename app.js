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
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         // iterating each doc,actual document data can be read using doc.data() method
//         renderCafe(doc);
//     })
// })

// queries with where clause based on different conditions
//where('city','<','t'), where('city','>','t') etc
// db.collection('cafes').where('city','==','bangalore').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         // iterating each doc,actual document data can be read using doc.data() method
//         renderCafe(doc);
//     })
// })

// queries with orderby clause
// db.collection('cafes').orderBy('city').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         // iterating each doc,actual document data can be read using doc.data() method
//         renderCafe(doc);
//     })
// })

// queries with orderby clause and where clause ( for this query we need to enable indexing for the db)
// db.collection('cafes').where('city','==','bangalore').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         // iterating each doc,actual document data can be read using doc.data() method
//         renderCafe(doc);
//     })
// })
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


// Real time data management using onSnapshot()

db.collection('cafes').orderBy('city').onSnapshot(snapshot=>{
    // snapshot.docChanges() gets the docs with events described like added, removed.
    let changes = snapshot.docChanges();
    changes.forEach((change)=>{
        if(change.type == 'added'){
            renderCafe(change.doc);
        }
        else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id='+change.doc.id+']');
            cafeList.removeChild(li);
        }
    })
})