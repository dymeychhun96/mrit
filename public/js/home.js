$(function () {
  const contentMap = [
    {
      title: "Winrar KeyGen",
      url: `${location.origin}/winrar-keygen`,
      icon: "fa-solid fa-file-zipper",
    },
    {
      title: "Microsoft Key Checker",
      url: `${location.origin}/ms-key-check`,
      icon: "fa-brands fa-microsoft",
    },
    {
      title: "Microsoft Store online link generator",
      url: `${location.origin}/ms-store-gen`,
      icon: "fa-brands fa-microsoft",
    },
    {
      title: "Steam Manifest & Lua generator",
      url: `${location.origin}/steam-manifest`,
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
            <a href="${item.url}" class="btn btn-success" target="_blank">Open</a>
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
