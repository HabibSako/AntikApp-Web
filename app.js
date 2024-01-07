let productsList = [];

// json dosyasından veri alama
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


//! sepete ürün ekleme
let basketList = [];
let totalPrice = 0;
const listBasketItems = () => {
    const basketListElement = document.querySelector(".basket_list");
    const totalPriceElement = document.querySelector(".total_price");

    let basketListHtml = "";

    totalPrice = 0; // Toplam tutarı sıfırla

    basketList.forEach(item => {
        totalPrice += item.product.price * item.quantity; // Toplam tutarı güncelle
        basketListHtml += `
        <li>
        <img src="${item.product.imgSource}"
         width="100"
          height="100">
        <div>
            <h3>${item.product.name}</h3>
            <span>${item.product.price}$</span><br>
            <span class="product_remove" onClick="removeItemToBasket(${item.product.id})">Ürünü sil</span>
        </div>
        <div class="product_count mx-4">
            <span class="decrease" onclick="decreaseItemToBasket(${item.product.id})">-</span>
            <span>${item.quantity}</span>
            <span class="increase" onclick="increaseItemToBasket(${item.product.id})">+</span>
        </div>
    </li>`;
    });
    basketListElement.innerHTML = basketListHtml ? basketListHtml : `<p>Sepetiniz şu an için boş.</p>  `;
    totalPriceElement.innerHTML = totalPrice > 0 ? "Toplam Tutar :" + totalPrice.toFixed(2) + "$" : null;
}
const listBasketItemsDecrease = () => {
    const basketListElement = document.querySelector(".basket_list");
    const totalPriceElement = document.querySelector(".total_price");

    let basketListHtml = "";

    basketList.forEach(item => {
        totalPrice -= item.product.price;
        basketListHtml += `
        <li>
        <img src="${item.product.imgSource}"
         width="100"
          height="100">
        <div>
            <h3>${item.product.name}</h3>
            <span>${item.product.price}$</span><br>
            <span class="product_remove" onClick="removeItemToBasket(${item.product.id})">Ürünü sil</span>
        </div>
        <div class="product_count mx-4">
            <span class="decrease" onclick="decreaseItemToBasket(${item.product.id})">-</span>
            <span>${item.quantity}</span>
            <span class="increase" onclick="increaseItemToBasket(${item.product.id})">+</span>
        </div>
    </li>`;
    });
    basketListElement.innerHTML = basketListHtml ? basketListHtml : `<p>Sepetiniz şu an için boş.</p>  `;
    totalPriceElement.innerHTML = totalPrice > 0 ? "Toplam Tutar :" + totalPrice.toFixed(2) + "$" : null;
}

// ekleme
const addToBasket = (id) => {
    let basketProduct = productsList.find(products => products.id == id);
    if (basketProduct) {
        // sepette önceden bulunan ürün
        const basketAlreadyIndex = basketList.findIndex(
            (basket) => basket.product.id == id
        );
        if (basketAlreadyIndex == -1) {
            let addedItem = { quantity: 1, product: basketProduct };
            basketList.push(addedItem);
        }
        else {
            if (basketList[findedIndex].quantity < basketList[findedIndex].product.stock) {
                basketList[basketAlreadyIndex].quantity += 1;
            } else {
                alert("Yeterince Stok Yok !!");
            }

        }
        listBasketItems();
        // kontrol
        console.log(basketList);
    }
}
// silme
const removeItemToBasket = (id) => {
    // ürünü bulma
    const findedIndex = basketList.findIndex((basket) => basket.product.id == id);
    if (findedIndex != -1) {
        basketList.splice(findedIndex, 1);
    }
    // listeyi güncelleme
    listBasketItems();
}

// arttırma ve azaltma işlemleri
const decreaseItemToBasket = (id) => {
    const findedIndex = basketList.findIndex((basket) => basket.product.id == id);
    if (findedIndex != -1) {
        if (basketList[findedIndex].quantity != 1) {
            basketList[findedIndex].quantity -= 1;
        } else removeItemToBasket(id);
    }
    listBasketItems();
};
const increaseItemToBasket = (id) => {
    const findedIndex = basketList.findIndex((basket) => basket.product.id == id);
    if (findedIndex != -1) {
        if (basketList[findedIndex].quantity < basketList[findedIndex].product.stock) {
            basketList[findedIndex].quantity += 1;
            
        } else {
            alert("Yeterince Stok Yok !!");
        }
    }
    listBasketItems();
};

// sepeti temizle
const purchaseItems = () => {
    if (basketList.length === 0) {
        alert("Sepetinizde alınacak ürün bulunmamaktadır. Lütfen ürün ekleyin.");
    } else {
        basketList = []; // Sepeti temizle
        totalPrice = 0; // Toplam tutarı sıfırla
        listBasketItems(); // Güncellenmiş sepeti görüntüle
        alert("Satın alma işlemi başarıyla tamamlandı. Teşekkür ederiz!");
    }
}

setTimeout(() => {
    createProductItemHtml();
}, 100);