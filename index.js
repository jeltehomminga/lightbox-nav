const prefix = '/lightbox-nav'
// const prefix = window.location.origin

//set intial state for browser navigation
let htmlPage1 = ''
let htmlPage2 = ''
let indexState = { navPage: '0' }

navPage = indexState.navPage
let title = `index`
let path = `${prefix}/index.html`
history.pushState(indexState, title, path)

//navigate and fetch pages
const navigate = (newPage, pop) => {
  event.preventDefault()
  if (newPage === '0') closeModal(), (navPage = 0)
  else {
    navPage = newPage ? newPage : navPage === '1' ? '2' : '1'
    nextPage = navPage === '1' ? '2' : '1'
    fetchPage(navPage)
    toggleCancelButton(navPage)
    !pop && doPushState(navPage)
    document.getElementById('nav-page').innerText = nextPage
  }
}

//add state for navigation
const doPushState = navPage => {
  let state = { navPage: navPage },
    title = `pagina${navPage}`,
    path = navPage ? `${prefix}/pagina${navPage}.html` : `/index.html`
  history.pushState(state, title, path)
}

//navigate with browser buttons
window.addEventListener('popstate', event => {
  return navigate(event.state.navPage, true)
})

const openModal = () => (
  (document.getElementById('mymodal').style.display = 'block'), navigate('1')
)

const closeModal = () => {
  document.getElementById('mymodal').style.display = 'none'
  history.pushState(indexState, '', `${prefix}/index.html`)
}

const toggleDisplay = elId => {
  const el = document.getElementById(elId)
  el.style.display = el.style.display === 'none' ? 'block' : 'none'
}

const toggleCancelButton = navPage => {
  const elCancelButton = document.getElementById('cancel-button')
  navPage === '2'
    ? (elCancelButton.classList.add('green-button'),
      elCancelButton.classList.remove('red-button'))
    : (elCancelButton.classList.remove('green-button'),
      elCancelButton.classList.add('red-button'))
}

const fetchPage = navPage => {
  let modalPage = document.querySelector('#modalpage')
  if (navPage === '1' && htmlPage1) modalPage.innerHTML = htmlPage1
  if (navPage === '2' && htmlPage2) modalPage.innerHTML = htmlPage2
  else {
    fetch(`${prefix}/pagina${navPage}.html`)
      .then(response => response.text())
      .then(html => {
        htmlSplit = html.split('article')
        let body = htmlSplit[1].slice(1, htmlSplit[1].length - 2)
        modalPage.innerHTML = body
        if (navPage === '1') {
          htmlPage1 = body
        } else if (navPage === '2') {
          htmlPage2 = body
        }
      })
  }
}
