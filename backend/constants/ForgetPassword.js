const forgetemail = (id) => {
  return (
    `<table
      style="width:100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tbody>
        <tr>
          <td
            class="m_5931381063415761062sm-px-6"
            style="padding-left:48px;padding-right:48px;padding-top:0"
          >
            <h1 style="font-size:1.875rem;line-height:2.25rem;font-weight:600">
              <span class="il">Reset</span> <span class="il">your</span> <span class="il">Password</span>
            </h1>
            <p style="margin-bottom:24px">
              You can change <span class="il">your</span>
              <span class="il">password</span> by clicking the button below.
            </p>
            <div style="line-height:100%">
              <a
                href= "https://www.merciemart.com/resetpass/${id}"
                style="text-decoration:none;display:inline-block;border-radius:8px;background-color:#0281f1;padding-left:16px;padding-right:16px;padding-top:14px;padding-bottom:14px;text-align:center;font-weight:600;color:white"
                target="_blank"
               >
                <span>
                  <span class="il">Reset</span> <span class="il">Password</span>
                </span>
              </a>
            </div>
            <p style="margin-bottom:16px;margin-top:24px">
              If you didn't ask to <span class="il">reset</span>
              <span class="il">your</span> <span class="il">password</span>, you
              can ignore this email.
            </p>
            <p style="margin-bottom:16px">— Merci Emart Team</p>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>`
  );
};

module.exports = forgetemail
