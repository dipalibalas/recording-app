const axios = require("axios");
const formData = require("form-data");
const fs = require("fs");

const subscriptionKey = "d3159e51f8e84e97805ae2ffce1e943d";
const region = "westeurope";

const sendAudioData = async (data) => {
  console.log(data);
  let form = new formData();
  form.append("file", fs.createReadStream(data));

  let headers = form.getHeaders();
  headers["Ocp-Apim-Subscription-Key"] = subscriptionKey;

  let url = `https://signature.${region}.cts.speech.microsoft.com/api/v1/Signature/GenerateVoiceSignatureFromFormData`;
  let response = await axios.post(url, form, { headers: headers });

  // get signature from response, serialize to json string
  return JSON.stringify(response.data.Signature);
};

// async function main() {
//   // use this voiceSignature string with conversation transcription calls below
//   let voiceSignatureString = await createProfile();
//   console.log(voiceSignatureString);
// }

module.exports = { sendAudioData };
