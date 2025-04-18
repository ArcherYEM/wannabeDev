let addItem = {};

$(document).ready(function(){
    //선물가게에서 아이템 추가 버튼 클릭 시 아이템 추가 html 띄우기
    $(document).on('click','#item-add-btn',function(){
        if($('.menu-ul').eq(1).find('li').hasClass('active')){
            getGiftShopAddBgmHtml();
            return;
        }
        getGiftShopAddItemHtml();
    })

    //가사 입력시 자동 높이 조절
    $(document).on('keyup','.addBgmLyricsWrap textarea',function(){
        resize(this);
    })

    //bgmAudio파일 선택시 audio 미리보기
    $(document).on('change','#bgmFile', function(){
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event){
            $('#addBgmPlayer').attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
    })

    //img파일 선택시 이미지 미리보기
    $(document).on('change','#itemFile',function(){
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event){
            $('#addItemImg').attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
    })

    //bgm 등록 누를시 bgm item 추가
    $(document).on('click','.addBgmSubmit button',function(){
        if($('.itemAddWrap input[type="text"]').val().trim() == ''){
            alert('빈칸에 값을 입력해주세요');
            return;
        }
        if($('.itemAddWrap input[type="file"]').val() == ''){
            alert('파일에 값을 넣어주세요');
            return;
        }
        const fileInput = $('#itemFile')[0];
        const audioInput = $('#bgmFile')[0];
        const player = $('#addBgmPlayer')[0];

        const form = new FormData();
        form.append('uploadFile', fileInput.files[0]);
        form.append('audioFile', audioInput.files[0]);
        form.append('artist',$('.addBgmSingerName input[type="text"]').val());
        form.append('genreCode',$('.addBgmGenre select').val());
        form.append('bgmName', $('.addItemName input[type="text"]').val());
        form.append('price',Number($('.addBgmDotori input[type="text"]').val()));
        form.append('lyrics',$('.addBgmLyricsWrap textarea').val());
        form.append('audioLength', Math.floor(player.duration));
        addBgmItem(form);
    })

    $(document).on('click','.addItemSubmit button',function(){
        const fileInput = $('#itemFile')[0];
        const file = fileInput.files[0];
        const itemCategory = $('.categoryAuthorWrap select').val();
        const itemAuthor = $('.categoryAuthorWrap input[type="text"]').val();
        const itemName = $('.addItemName input[type="text"]').val();
        const itemDesc = $('.addItemDesc textarea').val();
        let prices = [];
        $('.addItemDotoriPrice input[type="text"]').each(function(index, price){
            prices.push(
                Number($(price).val())
            )
        })
        const form = new FormData();
        form.append('uploadFile', file);
        form.append('productType', itemCategory);
        form.append('productAuthor',itemAuthor);
        form.append('productName', itemName);
        form.append('productDesc',itemDesc);
        $('.addItemDotoriPrice span').each(function(index, item){
            form.append('availDays',Number($(item).text().replace('일','')));
        })
        form.append('prices', prices);
        addProductItem(form);
    })
})

function getGiftShopAddItemHtml(){
    $.ajax({
        type: 'GET',
        url: '/giftShop/add-item',
        dataType: 'html',
        success: function(html){
            $('.contentContainer').replaceWith(html);
        },
        error: function(error){
            console.error(error);
        }
    })
}

function getGiftShopAddBgmHtml(){
    $.ajax({
        type: 'GET',
        url: '/giftShop/add-bgm',
        dataType: 'html',
        success: function(html){
            $('.contentContainer').replaceWith(html);
        },
        error: function(error){
            console.error(error);
        }
    })
}

function addProductItem(addItem){
    $.ajax({
        type: 'POST',
        url: '/api/product/add',
        data: addItem,
        processData: false,
        contentType: false,
        success: function(response){
            if(response === false){
                return Swal.fire({
                       title: "상품 저장 실패",
                       text: "해당 기능을 이용할 권한이 없습니다!",
                       icon: 'warning'
                });
            }
            Swal.fire({
                   title: "상품 저장 성공",
                   text: "상품이 성공적으로 저장했습니다!",
                   icon: 'success'
            });
        },
        error: function(error){
            console.error(error);
        }
    })
}

function addBgmItem(addBgm){
    $.ajax({
        type: 'POST',
        url: '/api/bgm/add',
        data: addBgm,
        processData: false,
        contentType: false,
        success: function(response){
            if(response === false){
                return Swal.fire({
                       title: "BGM 저장 실패",
                       text: "해당 기능을 이용할 권한이 없습니다!",
                       icon: 'warning'
                });
            }

            Swal.fire({
                   title: "BGM 저장 성공",
                   text: "BGM이 성공적으로 저장했습니다!",
                   icon: 'success'
            });
            getProductMainHtml();
        },
        error: function(error){
        }
    })
}

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

function resize(obj){
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
}