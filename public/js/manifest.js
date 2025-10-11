$(document).ready(function () {
  const gameDetail = (appId) => {
    let formData = {
      appids: appId,
    };
    $.ajax({
      type: "POST",
      url: `${location.origin}/get-game-detail`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      dataType: "json",
    }).then(
      (data) => {
        let gameData = data?.results[appId];
        let gameDataInfo = gameData?.data;

        if (!gameData.success) return;

        $("#gameInfo").html("");

        let contentHtml = `
         <div class="card" style="width: 18rem">
          <img src="${gameDataInfo.header_image}" class="card-img-top" alt="${gameDataInfo.name}" title="${gameDataInfo.name}">
          <div class="card-body">
            <h5 class="card-title">${gameDataInfo.name}</h5>
          </div>
        </div>
        `;

        $("#gameInfo").html(contentHtml);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const manifestGenerate = (gameName = "", appId) => {
    let generateBtn = $("#generateBtn");
    let formData = {
      appids: appId,
    };
    $.ajax({
      type: "POST",
      url: `${location.origin}/get-manifest`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      xhrFields: {
        responseType: "blob",
      },
      beforeSend: () => {
        generateBtn.html(
          `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span class="visually-hidden" role="status">Loading...</span> Generating...`
        );

        generateBtn.prop("disabled", true);
      },
    })
      .then(
        (blob) => {
          saveAs(blob, `${gameName}-${appId}.zip`);
          showToast("Successfully Generated.", toastBackgound.success);
        },
        (error) => {
          if (error.status == 500) {
            showToast(
              "Manifest file not found for this app ID.",
              toastBackgound.info
            );
            return;
          }

          console.log(error);
        }
      )
      .always(() => {
        generateBtn.text("Generate Manifest");

        generateBtn.prop("disabled", false);
      });
  };

  $("#steamAppId").on("input", function () {
    let appId = $(this).val();
    if (!appId) return;

    setTimeout(gameDetail(appId), 5000);
  });

  const getGameName = (appId) => {
    let formData = {
      appids: appId,
    };
    $.ajax({
      type: "POST",
      url: `${location.origin}/get-game-detail`,
      contentType: "application/json",
      data: JSON.stringify(formData),
      dataType: "json",
    }).then(
      (data) => {
        let gameData = data?.results[appId];
        let gameDataInfo = gameData?.data;

        if (!gameData.success) return;

        manifestGenerate(gameDataInfo.name, appId);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubmit = () => {
    let appId = $("#steamAppId").val().trim();

    if (!appId) return;
    getGameName(appId);
  };

  $("#formManifestGenerate").validate({
    rules: {
      steamAppId: {
        required: true,
      },
    },
    messages: {
      steamAppId: {
        required: "Steam app id is required.",
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
