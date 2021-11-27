import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.querySelector('#pagination');
const gallery = document.querySelector(`.gallery`);
const options = {
  totalItems: 10,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();
console.log(page);

function fetchGallery(page) {
  const API_KEY = `24371628-8321d0b014cdaba49f6b000a8`;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=city&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${page}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => ({
      images: data.hits,
      total: data.totalHits,
    }));
}
fetchGallery(page)
  .then(({ images, total }) => {
    renderImages(images);
    const img = document.querySelectorAll('.gallery img');
    console.log(img);
    lasyLoad(img)
    pagination.reset(total);
  })
 

function renderImages(images) {
  const markup = images
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li><div class="photo-card">
        <a class="gallery__item" href=${largeImageURL}>
        <img src="" data-lasy="${webformatURL}" alt=${tags} loading="lazy" width="354" height="225" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes </br><span class='text'>${likes}</span></b>
            </p>
            <p class="info-item">
                <b>Views </br><span class='text'>${views}</span></b>
            </p>
            <p class="info-item">
                <b>Comments </br><span class='text'>${comments}</span></b>
            </p>
            <p class="info-item">
                <b>Downloads </br><span class='text'>${downloads}</span></b>
            </p>
        </div>
    </div></li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
}

pagination.on('afterMove', ({ page }) => {
  fetchGallery(page)
    .then(({ images }) => {
      renderImages(images);
      const img = document.querySelectorAll('.gallery img');
      lasyLoad(img)
    })
  
});

function scroll() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}


function lasyLoad (targets) {
  const option = {
    rootMargin: "100px"
  };
  const onEntry = (entries, observer) => {
    entries.forEach(entrie => {
      if (entrie.isIntersecting) {
        const image = entrie.target
        const src = image.dataset.lasy
        image.src = src
        observer.unobserve(image)
      }
    })
  }

  const io = new IntersectionObserver(onEntry, option)
  targets.forEach(target => io.observe(target))

}