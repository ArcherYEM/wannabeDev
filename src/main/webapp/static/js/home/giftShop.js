//최근 본 아이템 슬라이드
const recentSwiper = new Swiper("#recent-item-swiper", {
    direction: "vertical",
    slidesPerView: 2,
    spaceBetween: 25,
    mousewheel: true,
    resistanceRatio: 0.5,
});
//카트 아이템리스트 슬라이드
const itemBuySwiper = new Swiper("#item-swiper", {
    direction: "vertical",
    slidesPerView: 2.5,
    spaceBetween: 25,
    mousewheel: true,
    resistanceRatio: 0.5,
});

let searchText = '';
let totalPage = 0;
let currentPage = 0;
let offset = 0;
let productType ='';
const giftShopList = [" ","01","02","10","11","12","BGM"];
let recentItems = [];

$(function () {

    itemMainPageItem();
    getPopularBgm();
    getPopularProduct();

    // 선물함 메뉴 효과
    $(".top-header-menu .tab").on("click", function () {
        $(".top-header-menu .tab").removeClass("active");
        $(this).addClass("active");
    });

    //최근 본 아이템 위아래
    $('#up-arrow').on("click", function () {
        recentSwiper.slidePrev();
    })
    $('#down-arrow').on("click", function () {
        recentSwiper.slideNext()
    })

    //장바구니 아이템 위아래
    $('#item-up-arrow').on("click", function () {
        itemBuySwiper.slidePrev();
    })
    $('#item-down-arrow').on("click", function () {
        itemBuySwiper.slideNext()
    })

    //장바구니 미니홈피 메뉴바 클릭 시 리스트 변환
    $('.menu-ul li').on('click',function(){
        $('.menu-ul li').removeClass('active');
        $(this).addClass("active");
        if($('.menu-ul').index($(this).closest('.menu-ul')) === 0){
            productType = giftShopList[$(this).index()];
            if(productType === " "){
                getProductMainHtml();
                return;
            }
            getProductSubHtml();
            getProductCount();
            return;
        }
        productType = giftShopList[6];
        getProductSubHtml();
        getProductCount();
    })

    //선택한 리스트에 장바구니 클릭시 체크되있는 아이템 장바구니로 넣기
    $(document).on('click','.itemBuyFinal .itemCart',function(){
        $('.selectItemUl li input[type="checkbox"]:checked').each(function(index, item){
            if($('.selectItemCartUl li[data-id="' + $(this).closest('li').attr('data-id') + '"][data-type="'
            + $(this).closest('li').attr('data-type') + '"]').length > 0){
                return;
            }
        const checkItemId = $(this).closest('li').attr('data-id');
        const checkItemType = $(this).closest('li').attr('data-type');
        const selectItem = $(this).closest('li');
        let code = `<li data-id="${checkItemId}" data-type="${checkItemType}">
                <div><span>${selectItem.find('.selectItemName').text()}</span><div>
                <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                <span class="dotoriCartPrice"></span></div></div>
                <div class="selectCartItem"><img id="cartCloseImg" src="/static/images/common/icon/close.png">
                <img src="${$(this).closest('li').find('.selectItem img').attr('src')}">`
        $('.selectItemCartUl').append(code);

        if(selectItem.attr('data-type') !== "M"){
            const sel = selectItem.find('.selectItem select');
            $('.selectCartItem').last().append(sel.clone());
            $('.selectCartItem select').last().val(sel.val());
            $('.dotoriCartPrice').html(sel.val());
        }else{
            $('.dotoriCartPrice').html(selectItem.find('.dotoriPrice').text())
        }
        const itemCnt = $('.selectItemCartUl li').length;
        let totalPrice = 0;
        $('.dotoriCartPrice').each(function(index,price){
            totalPrice += Number($(price).text());
        });
            $('#cartCnt').text('합계' + '(' + itemCnt + ')');
            $('#cartSum').text(totalPrice);
        })
    })

    //전체 선택 클릭시 itemCart 체크박스 전부 checked로 변환 및 선택한 아이템에 등록
    $(document).on('change','.itemAll input[type="checkbox"]',function(){
        if(!$(this).prop('checked')){
            $('.itemCheckBox').prop('checked',false);
            $('.selectItemUl li').each(function(index,item){
                const dataId = $(item).attr('data-id');
                const dataType = $(item).attr('data-type');
                if($('.itemCard[data-id="' + dataId + '"][data-type="' + dataType +'"]').length > 0){
                    $(item).remove();
                }
            })
            return;
        }
        $('.itemCheckBox').prop('checked',true);
        $('.itemCard').each(function(index,item){
            if($('.selectItemUl li[data-id="' + $(item).attr('data-id') + '"][data-type="' + $(item).attr('data-type') + '"]').length > 0){
                return;
            }
            if(!$(item).attr('data-id')){
                return;
            }
            let code = `<li data-id="${$(item).attr('data-id')}" data-type="${$(item).attr('data-type')}">
                        <div><span class="selectItemName">${$(item).find('h3').text()}</span><div>
                        <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                        <span class="dotoriPrice"></span></div></div>
                        <div class="selectItem"><img src="${$(this).closest('.itemCard').find('img').attr('src')}">
                        <input type="checkbox">`
            code += '</div></li>';
            $('.selectItemUl').append(code);
            if($(item).attr('data-type') !== 'M'){
                const sel = $(item).find('.selectBox select');
                $('.selectItem').last().append(sel.clone());
                $('.selectItem select').last().val(sel.val());
                $('.dotoriPrice').last().html(sel.val());
            }
        })
    })

    //페이지 버튼 클릭시 다음 리스트 출력
    $(document).on('click','.productPage button',function(){
        $('.itemAll input[type="checkbox"]').prop('checked',false);
        $('.itemCheckBox').prop('checked',false);
        $('.productPage button').removeClass('active');
        $(this).addClass('active');
        currentPage = $(this).text() - 1;
        if(productType === "BGM"){
            bgmGiftShop();
            return;
        }
        giftShop();
    })

    //중앙 아이템 체크버튼 클릭시 선택 리스트에 추가
    $(document).on('change','.itemCheckBox',function(){
        const checkItem = $(this);
        if($('.itemAll input[type="checkbox"]').prop('checked')){
           $('.itemAll input[type="checkbox"]').prop('checked',false);
        }
        const checkItemId = $(this).closest('.itemCard').attr('data-id');
        const checkItemType = $(this).closest('.itemCard').attr('data-type');
        const itemCard = $(this).closest('.itemCard');
        if(!$(this).prop('checked')){
           $('.selectItemUl li[data-id="' + checkItemId + '"][data-type="' + checkItemType + '"]').remove();
           return;
        };
        let code = `<li data-id="${checkItemId}" data-type="${itemCard.attr('data-type')}">
                <div><span class="selectItemName">${itemCard.find('h3').text()}</span><div>
                <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                <span class="dotoriPrice"></span></div></div>
                <div class="selectItem"><img src="${$(this).closest('.itemCard').find('img').attr('src')}">
                <input type="checkbox">`
        $('.selectItemUl').append(code);
        if(itemCard.attr('data-type') !== "M"){
            const sel = itemCard.find('.selectBox select');
            $('.selectItem').last().append(sel.clone());
            $('.selectItem select').last().val(sel.val());
            $('.dotoriPrice').last().html(sel.val());
        }else{
            $('.dotoriPrice').last().html(itemCard.find('.price').text())
        }
    })

    //장바구니 아이콘 클릭시 장바구니에 해당 아이템 추가
    $(document).on('click','.itemCart',function(){
        if($(this).closest('.selectedItemMenu').length > 0){
            return;
        }
        const checkItemId = $(this).closest('.itemCard').attr('data-id');
        const checkItemType = $(this).closest('.itemCard').attr('data-type');
        const itemCard = $(this).closest('.itemCard');
        if($('.selectItemCartUl li[data-id="' + checkItemId + '"][data-type="' + checkItemType + '"]').length > 0){
           alert('이미 장바구니에 존재하는 아이템입니다');
           return;
        };
        let code = `<li data-id="${checkItemId}" data-type="${itemCard.attr('data-type')}">
                <div><span>${itemCard.find('h3').text()}</span><div><img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                <span class="dotoriCartPrice"></span></div></div>
                <div class="selectCartItem"><img id="cartCloseImg" src="/static/images/common/icon/close.png">
                <img src="${$(this).closest('.itemCard').find('img').attr('src')}">`
        $('.selectItemCartUl').append(code);

        if(itemCard.attr('data-type') !== "M"){
            const sel = itemCard.find('.selectBox select');
            $('.selectCartItem').last().append(sel.clone());
            $('.selectCartItem select').last().val(sel.val());
            $('.dotoriCartPrice').last().html(sel.val() + '개');
        }else{
            $('.dotoriCartPrice').last().html(itemCard.find('.price').text())
        }
        const itemCnt = $('.selectItemCartUl li').length;
        let totalPrice = 0;
        $('.dotoriCartPrice').each(function(index,price){
            const newPrice = $(price).text().replace('개','');
            totalPrice += Number(newPrice);
        });
        $('#cartCnt').text('합계' + '(' + itemCnt + ')');
        $('#cartSum').text(totalPrice + '개');
    })

    $(document).on('click','.itemSelectInput button',function(){
        searchText = $('.itemSelectInput input[type="text"]').val().trim();
        if(!searchText){
            alert('검색창에 텍스트를 입력해주세요!');
            return;
        }
        getProductSubHtml(searchText);
        getProductCount(searchText);
    })

    $(document).on('change','.selectBox select',function(){
        const price = $(this).closest('.itemCard').find('.price');
        price.html($(this).val() + '개');
    })

    $(document).on('click','#cartCloseImg',function(){
        $(this).closest('li').remove();
    })

    $(document).on('change','.selectItem select',function(){
        const dotori = $(this).closest('li').find('.dotoriPrice');
        dotori.html($(this).val() + '개');
    })

    $(document).on('change','.selectCartItem select',function(){
        const dotori = $(this).closest('li').find('.dotoriCartPrice');
        dotori.html($(this).val() + '개');
        const itemCnt = $('.selectItemCartUl li').length;
        let totalPrice = 0;
        $('.dotoriCartPrice').each(function(index,price){
            totalPrice += Number($(price).text());
        });
        $('#cartCnt').text('합계' + '(' + itemCnt + ')');
        $('#cartSum').text(totalPrice);
    })

    $(document).on('click','.itemDesc',function(){
       const itemCard = $(this).closest('.itemCard');
        $('.giftShopModal').show();
        $('.modalItemImg').attr('src',itemCard.find('.itemImg img').attr('src'));
        if(itemCard.attr('data-type') === 'P'){
            $('#productDesc').show();
            $('.modalItemType').text('미니홈피 ' + $(this).find('span').text());
            $('.modalDesc h2').text('아이템 이름: ' + $(this).find('h3').text())
            $('.modalItemDesc').text($(this).find('input[type="hidden"]').val());
        }else{
            $('#productDesc').hide();
            $('#modalItemDesc').empty();
            $('.modalItemType').text('음반가게 ' + $(this).find('span').text());
            $('.modalDesc h2').text('노래 이름: ' + $(this).find('h3').text())
            $('.bgmLyrics').text($(this).find('input[type="hidden"]').val());
        }
        const sel = itemCard.find('.selectBox select');
        if($('.modalDesc select').length > 0){
            $('.modalDesc select').remove();
        }
        const itemClone = itemCard.clone();
        recentItems.push(itemClone);
        itemClone.remove('.itemPricing');
        if($('.recentItemWrap .itemCard[data-id="' + itemCard.attr('data-id') + '"][data-type="'
        + itemCard.attr('data-type') + '"]').length > 0){
            return;
        };
        $('.recentItemWrap').append(itemClone);

        if(itemCard.attr('data-type') === 'M'){
            $('#modalDotori').html(itemCard.find('.price').text())
            return;
        }
        $('.modalDesc').append(sel.clone());
        $('#modalDotori').html($('.modalDesc select').val() + '개');
    })

    $(document).on('change','.modalDesc select', function(){
        $('#modalDotori').text($(this).val() + '개');
    })

    $('.giftShopModal').on('click',function(e){
        if(!$(e.target).closest('.giftShopModalContent').length){
            $(this).hide();
        }
    })

    $('.giftModalTop img').on('click',function(){
        $('.giftShopModal').hide();
    })
});


function getProductMainHtml(){
    offset = 0;
    $.ajax({
        type: 'GET',
        url: '/giftShop',
        dataType: 'html',
        success: function(response){
            const html = $(response).find('.contentContainer');
            $('.contentContainer').replaceWith(html);
            itemMainPageItem();
            getPopularBgm();
            getPopularProduct();
        },
        error: function(error){
            console.error(error);
        }
    })
}

function getProductSubHtml(searchText){
    currentPage = 0;
    offset = 0;
    $.ajax({
        type: 'GET',
        url: '/giftShop/sub',
        dataType: 'html',
        success: function(response){
            $('.contentContainer').replaceWith(response);
            if(productType === 'BGM'){
                bgmGiftShop(searchText);//BGM 상품메뉴로 이동
                return;
            }
            giftShop(searchText);
        },
        error: function(error){
            console.error(error);
        }
    })
}

//전체보기 인기 BGM SELECT
function getPopularBgm(){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/main-gift/popular-bgm',
        success: function(response){
            response.forEach(function(bgm,index){
                index = index + 4;
                $('.itemImg img').eq(index).attr('src', bgm.filePath);
                $('.itemCard').eq(index).attr('data-id',bgm.bgmId);
                $('.itemCard').eq(index).attr('data-type','M');
                $('.itemDesc h3').eq(index).text(bgm.artist + '-' +bgm.bgmName);
                $('.itemDesc span').eq(index).text('BGM');
                $('.itemPricing .price').eq(index).html('<span>' + bgm.price + '개' + '</span>');
                $('.itemDesc input[type="hidden"]').eq(index).val(bgm.lyrics);
            })
        }
    })
}

function itemMainPageItem(){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/main-gift/new-item',
        success: function(response){
            response.forEach(function(product,index){
                $('.itemImg img').eq(index).attr('src',product.filePath);
                $('.itemCard').eq(index).attr('data-id',product.productId);
                $('.itemCard').eq(index).attr('data-type','P');
                $('.itemDesc h3').eq(index).text(product.productName);
                $('.itemDesc span').eq(index).text(product.productType);
                $('.itemDesc input[type="hidden"]').eq(index).val(product.productDesc);
                const prices = product.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').eq(index).html($('.itemCard').eq(index).find('.selectBox select').val() + '개');
            })
        }
    })
}

function getPopularProduct(){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/main-gift/popular-product',
        success: function(response){
            response.forEach(function(product,index){
                index = index + 8;
                $('.itemImg img').eq(index).attr('src',product.filePath);
                $('.itemCard').eq(index).attr('data-id',product.productId);
                $('.itemCard').eq(index).attr('data-type','P');
                $('.itemDesc h3').eq(index).text(product.productName);
                $('.itemDesc span').eq(index).text(product.productType);
                $('.itemDesc input[type="hidden"]').eq(index).val(product.productDesc);
                const prices = product.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').eq(index).html($('.itemCard').eq(index).find('.selectBox select').val() + '개');
            })
        }
    })
}

function giftShop(searchText){
    offset = currentPage * 12;
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/' + productType,
        data: {offset: offset,searchText: searchText},
        dataType: 'json',
        success: function(response){
            $('.itemTitle h2').text($('.menu-ul li.active').text());
            if(!response || response.length === 0){
                $('.itemWrap').empty();
                $('.itemWrap').html('<div class="emptySearch"><span>해당 검색어의 아이템이 존재하지 않습니다.</span></div>');
                return;
            }
            const select = $('.selectBox option');
            $('.selectBox select').val(select.eq(0).val());
            if(response.length === 12){
                $('.itemCard').fadeIn(0);
            }
            response.forEach(function(item,index){
                $('.itemImg img').eq(index).attr('src',item.filePath);
                $('.itemCard').eq(index).attr('data-id',item.productId);
                $('.itemCard').eq(index).attr('data-type','P');
                $('.itemDesc span').text($('.menu-ul li.active').text());
                $('.itemDesc h3').eq(index).text(item.productName);
                $('.itemDesc input[type="hidden"]').eq(index).val(item.productDesc);
                const prices = item.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').html($('.selectBox select').val() + '개');
            })
            if(response.length < 12){
                for(let i = 11; i >= response.length; i--){
                    $('.itemCard').eq(i).fadeOut(0);
                }
            }
            //선택 리스트에 있는 아이템은 체크유지
            $('.selectItemUl li').each(function(index,item){
                $('.itemCard[data-id="' + $(item).attr('data-id') + '"][data-type="'
                + $(item).attr('data-type') + '"]').find('.itemCheckBox').prop('checked',true);
            })
        },
        error: function(error){
            console.error(error);
        }
    })
}

function bgmGiftShop(searchText){
    offset = currentPage * 12;
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/bgm',
        data: {offset: offset,searchText: searchText},
        dataType: 'json',
        success: function(response){
            $('.itemTitle h2').text($('.menu-ul li.active').text());
            if(!response || response.length === 0){
                $('.itemWrap').empty();
                $('.itemWrap').html('<div class="emptySearch"><span>해당 검색어의 아이템이 존재하지 않습니다.</span></div>');
                return;
            }
            if(response.length === 12){
                $('.itemCard').fadeIn(0);
            }
            $('.selectBox').empty();

            response.forEach(function(item,index){
                $('.itemImg img').eq(index).attr('src',item.filePath);
                $('.itemCard').eq(index).attr('data-id',item.bgmId);
                $('.itemCard').eq(index).attr('data-type','M');
                $('.itemDesc span').text($('.menu-ul li.active').text());
                $('.itemDesc h3').eq(index).html(item.artist + '-' +item.bgmName);
                $('.price').eq(index).text(item.price);
                $('.itemDesc input[type="hidden"]').eq(index).val(item.lyrics);
            })
            if(response.length < 12){
                for(let i = 11; i >= response.length; i--){
                    $('.itemCard').eq(i).fadeOut(0);
                }
            }
            //선택 리스트에 있는 아이템은 체크유지
            $('.selectItemUl li').each(function(index,item){
                $('.itemCard[data-id="' + $(item).attr('data-id') + '"][data-type="'
                + $(item).attr('data-type') + '"]').find('.itemCheckBox').prop('checked',true);
            })
        },
        error: function(error){
            console.error(error);
        }
    })
}

//BGM ITEM 총 개수 가져오기
function getProductCount(searchText){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/count/' + productType,
        data: {searchText: searchText},
        dataType: 'json',
        success: function(response){
            totalPage = Math.ceil(response / 12);
            calculatePage();
        }
    })
}

function calculatePage(){
    let startPage = Math.max(1, currentPage - Math.floor(5 / 2));
    let endPage = Math.min(totalPage, startPage + 4);

    for(let i = startPage; i <= endPage; i++){
        if(i === startPage){
            $('.productPage').append(`
                <button class="active">${i}</button>
            `);
            continue;
        }
        $('.productPage').append(`
            <button>${i}</button>
        `);
    }
}