const sendEmail = require('../utils/EmailConfig');
const shippingDetail = require('./ShippingDetails');

const shop = {
    "ORID": "ORID1718852172362273",
    "userId": "65e4059ab9e7e07fff8f0290",
    "orderID": "order_OOrEu2ppDHIj7I",
    "paymentID": "pay_OOrFRVv9LDyLrB",
    "address": {
        "merci_name": "K Pramod",
        "merci_mobile": "9032889822",
        "merci_pincode": "500074",
        "merci_locality": "Hyderabad",
        "merci_address": "road no 2, omkarnagar, chintalkunta",
        "merci_city": "Hyderabad",
        "merci_state": "ANDHRA PRADESH",
        "merci_landmark": ""
    },
    "cartData": [
        {
            "merci_count": 1,
            "id": "65e41d76e3880bfa0dc92168",
            "merci_spu_id": "CJNSHLJW00041",
            "merci_mrp": "7224.28",
            "merci_prod_name": "Black bandage dress",
            "merci_prod_img": "https://cc-west-usa.cjdropshipping.com/2042/1424400484353.jpg",
            "status": 1,
            "refund": false
        }
    ],
    "total": 1105.31484,
    "shippingFee": 0,
    "discount": 1083.6419999999998,
    "purchasedDate": "2024-06-20T02:56:12.362Z",
    "returnDate": "2024-06-27T02:56:12.362Z",
    "discountData": [
        {
            "merchantId": "665b40c124e9a7adb2f3a1b8",
            "coupon": "WsnZJrHIZy",
            "valueUsed": 1083.64
        }
    ]
}
const res = sendEmail('pramodkumarkoppu@gmail.com', 'Your Order has been placed', shippingDetail(shop));
console.log(res);