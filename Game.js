class Game {
  constructor() {

    this.stats = new Statistics();
    this.wallet = new Wallet(500);

    document.getElementById('start').addEventListener('click', this.startGame.bind(this));
    this.spanWallet = document.querySelector('.panel span.wallet');
    this.boards = [...document.querySelectorAll("div.color")];
    this.inputBid = document.getElementById('bid')
    this.spanResult = document.querySelector('.score span.result')
    this.spanGames = document.querySelector('.score span.number')
    this.spanWins = document.querySelector('.score span.win')
    this.spanLosses = document.querySelector('.score span.loss')


    this.render()
  }
  render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = '', stats = [0,0,0], bid = 0, wonMoney = 0) {
    this.boards.forEach((board, index) => {
      board.style.backgroundColor = colors[index]
    })
    this.spanWallet.textContent = money;
    if(result){
      result = `Wygrałeś ${wonMoney}$.`
    }else if(!result && result !== ''){
      result = `przegrałeś ${bid}$.`
    }
    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];

  }
  startGame() {
    if(this.inputBid.value < 1) return alert('Kwota, którą chcesz grac jest za mała')
    const bid = Math.floor(this.inputBid.value);

    if(!this.wallet.checkCanPlay(bid)) {
      return alert('masz za mało środków lub podana została nieprawidłowa wartość ')
    }
    this.wallet.changeWallet(bid,"-")
    this.draw = new Draw();
    const colors = this.draw.getDrawResult()
    const win = Result.checkWinner(colors)
    const wonMoney = Result.moneyWinInGame(win, bid)
    this.wallet.changeWallet(wonMoney)
    this.stats.addGameToStatictics(win, bid)
    console.log(this.stats.showGameStatistics())

    this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatistics(), bid, wonMoney)
  }
}