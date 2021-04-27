function _instanceof(instance, Constructor) {
  let protoOfInstance = instance.__proto__
  const protoOfConstructor = Constructor.prototype

  while (protoOfInstance !== null) {
    if (protoOfInstance === protoOfConstructor) {
      return true
    }

    protoOfInstance = protoOfInstance.__proto__  //指向下一个proto
  }
  return false
}


class Car {
}

class Bus extends Car {
}

const bus1 = new Bus()
console.log(_instanceof(bus1, Bus))