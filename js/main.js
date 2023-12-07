
function totalCalc() {
  const cartItem = document.querySelectorAll('.cart-item')
  const totalPrice = document.querySelector('.total-price')
  const deliveryCost = document.querySelector('.delivery-cost')
  
  deliveryCost

  let total = 0
  cartItem.forEach (item => {
    let count = item.querySelector('[data-counter]').innerText
    let price = item.querySelector('.price__currency').innerText
    let totalP =parseInt(count) * parseInt(price)
    total += totalP
  })
  totalPrice.innerHTML = total

  console.log(deliveryCost);

  if (total < "600") {
    deliveryCost.innerText = "300₽" 
  } else {
    deliveryCost.innerText = "бесплатно"
  }
}

totalCalc()

const cardWrapper = document.querySelector('.cart-wrapper')

const orderForm = document.querySelector('#order-form')
const alertt = document.querySelector('.alert-secondary')
const btn = document.querySelectorAll('.btn-outline-warning')

window.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'plus') {
        const counterWrapper = event.target.closest('.counter-wrapper')
        const counter = counterWrapper.querySelector('[data-counter]')
        counter.innerHTML = ++counter.innerHTML
        totalCalc() 
    }

    if (event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper')
        const counter = counterWrapper.querySelector('[data-counter]')
        if (parseInt(counter.innerHTML) > 1) {
          counter.innerHTML = --counter.innerHTML
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerHTML) == 1) {
          event.target.closest('.cart-item').remove()
          orderForm.style.display = 'none'
          alertt.style.display = 'block'
        }
        totalCalc() 
    }



    if (event.target.hasAttribute('data-cart')) {
        // console.log('cart btn');
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

        // console.log(cardItem);

        const itemCart = cardWrapper.querySelector(`[data-id="${cardItem.id}"]`)
        
        
        if (itemCart) {
          let counterElem = itemCart.querySelector('[data-counter]')
          counterElem.innerText = parseInt(counterElem.innerText) + parseInt(cardItem.count)
        } else {
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
        }
        
        totalCalc() 
        card.querySelector('[data-counter]').innerText = "1"
        
      }
      
    })
    
  
    
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', () => {        
        orderForm.style.display = 'block'
        alertt.style.display = 'none'
  })
}


