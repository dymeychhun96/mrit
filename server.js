const express = require("express");
const path = require("path");
const cheerio = require("cheerio");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();

// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

app.get("/ms-key-check", (req, res) => {
  res.render("check-key", {
    title: "Microsoft Key Checker",
  });
});

app.get("/winrar-keygen", (req, res) => {
  res.render("winrar", {
    title: "WinRAR Key Generator",
  });
});

app.get("/ms-store-gen", (req, res) => {
  res.render("ms-apps", {
    title: "Microsoft Store Generator",
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

app.post("/ms-app-gen", async (req, res) => {
  try {
    const { type, url, ring, lang } = req.body;

    if (!url || !type || !ring) {
      return res.status(400).json({
        success: false,
        error: "Url is required!",
      });
    }

    const params = new URLSearchParams();
    params.append("type", type);
    params.append("url", url);
    params.append("ring", ring);
    params.append("lang", lang);

    const response = await axios.post(
      "https://store.rg-adguard.net/api/GetFiles",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const results = [];

    $("table.tftable tbody tr").each((index, element) => {
      const $row = $(element);
      const $link = $row.find("td:first-child a");

      if ($link.length > 0) {
        results.push({
          fileName: $link.text().trim(),
          downloadUrl: $link.attr("href"),
          expire: $row.find("td:nth-child(2)").text().trim(),
          sha1: $row.find("td:nth-child(3)").text().trim(),
          size: $row.find("td:nth-child(4)").text().trim(),
        });
      }
    });

    res.json({
      success: true,
      count: results.length,
      results: results,
    });
  } catch (error) {
    console.error(`Error generating: ${error.message}`);

    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate",
    });
  }
});

// app.listen(port, () => {
//   console.log(`server is running on: http://localhost:${port}`);
// });

module.exports = app;
