const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});
app.get("/winrar-keygen", (req, res) => {
  res.render("winrar", {
    title: "WinRAR Key Generator",
  });
});

app.post("/check-key", async (req, res) => {
  try {
    const key = req.body.key;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: "Keys are required!",
      });
    }

    const params = new URLSearchParams();
    params.append("action", "gcid_LC_Check88");
    params.append("keys", key);
    params.append("just_get_description", "0");

    const response = await axios.post(
      "https://msconfirmationid.com/wp-admin/admin-ajax.php",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({
      success: true,
      results: response.data.results || response.data,
    });
  } catch (error) {
    console.error("Error checking key");

    res.json({
      success: false,
      error: error.response?.data?.message || "Failed to check key",
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}`);
});
