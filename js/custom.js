let data = [
    {
        name: 'Old Portfolio',
        nish: 'development',
        type: 'Web Design',
        link: 'https://saadh393.github.io/saadhasan-s-portfolio/index.html',
        tech : ['HTML', 'CSS'],
        logo : 'logourl',
        background: 'img/portfolio/old-portfolio.jpg',
        description : 'This is my old portfolio site. I used raw html and css to buildup this one' 
    },
    {
        name: 'Notify Me',
        nish: 'development',
        type: 'Android App',
        link: 'https://apkpure.com/notify-me-notes-notepad-todo-reminder-app/com.weblywork.notifyme',
        tech : ['Android', 'Java', 'Firebase', 'Retrofit', 'RoomDB'],
        logo : 'logourl',
        background: 'img/portfolio/notify-me.jpg',
        description : 'Notify Me is a simple notepad app. Which contains users note. You can add schedule reminder if it\'s necessary' 
    },
    {
        name: 'MovieWall',
        nish: 'development',
        type: 'Android App',
        link: 'https://play.google.com/store/apps/details?id=com.wwinc.MovieWall',
        tech : ['Android', 'Kotlin', 'Firebase', 'Retrofit'],
        logo : 'logourl',
        background: 'img/portfolio/movie-wall.jpg',
        description : 'It\'s an Wallpaper app. There a admin panel where admins able to add new wallpapers. This app fetch wallpapers from custom build api and immediately show in the app. It will fetch new data only once in a day to prevent dataloss.' 
    },
    {
        name: 'Love Bites',
        nish: 'development',
        type: 'Android App',
        link: 'https://apkpure.com/valentines-day-love-romantic-sms-love-bites/com.weblyworkgroup.lovebites',
        tech : ['Android', 'Java', 'SQLite'],
        logo : 'logourl',
        background: 'img/portfolio/love-bites.jpg',
        description : 'This one is very simple app. It contains a huge collection of Valentines sms quotes. User can send the quotes or message through sms as Text or as Image' 
    },
    {
        name: 'Nick Shoes',
        nish: 'development',
        type: 'Android App',
        link: 'https://saadh393.github.io/nick-shoes/index.html',
        tech : ['HTML', 'BOOTSTRAP', 'CSS'],
        logo : 'logourl',
        background: 'img/portfolio/nick-shoes.jpg',
        description : 'Nick Shoes is imaginary shop of shoes. This site is build to practice Bootstrap. There is no Javascript or any fancy thing. ' 
    },
    {
        name: 'Corona Update Notifier',
        nish: 'development',
        type: 'Python Project',
        link: 'https://github.com/saadh393/Cyber-71-Corona-Update',
        tech : ['Python', 'ImagePIL', 'requests', 'smtplib'],
        logo : 'logourl',
        background: 'img/portfolio/corona-update.jpg',
        description : 'It\'s my simple project by Python to generate daily corona report of Bangladesh. After publishing new data on the web it fetch the data and generate an Image which we can share on Social Media. And Also There is a email functionality.' 
    },
    {
        name: 'Loruki',
        nish: 'development',
        type: 'Responsive Web Design',
        link: 'https://hardcore-goldwasser-fa1ac6.netlify.app/',
        tech : ['HTML', 'CSS'],
        logo : 'logourl',
        background: 'img/portfolio/loruki.jpg',
        description : 'It\'s  a imaginary Hosting reseller site. Made for practicing Grid And Flex Layout.' 
    },
    {
        name: 'Meme Generator',
        nish: 'development',
        type: 'Android App',
        link: '#',
        tech : ['HTML', 'CSS', 'js', 'java', 'xml'],
        logo : 'logourl',
        background: 'img/portfolio/meme-generator.jpg',
        description : 'This is underdeveloped project. And This gonna be like a social media for Memers. The above image is the only part of the Meme Editor section' 
    }

    
]

data.forEach((project) => {
    const rootLi = document.createElement('li');
    const divImageHolder = document.createElement('div');
    const img = document.createElement('img');
    const technologies = document.createElement('div');
    const techUL = document.createElement('ul');
    const titleH5 = document.createElement('h5');
    const descriptionP = document.createElement('p');
    const aLink = document.createElement('a')
    
    // Defining Classes
    rootLi.className = 'design swiper-slide card';
    divImageHolder.className = 'imageHolder';
    img.src = project.background;
    technologies.id = 'technologies';
    titleH5.id = 'portfolio-title';
    descriptionP.id = 'portfolio-description';
    aLink.target = '_blank';
    aLink.href = project.link;

    // Setting Values

    project.tech.forEach((tech) => {    // Adding Tech
        const techLI = document.createElement('li');
        techLI.innerText = tech;
        techUL.appendChild(techLI);
    });

    titleH5.innerText = project.name;
    descriptionP.innerText = project.description;

    // Apeending Process
    technologies.appendChild(techUL);
    divImageHolder.appendChild(img)
    aLink.appendChild(titleH5)
    rootLi.appendChild(divImageHolder)
    rootLi.appendChild(technologies)
    rootLi.appendChild(aLink)
    rootLi.appendChild(descriptionP)
    document.getElementById('projectContainer').appendChild(rootLi)

});