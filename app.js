let productsList = [];
const getProducts = () => {
    fetch("./products.json")
        .then((res) => res.json())
        .then((products) => (productsList = products));
}
getProducts();

const createProductItemHtml = () => {
    const productsListElement = document.querySelector(".product-list");
    let productsListHtml = "";
    productsList.forEach(products => {
        productsListHtml += `
            <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card h-75">
                <img src="${products.imgSource}" class="card-img-top h-50" alt="${products.name}" />
                <div class="card-body" id="urun-id">
                    <h4>${products.name}
                        <hr>
                    </h4>
                    <p class="card-text">
                        ${products.description} <br>
                        <b>${products.author}</b><br>
                          <i>${products.price}$</i><br>
                    </p>
                    <button class="btn btn-warning" onClick="addToBasket(${products.id})">Satın Al</button>
                </div>
            </div>
        </div>`;
    })

    productsListElement.innerHTML = productsListHtml;
};
setTimeout(() => {
    createProductItemHtml();
}, 100);

//! sepete ürün ekleme
let basketList = [];
const listBasketItems = () => {
    const basketListElement = document.querySelector(".basket_list");
    let basketListHtml = "";
    basketList.forEach(item => {
        basketListHtml += `
        <li>
        <img src="${item.product.imgSource}"
         width="100"
          height="100">
        <div>
            <h3>${item.product.name}</h3>
            <span>${item.product.price}$</span><br>
            <span>Ürünü sil</span>
        </div>
        <div class="product_count mx-4">
            <span class="decrease">-</span>
            <span>${item.quantity}</span>
            <span class="increase">+</span>
        </div>
    </li>`;
    });
    basketListElement.innerHTML= basketListHtml;
}


const addToBasket = (id) => {
    let basketProduct = productsList.find(products => products.id == id);
    if (basketProduct) {
        // sepette önceden bulunan ürün
        const basketAlreadyIndex = basketList.findIndex(
            (basket)=> basket.product.id == id
        );
        if (basketAlreadyIndex == -1) {
            let addedItem = { quantity:1, product: basketProduct};
            basketList.push(addedItem);
        }
        else{
            basketList[basketAlreadyIndex].quantity += 1;
        }
        listBasketItems();
        // kontrol
        console.log(basketList);
    }
}