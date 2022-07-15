// import { createGalleryCards } from './createGalleryCards';
// import { PixabayAPI } from './pixabay-api';

// async function onLoadMoreBtnHandle(evt) {
//   await pixabayApi.incrementPage();
//   pixabayApi
//     .getImages()
//     .then(({ totalHits, hits: images }) => {
//       return images;
//     })
//     .then(images => {
//       const markup = createGalleryCards(images).join('');
//       getRefs().galleryRef.insertAdjacentHTML('beforeend', markup);
//       lightbox.refresh();
//     });
// }
