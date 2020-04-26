var app = new Vue({
  el: "#app",
  data: {
    messages: [],
    messageToSend: "",
    encryptionKey: "",
    exportedKey: ""
  },
  mounted() {
    // Populate a default encryption key
    generateKey().then(function (encryptionKey) {
      this.app.encryptionKey = encryptionKey;

      exportKey(encryptionKey).then(function (exportedKey) {
        this.app.exportedKey = JSON.stringify(exportedKey);
      });

      // Initial fetch
      this.app.fetchMessages();

      // Regular fetch
      setInterval(() => {
        this.app.fetchMessages();
      }, 5000);

    });
  },
  methods: {
    fetchMessages: function () {
      console.log("Fetching messages");
      axios
        .get("../api/channels/" + channelUUID + "/messages")
        .then(function (response) {
          this.app.messages = response.data;

          // Iterate over the messages to decrypt the content
          this.app.messages.forEach(function (message) {
            const unpackagedCipherText = unpackageCipherText(message);
            decrypt(unpackagedCipherText.content, unpackagedCipherText.iv, this.app.encryptionKey).then(function (plainText) {
              message.content = plainText;
            }).catch(function (error) {
              message.content = "Unable to decrypt the message (" + error + ")";
            });
          });
        })
    },
    copyToClipboard: function (event) {
      const valueToCopy = event.currentTarget.innerText;

      const el = document.createElement("textarea");
      el.value = valueToCopy;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    sendMessage: function () {
      encrypt(this.messageToSend, this.encryptionKey).then(function (encrypt) {
        let packagedCipher = packageCipherText(encrypt);

        axios.post("../api/channels/" + channelUUID +"/messages", packagedCipher).then(function (response) {
          this.app.messageToSend = ""
        })
      })
    },
    purgeMessages: function () {
      axios.delete("../api/channels/" + channelUUID + "/messages")
    }
  }
})
