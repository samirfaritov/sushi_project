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



const cartWrapper = document.querySelector('.cart-wrapper')

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
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerHTML) == 1) {
          event.target.closest('.cart-item').remove()
        }
      }
      totalCalc()



    if (event.target.hasAttribute('data-cart')) {
        const card = event.target.closest('.card')
        

        let cartItem = {
            id: card.dataset.id,
            title: card.querySelector('.item-title').innerHTML,
            itemInBox: card.querySelector('[data-items-in-box]').innerHTML,
            weight: card.querySelector('.price__weight').innerHTML,
            price: card.querySelector('.price__currency').innerHTML,
            img: card.querySelector('.product-img').getAttribute('src'),
            count: card.querySelector('[data-counter]').innerHTML
        }

        const itemCart = cartWrapper.querySelector(`[data-id="${cartItem.id}"]`)

        if (itemCart) {
          let counterElem = itemCart.querySelector('[data-counter]')
          counterElem.innerHTML = parseInt(counterElem.innerHTML) + parseInt(cartItem.count)
        } else {
          let itemHtml = `
          <div class="cart-item" data-id="${cartItem.id}">
          <div class="cart-item__top">
            <div class="cart-item__img">
              <img src="${cartItem.img}" alt="" />
            </div>
            <div class="cart-item__desc">
              <div class="cart-item__title">Филадельфия</div>
              <div class="cart-item__weight">
                ${cartItem.itemInBox} / ${cartItem.weight}
              </div>
  
              <!-- cart-item__details -->
              <div class="cart-item__details">
                <div class="items items--small counter-wrapper">
                  <div class="items__control" data-action="minus">
                    -
                  </div>
                  <div class="items__current" data-counter="">
                    ${cartItem.count}
                  </div>
                  <div class="items__control" data-action="plus">+</div>
                </div>
  
                <div class="price">
                  <div class="price__currency">
                    ${cartItem.price}
                  </div>
                </div>
              </div>
          `
  
          cartWrapper.insertAdjacentHTML('beforeend', itemHtml)
          card.querySelector('[data-counter]').innerHTML = '1'
        }
        totalCalc()
        }

})
