export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }
    fetchPhotos() {
        console.log(this);
        const url = `https://pixabay.com/api/?key=28020117-3a98d2f0db4e6cde6fe7bd6ea&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    fetch(url)
    .then(r => r.json())
        .then(data => {
            this.page += 1;
    });
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

