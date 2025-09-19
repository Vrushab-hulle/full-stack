function x() {
  for (var index = 0; index < 5; index++) {
    function close(i) {
      setTimeout(function () {
        console.log(i);
      }, 1000);
    }
    close(index);
  }
}
x();
