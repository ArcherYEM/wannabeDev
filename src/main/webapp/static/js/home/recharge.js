$(document).ready(function(){

    $("#rechargeTest").on("click", function() {

        let kakaoReadyRequest;
        let kakaoReadyResponse;
        let kakaoApproveRequest;
        let kakaoApproveResponse;

        kakaoReadyRequest = {
            "partner_order_id": "TEST_00000001",
            "item_name": "TEST_ITEM_NAME_00000001",
            "item_code": "TEST_ITEM_CODE_00000001",
            "quantity": 1,
            "total_amount": 100,
            "tax_free_amount": 100
        }

        $.ajax({
            type: "POST",
            url: "/api/v1/pay/kakaoReady",
            contentType: "application/json",
            dataType: 'json',
            data : JSON.stringify(kakaoReadyRequest),
            success: function (readyResponse) {
                kakaoReadyResponse = {
                    "tid": readyResponse.tid,
                    "partner_order_id": kakaoReadyRequest.partner_order_id,
                    // "partner_user_id" param으로 받음
                }

                $.ajax({
                    type: "POST",
                    url: "/api/v1/pay/saveKakaoApproveRequest",
                    contentType: "application/json",
                    dataType: 'json',
                    data: JSON.stringify(kakaoReadyResponse),
                    success: function (approveResponse) {
                        console.log("approve 성공" + approveResponse)
                    },
                    error: function (error) {
                        return;
                    }
                })

                window.open(readyResponse.next_redirect_pc_url, "kakaopay", "width: 200")
            },
            error: function (error) {
                console.log("kakako test ready fail")
                return;
            }
        });
    })
});