$(function () {
  const handleSubmit = () => {
    let registerName = $("#registerName").val().trim();
    let licenseType = $("#licenseType").val();

    if (!registerName || !licenseType) return;

    registerName = `= ${registerName} =`;

    const license = Winrar_KeyGen(registerName, licenseType);
    const readme = `How do I Install and Register WinRAR?
 

Before you can register WinRAR, you need to purchase a license. The most convenient way to purchase your license is to order it online.

You can purchase your WinRAR license in our online shop and make your payment via any major credit card, PayPal or direct debit. Other local payment options may be available depending on your location.

Upon receipt of the license registration fee, you will receive an email containing an attachment with the registration key file that corresponds to the user name string (first and last name or company name) which you have chosen when ordering your license. This file is usually named rarkey.rar.

The registration email contains all the necessary installation and registration instructions, which are easy to follow.

Below is also a brief explanation of the registration procedure:

Please download the most current version of the WinRAR trial version in your language here.
Please install the WinRAR trial version on your computer with a simple double-click on the install archive.
Please register the WinRAR trial versions on your computer with a simple double-click on the archive, rarkey.rar, that we have sent you via e-mail.
After following the onscreen installation and registration instructions, you will see this message:

"This WinRAR copy has been successful registered. Thank you!"

To check if the registration was completed successfully, please open WinRAR and select the Help Tab at the top of the WinRAR window. Select About WinRAR and your registration details should be found in the bottom left-hand corner of the window.

Please make a backup of the file rarkey.rar.`;

    var zip = new JSZip();
    zip.file("rarreg.key", license);
    zip.file("readme.txt", readme);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "rarkey.rar");
    });
  };

  $("#winrarForm").validate({
    rules: {
      registerName: {
        required: true,
      },
      licenseType: {
        required: true,
      },
    },
    messages: {
      registerName: {
        required: "Register name is required!",
      },
      licenseType: {
        required: "License type is required!",
      },
    },
    errorElement: "span",
    errorPlacement: (error, element) => {
      error.addClass("invalid-feedback");
      element.closest("div").append(error);
    },
    highlight: (element) => {
      $(element).addClass("is-invalid");
    },
    unhighlight: (element) => {
      $(element).removeClass("is-invalid");
    },
    submitHandler: (form) => {
      handleSubmit();
    },
  });
});
