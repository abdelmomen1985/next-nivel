import axios from "axios";

export async function getRemoteSchemaUrl() {
  let remoteSchemaUrl = "";
  const { data } = await axios.post(
    "https://nivel-remote.hasura.app/v1/metadata",
    {
      type: "export_metadata",
      args: {},
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.ADMIN_SECRET,
      },
    }
  );
  if (data?.remote_schemas[0]?.definition?.url) {
    remoteSchemaUrl = ("" + data?.remote_schemas[0]?.definition?.url).replace(
      "/graphql",
      ""
    );
  }
  console.log("remoteSchemaUrl", remoteSchemaUrl);
  // Convert http to https
  if (remoteSchemaUrl.includes("http://"))
    remoteSchemaUrl = remoteSchemaUrl.replace(
      "http://",
      "https://adyyagkqbq.cloudimg.io/v7/"
    );
  return remoteSchemaUrl;
}
