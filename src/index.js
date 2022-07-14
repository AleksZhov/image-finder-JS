const axios = require('axios').default;
import { getRefs } from './js/getRefs';
import { PixabayAPI } from './js/pixabay-api';
import { Notify } from 'notiflix';
import { createGalleryCards } from './js/createGalleryCards';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import InfiniteScroll from 'infinite-scroll';

const pixabayApi = new PixabayAPI();

let lightbox = new SimpleLightbox('.gallery a');

const onSubmitHandle = evt => {
  evt.preventDefault();

  pixabayApi.query = evt.currentTarget.elements.searchQuery.value;
  console.log(pixabayApi.query);
  pixabayApi
    .getImages()
    .then(({ totalHits, hits: images }) => {
      console.log(totalHits);
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
      console.log(images);
      const markup = createGalleryCards(images).join('');
      getRefs().galleryRef.innerHTML = markup;
      if (pixabayApi.totalHits > pixabayApi.itemsPerPage) {
        getRefs().loadMoreBtnRef.classList.remove('is-hidden');
      }
      if (pixabayApi.page === pixabayApi.totalPages()) {
        getRefs().loadMoreBtnRef.classList.add('is-hidden');
      }
    });
  lightbox.refresh();
};
getRefs().form.addEventListener('submit', onSubmitHandle);

function onLoadMoreBtnHandle(evt) {
  pixabayApi.incrementPage();
  pixabayApi
    .getImages()
    .then(({ totalHits, hits: images }) => {
      return images;
    })
    .then(images => {
      const markup = createGalleryCards(images).join('');
      getRefs().galleryRef.insertAdjacentHTML('beforeend', markup);
    });
  lightbox.refresh();
}

getRefs().loadMoreBtnRef.addEventListener('click', onLoadMoreBtnHandle);
