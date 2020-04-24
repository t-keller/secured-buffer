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
        .get('../api/channels/' + channelUUID + '/messages')
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
      axios.post('../api/channels/' + channelUUID +'/messages', {
        content: this.messageToSend
      }).then(function (response) {
        this.app.messageToSend = ''
      })
    },
    purgeMessages: function () {
      axios.delete('../api/channels/' + channelUUID + '/messages')
    }
  }
})