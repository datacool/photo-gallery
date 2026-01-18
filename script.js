const IMAGE_COUNT = 30;
const BASE_URL = 'https://picsum.photos/300';

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.getElementById('closeModal');

// 로딩 상태 표시
function showLoading() {
  gallery.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>전시회 작품을 불러오는 중...</p>
    </div>
  `;
}

// 이미지 생성 함수
function createGalleryItem(imageUrl, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `전시 작품 ${index + 1}`;
  img.loading = 'lazy';
  
  // 이미지 클릭 시 모달 열기
  item.addEventListener('click', () => {
    openModal(imageUrl, index + 1);
  });
  
  item.appendChild(img);
  return item;
}

// 모달 열기
function openModal(imageUrl, imageNumber) {
  modalImage.src = imageUrl;
  modalCaption.textContent = `작품 ${imageNumber} / ${IMAGE_COUNT}`;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeModalHandler() {
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// 이벤트 리스너 설정
closeModal.addEventListener('click', closeModalHandler);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalHandler();
  }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModalHandler();
  }
});

// 이미지 로드 함수
async function loadImages() {
  showLoading();
  
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < IMAGE_COUNT; i++) {
    // 각 이미지에 고유한 시드를 추가하여 다른 이미지를 가져옴
    const imageUrl = `${BASE_URL}?random=${i}`;
    const galleryItem = createGalleryItem(imageUrl, i);
    fragment.appendChild(galleryItem);
  }
  
  // 모든 이미지가 준비되면 한 번에 추가
  gallery.innerHTML = '';
  gallery.appendChild(fragment);
}

// 페이지 로드 시 이미지 로드
window.addEventListener('DOMContentLoaded', loadImages);
