let projectsArr = [
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: '#',
        logo : 'logourl',
        background: 'img/portfolio/1.jpg',
    },
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: '#',
        logo : 'logourl',
        background: 'img/portfolio/1.jpg',
    },
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: '#',
        logo : 'logourl',
        background: 'img/portfolio/1.jpg',
    },
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: '#',
        logo : 'logourl',
        background: 'img/portfolio/1.jpg',
    },
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: '#',
        logo : 'logourl',
        background: 'img/portfolio/1.jpg',
    },

    
]

let allProjectsList = document.getElementById('allProjectsList');



for (let i = 0; i < projectsArr.length; i++) {
    
    let li = document.createElement('li');
    let divEntry = document.createElement('div')
    let a = document.createElement('a');
    let overlay = document.createElement('div');
    let img = document.createElement('img');
    let divArlo = document.createElement('div');

    // Default Attributes 
    divEntry.setAttribute('class', 'entry arlo_tm_portfolio_animation_wrap');
    a.setAttribute('target', '_blank');
    overlay.className = 'overlay';
    img.src = 'img/portfolio/600x600.jpg';
    divArlo.className = 'arlo_tm_portfolio_image_main';

    const obj = projectsArr[i];
    li.className = obj.nish;
    a.href = obj.link;
    divArlo.setAttribute('data-img-url', obj.background)

    a.append(overlay);
    a.append(img)
    a.append(divArlo)

    divEntry.append(a)
    li.append(divEntry)
    // allProjectsList.append(li)

}

