import axios from "axios";
export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }
   
    fetchPhotos() {
        console.log(this);
        const url = `https://pixabay.com/api/?key=28020117-3a98d2f0db4e6cde6fe7bd6ea&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return axios.get(url)
    // .then(response => response.json())
        .then(({ hits }) => {
            console.log(hits);
            this.incrementPage();
            return hits;
    });
    }

    incrementPage() {
    this.page += 1;
}

    resetPage() {
        this.page = 1;
    }
    

    get query() {
    return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


// function onFetchError(error) {
//      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     }

