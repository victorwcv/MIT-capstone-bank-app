function generateBankAccNum() {
  let randomNumber = '';
  for (let i = 0; i < 15; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return `16-0001-${randomNumber}`;
}

//Exampe: '16-0001-395165081373663'

export default generateBankAccNum;