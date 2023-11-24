var tracker = 1000;

const loadAllData = () => {
    tracker = 1000;
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
loadAllData();
const loadMusicData = () => {
    tracker = 1001;
    fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const loadComedyData = () => {
    tracker = 1003;
    fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};
const loadDrawingData = () => {
    tracker = 1005;
    fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};


const sortByViews = () => {
    console.log(tracker);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${tracker}`)
    .then((res) => res.json())
    .then((data) => {
        data.data.sort(function(a, b) {
            var viewsA = parseInt(a.others.views);
            var viewsB = parseInt(b.others.views);

            return viewsB - viewsA; 
        });

        displayData(data.data);
    });
};


const displayData = (data) => {
    console.log(data);
    // console.log(data.length);
    const dataContainer = document.getElementById('data-container');
    if(data.length == 0){
        while(dataContainer.firstElementChild) dataContainer.removeChild(dataContainer.firstElementChild);
        const card = document.createElement('div');
        card.innerHTML =`
            <div class="error text-center mt-5 pt-5">
                <img class="img-fluid" src="./resources/Icon.png" alt="error icon">
                <h1 class="fw-bold mt-3">Oops!! Sorry, There is no <br>Content here</h1>
            </div>
        `;
        dataContainer.appendChild(card);
        return"";
    };
    while(dataContainer.firstElementChild) dataContainer.removeChild(dataContainer.firstElementChild);
    data.forEach((video) => {
        const card = document.createElement('div');
        card.className = "card-display-style col-md-4";
        card.innerHTML = `
            <div class="card-deck">
                <img class="card-img-top" src="${video.thumbnail}" alt="Card image cap">
                <p class="duration text-center">${secondsToHMS(video.others.posted_date)}</p>
                <div class="card-body">
                    <div class="d-flex align-items-start ">
                        <img src="${video.authors[0].profile_picture}" alt="" class="author-photo me-3">
                        <div class="card-details">
                        <h3 class="card-title">${video.title}</h3>
                        <p class="author-name ">${video.authors[0].profile_name} <img class="blue-badge" src="${verified(video.authors[0].verified)}" alt=""></p>
                        <p class="views">${video.others.views} views</p>
                    </div>
                    </div>
                </div>
            </div>
            `;
        dataContainer.appendChild(card);
    });
};

// Duration Calculation
function secondsToHMS(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30); // Assuming an average month length of 30 days
    const remainingDays = days % 30;
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if(years != 0) {
        return `${years}years ${months}months ${remainingDays} days ${hours} hrs ${minutes} min ago`;
    }
    if(months != 0) {
        return `${months}months ${remainingDays} days ${hours} hrs ${minutes} min ago`;
    }
    if(remainingDays != 0) {
        return `${remainingDays} days ${hours} hrs ${minutes} min ago`;
    }
    if (hours != 0){
        return `${hours} hrs ${minutes} min ago`;
    }
    if(minutes != 0){
        return `${minutes} min ago`;
    }
    return "";
};

// Verification Function
function verified(flag){
    if(flag) return `./resources/fi_10629607.svg`;
    return '';
};

//Change Button Color
const btn = document.querySelectorAll('.btn-secondary');
btn.forEach(btnEL => {
    btnEL.addEventListener('click', () => {
        document.querySelector('.special')?.classList.remove('special');
        btnEL.classList.add('special');
    });
});



// 

// {
//     "category_id": "1001",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     }
// }