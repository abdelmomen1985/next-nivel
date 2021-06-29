import { withIronSession } from "next-iron-session";

// agent@test.com W~JA5Tt`e&li
export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const user = req.session.get("user");
      if (user && user.id) {
        return res.status(200).send(JSON.stringify(user));
      }
      return res.status(403).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "REALESTATEPLATFORMCOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: "" + process.env.F0APP_SECRET,
  }
);
