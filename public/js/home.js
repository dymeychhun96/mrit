$(function () {
  const contentMap = [
    {
      title: "Winrar KeyGen",
      url: `/winrar-keygen`,
      icon: "fa-solid fa-file-zipper",
    },
    {
      title: "Microsoft Key Checker",
      url: `/ms-key-check`,
      icon: "fa-brands fa-microsoft",
    },
    {
      title: "Microsoft Store Apps",
      url: `/ms-store-gen`,
      icon: "fa-brands fa-microsoft",
    },
    {
      title: "Steam Manifest & Lua",
      url: `/steam-manifest`,
      icon: "fa-brands fa-steam",
    },
  ];

  let htmlContent = "";
  if (contentMap.length > 0) {
    contentMap.forEach((item) => {
      htmlContent += `
    <div class="col p-3">
        <div class="card h-100 shadow-sm">
        <div class="card-body">
            <div class="card-title"><i class="${item.icon} fa-xl"></i> ${item.title}</div>
            <p class="card-text"></p>
        </div>
        <div class="card-footer">
         <a href="${location.origin}${item.url}" class="btn btn-success btn-sm" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open</a>
        </div>
        </div>
    </div>`;
    });

    $("#rowCard").html(htmlContent);
  }

  $(document).on(
    {
      mouseenter: function () {
        $(this).removeClass("shadow-sm").addClass("shadow");
      },
      mouseleave: function () {
        $(this).removeClass("shadow").addClass("shadow-sm");
      },
    },
    ".card"
  );
});
