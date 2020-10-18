//Guest class
class Guest {
    constructor(id, stats, name, last_name, email, phone) {
        this.id = id;
        this.stats = stats;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;

    }
}

//UI class
class UI {
    static displayGuests() {
        /***const storedGuest = [
            {
                id: '1',
                stats: 'check-in',
                name: 'Carlos',
            }
        ];

        const guests = storedGuest;**/
        const guests = Store.getGuests();
        guests.forEach((guest) => UI.addGuestToList(guest));
    }

    static addGuestToList(guest) {
        const list = document.querySelector('#guest-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${guest.id}</td>
            <td>${guest.stats}</td>
            <td>${guest.name}</td>
            <td>${guest.last_name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td><a href="#" class="delete">delete</a></td>
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
        document.querySelector('#stats').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#last_name').value = '';
        document.querySelector('#email').value = '';
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
    const stats = document.querySelector('#stats').value;
    const name = document.querySelector('#name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    //Validate
    if (id === '' || stats === '' || name === '') {
        UI.showAlert('Por favor preencha todos os campos!', 'danger');
    } else {
        //Instanciar livros
        const guest = new Guest(id, stats, name, last_name, email, phone);

        //Adicionar Hóspede na interface
        UI.addGuestToList(guest);

        //Adiciona hospede no armazenamento
        Store.addGuest(guest);

        //limpar os campos
        UI.clearFields();
    }
});

//Evente delete
document.querySelector('#guest-list').addEventListener('click', (e) => {
    //Remove da interface
    UI.deleteGuest(e.target)

    //Remove do armazenamento
    Store.removeGuest(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
});

//Collapse Add button
