import PhotoApiService from './partials/api'
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form')
const loadMoreBtn = document.querySelector('.load-more')
 
const photoApiService = new PhotoApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoad);

function onSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.searchQuery.value;
    photoApiService.resetPage();
    photoApiService.fetchPhotos();
    }

function onLoad() {
photoApiService.fetchPhotos();
}