$(function () {
  const contentMap = [
    { title: "Winrar KeyGen", url: `${location.origin}/winrar-keygen` },
    {
      title: "Microsoft Key Checker",
      url: `${location.origin}/ms-key-check`,
    },
    {
      title: "Microsoft Store online link generator",
      url: `${location.origin}/ms-store-gen`,
    },
  ];

  let htmlContent = "";
  if (contentMap.length > 0) {
    contentMap.forEach((item) => {
      htmlContent += `
    <div class="col p-3">
        <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
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
