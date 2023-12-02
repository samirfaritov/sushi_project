window.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'plus') {
        const counterWrapper = event.target.closest(".counter-wrapper")
        const counter = counterWrapper.querySelector('[data-counter]')
        counter.innerHTML++
    }
    if (event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest(".counter-wrapper")
        const counter = counterWrapper.querySelector('[data-counter]')
        counter.innerHTML--
        if (counter.innerHTML < 1) {
            counter.innerHTML = '1'
        }
    }
})
