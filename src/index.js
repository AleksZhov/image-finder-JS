const axios = require('axios').default;
import { getRefs } from './js/getRefs';
import { PixabayAPI } from './js/pixabay-api';
import { Notify } from 'notiflix';
import { createGalleryCards } from './js/createGalleryCards';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import InfiniteScroll from 'infinite-scroll';

const pixabayApi = new PixabayAPI();

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const onSubmitHandle = evt => {
  evt.preventDefault();

  pixabayApi.query = evt.currentTarget.elements.searchQuery.value.trim();
  evt.currentTarget.elements.searchQuery.value = '';

  pixabayApi
    .getImages()
    .then(result => {
      const { totalHits, hits: images } = result;
      if (totalHits === 0) {
        Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        Notify.info(`Hooray! We found ${totalHits} images.`);
      }
      pixabayApi.totalHits = totalHits;

      return images;
    })
    .then(images => {
      const markup = createGalleryCards(images).join('');
      getRefs().galleryRef.innerHTML = markup;
      lightbox.refresh();
      if (pixabayApi.totalHits > pixabayApi.itemsPerPage) {
        getRefs().loadMoreBtnRef.classList.remove('is-hidden');
      }

      if (pixabayApi.page >= pixabayApi.totalPages()) {
        getRefs().loadMoreBtnRef.classList.add('is-hidden');
      }
    });
};
getRefs().form.addEventListener('submit', onSubmitHandle);

function onLoadMoreBtnHandle(evt) {
  pixabayApi.incrementPage();
  if (pixabayApi.page >= pixabayApi.totalPages()) {
    getRefs().loadMoreBtnRef.classList.add('is-hidden');
  }
  pixabayApi
    .getImages()
    .then(({ totalHits, hits: images }) => {
      return images;
    })
    .then(images => {
      const markup = createGalleryCards(images).join('');
      getRefs().galleryRef.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
    });
}

getRefs().loadMoreBtnRef.addEventListener('click', onLoadMoreBtnHandle);
