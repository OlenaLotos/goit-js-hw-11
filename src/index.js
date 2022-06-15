import PhotoApiService from './partials/api'
// import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form')
const loadMoreBtn = document.querySelector('.load-more')
const galleryContainer = document.querySelector('.gallery')
const photoCard = document.querySelector(".photo-card")
 
const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoad);

function onSearch(e) {
  e.preventDefault();
    
  photoApiService.query = e.currentTarget.elements.searchQuery.value;
  
 if (photoApiService.query === '' ) {
   return Notify.info('Please, fill in the search field and try again.');
   
 }
      if (photoApiService.query.value === 0) {
      return   Notify.info('Sorry, there are no images matching your search query. Please try again.');
      }
  
  else  {
         Notify.info('Hooray! We found ${totalHits} images.');
  }
 
    photoApiService.resetPage();
    photoApiService.fetchPhotos().then(hits => {
        console.log(createGalleryItemMarkup);
        clearGalleryItemMarkup();
         hits.forEach(item => createGalleryItemMarkup(item))
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

// function createGalleryItemMarkup(hits) {
//     hits.map(({ largeImageURL, tags, likes, views, comments, downloads }) => {
//         const card = document.createElement("div");
//         card.classList.add("photo-card");
//       card.innerHTML = `<div class="img-container">
//         <a class="gallery__item" href="${largeImageURL}">
//         <img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></a></div>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:</b>
//       ${likes}
//     </p>
//     <p class="info-item">
//       <b>Views:</b>
//       ${views}
//     </p>
//     <p class="info-item">
//       <b>Comments:</b>
//       ${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads:</b>
//       ${downloads}
//     </p>
//   </div>`
//     }).join('');
//     galleryContainer.append(card);
// }

function createGalleryItemMarkup({ largeImageURL, tags, likes, views, comments, downloads }) {
    const card = document.createElement("div");
    card.classList.add("photo-card");
    card.innerHTML = `<div class="img-container"><a class="gallery__item" href="${largeImageURL}"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>`;
  galleryContainer.append(card);
  
}


galleryContainer.addEventListener("click", onImageClick);

function onImageClick(e) {
  e.preventDefault();
  let galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
  console.log(galleryCard); 
}

function clearGalleryItemMarkup() {
    galleryContainer.innerHTML = '';
}





