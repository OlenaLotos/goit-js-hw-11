import PhotoApiService from './partials/api'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    loadBtn: document.querySelector(".load-more")
}
const photoApiService = new PhotoApiService();

refs.form.addEventListener("submit", onSearch);
refs.gallery.addEventListener("click", onImageClick);
refs.loadBtn.addEventListener("click", onLoadMore);

function onSearch(e) {
  e.preventDefault();
  
  photoApiService.query = e.currentTarget.elements.searchQuery.value;
  photoApiService.resetPage();
  refs.gallery.innerHTML = "";
  console.log(photoApiService.query);  
  photoApiService.fetchPhotos()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
      }
      if (photoApiService.query === '' ) {
   return Notify.warning('Please, fill in the search field and try again.');
    }
      
      else {
        data.hits.forEach(createGalleryItemMarkup);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    
    })
    .catch(error => console.log(error))
}
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
  refs.gallery.append(card);
  
}

function onImageClick(e) {
  e.preventDefault();
  
  let galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
  // galleryCard.refresh();
}
function onLoadMore(e) {
  e.preventDefault();
photoApiService.fetchPhotos().then(data => {
  if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        return;
      }
      if (photoApiService.query === '' ) {
   return Notify.warning('Please, fill in the search field and try again.');
    }
      
      else {
        data.hits.forEach(createGalleryItemMarkup);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error));
}







// import PhotoApiService from './partials/api'
// import axios from "axios";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const searchForm = document.querySelector('.search-form')
// const loadMoreBtn = document.querySelector('.load-more')
// const galleryContainer = document.querySelector('.gallery')
// const photoCard = document.querySelector(".photo-card")
 

// const photoApiService = new PhotoApiService();

// searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoad);

// function onSearch(e) {
//   e.preventDefault();
    
//   photoApiService.query = e.currentTarget.elements.searchQuery.value;
  
//  if (photoApiService.query === '' ) {
//    return Notify.info('Please, fill in the search field and try again.');
   
//  }
//       // if (photoApiService.query.value === 0) {
//       // return   Notify.info('Sorry, there are no images matching your search query. Please try again.');
//       // }
  
//   else  {
//          Notify.info('Hooray! We found ${totalHits} images.');
//   }
 
//     photoApiService.resetPage();
//     photoApiService.fetchPhotos().then(hits => {
//         console.log(createGalleryItemMarkup);
//         clearGalleryItemMarkup();
//          hits.forEach(item => createGalleryItemMarkup(item))
//     });
// }

// // function onLoad() {
// // photoApiService.fetchPhotos().then(hits => console.log(hits));
// // }

// function onLoad() {
//   photoApiService.fetchPhotos().then(hits => {
//     console.log(createGalleryItemMarkup);
//         clearGalleryItemMarkup();
//          hits.forEach(item => createGalleryItemMarkup(item))
//     })
// }

// function createGalleryItemMarkup({ largeImageURL, tags, likes, views, comments, downloads }) {
//     const card = document.createElement("div");
//     card.classList.add("photo-card");
//     card.innerHTML = `<div class="img-container"><a class="gallery__item" href="${largeImageURL}"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></a></div>
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
//   </div>`;
//   galleryContainer.append(card);
  
// }


// galleryContainer.addEventListener("click", onImageClick);

// function onImageClick(e) {
//   e.preventDefault();
//   let galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
//   console.log(galleryCard); 
// }

// function clearGalleryItemMarkup() {
//     galleryContainer.innerHTML = '';
// }