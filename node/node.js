function* f() {
    for(var i = 0; true; i++) {
      var reset = yield i;
      console.log(reset);
      if(reset) { i = -1; }
    }
  }
  
  var g = f();
  
  g.next() // { value: 0, done: false }
  g.next() // { value: 1, done: false }
  g.next(true)