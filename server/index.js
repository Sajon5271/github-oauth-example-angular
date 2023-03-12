const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
const client_id = 'Your_Client_id';
const client_secret = 'Your_Client_secret';

app.get("/userData/:code", (req, res, next) => {
  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.append("client_id", client_id);
  url.searchParams.append("client_secret", client_secret);
  url.searchParams.append("code", req.params.code);
  axios
    .post(
      url.toString(),
      {},
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then((tokenResponse) => {
      axios
        .get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        })
        .then((result) => {
          res.send({ user: result.data });
        });
    })
    .catch((err) => {
      console.log(err.data);
    });
});
app.listen(3000, () => {
  console.log("Listening on port http://localhost:3000");
});
