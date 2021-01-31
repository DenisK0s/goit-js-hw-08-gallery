import gallery from "./gallery-items.js"


const galleryRef = document.querySelector('.js-gallery');

// Вариант создания разметки через innerHTML !!!

// const createGalleryItems = function (arr) {
//   const stringOfTags = arr.reduce((acc, elem) =>
//     acc + `<li class="gallery__item"><a class="gallery__link" href=${elem.original}>
//     <img class="gallery__image" src=${elem.preview} data-source=${elem.original} alt=${elem.description} /></a></li>`, '');

//   return stringOfTags;
// };

// galleryRef.innerHTML = createGalleryItems(gallery);

let index = -1;

const createGalleryItem = function (elem) {
  const galleryItemRef = document.createElement('li');
  galleryItemRef.classList.add('gallery__item');

  const galleryLinkRef = document.createElement('a');
  galleryLinkRef.classList.add('gallery__link');
  galleryLinkRef.setAttribute('href', `${elem.original}`);

  const galleryImageRef = document.createElement('img');
  galleryImageRef.classList.add('gallery__image');
  galleryImageRef.setAttribute('src', `${elem.preview}`);
  galleryImageRef.setAttribute('data-source', `${elem.original}`);
  galleryImageRef.setAttribute('data-index', `${index += 1}`);
  galleryImageRef.setAttribute('alt', `${elem.description}`);

  galleryItemRef.appendChild(galleryLinkRef);
  galleryLinkRef.appendChild(galleryImageRef);
  
  return galleryItemRef;
};

const galleryItems = gallery.map(elem => createGalleryItem(elem));

galleryRef.append(...galleryItems);

const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxImgRef = lightBoxRef.querySelector('.lightbox__image');
const lightBoxCloseBtnRef = lightBoxRef.querySelector('.js-lightbox button[data-action="close-lightbox"]');
const lightBoxCloseByOverlayRef = lightBoxRef.querySelector('.lightbox__overlay');
const allImagesRef = galleryRef.querySelectorAll('.gallery__image');
const arrOfImagesRef = [...allImagesRef];

// const refs = {
//   lightBox: document.querySelector('.js-lightbox'),
//   lightBoxImg: this.lightBoxRef.querySelector('.lightbox__image'),
//   lightBoxCloseBtn: this.lightBoxRef.querySelector('.js-lightbox button[data-action="close-lightbox"]')
// }; 

galleryRef.addEventListener('click', galleryHandler);

let indexOfActivImg;

function galleryHandler(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) return; 

  lightBoxRef.classList.add('is-open');
  
  indexOfActivImg = event.target.dataset.index;

  lightBoxImgRef.src = event.target.dataset.source;  

  lightBoxCloseBtnRef.addEventListener('click', closeGalleryItem);
  lightBoxCloseByOverlayRef.addEventListener('click', closeGalleryItem);
  document.addEventListener('keydown', closeGalleryByEsc);
};

function closeGalleryItem() {
  lightBoxRef.classList.remove('is-open');
  lightBoxImgRef.src = ''; 
};

function closeGalleryByEsc(event) {

  const galleryItemsQuantity = arrOfImagesRef.length;

  if (event.code === "ArrowRight") {

    for (let i = 0; i < galleryItemsQuantity; i += 1) {

      if (Number(indexOfActivImg) === galleryItemsQuantity - 1) {
        lightBoxImgRef.src = arrOfImagesRef[galleryItemsQuantity - 1].dataset.source;
        break;
      }

      if (arrOfImagesRef[i].dataset.index === indexOfActivImg) {
        const nextImage = arrOfImagesRef[i + 1];
        lightBoxImgRef.src = nextImage.dataset.source;
        indexOfActivImg = nextImage.dataset.index;
        break;
      }
    }
  };

  
  if (event.code === "ArrowLeft") {
    for (let i = 0; i < galleryItemsQuantity; i += 1) {

      if (Number(indexOfActivImg) === 0) {
        lightBoxImgRef.src = arrOfImagesRef[i].dataset.source;
        break;
      }

      if (arrOfImagesRef[i].dataset.index === indexOfActivImg) {
        const nextImage = arrOfImagesRef[i - 1];
        lightBoxImgRef.src = nextImage.dataset.source;
        indexOfActivImg = nextImage.dataset.index;
        break;
      }
    };
  };
  
  if (event.code === 'Escape') {
    lightBoxRef.classList.remove('is-open');
    lightBoxImgRef.src = '';

    document.removeEventListener('keydown', closeGalleryByEsc);
  } 
};
