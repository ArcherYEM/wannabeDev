let addItem = {};

$(document).ready(function(){
    //선물가게에서 아이템 추가 버튼 클릭 시 아이템 추가 html 띄우기
    $(document).on('click','#item-add-btn',function(){
        getGiftShopAddItemHtml();
    })

    $(document).on('change','#itemFile',function(){
        const file = this.files[0];
        const reader = new FileReader();

        reader.onload = function(event){
            $('#addItemImg').attr('src', event.target.result);
        }
        reader.readAsDataURL(file);
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

function addProductItem(addItem){
    $.ajax({
        type: 'POST',
        url: '/api/product/add',
        data: addItem,
        processData: false,
        contentType: false,
        success: function(response){
            alert(response);
        },
        error: function(error){
            console.error(error);
        }
    })
}