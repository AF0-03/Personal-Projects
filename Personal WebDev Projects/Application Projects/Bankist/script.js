// BANKEST APPLICATION
////////////////////////////////////////////////////////////////////////
// Data
const account1 = {
    owner: 'Jonas Schemedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -410, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -400],
    interestRate: 0.7,
    pin: 3333
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444
};

const accounts = [account1, account2, account3, account4];
////////////////////////////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.data');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
////////////////////////////////////////////////////////////////////////
// Functions
const displayMovements = function(movements, sort = false)
{
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `<div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i +1} ${type}€</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}


const calcdisplayBalance = function(acc)
{
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `€${acc.balance}`;
};


const calcDisplaySummary = function(acc)
{
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `€${incomes}`;

    const out = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `€${out}`;

    const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `€${interest}`;
};

const createUsername = function(accs)
{
    accs.forEach(function(acc)
    {
        acc.username = acc.owner.toLowerCase()
        .split(' ')
        .map(name => name[0]).join('');
    });
}

createUsername(accounts);

const updateUI = function(acc)
{
    displayMovements(acc.movements);

    calcdisplayBalance(acc);

    calcDisplaySummary(acc);

    createUsername(acc);
};

////////////////////////////////////////////////////////////////////////
// Event Listeners

let currentAccount;

btnLogin.addEventListener('click', function(e)
{
    // Prevent form from submitting
    e.preventDefault();
    
    currentAccount = accounts.find(acc => acc.username == inputLoginUsername.value);

    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value))
        {
            // Display the UI and welcome message
            labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`; 
            
            containerApp.style.opacity = 1;

            // Clear input fields
            inputLoginUsername.value = inputLoginPin.value = '';

            updateUI(currentAccount);
        }
});

btnTransfer.addEventListener('click', function(e)
{
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);

    let recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

    if(amount > 0 && recieverAccount && currentAccount.balance >= amount && recieverAccount.username !== currentAccount.username)
    {
         currentAccount.movements.push(-amount);
         recieverAccount.movements.push(amount);

         updateUI(currentAccount);
    }

    // Clear inputs
    inputTransferTo.value = inputTransferAmount.value = '';
})

btnLoan.addEventListener('click', function(e)
{
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if(amount > 0)
        {
            currentAccount.movements.push(amount);

            updateUI(currentAccount);
        }

    inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e)
{
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

btnClose.addEventListener('click', function(e)
{
    e.preventDefault();

    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)
    {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        console.log(index);


        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }

    inputCloseUsername.value = inputClosePin.value = '';
})