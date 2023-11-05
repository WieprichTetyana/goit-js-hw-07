import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

const gallery = document.querySelector(".gallery");
console.log(gallery);

const galleryItemEl = galleryItems.map((galleryItemCard) => {
    return `
<li class="gallery__item">
  <a class="gallery__link" href="${galleryItemCard.original}">
    <img
      class="gallery__image"
      src="${galleryItemCard.preview}"
      data-source="${galleryItemCard.original}"
      alt="${galleryItemCard.description}"
    />
  </a>
</li>`;
});
gallery.insertAdjacentHTML("beforeend", galleryItemEl.join(""));

let instance;
const onGalleryItemClick = (event) => {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return;
    }
    const originalPath = event.target.dataset.source;
    console.log(originalPath);

    const basicLightboxOption = {
        onClose() {
            document.removeEventListener("keydown", onDocumentKeyPress);
        },
    };
    instance = basicLightbox.create(
        `<img src="${originalPath}" width="800" height="600">`, 
        basicLightboxOption
    );
    instance.show();

    document.addEventListener("keydown", onDocumentKeyPress);
};
const onDocumentKeyPress = (event) => {
    if (event.code === "Escape") {
        instance.close();
    }
};
gallery.addEventListener("click", onGalleryItemClick);
