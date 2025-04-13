/* 전역변수 */
// 페이지 온로드

let productTotalPrice = 0;
let bgmTotalPrice = 0;
let allTotalPrice = 0;
let productCount = 0;
let bgmCount = 0;

$(document).ready(function(){
    //장바구니에 담긴 아이템 가져오기
    getProductCart();
    getBgmCart();
    $(document).on('change','input[type="checkbox"]',function(){
        $('input[type="checkbox"]:checked').each(function(index,item){
            if($(this).is('#cartSelectAll')){
                return;
            }
            if($(this).closest('.cartMini .cartItemGroup').length > 0){
                productCount++;
                productTotalPrice += Number($(this).closest('.cartMini .cartItemGroup').find('.count').text());
            }else{
                bgmCount++;
                bgmTotalPrice += Number($(this).closest('.cartMusic .cartItemGroup').find('.count').text());
            }
        })
            $('#hompi-item-count').text(productCount);
            $('#bgm-item-count').text(bgmCount);
            $('.totalCount').first().text(productTotalPrice);
            $('.totalCount').eq(1).text(bgmTotalPrice);
            $('.totalCount').eq(2).text(productCount + bgmCount);
            $('.totalCount').eq(3).text(bgmTotalPrice + productTotalPrice);
            productCount = 0;
            bgmCount = 0;
            productTotalPrice = 0;
            bgmTotalPrice = 0;
    })

    $(document).on('change','#cartSelectAll',function(){
        if(!$(this).prop('checked')){
            $('input[type="checkbox"]').prop('checked',false);
            $('#hompi-item-count').text(0);
            $('#bgm-item-count').text(0);
            $('.totalCount').first().text(0);
            $('.totalCount').eq(1).text(0);
            $('.totalCount').eq(2).text(0);
            $('.totalCount').eq(3).text(0);
            return;
        }
        $('input[type="checkbox"]').prop('checked',true);
        $('input[type="checkbox"]:checked').each(function(index,item){
            if($(this).is('#cartSelectAll')){
                return;
            }
            if($(this).closest('.cartMini .cartItemGroup').length > 0){
                productCount++;
                productTotalPrice += Number($(this).closest('.cartMini .cartItemGroup').find('.count').text());
            }else{
                bgmCount++;
                bgmTotalPrice += Number($(this).closest('.cartMusic .cartItemGroup').find('.count').text());
            }
        })
            $('#hompi-item-count').text(productCount);
            $('#bgm-item-count').text(bgmCount);
            $('.totalCount').first().text(productTotalPrice);
            $('.totalCount').eq(1).text(bgmTotalPrice);
            $('.totalCount').eq(2).text(productCount + bgmCount);
            $('.totalCount').eq(3).text(bgmTotalPrice + productTotalPrice);
            productCount = 0;
            bgmCount = 0;
            productTotalPrice = 0;
            bgmTotalPrice = 0;
    })

})

function getProductCart(){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/product',
        dataType: 'json',
        success: function(response){
             $('.cart .swiper-wrapper').empty();
            response.forEach(function(item, index){
            console.log(item);
            let code = `
            <div class="cartItemGroup" data-item-id="${item.itemId}">
            <div class="cartItemLeft">
                <div class="cartImgWrap">
                    <input class="checkbox" type="checkbox">
                    <div class="cartItemImg">
                        <img src="${item.itemPath}"/>
                    </div>
                </div>
                <div class="cartItemCenter">
                    <div>
                        <p class="cartItemCategory">${item.category}</p>
                        <p class="cartItemName">${item.itemName}</p>
                    </div>
                    <div class="orderCountWrap">
                        <div id="orderCountBtnWrap">
                            <button>-</button>
                            <span>${item.itemCount}</span>
                            <button>+</button>
                        </div>`;
                    if(item.itemType == 'P'){
                        code += `<select class="cartDate">
                            <option value="1">1</option>
                            <option value="7">7</option>
                            <option value="30">30</option>
                            <option value="90">90</option>
                            <option value="365">365</option>
                        </select>`;
                    }
                code += `<div class="dotoriInfo">
                            <img src="/static/images/common/icon/dotori.png" alt="dotori"/>
                    </div>
                </div>
            </div>
            </div>
                <div class="cartItemButton">
                    <button class="delButton">X</button>
                </div>
            </div>`;
        $('.cartMini .itemBox').append(code);
        if(item.itemType == 'P'){
            $('.dotoriInfo').eq(index).append(`<span class="count"></span><span>개</span>`);
        }
        $('.cartDate').eq(index).find('option').filter(function(){
            return $(this).text().replace('일','') == item.availDay;
        }).prop('selected',true);
            getItemPrice(item.itemId, item.availDay, item.itemType, $('.dotoriInfo .count').eq(index),item.itemCount);
        })
        }
    })
}

function getBgmCart(){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/bgm',
        dataType: 'json',
        success: function(response){
             $('.cart .swiper-wrapper').empty();
            response.forEach(function(item, index){
            console.log(item);
            let code = `
            <div class="cartItemGroup" data-item-id="${item.itemId}">
            <div class="cartItemLeft">
                <div class="cartImgWrap">
                    <input class="checkbox" type="checkbox">
                    <div class="cartItemImg">
                        <img src="${item.itemPath}"/>
                    </div>
                </div>
                <div class="cartItemCenter">
                    <div>
                        <p class="cartItemCategory">BGM</p>
                        <p class="cartItemName">${item.itemName}</p>
                    </div>
                    <div class="orderCountWrap">
                    <div class="dotoriInfo">
                        <img src="/static/images/common/icon/dotori.png" alt="dotori"/>
                        <span class="count"></span><span> 개</span>
                    </div>
                </div>
            </div>
            </div>
                <div class="cartItemButton">
                    <button class="delButton">X</button>
                </div>
            </div>`;
        $('.cartMusic .itemBox').append(code);
        if(item.itemType == 'P'){
            $('.dotoriInfo').eq(index).append(`<span class="count"></span><span>개</span>`);
        }
        $('.cartDate').eq(index).find('option').filter(function(){
            return $(this).text().replace('일','') == item.availDay;
        }).prop('selected',true);
            getItemPrice(item.itemId, item.availDay, item.itemType,  $('.cartMusic .count').eq(index),item.itemCount);
    })
        }
    })
}
function getItemPrice(itemId, availDay, itemType, inputPlace,count){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/price/',
        data: {itemId, availDay, itemType},
        success: function(response){
            if(itemType == 'P'){
                inputPlace.text(response * count);
            }else{
                inputPlace.text(response);
            }
        },
        error: function(error){
            console.error(error);
        }
    })
}