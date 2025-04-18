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
    mousewheel: true,
    resistanceRatio: 0.5,
});

let searchText = '';
let totalPage = 0;
let currentPage = 0;
let offset = 0;
let productType ='';
const giftShopList = [" ","01","02","10","11","12","BGM"];
let selectedItems = [];
let itemCarts = [];
let totalPrice = 0;
let audio;
//장바구니에 같은 bgm있는지 체크

$(function () {

    itemMainPageItem();
    getPopularBgm();
    getPopularProduct();
    getItemCart();
    getCheckITemListByLocal();
    appendRecentItem();
    checkUserRole();

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
    $(document).on("click", '#item-down-arrow',function () {
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

        const checkItemId = $(this).closest('li').attr('data-id');
        const checkItemType = $(this).closest('li').attr('data-type');
        const availDay = $(this).closest('li').find('.selectItem select option:selected').text().replace('일','');

        if($('.cart .swiper-slide[data-id="' + $(this).closest('li').attr('data-id')
        + '"][data-type="' + $(this).closest('li').attr('data-type') + '"').length > 0){
        if(checkItemType === 'M'){
            return Swal.fire({
                   title: "장바구니 담기 오류",
                   text: "해당 BGM은 이미 장바구니에 존재합니다!",
                   icon: 'warning'
                });
            }
        }
        itemCarts.push({
            itemId : checkItemId,
            itemType : checkItemType,
            availDay : Number(availDay)
            });
        })
        if(itemCarts.length === 0){
            return;
        }
        addItemCart(itemCarts);
        }
    )

    //전체 선택 클릭시 itemCart 체크박스 전부 checked로 변환 및 선택한 아이템에 등록
    $(document).on('change','.itemAll input[type="checkbox"]',function(){
        //cookie에 있는 값 가져오기
        let selectedItemsTmp = localStorage.getItem('selectedItem');
        selectedItems = selectedItemsTmp ? JSON.parse(selectedItemsTmp) : [];
        if(!$(this).prop('checked')){
            $('.itemCheckBox').prop('checked',false);
            $('.itemCard').each(function(index,item){
                const dataId = $(item).attr('data-id');
                const dataType = $(item).attr('data-type');
                selectedItems = selectedItems.filter(function(item){
                    return !(item.itemId === dataId && item.itemType === dataType);
                })
            })
            localStorage.setItem('selectedItem',JSON.stringify(selectedItems));
            getCheckITemListByLocal();
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
            selectedItems.push({
                itemId : $(item).attr('data-id'),
                itemType : $(item).attr('data-type'),
                availDay :Number($(item).find('select option:selected').text().replace('일','')),
                itemName : $(item).find('.itemDesc h3').text(),
                itemPath : $(item).find('.itemImg img').attr('src'),
            });
        })
        localStorage.setItem('selectedItem',JSON.stringify(selectedItems));

        getCheckITemListByLocal();
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
            selectedItems = JSON.parse(localStorage.getItem('selectedItem'));
            selectedItems = selectedItems.filter(function(item){
                return !(checkItemId === item.itemId && checkItemType === item.itemType);
            })
            localStorage.setItem('selectedItem',JSON.stringify(selectedItems));
            getCheckITemListByLocal();
            return;
        };
            selectedItems.push({
                itemId : itemCard.attr('data-id'),
                itemType : itemCard.attr('data-type'),
                availDay :Number(itemCard.find('select option:selected').text().replace('일','')),
                itemName : itemCard.find('.itemDesc h3').text(),
                itemPath : itemCard.find('.itemImg img').attr('src'),
            });
            localStorage.setItem('selectedItem',JSON.stringify(selectedItems));
            getCheckITemListByLocal();
    })

    //중앙 아이템에 장바구니 아이콘 클릭시 장바구니에 해당 아이템 추가
    $(document).on('click','.itemBuy .itemCart',function(){
        const itemCard = $(this).closest('.itemCard');
        const checkItemId = itemCard.attr('data-id');
        const checkItemType = itemCard.attr('data-type');

        if(checkItemType === 'M'){
            if($('.cart .swiper-slide[data-id="' + checkItemId + '"][data-type="' + checkItemType + '"]').length > 0){
                return Swal.fire({
                       title: "장바구니 담기 오류",
                       text: "해당 BGM은 이미 장바구니에 존재합니다!",
                       icon: 'warning'
                });
            };
        }
        const availDay = itemCard.find('select option:selected').text().replace('일','');
        itemCarts.push({
            itemId : checkItemId,
            itemType : checkItemType,
            availDay : Number(availDay)
        });
    if(itemCarts.length === 0){
        return;
    }
        addItemCart(itemCarts);
    })

    //검색창에 아이템명 검색 시 해당 리스트 가져와서 보여주기
    $(document).on('click','.itemSelectInput button',function(){
        searchText = $('.itemSelectInput input[type="text"]').val().trim();
        if(!searchText){
            return Swal.fire({
                   title: "검색 오류",
                   text: "검색창에 TEXT를 입력해주세요!",
                   icon: 'warning'
            });
            return;
        }
        getProductSubHtml(searchText);
        getProductCount(searchText);
    })

    //아이템에서 일수 변경시 해당 일 수에 맞는 도토리 개수로 변경
    $(document).on('change','.selectBox select',function(){
        const price = $(this).closest('.itemCard').find('.price');
        price.html($(this).val() + '개');
    })

    //선택한 아이템 영역에서 기간 변경시 해당 날짜에 맞는 도토리 개수로 변환
    $(document).on('change','.selectItem select',function(){
        const dotori = $(this).closest('li').find('.dotoriPrice');
        const clickSelect = $(this).closest('li');
        getItemPrice(clickSelect.attr('data-id'),clickSelect.find('option:selected').text().replace('일',''),
        clickSelect.attr('data-type'),dotori);
    })
    //가운데 아이템 클릭 및 왼쪽바에 최근 아이템 클릭시 상세 모달 띄우기 및 가운데에서 아이템 클릭시 최근 아이템에 해당 아이템 추가
    $(document).on('click','.itemDesc, .recentItem',function(){
        if($(this).is('.recentItem')){
            if($(this).attr('data-type') === "M"){
                getModalBgmData($(this).attr('data-id'));
                return;
            }
            getModalProductData($(this).attr('data-id'));
            return;
        }
        const itemCard = $(this).closest('.itemCard');
        const itemId = itemCard.attr('data-id');
        const itemType = itemCard.attr('data-type');
        const itemName = $(this).find('h3').text();
        const itemImg = itemCard.find('.itemImg img').attr('src');

        let recentItems = JSON.parse(localStorage.getItem('recentItem'));
        recentItems = recentItems ? recentItems : [];

        recentItems = recentItems.filter(function(item,index){
            return !(item.itemType === itemType && item.itemId === itemId);
        })

        recentItems.push({
            itemId : itemId,
            itemType :itemType,
            itemName : itemName,
            itemPath : itemImg,
        });

        if(recentItems.length > 3){
            recentItems.shift();
        }
        localStorage.setItem('recentItem',JSON.stringify(recentItems));
        if(itemType === "M"){
            getModalBgmData(itemId);
        }else{
            getModalProductData(itemId);
        }
        appendRecentItem(); // 최근 본 아이템에 해당 아이템 추가
    })
    //bgm 상세보기에서 맨 위에 30초 미리듣기 클릭시 30초동안 노래 듣기 가능
    $(document).on('click','.giftModalTop span',function(){
        $(this).toggleClass('active');
        audio = $('#bgmPlayer')[0];
        if($(this).hasClass('active')){
            audio.load();
            audio.play();
        audio.addEventListener('timeupdate',function(){
            if(audio.currentTime > 30){
                audio.pause();
                audio.currentTime = 0;
            }
        })
        return;
        }else{
            audio.pause();
            audio.currentTime = 0;
        }
    })

    $(document).on('change','.modalDesc select', function(){
        $('#modalDotori').text($(this).val() + '개');
    })
    //아이템 상세 보기에서 바깥 영역 클릭시 모달 닫기
    $('.giftShopModal').on('click',function(e){
        if(!$(e.target).closest('.giftShopModalContent').length){
            $(this).hide();
            $('#noteImg').hide();
            $('.giftModalTop span').hide();
            if(audio){
                audio.pause();
            }
            $('.giftModalTop span').removeClass('active');
        }
    })
    //아이템 상세 보기에서 x클릭시 모달 닫기
    $('.itemModalCloseImg').on('click',function(){
        $('.giftShopModal').hide();
        $('#noteImg').hide();
        $('.giftModalTop span').hide();
        if(audio){
            audio.pause();
        }
        $('.giftModalTop span').removeClass('active');
    })

    //선택한 이미지에 x클릭시 해당 아이템 쿠키에서 삭제
    $(document).on('click','.selectCloseImg',function(){
        const itemId = $(this).closest('li').attr('data-id');
        const itemType = $(this).closest('li').attr('data-type');

        selectedItems = JSON.parse(localStorage.getItem('selectedItem'));
        selectedItems = selectedItems.filter(function(item){
            return !(item.itemId === itemId && item.itemType === itemType);
        })
        localStorage.setItem('selectedItem',JSON.stringify(selectedItems),{path: '/giftShop'});
        getCheckITemListByLocal();
    })
    //아이템 상세에서 장바구니 버튼 클릭시 해당 아이템 장바구니로 보내기
    $('.modalBtn button').on('click',function(){
        if($(this).eq(1)){
        const modalContainer = $(this).closest('.modalDescContainer');
        const checkItemId = modalContainer.attr('data-id');
        const checkItemType = modalContainer.attr('data-type');

        if(checkItemType === "M"){
        if($('.cart .swiper-slide[data-id="' + checkItemId + '"][data-type="' + checkItemType + '"]').length > 0){
            return Swal.fire({
                   title: "장바구니 담기 실패",
                   text: "해당 BGM은 이미 장바구니에 담겨져있습니다!",
                   icon: 'warning'
                });
                return;
            };
        }
        const availDay = modalContainer.find('select option:selected').text().replace('일','');
        itemCarts.push({
            itemId : checkItemId,
            itemType : checkItemType,
            availDay : Number(availDay)
        });
        if(itemCarts.length === 0){
            return;
        }
            addItemCart(itemCarts);
        }
    })

});

//전체보기 클릭 및 처음 들어왔을때 보일 html
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
//왼쪽 메뉴바 클릭시 SubHtml 불러오기(전체보기 제외)
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
            })
            $('.selectItemUl li').each(function(index,item){
                $('.itemCard[data-id="' + $(item).attr('data-id') + '"][data-type="'
                + $(item).attr('data-type') + '"]').find('.itemCheckBox').prop('checked',true);
            })
        }
    })
}
//신규 아이템 가져오기
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
                const prices = product.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').eq(index).html($('.itemCard').eq(index).find('.selectBox select').val() + '개');
            })
            $('.selectItemUl li').each(function(index,item){
                $('.itemCard[data-id="' + $(item).attr('data-id') + '"][data-type="'
                + $(item).attr('data-type') + '"]').find('.itemCheckBox').prop('checked',true);
            })
        }
    })
}
//메인 페이지에 미니홈피 아이템 인기순으로 가져오기
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
                const prices = product.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').eq(index).html($('.itemCard').eq(index).find('.selectBox select').val() + '개');
            })
            $('.selectItemUl li').each(function(index,item){
                $('.itemCard[data-id="' + $(item).attr('data-id') + '"][data-type="'
                + $(item).attr('data-type') + '"]').find('.itemCheckBox').prop('checked',true);
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
            if(response.length === 12){
                $('.itemCard').fadeIn(0);
            }
            response.forEach(function(item,index){
                $('.itemImg img').eq(index).attr('src',item.filePath);
                $('.itemCard').eq(index).attr('data-id',item.productId);
                $('.itemCard').eq(index).attr('data-type','P');
                $('.itemDesc span').text($('.menu-ul li.active').text());
                $('.itemDesc h3').eq(index).text(item.productName);
                const prices = item.prices.split(',');
                $('.itemCard').eq(index).find('.selectBox option').each(function(index){
                    $(this).val(prices[index]);
                })
                $('.price').eq(index).html($('.selectBox select').eq(index).val() + '개');
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
            if($('.itemCheckBox:checked').length === response.length){
                $('.itemAll input[type="checkbox"]').prop('checked',true);
            }
            checkUserRole();
        },
        error: function(error){
            console.error(error);
        }
    })
}
//DB에 들어있는 BGM정보를 12개씩 가져오기 검색어 입력시 검색어의 맞는 아이템 가져오기
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
            checkUserRole();
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
//페이지네이션
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
//장바구니 버튼 클릭시 해당 아이템 장바구니 추가하기
function addItemCart(itemCarts){
    $.ajax({
        type: 'POST',
        url: '/api/user-cart/add',
        data: JSON.stringify(itemCarts),
        contentType: 'application/json',
        success: function(response){
            Swal.fire({
                   title: "장바구니 저장 성공",
                   text: "아이템이 장바구님에 담겨졌습니다!",
                   icon: 'success'
            });
            itemCarts.length = 0;
            getItemCart();
        },
        error: function(error){
            return Swal.fire({
                   title: "장바구니 담기 실패",
                   text: "로그인을 해주세요!",
                   icon: 'warning'
            });
            console.error(error);
        }
    })
}
//장바구니에 들어있는 미니홈피 아이템 가져오기
function getItemCart(){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/product',
        dataType: 'json',
        success: function(response){
            totalPrice = 0;
             $('.cart .swiper-wrapper').empty();
            response.forEach(function(item, index){
           let code = `
                <div class="swiper-slide" data-id="${item.itemId}" data-type="${item.itemType}">
                <div class="cart-slide-style">
                    <div><span>${item.itemName}</span>
                        <div>
                            <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                            <span class="dotoriCartPrice"></span>
                        </div>
                    </div>
                    <div class="selectCartItem">
                        <img class="cartCloseImg" src="/static/images/common/icon/close.png">
                        <img class="cartImg" src="${item.itemPath}">
                    </div>
                    <div><span>X${item.itemCount}</span></div>
                    </div>
                </div>`
        $('.cart .swiper-wrapper').append(code);

        if(item.itemType !== "M"){
            $('.selectCartItem').last().append(`
                <select>
                    <option>1일</option>
                    <option>3일</option>
                    <option>7일</option>
                    <option>30일</option>
                    <option>90일</option>
                    <option>365일</option>
                </select>
            `);
        $('.selectCartItem').eq(index).find('option').filter(function(){
            return $(this).text().replace('일','') == item.availDay;
        }).prop('selected',true);
            getItemPrice(item.itemId, item.availDay, item.itemType, $('.cart .dotoriCartPrice').eq(index),item.itemCount);
        }
    })
    getItemBgmCart();
        }
    })
}
//장바구니에 들어있는 BGM 가져오기
function getItemBgmCart(){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/bgm',
        dataType: 'json',
        success: function(response){
            response.forEach(function(item, index){
           let code = `
                <div class="swiper-slide" data-id="${item.itemId}" data-type="${item.itemType}">
                <div class="cart-slide-style">
                    <div><span>${item.itemName}</span>
                        <div>
                            <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
                            <span class="dotoriCartPrice"></span>
                        </div>
                    </div>
                    <div class="selectCartItem">
                        <img class="cartCloseImg" src="/static/images/common/icon/close.png">
                        <img class="cartImg" src="${item.itemPath}">
                    </div>
                    </div>
                </div>`
        $('.cart .swiper-wrapper').append(code);
            getItemPrice(item.itemId, item.availDay, item.itemType, $('.cart .dotoriCartPrice').last());
    })
    itemBuySwiper.update();
        }
    })
}
//체크 표시한 아이템 선택한 아이템 리스트에 저장(LOCALSTORAGE로 저장)
function getCheckITemListByLocal(){
    $('.selectItemUl').empty();

    const selectedItemsByCookie = localStorage.getItem('selectedItem');
    selectedItems = selectedItemsByCookie ? JSON.parse(selectedItemsByCookie) : [];

    selectedItems.forEach(function(item,index){
    let code = `<li data-id="${item.itemId}" data-type="${item.itemType}">
        <div><span class="selectItemName">${item.itemName}</span><div>
        <img class="dotoriImg" src="/static/images/common/icon/dotori.png">
        <span class="dotoriPrice"></span></div></div>
        <div class="selectItem"><img class="selectItemImg" src="${item.itemPath}">
        <img class="selectCloseImg" src="/static/images/common/icon/close.png">
        <input type="checkbox"></div></li>`
    $('.selectItemUl').append(code);
        if(item.itemType !== 'M'){
            $('.selectItem').last().append(`<select>
                <option>1일</option>
                <option>3일</option>
                <option>7일</option>
                <option>30일</option>
                <option>90일</option>
                <option>365일</option>
            </select>`);
        }
        getItemPrice(item.itemId,item.availDay,item.itemType,$('.dotoriPrice').eq(index), 1);
        $('.selectItem').last().find('option').filter(function(){
            return $(this).text().replace('일','') == item.availDay;
        }).prop('selected',true);
    })
}

//CART에 들어있는 아이템 가격 정보 가져오기 및 가격 총합 보여주기
function getItemPrice(itemId, availDay, itemType, inputPlace ,itemCount){
    $.ajax({
        type: 'GET',
        url: '/api/user-cart/read/price',
        data: {itemId, availDay, itemType},
        success: function(response){
            if(itemType == 'M'){
                itemCount = 1;
            }
            if(inputPlace.closest('.swiper-slide').length > 0){
                totalPrice += response * itemCount;
                $('#cartCnt').text('합계(' + $('.cart .swiper-slide').length + ')')
                $('#cartSum').text(totalPrice + '개');
            }
            inputPlace.text(response + '개');
        },
        error: function(error){
            console.error(error);
        }
    })
}

//bgm 아이템 클릭시 bgmAudioPath가져오기
function getBgmAudioPath(bgmId){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/bgm/audio-path/' + bgmId,
        success: function(response){
            if(!response){
            return Swal.fire({
                   title: "오디오 정보 읽기 실패",
                   text: "오디오 정보를 가져오는데 실패했습니다.!",
                   icon: 'warning'
            });
            }
            $('#bgmPlayer').attr('src',response);
        },
        error: function(error){
            console.error(error);
        }
    })
}

//가운데 아이템 클릭시 최근 본 아이템에 추가
function appendRecentItem(){
        let recentItems = JSON.parse(localStorage.getItem('recentItem'));
        recentItems = recentItems ? recentItems : [];

        $('.recentItemWrap').empty();
        let code = '';
        recentItems.forEach(function(item, index){
            code +=
            `<div class="recentItem" data-id="${item.itemId}" data-type="${item.itemType}">
                <img src="${item.itemPath}">
                <span>${item.itemName}</span>
            </div>`
        })
        $('.recentItemWrap').append(code);
}
//bgm 아이템 클릭시 해당 아이템 정보 보여주기
function getModalBgmData(bgmId){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/bgm/' + bgmId,
        success: function(response){
            $('.giftShopModal').show();
            $('.modalItemImg').attr('src',response.filePath);
            $('#productDesc').hide();
            $('.modalDesc select').remove();
            $('.bgmLyrics').show();
            $('#modalItemDesc').empty();
            $('.modalDescContainer').attr('data-id', response.bgmId);
            $('.modalDescContainer').attr('data-type', "M");
            $('.modalItemType').text('음반가게 ' + ' BGM');
            $('.modalDesc h2').text('노래 이름: ' + response.bgmName)
            $('.bgmLyrics').text(response.lyrics);
            $('#noteImg').show();
            $('.giftModalTop span').show();
            getBgmAudioPath(bgmId); // bgm audio path값 가져오기

        $('#modalDotori').html(response.price);
        },
        error: function(error){
            console.error(error);
        }
    })
}

//미니홈피 아이템 클릭시 해당 아이템 정보 보여주기
function getModalProductData(productId){
    $.ajax({
        type: 'GET',
        url: '/api/giftShop/read/gift/product/' + productId,
        success: function(response){
            $('.modalDesc select').remove()
            $('.giftShopModal').show();
            $('.modalItemImg').attr('src',response.filePath);
            $('#productDesc').show();
            $('.bgmLyrics').hide();
            $('.modalDescContainer').attr('data-id', response.productId);
            $('.modalDescContainer').attr('data-type', "P");
            $('.modalItemType').text('미니홈피 ' + response.productType);
            $('.modalDesc h2').text('아이템 이름: ' + response.productName);
            $('#modalItemDesc').text(response.productDesc);
            $('.modalItemDescWrap').append(`<select>
                <option>1일</option>
                <option>3일</option>
                <option>7일</option>
                <option>30일</option>
                <option>90일</option>
                <option>365일</option>
            </select>`);
            const prices = response.prices.split(',');
            $('.modalDesc option').each(function(index, option){
                $(option).val(prices[index]);
            })
                $('#modalDotori').text($('.modalDesc select').val() + '개');
        },
        error: function(error){
            console.error(error);
        }
    })
}

function checkUserRole(){
    $.ajax({
        type: 'GET',
        url: '/giftShop/check/role',
        success: function(response){
            if(response === true){
                $('#item-add-btn').show();
            }
        },
        error: function(error){
            console.error(error);
        }
    })
}