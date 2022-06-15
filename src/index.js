// import cards from './partials/cards'
import PhotoApiService from './partials/api'
// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form')
const loadMoreBtn = document.querySelector('.load-more')
const galleryContainer = document.querySelector('.gallery')
 
const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoad);

function onSearch(e) {
    e.preventDefault();
    

    photoApiService.query = e.currentTarget.elements.searchQuery.value;

    if (photoApiService.query === '') {
         Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }
    photoApiService.resetPage();
    photoApiService.fetchPhotos().then(hits => {
        console.log(createGalleryItemMarkup);
        clearGalleryItemMarkup();
        createGalleryItemMarkup(hits);
    });
}

function onLoad() {
photoApiService.fetchPhotos().then(hits => console.log(hits));
}

// function createGalleryItemMarkup() {
//     // galleryContainer.insertAdjacentHTML('beforeend', cardTemplate(hits));
// galleryContainer.insertAdjacentHTML('afterbegin', itemsMarkup);
// }

// const itemsMarkup = createGalleryItemMarkup(hits);

// console.log(createGalleryItemMarkup(hits));

 function createGalleryItemMarkup({largeImageURL, tags, likes, views, comments, downloads}) {
    const card = document.createElement("div");
    card.classList.add("photo-card");
    card.innerHTML = `<div class="img"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></div>
  <div class="info">
    <p class="info-item">
      <b>Likes:<br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:<br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:<br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:<br>${downloads}</b>
    </p>
  </div>`;
    galleryContainer.append(card);
}

// function createGalleryItemMarkup(hits) {
//     return hits.map(({ largeImageURL, tags, likes, views, comments, downloads }) => {
//         const card = document.createElement("div");
//         card.classList.add("photo-card");
//         return card.innerHTML = `
//   <div class="img"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></div>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:<br>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:<br>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments:<br>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:<br>${downloads}</b>
//     </p>
//   </div>`;
//         galleryContainer.append(card);
//     });
    
// }


// new SimpleLightbox('.gallery .photo-card a', { captionDelay: 250, captionsData: "alt"});
// console.log(hits);

function clearGalleryItemMarkup() {
    galleryContainer.innerHTML = '';
}





