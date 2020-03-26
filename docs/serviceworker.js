self.addEventListener("push", function(event) {
  event.waitUntil(
    self.registration.showNotification("デスクトップ通知", {
      icon: "/images/directory.png",
      body: "新しいお知らせが届いています。", //このメッセージが出るだけになってしまうので、サーバ側でメッセージをどうにかできるか要調査
      tag: "push-test"
    })
  )
})