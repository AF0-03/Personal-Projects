const modal = document.querySelector(".modal");
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnsCloseModal = document.querySelector('.close-modal');

const openModal = function()
{
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for(let i = 0; i < btnsOpenModal.length; i++)
{
btnsOpenModal[i].addEventListener('click', openModal);
}

btnsCloseModal.addEventListener('click', closeModal);

// When you 
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e)
{
    console.log(e);
    if(e.key === 'Escape' && !modal.classList.contains('hidden'))
    {
        closeModal();
    }
})

