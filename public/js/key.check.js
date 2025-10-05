$(document).ready(function () {
  let isProcessing = false;

  const handleSubmit = () => {
    let spinner = `<i class="fa-solid fa-spinner-scale fa-spin-pulse"></i> Checking...`;

    const keys = $("#inputKey").val().trim();
    // const keys = "MQWDM-6KKHD-9XYMJ-2WGBY-W67QT";

    if (!keys) return;

    if (isProcessing) return;

    const formData = {
      key: keys,
    };

    $.ajax({
      type: "POST",
      url: `${location.origin}/check-key`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      dataType: "json",
      beforeSend: () => {
        isProcessing = true;
        $("#checkBtn").html(spinner);
        $("#checkBtn").prop("disabled", true);
      },
    })
      .then(
        (data) => {
          console.log(data);
          if (!data.success) {
            showToast(data.error, toastBackgound.danger);
            return;
          }

          let contentHtml = "";
          data.results.forEach((item) => {
            contentHtml += `Key: ${item.keyname_with_dash}\nDescription: ${item.prd}\nSub type: ${item.sub}\nError code: ${item.err_code}\nRemaining: ${item.remaining}\nTime: ${item.datetime_checked_done}\n==============\n`;
          });

          $("#result").text(contentHtml);
          $("#resultContainer").removeClass("d-none");
          showToast("Successfully Checked!");
        },
        (error) => {
          console.log(error);
        }
      )
      .always(() => {
        isProcessing = false;
        $("#checkBtn").text("Check");
        $("#checkBtn").prop("disabled", false);
      });
  };

  handleSubmit();

  $("#formCheck").validate({
    rules: {
      inputKey: {
        required: true,
      },
    },
    messages: {
      inputKey: {
        required: "Keys is required!",
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
