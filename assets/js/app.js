// Section yüksekliğini ayarlama fonksiyonu
function sectionHeight () {
  const total = window.innerHeight
  const sections = document.querySelectorAll('section')

  sections.forEach(section => {
    section.style.height = 'auto'
    const outerHeight =
      section.offsetHeight +
      parseFloat(getComputedStyle(section).marginTop) +
      parseFloat(getComputedStyle(section).marginBottom)

    if (outerHeight < total) {
      const margin = outerHeight - section.offsetHeight
      section.style.height = total - margin - 20 + 'px'
    } else {
      section.style.height = 'auto'
    }
  })
}

// Resize event
window.addEventListener('resize', sectionHeight)

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  const navUl = document.querySelector('nav ul')
  const headers = document.querySelectorAll(
    'section h1, section h2, section h3'
  )

  headers.forEach((header, index) => {
    const id = header.textContent
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    header.id = id

    const li = document.createElement('li')
    li.className = 'tag-' + header.tagName.toLowerCase()

    const a = document.createElement('a')
    a.href = '#' + id
    a.textContent = header.textContent

    li.appendChild(a)
    navUl.appendChild(li)

    if (index === 0) li.classList.add('active')
  })

  // Nav click event
  navUl.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      event.preventDefault()

      const target = document.querySelector(event.target.getAttribute('href'))
      const position =
        target.getBoundingClientRect().top + window.pageYOffset - 190

      window.scrollTo({
        top: position,
        behavior: 'smooth'
      })

      // Active class toggle
      navUl.querySelectorAll('li').forEach(li => li.classList.remove('active'))
      event.target.parentElement.classList.add('active')
    }
  })

  sectionHeight()

  // Image load event
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      sectionHeight()
    } else {
      img.addEventListener('load', sectionHeight)
    }
  })
})
