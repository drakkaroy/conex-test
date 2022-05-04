(() => {

    const usersApiUrl = 'https://61435a41c5b553001717cf2f.mockapi.io/api/challenge/jobs/';

    const cardsRequest = async () => {
    
            let url = usersApiUrl;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if(response.ok){
                    const responseJson = await response.json();
                    return responseJson;
                }
                
            } catch (error) {
                return { error, success: 'false' }
            }
    };

    const alertWindow = (event) => {
        const card = event.target.parentNode;
        const message = card.querySelector('.card__position').textContent;
        alert(message);
    }

    const setCards = async () => {

        let items = [];
        const results = await cardsRequest();
        if (results) {
            items = results;
        }
        const list = document.querySelector('.card-list');

        const cards = items.map(item => {
            return `
                <div class="card">
                    <div class="card__location">${item.location}</div>
                    <div class="card__position">${item.job}</div>
                    <button class="card__button" id="${item.id}">Apply</button>
                </div>
            `;
        });

        list.innerHTML = cards.join('');
        const loadedCards = document.querySelectorAll('.card');
        loadedCards.forEach(card => {
            const btn = card.querySelector('.card__button');
            btn.addEventListener('click', (e) => alertWindow(e));
        });

    };

    setCards();

})();