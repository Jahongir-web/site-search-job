
var $_ = function(selector, node = document){
  return node.querySelector(selector);
};

var $$_ = function(selector, node = document){
  return node.querySelectorAll(selector);
};

var createElement = function (tagName, className, text){
  var element = document.createElement(tagName);
  element.setAttribute(`class`, className);

  if (text) {
    element.textContent = text;
  }

  return element;

};


// Get the current year for the copyright
$('#year').text(new Date().getFullYear());




// Sayt temasini o'zgartirish
var elThemeBtn = $_(`.theme-btn`);

var theme = localStorage.getItem(`theme`) || `light`;

if(theme === `dark`){
  document.body.classList.add(`body-dark`);
  elThemeBtn.textContent = `Kunduzgi rejim`;
} else if (theme === `light`){
  document.body.classList.remove(`body-dark`);
}

elThemeBtn.addEventListener(`click`, function(){
  if(theme ===`dark`){
    theme = `light`;
    document.body.classList.remove(`body-dark`);
    elThemeBtn.textContent = `Tungi rejim`;
    localStorage.setItem(`theme`, theme);
  }
  else if (theme === `light`){
    theme = `dark`;
    document.body.classList.add(`body-dark`);
    elThemeBtn.textContent = `Kunduzgi rejim`;
    localStorage.setItem(`theme`, theme);
  }
});


// Asosiy qism fetch bilan ishlash

var elSearchForm = $_(`.js-search-form`);
var elSearchInput = $_(`.js-search-tech`);
var elLocationInput = $_(`.js-search-location`);
var elResultList = $_(`.jobs-list`);
var elJobTemplate = $_(`.template-job`).content;


if(elSearchForm){

  elSearchForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    console.log(`hihi`);

    fetch(`https://jobs.github.com/positions.json?description=javascript&full_time=true&location=`)
   .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    })
    .then(natija => {
    console.log(natija);

    let resultFragment = document.createDocumentFragment();

    natija.forEach(element => {
      let elJobItem = elJobTemplate.cloneNode(true);

      elJobItem.querySelector(`.description`).href = element.url;
      elJobItem.querySelector(`.company-img`).src = element.company_logo;
      elJobItem.querySelector(`.company-name-job`).textContent = element.company;
      elJobItem.querySelector(`.title-job`).textContent = element.title;
      elJobItem.querySelector(`.location-job`).textContent = element.location;
      elJobItem.querySelector(`.work-time-job`).textContent = element.type;

      resultFragment.appendChild(elJobItem);

    });

    elResultList.appendChild(resultFragment);

    })
  })

}

{/* <a href="/" class="description text-decoration-none text-center d-inline-block">
          <p class="d-flex align-items-baseline justify-content-between">Company: <img class="rounded-2 ml-2" src="./img/logo.png" alt="logo company" width="50" height="50"> <span class="company-name-job ml-2"> azeti GmbH</span></p>
          <p class="title-job h6 text-center">Fullstack Entwickler (React & Kolin/Java) - azeti IoT platform</p>
          <p class="d-flex align-items-baseline justify-content-center"><img src="./img/location.png" alt="location icon" width="20" height="20"> Location: <span class="location-job ml-2">Berlin</span></p>
          <p>Type: <span class="work-time-job">Full Time</span></p>
        </a> */}