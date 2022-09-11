const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 10;
playerLivesCount.textContent = playerLives;
const getData = () => [
    { imgSrc: './images/1.png', name: '1' },
    { imgSrc: './images/2.png', name: '2' },
    { imgSrc: './images/3.png', name: '3' },
    { imgSrc: './images/4.png', name: '4' },
    { imgSrc: './images/5.png', name: '5' },
    { imgSrc: './images/6.png', name: '6' },
    { imgSrc: './images/7.png', name: '7' },
    { imgSrc: './images/8.png', name: '8' },
    { imgSrc: './images/9.png', name: '9' },
    { imgSrc: './images/10.png', name: '10' },
    { imgSrc: './images/11.png', name: '11' },
    { imgSrc: './images/12.png', name: '12' },
    { imgSrc: './images/13.png', name: '13' },
    { imgSrc: './images/14.png', name: '14' },
    { imgSrc: './images/15.png', name: '15' },
    { imgSrc: './images/16.png', name: '16' },
    { imgSrc: './images/1.png', name: '1' },
    { imgSrc: './images/2.png', name: '2' },
    { imgSrc: './images/3.png', name: '3' },
    { imgSrc: './images/4.png', name: '4' },
    { imgSrc: './images/5.png', name: '5' },
    { imgSrc: './images/6.png', name: '6' },
    { imgSrc: './images/7.png', name: '7' },
    { imgSrc: './images/8.png', name: '8' },
    { imgSrc: './images/9.png', name: '9' },
    { imgSrc: './images/10.png', name: '10' },
    { imgSrc: './images/11.png', name: '11' },
    { imgSrc: './images/12.png', name: '12' },
    { imgSrc: './images/13.png', name: '13' },
    { imgSrc: './images/14.png', name: '14' },
    { imgSrc: './images/15.png', name: '15' },
    { imgSrc: './images/16.png', name: '16' }
];
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData

}
const cardGenerator = () => {
    const cardData = randomize()
    cardData.forEach((item) => {
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('div')
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'
        face.src = item.imgSrc;
        card.setAttribute('name', item.name)
        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}
const checkCards = (e) => {
    console.log(e)
    const clickedCard = e.target
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('match')
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none'
            })
        } else {
            console.log('worng')
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000)
            })
            playerLives--
            playerLivesCount.textContent = playerLives
            if (playerLives === 0) {
                restart('Failure is a form of education. Try again!')
            }
        }
    }
    if (toggleCard.length === 32) {
        restart('Congratulations you have won!')
    }
}
const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.card')
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard')
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all'
            faces[index].src = item.imgSrc
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = 'all'
        }, 1000)
    })
    playerLives = 10;
    playerLivesCount.textContent = playerLives
    setTimeout(() => Swal.fire({
        text: (text),
        icon: 'info',
        confirmButtonText: 'Ok'
      }), 100)
}
cardGenerator()