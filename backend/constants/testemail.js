// const sendEmail = require('../utils/EmailConfig');
// const shippingDetail = require('./ShippingDetails');

// const shop = {
//     "ORID": "ORID1718852172362273",
//     "userId": "65e4059ab9e7e07fff8f0290",
//     "orderID": "order_OOrEu2ppDHIj7I",
//     "paymentID": "pay_OOrFRVv9LDyLrB",
//     "address": {
//         "merci_name": "K Pramod",
//         "merci_mobile": "9032889822",
//         "merci_pincode": "500074",
//         "merci_locality": "Hyderabad",
//         "merci_address": "road no 2, omkarnagar, chintalkunta",
//         "merci_city": "Hyderabad",
//         "merci_state": "ANDHRA PRADESH",
//         "merci_landmark": ""
//     },
//     "cartData": [
//         {
//             "merci_count": 1,
//             "id": "65e41d76e3880bfa0dc92168",
//             "merci_spu_id": "CJNSHLJW00041",
//             "merci_mrp": "7224.28",
//             "merci_prod_name": "Black bandage dress",
//             "merci_prod_img": "https://cc-west-usa.cjdropshipping.com/2042/1424400484353.jpg",
//             "status": 1,
//             "refund": false
//         }
//     ],
//     "total": 1105.31484,
//     "shippingFee": 0,
//     "discount": 1083.6419999999998,
//     "purchasedDate": "2024-06-20T02:56:12.362Z",
//     "returnDate": "2024-06-27T02:56:12.362Z",
//     "discountData": [
//         {
//             "merchantId": "665b40c124e9a7adb2f3a1b8",
//             "coupon": "WsnZJrHIZy",
//             "valueUsed": 1083.64
//         }
//     ]
// }
// const res = sendEmail('pramodkumarkoppu@gmail.com', 'Your Order has been placed', shippingDetail(shop));
// console.log(res);


const newsEmail = require('../utils/NewsEmail');

const subject  = 'Test Email for Newsletter'

const htmlMsg = () => {
    return (
        `<div style="width:100%;height:100%;margin:0;padding:0;background-color:#ffffff;font-family:'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300" bgcolor="#ffffff">
  <img style="width:1px;height:1px" src="https://ci3.googleusercontent.com/meips/ADKq_NaWOIWcHT6-n1fCPWicmNTMmiWyijxZCVvZYlEZJtjio5RXaCVz1rmjgqoW3g29cybd3npTE0pmFDvl2cH7bjtwSmNBWRYx2Z76OrXLZtQdJi_3HxnisSO86BWpiwI3wW8ndPNaeqMZZ7_lvJ9RazLoCCw5JIWopNh_LQmZnmd9x6exA0SMdCHZ8ML3maYoHlp7fd1iiHbnETVmuQs50vEgr9pYxkWsOCx3uiSyf05ZBWqlLl6gVktf3JPYd6MzWTwwQJozcvJjTi1yJXr88dZh_4RJtFBhsoGxb00Wn7Hi9k0cgkuqHqX_FBfJ4BbUWhWRn75myXf01WlGXRa2zz6Iri6BrcNreSXrcnOSDK4q6q-JDekNk0yluXAq_60dQeeVDTCqIUrK4HV6z-DvR5W-RcXYVRoeUYiBtKvUpYLiXY1FKGgbdw2xr-nqrHs262D_lgtnpRexUAhfLSNkW0BX44HcmVla=s0-d-e1-ft#http://l.flipkart.com/t/open/Pqt5dGC5tS9HKrZzbsZoVOhZhiPC7Bv41RRrGFh9HlYz_pVbST7v37fQtap4XYMMnDPOJHSUgyx9DrLzlXUjwFTGUzZOW7vYSMi4xN0GiWKRoRmHRBQnz05ST2KEUfQp_MJVNeqy7ogu7FxkNO-SjK_ZuTHAhjzfYxBWukz0Z3hI3zxu8DFDyB-U8EgIjJlCgchVzd98IYs3C8NFD6Qsny5Ffpe2QVCoRCy4FctibJEay3hoKLzpq8p9YNe3n3hCk8uF073o67CxTS2uUlD2u6mz_aJFj9hRYhL9p2x3BFs=?e=true" class="CToWUd" data-bit="iit"/>  
   
   
  <table width="100%" class="m_2986774326304328514body-wrapper" cellspacing="10" align="center" cellpadding="0"> 
   <tbody>
    <tr> 
     <td valign="top" align="center"> 
       
       
       
      <table width="100%" cellspacing="0" cellpadding="0"> 
       <tbody>
        <tr> 
         <td></td> 
         <td style="display:block;max-width:600px;margin:0 auto;clear:both"> 
          <table width="100%" cellspacing="0" cellpadding="0"> 
           <tbody>
            <tr> 
             <td valign="middle" align="left"> <font style="font-size:12px;font-family:Arial,Helvetica,sans-serif;color:#aaaaaa"> Trendiest rainwear of the season! </font> </td> 
            </tr> 
           </tbody>
          </table> </td> 
         <td></td> 
        </tr> 
       </tbody>
      </table> 
      <table width="100%" cellspacing="0" cellpadding="0"> 
       <tbody>
        <tr> 
         <td></td> 
         <td style="display:block;max-width:600px;margin:0 auto;clear:both"> 
          <table width="100%" cellspacing="0" cellpadding="0"> 
           <tbody>
            <tr>  
             <td valign="middle" height="50" align="right" width="25%"> <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHQBXVlcAUV4FDQoAAgFUDlFXUQVSUl0MD1EBAVhSAwQACANVVAZUCFJED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeLQpEbmFaSVJPBhMKVh5FIhlUVBVeU10GM3VyF04MEAQgVwVNVkASS2EFJ1leAEoPNgVKCkBuWBY3Qn4Hf04FfCgAdlVJRwBsb0IQNGRUVTw5BGJLd0l4Ex1HClZBQzNTVFFNUkVWXVNQSj4YdzBxVTQSTj9tX1dTEFZsXA5dBXQLcHR9VwcUClpbDRccHERXFCIIL1lscgpJUlEqTgEyZy1VQGNDYCxVRHADD1AhWSs7NV0MeVJnAytyCx5DZBIFJGxCf19QKE1OWQcbHAIIIDVOYidzd30NLlJvUwB9WQVST3Z8eFU9TkVkKSxpMkI0BlFrM29TYCk9fFwUVwQMfA9hRE90cQ9oD18WIFAFai1UGUEzeU51KT5BXVVBZAkFCUBdfm8MF19CBEs1d1VZKhRXCiFZD1srJXJ8DgJHCn8Dc3lJd0YRFGcAARtZBGorAU5MCkBNBBEwe2MGTEFWX1QLBWx7RiF/eVUoJkYBeCY0O3kKCGlEBABoTRx/dQBZHQt/TwB/EEh7WQs7f1BTHCBVc1dcUgRMFVlgJn9nLGEGDHwBYU4UDnlVEhBgNHYQAQdeNg93YyhRcQA1THIAQi8IQmgBBiZ6UWMeKHMBCD81VVY5bVVFAlBqdFVgcgdpUWsMC1huIlp5CxMAYzJTBBsVbS1pCmZVDURWC2BNGUEEWmxgXWIQcE0fASlpDUMyDhRNPkJPCVw=&amp;ext=ZT10cnVl" style="text-decoration:none;display:table" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHQBXVlcAUV4FDQoAAgFUDlFXUQVSUl0MD1EBAVhSAwQACANVVAZUCFJED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeLQpEbmFaSVJPBhMKVh5FIhlUVBVeU10GM3VyF04MEAQgVwVNVkASS2EFJ1leAEoPNgVKCkBuWBY3Qn4Hf04FfCgAdlVJRwBsb0IQNGRUVTw5BGJLd0l4Ex1HClZBQzNTVFFNUkVWXVNQSj4YdzBxVTQSTj9tX1dTEFZsXA5dBXQLcHR9VwcUClpbDRccHERXFCIIL1lscgpJUlEqTgEyZy1VQGNDYCxVRHADD1AhWSs7NV0MeVJnAytyCx5DZBIFJGxCf19QKE1OWQcbHAIIIDVOYidzd30NLlJvUwB9WQVST3Z8eFU9TkVkKSxpMkI0BlFrM29TYCk9fFwUVwQMfA9hRE90cQ9oD18WIFAFai1UGUEzeU51KT5BXVVBZAkFCUBdfm8MF19CBEs1d1VZKhRXCiFZD1srJXJ8DgJHCn8Dc3lJd0YRFGcAARtZBGorAU5MCkBNBBEwe2MGTEFWX1QLBWx7RiF/eVUoJkYBeCY0O3kKCGlEBABoTRx/dQBZHQt/TwB/EEh7WQs7f1BTHCBVc1dcUgRMFVlgJn9nLGEGDHwBYU4UDnlVEhBgNHYQAQdeNg93YyhRcQA1THIAQi8IQmgBBiZ6UWMeKHMBCD81VVY5bVVFAlBqdFVgcgdpUWsMC1huIlp5CxMAYzJTBBsVbS1pCmZVDURWC2BNGUEEWmxgXWIQcE0fASlpDUMyDhRNPkJPCVw%3D%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw2jw6xAEcO3bxmLPDwzh2d3"> <img src="https://ci3.googleusercontent.com/meips/ADKq_NaYaSpt43FHj3dgIeXuGXa7oc6qjM9XfuuMINeSwXSYmzJOxdivnYZyDPHuGBVcQgg305mImGw-gcAekTKRp__GdrHl2IGXNllG3iGCjvLeVQmsSZfAwSLi_g=s0-d-e1-ft#https://img1a.flixcart.com/www/email/images/20150609-174426-gift.png" style="border:none;color:#818181;font-size:9px;display:table-cell;margin-right:5px" class="CToWUd" data-bit="iit"/> <font face="Arial, sans-serif" color="#666666" style="display:table-cell;font-weight:bold;vertical-align:middle;text-align:left;text-transform:uppercase;font-size:10px">Gift Voucher</font> </a> </td> 
            </tr> 
           </tbody>
          </table> </td> 
         <td></td> 
        </tr> 
       </tbody>
      </table> </td> 
     <td></td> 
    </tr> 
   </tbody>
  </table> 
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF"> 
   <tbody>
    <tr> 
     <td style="display:block;margin:0 auto;clear:both;max-width:600px"> 
       
      <table border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF"> 
       <tbody> 
        <tr> 
         <td width="100%"> <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHQdRUQdSVF0FDVtRUAEHXQJQUVdVVwlQWwMFVwkGBFNTAF8EVFtTW1RED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUUMPA0MUUg5bKWIPWXkKRVgzYVVXAScGLXscE1p5CG0LezQgWQ4Jc2wOYCpbW1JAdklXQEgoJmITATIAV3cjX157KTV2TAxYdhhEHUBifWVaFA9yQS1YAwRFC1YFdw15DE07IHRsUQdBOHIGXFBWSG0XdwFHEg1mCx0dO1BRMmBBZwgsREMWG19Tdi9ZdGx3VQ9eYmZQI3lUXFNQLlsjcUhBKgh1cQxaWFhTKWBlYHlVHVFNaDADfBJkLggrUiBack5XJ3Z2BXB4G2IjSVMMSmY8U3p4ESpFBX0sVVpIBWBaYywWCVUdW3M4ejRnRFJ7ViB+UnYOEWEjaA0ZE1AJfQsAJiVhQQN7eFkJD3ZnYQd4XFJACzYZXwFCFgcOcwNcTUxYB2NICwdZD0UDAUxgakMuf1JGDChJDHoMEzN8N21CbDUQA1ANUUY3ZyNPBQl8eQJ+VEArN1koAgYWUA1WWnJ/GyFKYTN7bjkEU04Cd2dYJUpOYCQpZB5CMS0FYAN1CXUjCXhQEHgNMlhTdmVgBXEWYw4AHxRoFGkPOixvX0BUflY9engTDl9TXVAARw4HZ1BjUmctVXMwQiEzMVlQa0pAAxZ5dBFuDDJbAX4NTHJYNAxmdzwgBFNyUiwbVDUKcHYRUXJcLUMGD0k9XUQJQHYFc0ZBDAZeAkE/OjNfKX9yAwVJRn8QclMlYgpJGHAEAjtqb2NTD1A+ZCEZE10HD0xDVwJGeBdzY1hBPW0DUlVWIWNWQz8WBRFpEDEsZzFechk+AB1THldDK3YVU3YBXkRWTH15AVw=&amp;ext=ZT10cnVl" style="display:block;border:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHQdRUQdSVF0FDVtRUAEHXQJQUVdVVwlQWwMFVwkGBFNTAF8EVFtTW1RED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUUMPA0MUUg5bKWIPWXkKRVgzYVVXAScGLXscE1p5CG0LezQgWQ4Jc2wOYCpbW1JAdklXQEgoJmITATIAV3cjX157KTV2TAxYdhhEHUBifWVaFA9yQS1YAwRFC1YFdw15DE07IHRsUQdBOHIGXFBWSG0XdwFHEg1mCx0dO1BRMmBBZwgsREMWG19Tdi9ZdGx3VQ9eYmZQI3lUXFNQLlsjcUhBKgh1cQxaWFhTKWBlYHlVHVFNaDADfBJkLggrUiBack5XJ3Z2BXB4G2IjSVMMSmY8U3p4ESpFBX0sVVpIBWBaYywWCVUdW3M4ejRnRFJ7ViB%2BUnYOEWEjaA0ZE1AJfQsAJiVhQQN7eFkJD3ZnYQd4XFJACzYZXwFCFgcOcwNcTUxYB2NICwdZD0UDAUxgakMuf1JGDChJDHoMEzN8N21CbDUQA1ANUUY3ZyNPBQl8eQJ%2BVEArN1koAgYWUA1WWnJ/GyFKYTN7bjkEU04Cd2dYJUpOYCQpZB5CMS0FYAN1CXUjCXhQEHgNMlhTdmVgBXEWYw4AHxRoFGkPOixvX0BUflY9engTDl9TXVAARw4HZ1BjUmctVXMwQiEzMVlQa0pAAxZ5dBFuDDJbAX4NTHJYNAxmdzwgBFNyUiwbVDUKcHYRUXJcLUMGD0k9XUQJQHYFc0ZBDAZeAkE/OjNfKX9yAwVJRn8QclMlYgpJGHAEAjtqb2NTD1A%2BZCEZE10HD0xDVwJGeBdzY1hBPW0DUlVWIWNWQz8WBRFpEDEsZzFechk%2BAB1THldDK3YVU3YBXkRWTH15AVw%3D%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw2vAUyKVMlo5nyJmieVuS5N"> <img alt="wildcraft Up to 40% Off " src="https://ci3.googleusercontent.com/meips/ADKq_NZEvhbFmLcWh90VQR7YLGsd17D3gqta-8uGt4su5AS_GRqUJKV9If2RmqI13C-T5y9jNDLiuUvfGCBJ9QtP0Tyj1aOSpRrKwcVHCzdYWzC9hWXvh5k1DMHvoOEE6k2akUQS=s0-d-e1-ft#https://rukminim1.flixcart.com/flap/920/460/image/c800eab0eda6a3e6.jpg?q=100" style="background-color:#f6f2e9;border:none;color:#818181;display:block;font-size:9px;width:600px" width="100%" class="CToWUd" data-bit="iit"/> </a> </td> 
        </tr> 
       </tbody> 
      </table> </td> 
    </tr> 
    <tr> 
     <td style="display:block;margin:0 auto;clear:both;max-width:600px"> 
       
      <table border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF"> 
       <tbody> 
        <tr> 
         <td width="100%"> <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHQFfAlxQBVtSAVkEVgdUXFAPAgUFBw0DXFMGUg8BBlRQV1NWVltWCQVED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUUMPA0MUUg5bKWIPWXkKRVgzYVVXAQBgNAkVVTFaN013fQcyeg8UcGAJQg8OY11Rfi1dVVYJO14lWBEqUWkqCEFVAwcCZhRyQldTAmB/aXFsAkleXgUGXgxzKgkMbVJMfn8MDncLPQ57LwEXCEZORUQDVk1+CAVrIFIRNAhqC093Vxk1B2pSD2YEHFxRfW1FQjUAeUswCQknSlUgJFI+YHVOKz5jSgJkWTlkEBVwTlFiPlNSWScFf15BEgEpT18AdV8oKkNgAUcFC1sxDlZ9dHUOfwZRVQJLImEmW1BzEn0ORVEPZH8DYXgEezdXVA5AWStUTldVOHoEelYwKxUsCFVbLlVbAElZBjtTC2gBYUJnOwplfx4uQVJTLjQ7agVdDnomVkR3FWlMCwg8c1kOAGxTT0cDJSNpD1lIAhJMJXRdZzhURHctVW0WeVxKcVBiQFFPZAMLN0A5UiAuOmw0DFtcIlB1fiVcUA0cNFUGVXZaVmhFQlU1XRRxEwk0XFRtam4LImAJD1RlBn0pSQxNR0QjAQcDVFB1X3gJUzFrM2pIQQ0AcXsxDlgreFBabApKDRNNXQMMM1oMVj8HO3IhFQsEMRFycw9GfQxnXVJUD0l2VUxoAwUwCAlXEiwJcA1nAXBTSWcPBnsEDnUqVHN3XV8WfE9YDhJSM341NFBgJHZPDRACRmZdQVwYayJxZHBjXSh9U38jMUJRQSw3MQEwTQ1YNQ9fQVxeBBJzNnxAeAFgElZ6VBAkYR9UIyFabCFCcVoXHWlfEBtrPgNSClZwen1WQXIKLBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ==&amp;ext=ZT10cnVl" style="display:block;border:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHQFfAlxQBVtSAVkEVgdUXFAPAgUFBw0DXFMGUg8BBlRQV1NWVltWCQVED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUUMPA0MUUg5bKWIPWXkKRVgzYVVXAQBgNAkVVTFaN013fQcyeg8UcGAJQg8OY11Rfi1dVVYJO14lWBEqUWkqCEFVAwcCZhRyQldTAmB/aXFsAkleXgUGXgxzKgkMbVJMfn8MDncLPQ57LwEXCEZORUQDVk1%2BCAVrIFIRNAhqC093Vxk1B2pSD2YEHFxRfW1FQjUAeUswCQknSlUgJFI%2BYHVOKz5jSgJkWTlkEBVwTlFiPlNSWScFf15BEgEpT18AdV8oKkNgAUcFC1sxDlZ9dHUOfwZRVQJLImEmW1BzEn0ORVEPZH8DYXgEezdXVA5AWStUTldVOHoEelYwKxUsCFVbLlVbAElZBjtTC2gBYUJnOwplfx4uQVJTLjQ7agVdDnomVkR3FWlMCwg8c1kOAGxTT0cDJSNpD1lIAhJMJXRdZzhURHctVW0WeVxKcVBiQFFPZAMLN0A5UiAuOmw0DFtcIlB1fiVcUA0cNFUGVXZaVmhFQlU1XRRxEwk0XFRtam4LImAJD1RlBn0pSQxNR0QjAQcDVFB1X3gJUzFrM2pIQQ0AcXsxDlgreFBabApKDRNNXQMMM1oMVj8HO3IhFQsEMRFycw9GfQxnXVJUD0l2VUxoAwUwCAlXEiwJcA1nAXBTSWcPBnsEDnUqVHN3XV8WfE9YDhJSM341NFBgJHZPDRACRmZdQVwYayJxZHBjXSh9U38jMUJRQSw3MQEwTQ1YNQ9fQVxeBBJzNnxAeAFgElZ6VBAkYR9UIyFabCFCcVoXHWlfEBtrPgNSClZwen1WQXIKLBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ%3D%3D%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw0gOSvPpCKrPbhD9RIMpxt4"> <img alt="let it rain " src="https://ci3.googleusercontent.com/meips/ADKq_NaXxV9bAMY8MFqSDZf_cPuxvowYAg7onA7Fn7pAqTgKGGYuZJutMcft7c94UbnfiBK_Zuqtq9-h2P3fxN8kull5HRriuSSQAviASzqqKAr22yJfRD46APbO9hVDV4moo-hw=s0-d-e1-ft#https://rukminim1.flixcart.com/flap/920/460/image/db018338feeb7186.jpg?q=100" style="background-color:#f6f2e9;border:none;color:#818181;display:block;font-size:9px;width:600px" width="100%" class="CToWUd" data-bit="iit"/> </a> </td> 
        </tr> 
       </tbody> 
      </table> </td> 
    </tr> 
    <tr> 
     <td style="display:block;margin:0 auto;clear:both;max-width:600px"> 
       
      <table border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF"> 
       <tbody> 
        <tr> 
         <td width="100%"> <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHVNRBFYCVVsCWglXVAIIDwABAAdUXQgBD1RWXFwFUwVXBgMGVgUFDARED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BSF9QHXNTLgNbLFQrZ3xOVXBUTF9tFgwCFX0nElVeEQxiWgYrSHQjQHlYfCYBc1JBQyBwbUUQIlYKfBQtAA0UdFJ+VlMFXFRjAj5XIAtjewJDVlQAdVUsCCF1VQoSYARwYAYXMkcOL11+BmYgFXcPWwFdbEd3NQNBUkcrLjZPAU5gexE8CXs3YXAKQjFsfVFTW0lWeXQwC0I3VQw0TggXDAFnCQ1Uax5YZVYADwF+a2h/NQxfRjUSRi1cNhQrSgRxYWMwMWlXXVl+B1AxSn8Mag0HUUN5CjscLmoiPAR6FwFrVQ0tYGEGR0AHfiNNYg0DAVZRVkUSLn0wSFQ7CAhRV3ZdMy9pXipnWRlSKWFUfQZTN3NtQAc3Qj9nDSUaSAoKSUwyEndjMnoNVgAUTRhxUkAPTWV4FBRwOUokMVtxEHp8AwYsAw0Hf1oqdVMMfFJRcgZ2cXkgDwgDcx9UCmIDXXxXEzEGaTVTYARjMHd6SXJ7EU9/CgIpaAp4AgQIcCd0XmQOC3ENIX1BFUcIbUxzVAIsWkRmCQhGNXEMJxJpVWFaBAs3XEw0d2IpdSMNYVZTXBFjWX4XGVdXBxxQOWlUWXQHDSVqWhxUVg1ZNW1RT2EEU3ZUdBcYWx5lBjkFSlcBDlsSO2YIFUMDFFUcTkxVc1ILW1wBLideP1MvNgsOLVtOeyghfmwye1AbaT0JAF1WelxNb3gkDGYMZzo0CXJUX3EFJDNTXSVGUzlWDgxFUWUDFnYGeQ8iR1BKLw0HUDIMWnARPlxOVk4ABnIme29oXGYpZlFLKBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ==&amp;ext=ZT10cnVl" style="display:block;border:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHVNRBFYCVVsCWglXVAIIDwABAAdUXQgBD1RWXFwFUwVXBgMGVgUFDARED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BSF9QHXNTLgNbLFQrZ3xOVXBUTF9tFgwCFX0nElVeEQxiWgYrSHQjQHlYfCYBc1JBQyBwbUUQIlYKfBQtAA0UdFJ%2BVlMFXFRjAj5XIAtjewJDVlQAdVUsCCF1VQoSYARwYAYXMkcOL11%2BBmYgFXcPWwFdbEd3NQNBUkcrLjZPAU5gexE8CXs3YXAKQjFsfVFTW0lWeXQwC0I3VQw0TggXDAFnCQ1Uax5YZVYADwF%2Ba2h/NQxfRjUSRi1cNhQrSgRxYWMwMWlXXVl%2BB1AxSn8Mag0HUUN5CjscLmoiPAR6FwFrVQ0tYGEGR0AHfiNNYg0DAVZRVkUSLn0wSFQ7CAhRV3ZdMy9pXipnWRlSKWFUfQZTN3NtQAc3Qj9nDSUaSAoKSUwyEndjMnoNVgAUTRhxUkAPTWV4FBRwOUokMVtxEHp8AwYsAw0Hf1oqdVMMfFJRcgZ2cXkgDwgDcx9UCmIDXXxXEzEGaTVTYARjMHd6SXJ7EU9/CgIpaAp4AgQIcCd0XmQOC3ENIX1BFUcIbUxzVAIsWkRmCQhGNXEMJxJpVWFaBAs3XEw0d2IpdSMNYVZTXBFjWX4XGVdXBxxQOWlUWXQHDSVqWhxUVg1ZNW1RT2EEU3ZUdBcYWx5lBjkFSlcBDlsSO2YIFUMDFFUcTkxVc1ILW1wBLideP1MvNgsOLVtOeyghfmwye1AbaT0JAF1WelxNb3gkDGYMZzo0CXJUX3EFJDNTXSVGUzlWDgxFUWUDFnYGeQ8iR1BKLw0HUDIMWnARPlxOVk4ABnIme29oXGYpZlFLKBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ%3D%3D%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw1oipPu0iTD5FOVN-ZCYSKG"> <img alt="Raincoat" src="https://ci3.googleusercontent.com/meips/ADKq_NbCZ9znlEZGAIPg1HP6hloikFNZ3JNRgOyMJ1NRh6Hof1RBJLeSAZ33Vjq6cpUSDl281b-Awn2rGkury5YpeMGOz6h4frL35YljQR5r9v9grU27dt0H679LqgXB33Y7c-_E=s0-d-e1-ft#https://rukminim1.flixcart.com/flap/920/460/image/ac99bbd746e975dc.jpg?q=100" style="background-color:#f6f2e9;border:none;color:#818181;display:block;font-size:9px;width:600px" width="100%" class="CToWUd" data-bit="iit"/> </a> </td> 
        </tr> 
       </tbody> 
      </table> </td> 
    </tr> 
    <tr> 
     <td style="display:block;margin:0 auto;clear:both;max-width:600px"> 
       
      <table border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF"> 
       <tbody> 
        <tr> 
         <td width="100%"> <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHVBXVAMCBg9RXAgCUFBVCwEFDQAGB1tTCwZRAAEHAAUFVFIAUlNaWVZED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUAMMUmhBIkJlLUsuD1RDQA0HYFpINiR6EwQgMVUIMnNgXSwvZFs2UVcJVwxqXXhyXStSZEgpIlQNf1I2OUklbmJOMDQCdx5MZDVaUg0Nc2ICU19yAzRSVDBKHC8Baj5pVmMmBnVKERsAOUsDDF5dB19TU3taDQBUMGYIVw9BXlZVAFFJHXUWZlcTdg5yQ1R0ZVdeekpSWWEjB1w0B1YQWQlHUQZvXyl9chJ4PUFicWhWLAgaQwcEX1NKEygFT1cVdAAGU2YBDgBjVXsJe0NTSFMcbgFXFC8DVwVRMiRwKH1RZgkTdEMeYXIRWwABeXdUWlZXcQdRLEEwBSM1Il8/dUl5NylASy14ZCxDP3RiblNrA1BkUSkHRhdbLVoFbBJ9V1MTMF1wV3tnInkgbEBwc1UKUHwLCA1WEXwsOy9gMk5WbhcNYXMgVBlZUwMAcWt3bRdhY3BUO2QwUg4oKHJLdg1SN11Vbwp/cCdSK3pfckoDC2hRCgIGaCJ4FhInTw5ManFSKX0NVGRbUFwkf2UNZnoRCnR8IyUBM1wPEBtID1wODCtVXlFQXG45eBBcb0gFWBFfcQskEnBLYhEnTksgXl1dCStjfAwPBj5FVwp+CkpDLn9nfDMjZhZ+ExQNCRxrTFYqCQd4Jn9BDGYwd19dRlcPfHNbVjtVVHxRMTxfFHlOAC4peQtJZUwZeC5bB0NoUCJLcFZLLFonQVcKUAwAf1F6GRcAdihSAFVANAl6cXZEM2YAflYXejB4VSFVbCxnVlsNKHwKVmR7E0NTXFFfHQIcc1xGIBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ==&amp;ext=ZT10cnVl" style="display:block;border:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHVBXVAMCBg9RXAgCUFBVCwEFDQAGB1tTCwZRAAEHAAUFVFIAUlNaWVZED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeF05bTkVrO3FUZAQYZSt7XFYqWj8BUAMMUmhBIkJlLUsuD1RDQA0HYFpINiR6EwQgMVUIMnNgXSwvZFs2UVcJVwxqXXhyXStSZEgpIlQNf1I2OUklbmJOMDQCdx5MZDVaUg0Nc2ICU19yAzRSVDBKHC8Baj5pVmMmBnVKERsAOUsDDF5dB19TU3taDQBUMGYIVw9BXlZVAFFJHXUWZlcTdg5yQ1R0ZVdeekpSWWEjB1w0B1YQWQlHUQZvXyl9chJ4PUFicWhWLAgaQwcEX1NKEygFT1cVdAAGU2YBDgBjVXsJe0NTSFMcbgFXFC8DVwVRMiRwKH1RZgkTdEMeYXIRWwABeXdUWlZXcQdRLEEwBSM1Il8/dUl5NylASy14ZCxDP3RiblNrA1BkUSkHRhdbLVoFbBJ9V1MTMF1wV3tnInkgbEBwc1UKUHwLCA1WEXwsOy9gMk5WbhcNYXMgVBlZUwMAcWt3bRdhY3BUO2QwUg4oKHJLdg1SN11Vbwp/cCdSK3pfckoDC2hRCgIGaCJ4FhInTw5ManFSKX0NVGRbUFwkf2UNZnoRCnR8IyUBM1wPEBtID1wODCtVXlFQXG45eBBcb0gFWBFfcQskEnBLYhEnTksgXl1dCStjfAwPBj5FVwp%2BCkpDLn9nfDMjZhZ%2BExQNCRxrTFYqCQd4Jn9BDGYwd19dRlcPfHNbVjtVVHxRMTxfFHlOAC4peQtJZUwZeC5bB0NoUCJLcFZLLFonQVcKUAwAf1F6GRcAdihSAFVANAl6cXZEM2YAflYXejB4VSFVbCxnVlsNKHwKVmR7E0NTXFFfHQIcc1xGIBFFDlk/NFNSNg55UAQ3SFgGdQEHYQ%3D%3D%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw3USd1CXpUhHW5saclzk4Xn"> <img alt="Upto 40%off" src="https://ci3.googleusercontent.com/meips/ADKq_NYFNenF6kkJS_r_bKH6zhCs13tKzHPDuroGZfLc6-yz3YSRa4Dao4qAsWmMgjwjGnZD47evCxcuDnXhgjQNfMp_R90hLJpUsKE119xgJzsYLFMU1YqgBU97T8uA_R7O8Ett=s0-d-e1-ft#https://rukminim1.flixcart.com/flap/920/460/image/7739fbe20dccb706.jpg?q=100" style="background-color:#f6f2e9;border:none;color:#818181;display:block;font-size:9px;width:600px" width="100%" class="CToWUd" data-bit="iit"/> </a> </td> 
        </tr> 
       </tbody> 
      </table> </td> 
    </tr> 
   </tbody>
  </table> 
  <u></u><u></u> 
   
   
   
  <table width="100%" cellspacing="0" cellpadding="0"> 
   <tbody>
    <tr> 
     <td></td> 
     <td style="display:block;max-width:600px;margin:5px auto;clear:both"> 
      <table width="100%" cellspacing="0" cellpadding="0"> 
       <tbody>
        <tr> 
         <td valign="middle" height="50" align="left" width="40%"> <font face="Arial, sans-serif" style="display:table-cell;font-weight:500;vertical-align:middle;text-align:left;font-size:14px;padding-left:10px;font-style:italic;color:#717171">Quality Products. Delivered Fast.</font> </td> 
         <td valign="middle" height="50" align="left" width="20%"> <font face="Arial, sans-serif" style="display:table-cell;font-weight:500;vertical-align:middle;text-align:left;font-size:12px;padding-left:5px;font-style:italic;color:#717171"> <span style="font-weight:900;color:#16be48">✓</span> 6 Quality Checks</font> </td> 
         <td valign="middle" height="50" align="left" width="25%"> <font face="Arial, sans-serif" style="display:table-cell;font-weight:500;vertical-align:middle;text-align:left;font-size:12px;padding-left:5px;font-style:italic;color:#717171"> <span style="font-weight:900;color:#16be48">✓</span> Fast &amp; Free Delivery <sup> <span style="font-style:normal;color:#000"> <b>†</b> </span> </sup> </font> </td> 
        </tr> 
       </tbody>
      </table> </td> 
     <td></td> 
    </tr> 
   </tbody>
  </table> 
  <table width="100%" cellspacing="0" cellpadding="0"> 
   <tbody>
    <tr> 
     <td></td> 
     <td style="border-top:3px solid #333333;display:block;max-width:600px;margin:0 auto;clear:both"> 
      <table width="100%" cellspacing="0" cellpadding="0" align="center" style="font-family:Arial,serif;font-size:12px;font-weight:300"> 
       <tbody>
        <tr> 
         <td></td> 
         <td valign="top" width="100%"> <span style="float:right;color:#414041"> <sup> <b>†</b> </sup> on orders above Rs.500</span> </td> 
         <td></td> 
        </tr> 
       </tbody>
      </table> 
      <table width="100%" cellspacing="5" cellpadding="0" align="center" style="font-family:Arial,serif;font-size:12px;font-weight:300"> 
       <tbody>
        <tr> 
         <td align="center" valign="top" width="100%"> <font face="Arial, sans-serif" color="#333333" size="-1"> We hope you enjoy receiving <span class="il">news</span> and special offer emails from <span class="il">Flipkart</span>.com. If you would prefer not receiving our emails, please <a href="http://delivery.ncb.flipkart.com/KCEUSP?id=88661=dkUABFwBAQRXHQYHAQBUWlkEDQgGUQYHAF0ABVIAXAgCDlEEBggOAVFQBlIFBFFWDFBED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU=&amp;fl=XU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeNwl9andaAmNvYgMnSAVvBxoCSyh+YAcXUx0AAlx9TEhQcFZ2cUYAFHJWBDV2HkUdLShIIVJVVQYRSFcUY0EiQT1JZgtYdTxKWkMVD0QtAC0hPFcUWVBZNw4DdQ0BThtyEkoFWF0DXU5YACwLCTF9CBIXQiJaTUQ5PVtcA352EHwubkxBYwQJTAdYAVFzDmRQVzUAVFNyAT4QWRRcREcpBTxOT3sdRiJSfmUhAgM+UjAkMFcyWRVnIjVTQwwFZgMIXHxeQUJfL35xdSoOfhV1UVYpbi9rb2EnXW9gD39gBVcmbGcUR20MflhCUAplLnwnOVEKCApBA1cPX04lfXMQZBV+b24AcytaRH4gTGReHQYhF2kKbG9YLQh6dytvATtWKX1RV1V1IQlZZhYbZVYICVcJCDEJclIYKGh+ElBHWV9UUE1JXl0iQHIfAwB2S2QMKQt+PkxNUgAUVmAzTlElSxBUbQlKWSh3WWgxIF5QYDQtFm8zdEpOKyd4fTV7YCAJU3FqT2RBUkl9AlMZQDFfVCdUUilCYUUwDF5RDXVSMX4yckNmVVUVQ1FeEAkAU1gMNQoKH3FOfDdVAFAXWVEWRlxrBmFeZD0UekUWEFs5WhwBWgg5dwxtWT5YCwBPTVV2UUhzDnlxNkNeCiosCCdqAicEVT55flEmXEFIVHRxC2srQkwORmIsYGcCMzRAVH4yOwhvXnFZRw4yfkkJcQYbWAIIfXNqYBNwVEI5EWIFRhEnLQw5UHdtEgpFczRfBRdIEA9lXFJSC30DAggwBSJxVjMRaB9beQlc&amp;ext=ZT10cnVl" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://delivery.ncb.flipkart.com/KCEUSP?id%3D88661%3DdkUABFwBAQRXHQYHAQBUWlkEDQgGUQYHAF0ABVIAXAgCDlEEBggOAVFQBlIFBFFWDFBED1UFUQlaUFIMWQgHDQFfAwUCW1JUAFIIV1IDWwAOXgEPDFkAVQgFUkhQB1cMBgkABlIODwtSVAVfAhkLF0wWAhcbBQFcUBJTRhgfC1tXF1ZYDUlcUxQVHwVfCEwoeyNta2ReDVRFEgU%3D%26fl%3DXU1ERF4WGF5IB10PQA4CEUxIW1dZThAfWghfVwoeNwl9andaAmNvYgMnSAVvBxoCSyh%2BYAcXUx0AAlx9TEhQcFZ2cUYAFHJWBDV2HkUdLShIIVJVVQYRSFcUY0EiQT1JZgtYdTxKWkMVD0QtAC0hPFcUWVBZNw4DdQ0BThtyEkoFWF0DXU5YACwLCTF9CBIXQiJaTUQ5PVtcA352EHwubkxBYwQJTAdYAVFzDmRQVzUAVFNyAT4QWRRcREcpBTxOT3sdRiJSfmUhAgM%2BUjAkMFcyWRVnIjVTQwwFZgMIXHxeQUJfL35xdSoOfhV1UVYpbi9rb2EnXW9gD39gBVcmbGcUR20MflhCUAplLnwnOVEKCApBA1cPX04lfXMQZBV%2Bb24AcytaRH4gTGReHQYhF2kKbG9YLQh6dytvATtWKX1RV1V1IQlZZhYbZVYICVcJCDEJclIYKGh%2BElBHWV9UUE1JXl0iQHIfAwB2S2QMKQt%2BPkxNUgAUVmAzTlElSxBUbQlKWSh3WWgxIF5QYDQtFm8zdEpOKyd4fTV7YCAJU3FqT2RBUkl9AlMZQDFfVCdUUilCYUUwDF5RDXVSMX4yckNmVVUVQ1FeEAkAU1gMNQoKH3FOfDdVAFAXWVEWRlxrBmFeZD0UekUWEFs5WhwBWgg5dwxtWT5YCwBPTVV2UUhzDnlxNkNeCiosCCdqAicEVT55flEmXEFIVHRxC2srQkwORmIsYGcCMzRAVH4yOwhvXnFZRw4yfkkJcQYbWAIIfXNqYBNwVEI5EWIFRhEnLQw5UHdtEgpFczRfBRdIEA9lXFJSC30DAggwBSJxVjMRaB9beQlc%26ext%3DZT10cnVl&amp;source=gmail&amp;ust=1718954983217000&amp;usg=AOvVaw0potAh0zWphaMudrhYcTnm">click 
here</a> to unsubscribe. <font style="font-size:12px;font-family:Arial,Helvetica,sans-serif;color:#aaaaaa"> </font> </font> </td> 
        </tr> 
       </tbody>
      </table> </td> 
     <td></td> 
    </tr> 
   </tbody>
  </table> 
  </div>`
    )
}

const res = newsEmail('pramodkumarkoppu@gmail.com', subject, htmlMsg());
console.log(res);