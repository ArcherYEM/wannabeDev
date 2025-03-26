let currentCategory = '01'; // 기본값 미니미

function fetchTopProducts(productType) {
    currentCategory = productType;

    fetch(`/api/products/top3?productType=${productType}`)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('product-container');
            container.innerHTML = ''; // 초기화

            if (data.length === 0) {
                container.innerHTML = '<p>상품이 없습니다.</p>';
                return;
            }

            data.forEach(product => {
                const filePath = product.filePath.trim();
                const imageUrl = `${filePath}`;

                const item = document.createElement('div');
                item.className = 'product-card'; //

                item.innerHTML = `
        <a href="/giftShop/main" class="product-link">
            <img src="${imageUrl}" alt="${product.productName}">
            <div class="product-name">${product.productName}</div>
        </a>
    `;

                container.appendChild(item);
            });
        });
}

function refreshProducts() {
    fetchTopProducts(currentCategory);
}

// 페이지 로딩 시 기본값으로 미니미(01) 로딩
window.onload = () => {
    fetchTopProducts(currentCategory);
};