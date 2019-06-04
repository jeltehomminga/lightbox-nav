//set intial state for browser navigation
let indexState = { navPage: '0' }
navPage = indexState.navPage
title = `index`
path = `/index.html`
history.pushState(indexState, title, path)

//navigate and fetch pages
const navigate = newPage => {
  event.preventDefault()
  if (newPage === '0') closeModal(), (navPage = 0)
  else {
    navPage = newPage && newPage !== '0' ? newPage : navPage === '1' ? '2' : '1'
    fetch(`/pagina${navPage}.html`)
      .then(response => response.text())
      .then(body => {
        document.querySelector('#modalpage').innerHTML = body
        nextPage = navPage === '1' ? '2' : '1'
        document.getElementById('nav-page').innerText = nextPage
        const elCancelButton = document.getElementById('cancel-button')
        navPage === '2'
          ? elCancelButton.classList.add('green-button')
          : elCancelButton.classList.remove('green-button')
      })
    doPushState(navPage)
  }
}

//add state for navigation
const doPushState = navPage => {
  let state = { navPage: navPage },
    title = `pagina${navPage}`,
    path = navPage ? `/pagina${navPage}.html` : `/index.html`
  history.pushState(state, title, path)
}

//navigate with browser buttons
window.addEventListener('popstate', event => navigate(event.state.navPage))

const openModal = () => (
  (document.getElementById('mymodal').style.display = 'block'), navigate()
)

const closeModal = () => {
  document.getElementById('mymodal').style.display = 'none'
  history.pushState(indexState, '', `/index.html`)
}

const toggleDisplay = elId => {
  const el = document.getElementById(elId)
  el.style.display = el.style.display === 'none' ? 'block' : 'none'
}
