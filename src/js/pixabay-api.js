const axios = require('axios').default;

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28627521-5848128afb2ba35ac2477c3bc';
  #page;
  #query;
  #totalHits;
  #itemsPerPage;
  #settings;
  constructor() {
    this.#page = 0;
    this.#query = '';
    this.#totalHits = 0;
    this.#itemsPerPage = 40;

    this.#settings = {};
  }

  async getImages() {
    try {
      const response = await axios({
        method: 'get',
        url: `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.#query}&page=${
          this.#page
        }&per_page=${
          this.#itemsPerPage
        }&image_type=photo&orientation=horizontal&safesearch=true`,
      });

      const result = await response.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  //   getImages(query) {
  //     return axios({
  //       method: 'get',
  //       url: `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.#query}&page=${
  //         this.#page
  //       }&per_page=${
  //         this.#itemsPerPage
  //       }&image_type=photo&orientation=horizontal&safesearch=true`,
  //     })
  //       .then(response => {
  //         console.log(response.data);
  //         if (!response.data) {
  //           throw new Error(response.statusText);
  //         }
  //         return response.data;
  //       })
  //       .catch(error => console.log(error));
  //     }

  get page() {
    return this.#page;
  }
  set page(newPage) {
    this.#page = newPage;
  }
  incrementPage() {
    this.#page += 1;
  }
  get query() {
    return this.#query;
  }
  set query(newQuery) {
    this.#query = newQuery;
  }
  get itemsPerPage() {
    return this.#itemsPerPage;
  }

  set totalHits(value) {
    this.#totalHits = value;
  }
  get totalHits() {
    return this.#totalHits;
  }
  totalPages() {
    return Math.ceil(this.#totalHits / this.#itemsPerPage);
  }
}
