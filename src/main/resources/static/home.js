var app = new Vue({
  el: '#app',
  data: {
    messages: [],
    messageToSend: ''
  },
  mounted() {
    // Initial fetch
    this.fetchMessages();

    // Regular fetch
    setInterval(() => {
      this.fetchMessages();
    }, 5000);
  },
  methods: {
    fetchMessages: function () {
      console.log('Fetching messages');
      axios
        .get('http://127.0.0.1:8080/api/channels/34025149-cec9-4927-a080-60d6267144db/messages')
        .then(response => (this.messages = response.data))
    },
    copyToClipboard: function (event) {
      const valueToCopy = event.currentTarget.innerText;

      const el = document.createElement('textarea');
      el.value = valueToCopy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },
    sendMessage: function () {
      axios.post('http://127.0.0.1:8080/api/channels/34025149-cec9-4927-a080-60d6267144db/messages', {
        content: this.messageToSend
      }).then(function (response) {
        this.app.messageToSend = ''
      })
    },
    purgeMessages: function () {
      axios.delete('http://127.0.0.1:8080/api/channels/34025149-cec9-4927-a080-60d6267144db/messages')
    }
  }
})