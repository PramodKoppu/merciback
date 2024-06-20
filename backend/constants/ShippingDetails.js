const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const formatDeliveryDate = (dateString) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 7);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const topbar = (ORID, OrderDate) => {
  return `<tr>
      <td align="left">
        <table
          width="350"
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="left"
        >
          <tbody>
            <tr>
              <td valign="top">
                <p style="font-family:Arial;color:#878787;font-size:12px;font-weight:normal;font-style:normal;font-stretch:normal;margin-top:0px;line-height:14px;padding-top:0px;margin-bottom:7px">
                  Hi
                  <span style="font-weight:bold;color:#191919">Customer,</span>
                </p>
                <p style="font-family:Arial;font-size:12px;color:#878787;line-height:14px;padding-top:0px;margin-top:0px;margin-bottom:7px">
                  Your order has been successfully placed.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          width="250"
          border="0"
          cellpadding="0"
          cellspacing="0"
          align="right"
        >
          <tbody>
            <tr>
              <td valign="top">
                <p style="font-family:Arial;color:#747474;font-size:11px;font-weight:normal;text-align:right;font-style:normal;line-height:14px;font-stretch:normal;margin-top:0px;padding-top:0px;color:#878787;margin-bottom:7px">
                  Order placed on
                  <span style="font-weight:bold;color:#000">${OrderDate}</span>
                </p>
                <p style="font-family:Arial;font-size:11px;color:#878787;line-height:14px;text-align:right;padding-top:0px;margin-top:0;margin-bottom:7px">
                  Order ID
                  <span style="font-weight:bold;color:#000">${ORID}</span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>`;
};

const detailsBar = (delivery, total, address) => {
  return `<tr>
    <td
      border="1"
      align="left"
      style="background-color:rgba(245,245,245,0.5);background:rgba(245,245,245,0.5);border:.5px solid #6ed49e;border-radius:2px;padding-top:20px;padding-bottom:20px;border-color:#6ed49e;border-width:.08em;border-style:solid;border:.08em solid #6ed49e"
    >
      <table
        width="360"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="left"
        style="margin-bottom:20px;padding-left:15px"
      >
        <tbody>
          <tr>
            <td valign="top">
              <img
                src="https://ci3.googleusercontent.com/meips/ADKq_Nb8Ig737KppeqTz0rRze8yvqw0l1dDqTZqOeBdt4ZTtMxzT5iTEq-uXU46rpx5FfGvo4i_1_Qv2qpvGiz8ObfaQTcvw6VUezaXldZAGuRCzFy14DA7P3NjIsWIyW-EHRjJ1lXmQGAYOPCBYjql3ZIE-GvaY9pDAzxTGhzgOAqcg=s0-d-e1-ft#https://rukminim1.flixcart.com/www/270/28/promos/07/03/2018/f0e74e39-2481-4e34-b8f6-d2ab80ac15fe.png?q=100"
                alt="journey"
                style="margin-bottom:20px"
                class="CToWUd"
                data-bit="iit"
              />
              <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-top:0px;margin-bottom:20px">
                <span style="display:inline-block;width:125px;vertical-align:top">
                  Delivery.
                </span>
                <span style="font-family:Arial;font-size:12px;font-weight:bold;line-height:1.42;color:#139b3b;display:inline-block;width:220px">
                  by ${delivery}
                </span>
              </p>
              <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-bottom:20px;margin-top:0px">
                <span style="display:inline-block;width:125px;min-width:125px;max-width:125px">
                  Amount Paid
                </span>
                <span style="font-family:Arial;font-size:12px;font-weight:bold;line-height:1.42;color:#139b3b;display:inline-block;width:220px">
                 Rs. ${total}
                </span>
              </p>
              <p style="margin-bottom:0px;margin-top:0">
                <a
                  href="https://www.merciemart.com"
                  style="background-color:rgb(41,121,251);color:#fff;padding:0px;border:0px;font-size:14px;display:inline-block;margin-top:0px;border-radius:2px;text-decoration:none;width:160px;text-align:center;line-height:32px;line-height:32px"
                  target="_blank"
                >
                  Manage Your Order
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        width="225"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="right"
        style="margin-bottom:20px;padding-right:15px"
      >
        <tbody>
          <tr>
            <td class="m_-461565116948036772col" valign="top" align="left">
              <div style="max-width:220px;padding-top:0px;margin-bottom:20px">
                <p style="font-family:Arial;font-size:14px;font-weight:bold;line-height:20px;color:#212121;margin-top:0px;margin-bottom:4px">
                  Delivery Address
                </p>
                <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-top:0px;margin-bottom:0">
                  ${address.merci_name} <br />
                  <span style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121">
                  ${address.merci_address},
                    <br /> ${address.merci_locality}<br /> ${address.merci_city},${address.merci_state},${address.merci_pincode}
                  </span>
                </p>
              </div>
              <p style="line-height:1.56;margin-top:0;margin-bottom:0">
                <span style="font-family:Arial;font-size:14px;font-weight:bold;text-align:left;color:#212121;display:block;line-height:20px;margin-bottom:4px">
                  SMS updates sent to
                </span>
                <span style="font-family:Arial;font-size:12px;color:#212121">
                ${address.merci_mobile}
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        width="600"
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="left"
        style="padding-left:15px;padding-right:15px"
      >
        <tbody>
          <tr>
            <td class="m_-461565116948036772col" valign="top" align="left">
              <p style="font-family:Arial;font-size:12px;text-align:left;color:#212121;padding-top:0px;padding-bottom:0px;line-height:19px;margin-top:0;margin-bottom:0">
                You will receive the next update when the item in your order is
                packed/shipped by the seller.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>`;
};

const greenmoneytab = (greenmoney) => {
  const { totalValue, coupons } = greenmoney.reduce(
    (acc, item) => {
      acc.totalValue += item.valueUsed;
      acc.coupons.push(item.coupon);
      return acc;
    },
    { totalValue: 0, coupons: [] }
  );

  const couponsString = coupons.join(",");

  return `<tr>
  <td
    align="left"
    valign="center"
    width="100%"
    style="padding:20px 0px 20px 0px"
  >
    <span style="font-family:Arial;font-size:14px;font-weight:bold;line-height:1.86;color:#212121">
      Your Green Money with this order
    </span>
  </td>
</tr>
 <tr>
                  <td>
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="max-width:600px;background:#ffffff;padding-bottom:20px"
                    >
                      <tbody>
                        <tr style="color:#212121;height:50px">
                          <td valign="middle" align="left">
                            <table
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="margin-top:0px"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <span style="font-size:13px">
                                     Green Money Rs. ${totalValue}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <span>
                                      <span style="font-size:11px;color:#878787">
                                        <span>
                                          The Coupons Used are <b>${couponsString}</b>
                                        </span>
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>`;
};

const shoppingTab = (shopping, date) => {
  return `<tr>
      <td valign="middle" width="120" align="center" style="padding-top:20px">
        <img
          border="0"
          src="${shopping.merci_prod_img}"
          alt="${shopping.merci_prod_name}"
          style="border:none;max-width:125px;max-height:125px"
        />
      </td>
      <td valign="top" align="left" style="padding-top:20px;padding-left:15px">
        <p
          style="margin-top:0;margin-bottom:7px"
        >
          ${shopping.merci_prod_name}
          <span style="min-width:100px;font-size:12px;font-weight:bold;padding-right:0px;line-height:20px;text-align:right;display:inline-block;float:right">
          Rs. ${shopping.merci_mrp}
          </span>
        </p>
        <p style="line-height:18px;margin-top:0px;margin-bottom:2px;font-family:Arial;font-size:12px;color:#212121">
          Delivery
          <span style="line-height:18px;font-family:Arial;font-size:12px;font-weight:bold;color:#139b3b">
            by ${date}
          </span>
        </p>
        <p style="line-height:18px;margin-top:0px;margin-bottom:2px;font-family:Arial;font-size:12px;color:#212121">
          <span style="float:right;font-size:12px;padding-right:5px">
            <span style="color:#878787;text-align:right;margin-right:5px">
              Shipping fee
            </span>
            <span style="float:right;text-align:right">Rs. 0.00</span>
          </span>
        </p>
        <p style="line-height:18px;margin-top:0px;margin-bottom:0px;font-family:Arial;font-style:normal;font-size:12px;font-stretch:normal;color:#212121">
          Qty: ${shopping.merci_count}
        </p>
      </td>
    </tr>`;
};

const generateHTML = (data, date) => {
  return data.map((item) => shoppingTab(item, date)).join("");
};

const totalsTab = (total) => {
  return `
  <table
              border="0"
              width="600"
              cellpadding="0"
              cellspacing="0"
              style="padding-right:20px;padding-left:20px;background-color:#fff;width:642px;max-width:642px"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="margin:0;max-width:600px;background:#ffffff"
                    >
                      <tbody>
                        <tr style="color:#212121;display:block;margin:0 auto;clear:both">
                          <td
                            align="left"
                            valign="top"
                            style="color:#212121;display:block"
                          >
                            <table
                              width="100%"
                              style="margin-bottom:0px;padding-top:20px;padding-bottom:20px;border-bottom:1px solid #f0f0f0"
                            >
                              <tbody>
                                <tr>
                                  <td width="40%"></td>
                                  <td align="right" width="34%">
                                    <p style="margin-top:14px;font-family:Arial;font-size:12px;text-align:right;color:#3f3f3f;padding-top:0px;margin-top:0;margin-bottom:3px">
                                      <span style="color:#3f3f3f;text-align:right">
                                        Item(s) total
                                      </span>
                                    </p>
                                  </td>
                                  <td>
                                    <p style="margin-top:14px;font-family:Arial;font-size:12px;text-align:right;color:#3f3f3f;padding-top:0px;margin-top:0;margin-bottom:3px">
                                      <span style="padding-right:0px">
                                        Rs. ${total}
                                      </span>
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="40%"></td>
                                  <td align="right" width="34%">
                                    <p style="margin-top:0px;font-family:Arial;font-size:14px;text-align:right;color:#3f3f3f;line-height:14px;padding-top:0px;margin-bottom:0">
                                      <span style="color:#212121;text-align:right;font-weight:bold">
                                        Amount Paid
                                      </span>
                                    </p>
                                  </td>
                                  <td>
                                    <p style="margin-top:0px;font-family:Arial;font-size:14px;text-align:right;color:#3f3f3f;padding-top:0px;margin-bottom:0">
                                      <span style="padding-right:0px;font-weight:bold">
                                        Rs. ${total}
                                      </span>
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            `;
};

const footerTab = () => {
  return `
    <table
              border="0"
              width="600"
              cellpadding="0"
              cellspacing="0"
              style="padding-right:20px;padding-left:20px;background-color:#fff;width:640px;max-width:640px"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="width:600px;max-width:600px;background:#ffffff"
                    >
                      <tbody>
                        <tr
                          style="color:#212121"
                        >
                          <td
                            align="left"
                            valign="top"
                            style="color:#212121;border-bottom:1px solid #f0f0f0"
                          >
                            <p style="font-family:Arial;font-size:14px;font-weight:bold;line-height:1.86;color:#212121">
                              Thank you for shopping with Merci Emart!
                            </p>
                            <p
                              style="font-family:Arial;font-size:12px;color:#212121;margin-bottom:5px"
                            >
                              Got Questions? Please get in touch with our 24x7 Customer Care
                            </p>
                            <br />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="width:600px;max-width:600px;margin-top:14px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              style="margin:0 auto;width:600px;max-width:600px;margin-top:4px"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    valign="top"
                                    class="m_-461565116948036772container"
                                    style="color:#2c2c2c;line-height:20px;font-weight:300;background-color:transparent"
                                  >
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <p style="font-family:Arial;font-size:10px;color:#878787">
                                              This email was sent from a
                                              notification-only address that
                                              cannot accept incoming email.
                                              Please do not reply to this
                                              message.
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
  `;
};
const shippingDetail = (shop) => {
  return `<table
      border="0"
      width="100%"
      height="100%"
      cellpadding="0"
      cellspacing="0"
      bgcolor="#f5f5f5"
    >
      <tbody>
        <tr>
          <td align="center" valign="top" bgcolor="#f5f5f5">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="width:640px;max-width:640px;padding-right:20px;padding-left:20px;background-color:#fff;padding-top:20px"
            >
              <tbody>
                ${topbar(shop.ORID, formatDate(shop.purchasedDate))}
                ${detailsBar(
                  formatDeliveryDate(shop.purchasedDate),
                  shop.total,
                  shop.address
                )}
                ${greenmoneytab(shop.discountData)}
                
               
                      </tbody>
                    </table>
                    <table
                      border="0"
                      width="600"
                      cellpadding="0"
                      cellspacing="0"
                      style="padding-right:20px;padding-left:20px;background-color:#fff;width:642px;max-width:642px;padding-top:0px;padding-bottom:0px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="padding-bottom:20px;border-bottom:1px solid #f0f0f0"
                            >
                              <tbody>
                               ${generateHTML(
                                 shop.cartData,
                                 formatDeliveryDate(shop.purchasedDate)
                               )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            ${totalsTab(shop.total)}
            ${footerTab()}
          </td>
        </tr>
      </tbody>
    </table>`;
};

module.exports = shippingDetail;
