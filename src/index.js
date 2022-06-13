// import cards from './partials/cards'
import PhotoApiService from './partials/api'
import axios from "axios";
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
        clearGalleryItemMarkup();
        createGalleryItemMarkup(hits);
    });
}

function onLoad() {
photoApiService.fetchPhotos().then(hits => console.log(hits));
}


function createGalleryItemMarkup() {
    galleryContainer.insertAdjacentHTML('beforeend', cardTemplate(hits));
}


const itemsMarkup = createGalleryItemMarkup(hits);
galleryContainer.insertAdjacentHTML('afterbegin', itemsMarkup);

console.log(createGalleryItemMarkup(hits));

 function createGalleryItemMarkup(hits) {
   return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
         return `
  <div class="photo-card">
  <a class='photo-card__img' href=${largeImageURL}>
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>${likes}
        </p>
        <p class="info-item">
            <b>Vievs</b>${views}
        </p>
        <p class="info-item">
            <b>Comments</b>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>${downloads}
        </p>
    </div>
</div>
`
}) 
        .join('');
}
new SimpleLightbox('.gallery .photo-card a', { captionDelay: 250, captionsData: "alt"});
console.log(hits);


function clearGalleryItemMarkup() {
    galleryContainer.innerHTML = '';
}





