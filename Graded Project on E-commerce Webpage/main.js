
let cartProducts = [];
let featureProductsList = [];
async function getApiResponse(){
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        featureProductsList = data.products;
        productLoopCommon(featureProductsList)
    } catch (error) {
        console.error(error);
    }
}

//Search filter
function onSerachProduct(event) {
    event.preventDefault();
    let filterProduct = document.getElementById('serachProduct').value;
    featureProductsLists = featureProductsList.filter(res => {
        if((res.brand.toLowerCase() === filterProduct.toLowerCase()) || 
        (res.category.toLowerCase() === filterProduct.toLowerCase()) || 
        (res.title.toLowerCase() === filterProduct.toLowerCase())){
            return res
        }
     });
     console.log(featureProductsLists);
     productLoopCommon(featureProductsLists)
     
}

function productLoopCommon(featureProductsLists){
    featureProductsLists.map((res)=>{
        let list = document.createElement('div'); 
        list.setAttribute('class','productBox');
        let discountAmt = Math.round(res.price - res.price * res.discountPercentage / 100);
        list.innerHTML += 
        `
            <div class="productBoxInner">
                <div class="productImage">
                    <img src="${res.thumbnail }">
                </div>
                <div class="productContent w-100 float-left">
                    <div class="productCategory" style="text-transform:uppercase">${res.category}</div>
                    <div class="productName">${res.title}</div>
                    <div class="productRating">${getStarIcons(res.rating)}</div>
                    <div class="productPricing d-flex"><del>$${res.price}</del> $${discountAmt} <button class="btn float-right">Add to Cart</button></div>
                    <a href="javascript:void(0);" class="like"><i class="fa fa-heart-o"></i></a>
                </div>
            </div>
        `
        const likeIcon = list.querySelector('.like i');
        likeIcon.addEventListener('click', () => {
            // res.like = !res.like;
            likeIcon.classList.toggle('fa-heart');
            likeIcon.classList.toggle('fa-heart-o');
        });
        const addTocart = list.querySelector('.productPricing .btn');
        
        addTocart.addEventListener('click',()=>{
            console.log(res);
            if(addTocart.textContent === 'Add to Cart'){
                cartProducts.push(res);
                addTocart.setAttribute('class','btn float-right addToCart')
                addTocart.textContent = 'Remove From Cart';
                
            }else{
                cartProducts = cartProducts.filter(r => res.id !== r.id);
                addTocart.textContent = 'Add to Cart'
            }
            
            
            let list = document.createElement('span'); 
            list.textContent = cartProducts.length;
            document.querySelector('#shopping-bag').appendChild(list);
        })
        
        document.querySelector('#featureProducts').appendChild(list);
    })  
}

function onOpenDrawer(){
    const shopingBag = document.getElementById('shopingBag');
    if(cartProducts.length > 0){
        const openDrawer = document.querySelector('.drawer');    
        openDrawer.style.right = '0';
        console.log(cartProducts);
        cartProducts.map(res=>{
            let discountAmt = Math.round(res.price - res.price * res.discountPercentage / 100);
            shopingBag.innerHTML += `
            <div class="d-flex innerBox">
                <div class="ico d-flex" style="width: 80px;">
                    <img src="${res.thumbnail }" alt="" style="width:50px;height: 50px;border-radius: 50%;margin: 0 auto;">
                </div>
                <div class="text w-100 float-left">
                <div class="productName w-100 float-left" style="font-size: 18px;font-weight:600;margin-bottom: 10px;">${res.title}</div> 
                <div class="stock w-100 float-left" style="font-size: 12px;">Stock: ${res.stock} <span style="float: right;font-size: 16px;">$${discountAmt}</span></div> 
                </div>
            </div>
        `
        })
    }
    
}
function closeDrawer(e){
    const openDrawer = document.querySelector('.drawer');  
    if(e === 'close'){
        openDrawer.style.right = '-300px';
        
    }
}

// Function to generate star icons based on the rating
function getStarIcons(rating) {
    let stars = '';
    for (let j = 0; j < rating; j++) {
        stars += '<i class="fa fa-star"></i>';
    }
    return stars;
}