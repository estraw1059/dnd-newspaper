import { getAuth } from "firebase/auth";

var admin = require("firebase-admin");
var serviceAccount = require("../adminAPIKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
},
"serverApp");
export const auth = getAuth();