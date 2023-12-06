function totalCalc() {
  const cartItem = document.querySelectorAll('.cart-item')
  const totalPrice = document.querySelector('.total-price')
  const free = document.querySelector('.delivery-cost') 



  let total = 0
  cartItem.forEach(item => {
    let count = item.querySelector('[data-counter]').innerText
    let price = item.querySelector('.price__currency').innerText
    let totalP = parseInt(count) * parseInt(price)

    total += totalP
  })

  if (total > 600) {
    free.innerHTML = 'бесплатно'
  }

  totalPrice.innerHTML = total
}





const cardWrapper = document.querySelector('.cart-wrapper')

window.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'plus') {
        const counterWrapper = event.target.closest('.counter-wrapper')
        const counter = counterWrapper.querySelector('[data-counter]')
        counter.innerHTML = ++counter.innerHTML
    }

    if (event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper')
        const counter = counterWrapper.querySelector('[data-counter]')

        if (parseInt(counter.innerHTML) > 1) {
            counter.innerHTML = --counter.innerHTML
        } else {
            counter.innerHTML = '1'
        } 
    }

    totalCalc()



    const alert = document.querySelector('.alert-secondary')
    const orderForm = document.querySelector('#order-form')
    
    
    
    if (event.target.hasAttribute('data-cart')) {
      const card = event.target.closest('.card')
      
      console.log(card);
      
      let cardItem = {
        id: card.dataset.id,
        title: card.querySelector('.item-title').innerHTML,
        itemInBox: card.querySelector('[data-items-in-box]').innerHTML,
        weight: card.querySelector('.price__weight').innerHTML,
        price: card.querySelector('.price__currency').innerHTML,
        img: card.querySelector('.product-img').getAttribute('src'),
        count: card.querySelector('[data-counter]').innerHTML
      }
      
      let itemHTML = `
        <div class="cart-item" data-id="${cardItem.id}">
            <div class="cart-item__top">
            <div class="cart-item__img">
            <img src="${cardItem.img}" alt="" />
            </div>
            <div class="cart-item__desc">
            <div class="cart-item__title">${cardItem.title}</div>
            <div class="cart-item__weight">
                        ${cardItem.itemInBox} / ${cardItem.weight}
                        </div>
                        
                        
                        
                        <!-- cart-item__details -->
                        <div class="cart-item__details">
                        <div class="items items--small counter-wrapper">
                          <div class="items__control" data-action="minus">
                          -
                          </div>
                          <div class="items__current" data-counter>
                            ${cardItem.count}
                          </div>
                          <div class="items__control" data-action="plus">+</div>
                        </div>
                        
                        <div class="price">
                          <div class="price__currency">
                          ${cardItem.price}
                          </div>
                          </div>
                          </div>
                          <!-- // cart-item__details -->
                          </div>
                  </div>
                </div>
        `
        
        cardWrapper.insertAdjacentHTML('beforeend', itemHTML)
        
        
        alert.style.display = 'none'
        orderForm.style.display = 'block'
        
        
      } 

    console.log(event.target);

})
