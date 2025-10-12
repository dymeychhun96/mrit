$(function () {
  const licenseGenerate = (uuid, email) => {
    let hash = md5(`${uuid}${email}`).slice(0, 25);
    let license = hash.match(/.{1,5}/g).join("-");
    let contentHtml = `Email: ${email}\nLicense: ${license}`;
    $("#result").text(contentHtml);
  };

  $("#generateBtn").on("click", function () {
    let uuid = "fd330f6f-3f41-421d-9fe5-de742d0c54c0";
    let ideValue = $("input[name='idetype']:checked").val();
    let email = $("#email").val().trim();

    if (!email) return;

    if (ideValue == "sublime") {
      licenseGenerate("", email);
      $("#instruction").html(`<h5> Quick Setup: Monokai Pro in Sublime Text</h5>
          <ol>
            <li>Install Monokai Pro plugin in Sublime Text</li>
            <li>Go to: Preferences > Package Settings > Theme - Monokai Pro > Settings - User</li>
            <li>Paste this code (replace with your info):
              <pre>
{
  "email": "your-email@example.com",
  "license_key": "xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
}
              </pre>
            </li>
            <li>Save and restart Sublime Text</li>
            <li>Done! You'll see a thank you popup</li>
          </ol>`);
      return;
    }

    licenseGenerate(uuid, email);
    $("#instruction").html(`<h5> Quick Setup: Monokai Pro in VS Code</h5>
          <ol>
            <li>Install Monokai Pro plugin in VS Code</li>
            <li>Press Ctrl+Shift+P → Search "Monokai Pro"</li>
            <li>Select "Monokai Pro - enter license"</li>
            <li>Enter your email + license key</li>
            <li>Done! Enjoy your activated Monokai Pro theme</li>
          </ol>`);
  });

  $(".downloadBtn").click(function () {
    let txt = $("#result").val().trim();

    if (!txt) return;

    let blob = new Blob([txt], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "Monokia License.txt");
    showToast("Successfully downloaded.");
  });
});
