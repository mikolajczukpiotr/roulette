class Draw {
  constructor() {
    this.option = ['red', 'green', 'blue']
    let _result = this.drawResult()
    this.getDrawResult = () => _result;

  }
 drawResult() {
    let colors = []
   for (let i = 0; i < this.option.length; i++){
     const index = Math.floor(Math.random()*this.option.length)
     const color = this.option[index]
     colors.push(color)
   }
   return colors
 }
}

const draw = new Draw()