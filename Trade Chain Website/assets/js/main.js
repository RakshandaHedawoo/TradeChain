/*===================CHECKING IF METAMASK IS INSTALLED===========*/
// window.addEventListener('load', function() {
//     if (typeof window.ethereum !== 'undefined') {
//         const web3 = new Web3(window.ethereum);
//         web3.eth.getAccounts()
//             .then(accounts => {
//                 if (accounts.length > 0) {
//                     document.getElementById('walletConnected').style.display = 'inline';
//                     document.getElementById('connectWalletBtn').style.display = 'none';
//                 } else {
//                     document.getElementById('walletConnected').style.display = 'none';
//                     document.getElementById('connectWalletBtn').style.display = 'inline';
//                     setupConnectButton(web3);
//                 }
//             })
//             .catch(error => {
//                 console.error('Failed to get accounts:', error);
//             });
//     } else {
//         alert('Please install MetaMask!');
//     }
// });

/*=================CODE FOR MINTING TOKENS==============*/
// document.getElementById('buyTokenBtn').addEventListener('click', async function() {
//     if (typeof window.ethereum !== 'undefined') {
//         const web3 = new Web3(window.ethereum);

//         try {
//             // New way to request account access (EIP-1102)
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const accounts = await web3.eth.getAccounts();
//             const account = accounts[0];
//             console.log('Connected account:', account);

//             const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
//             const abi = [
//                 {
//                     "constant": false,
//                     "inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
//                     "name": "mint",
//                     "outputs": [],
//                     "payable": false,
//                     "stateMutability": "nonpayable",
//                     "type": "function"
//                 },
//                 {
//                     "constant": true,
//                     "inputs": [],
//                     "name": "decimals",
//                     "outputs": [{"name": "", "type": "uint8"}],
//                     "payable": false,
//                     "stateMutability": "view",
//                     "type": "function"
//                 }
//             ];

//             const contract = new web3.eth.Contract(abi, contractAddress);

//             // Get the amount to buy from the input field
//             const inputAmount = document.getElementById('tokenAmount').value;
//             const amountToBuy = inputAmount ? parseInt(inputAmount) : 0;
//             if (amountToBuy <= 0) {
//                 alert('Please enter a valid token amount.');
//                 return;
//             }

//             const decimals = await contract.methods.decimals().call();
//             const amount = web3.utils.toBN(amountToBuy).mul(web3.utils.toBN(10).pow(web3.utils.toBN(decimals)));

//             // Execute the mint function
//             contract.methods.mint(account, amount.toString()).send({from: account})
//                 .on('transactionHash', hash => {
//                     console.log('Transaction Hash:', hash);
//                     document.getElementById('buyTokenBtn').innerText = 'Transaction Submitted...';
//                 })
//                 .on('receipt', receipt => {
//                     console.log('Receipt:', receipt);
//                     alert('Tokens minted successfully!');
//                     document.getElementById('buyTokenBtn').innerText = 'Buy Tokens';
//                 })
//                 .on('error', (error, receipt) => {
//                     console.error('Error:', error);
//                     alert('Transaction failed!');
//                     document.getElementById('buyTokenBtn').innerText = 'Buy Tokens';
//                 });

//         } catch (error) {
//             console.error('Error connecting to MetaMask:', error);
//             alert('Failed to connect to MetaMask. Please ensure that it is installed and that you are logged in.');
//         }
//     } else {
//         alert('Please install MetaMask!');
//     }
// });

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: 'true',
    spaceBetween: 16,
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`,{interval: 100})
sr.reveal(`.about__data, .discount__img`,{origin: 'left'})
sr.reveal(`.about__img, .discount__data`,{origin: 'right'})
