const placeHolderMap = {
  url: "https://www.microsoft.com/store/productId/9NSWSBXN8K03",
  ProductId: "9NKSQGP7F2NH",
  PackageFamilyName: "Microsoft.WindowsStore_8wekyb3d8bbwe",
  CategoryId: "d58c3a5f-ca63-4435-842c-7814b5ff91b7",
};

$("#type").change(function (e) {
  e.preventDefault();
  const valueSelected = $(this).val();

  let placeholder = placeHolderMap[valueSelected] || placeHolderMap["url"];

  $("#url").attr({
    placeholder: `Example: ${placeholder}`,
    title: `Example: ${placeholder}`,
  });
});

const handleSubmit = () => {
  const formData = {
    type: $("#type").val() || "url",
    url: $("#url").val(),
    ring: $("#ring").val() || "RP",
    lang: "km",
  };

  $.ajax({
    type: "POST",
    url: `${location.origin}/ms-app-gen`,
    contentType: "application/json",
    data: JSON.stringify(formData),
    beforeSend: () => {
      generateBtn.html(
        `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span class="visually-hidden" role="status">Loading...</span>`
      );

      generateBtn.prop("disabled", true);
    },
  })
    .then(
      (data) => {
        let tableBody = "";

        if (data.count == 0) {
          tableBody = `<tr><td colspan="4" class="text-center">The server returned an empty list. <br>
        Either you have not entered the link correctly, or this service does not support generation for this product.</td></tr>`;

          $("#resultInfo").removeClass("d-none");
          $("#tableBody").html(tableBody);

          return;
        }

        data.results.forEach((items) => {
          tableBody += `
          <tr>
            <td class="text-nowrap"><a class="text-decoration-none" href="${items.downloadUrl}" target="_blank">${items.fileName}</a></td>
            <td class="text-nowrap">${items.expire}</td>
            <td class="text-nowrap">${items.sha1}</td>
            <td class="text-nowrap">${items.size}</td>
          </tr>`;
        });

        showToast(
          "The links were successfully received from the Microsoft Store server."
        );

        $("#resultInfo").removeClass("d-none");
        $("#tableBody").html(tableBody);
      },
      (error) => {
        console.error(error);
      }
    )
    .always(() => {
      generateBtn.text("Generate");
      generateBtn.prop("disabled", false);
    });
};

$("#generateApp").validate({
  rules: {
    type: {
      required: true,
    },
    url: {
      required: true,
    },
    ring: {
      required: true,
    },
    lang: {
      required: true,
    },
  },
  messages: {
    type: {
      required: "",
    },
    url: {
      required: "",
    },
    ring: {
      required: "",
    },
    lang: {
      required: "",
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
