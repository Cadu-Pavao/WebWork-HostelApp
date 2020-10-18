//Guest class
class Guest {
    constructor(id, name, last_name, email, address, country, state, phone) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.address = address;
        this.country = country;
        this.state = state;
        this.phone = phone;
    }
}

//UI class
class UI {
    static displayGuests() {
        const guests = Store.getGuests();
        guests.forEach((guest) => UI.addGuestToList(guest));
    }

    static addGuestToList(guest) {
        const list = document.querySelector('#guest-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.name}</td>
            <td>${guest.last_name}</td>
            <td>${guest.email}</td>
            <td>${guest.address}</td>
            <td>${guest.country}</td>
            <td>${guest.state}</td>
            <td>${guest.phone}</td>
            <td><a href="#" class="delete">x</a></td>
        `;

        list.appendChild(row);
    }

    static deleteGuest(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#guest-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#last_name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#country').value = '';
        document.querySelector('#state').value = '';
        document.querySelector('#phone').value = '';
    }
}

//Store class
class Store {
    static getGuests(){
        let guests;
        if(localStorage.getItem('guests') === null){
            guests = [];
        }else{
            guests = JSON.parse(localStorage.getItem('guests'));
        }

        return guests;
    }

    static addGuest(guest){
        const guests = Store.getGuests();
        guests.push(guest);

        localStorage.setItem('guests', JSON.stringify(guests));
    }

    static removeGuest(id){
        const guests = Store.getGuests();

        guests.forEach((guest, index) => {
            if(guest.id === id) {
                guests.splice(index, 1);
            }
        });

        localStorage.setItem('guests', JSON.stringify(guests));

    }
}

//Event Display
document.addEventListener('DOMContentLoaded', UI.displayGuests);

//Event create
document.querySelector('#guest-form').addEventListener('submit', (e) => {
    //prevent default
    e.preventDefault();

    // Get form Values
    const id = document.querySelector('#id').value;
    const name = document.querySelector('#name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const address = document.querySelector('#address').value;
    const country = document.querySelector('#country').value;
    const state = document.querySelector('#state').value;
    const phone = document.querySelector('#phone').value;

    //Validate
    if (id === '' || last_name === '' || name === '') {
        UI.showAlert('Por favor preencha todos os campos!', 'danger');
    } else {
        //Instanciar livros
        const guest = new Guest(id, name, last_name, email, address, country, state, phone);

        //Adicionar Hóspede na interface
        UI.addGuestToList(guest);

        //Adiciona hospede no armazenamento
        Store.addGuest(guest);

        //limpar os campos
        UI.clearFields();
    }
});

//Event delete
document.querySelector('#guest-list').addEventListener('click', (e) => {
    //Remove da interface
    UI.deleteGuest(e.target)

    //Remove do armazenamento
    Store.removeGuest(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

//Collapse Add button
