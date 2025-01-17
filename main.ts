// When Button A pressed do....
// 
// Set player to 999 in case Husky does  not recognise anything  
// 
// Set MaQueen to random of -1,0,1 ( Paper, Rock , Scissors)
// 
// Set Player to 0,-1,1 ( Rock, Paper, Scissors) depending on what ID Husky sees
// 
// If Player = 999 ( nothing in Husky view ) show sad face on MicroBit & Display "Anyone There ? " on Husky Screen
// 
// Otherwise call "compare " function to work out who won . ..
// If Draw display "D" on MicroBit & "Draw" on Husky
// If Maqueen show "M" on MicroBit & "MaQueen Wins" on Husky
// If Player display "P" on MicroBit & "Player Wins" on Husky
input.onButtonPressed(Button.A, function () {
    Player = 999
    Maqueen = randint(-1, 1)
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        Player = Rock
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        Player = Paper
    } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        Player = Scissors
    }
    if (Player != 999) {
        basic.clearScreen()
        Compare()
        if (Result == 2) {
            basic.showString("D")
            huskylens.writeOSD("Its A Draw!", 100, 100)
        } else if (Result == Maqueen) {
            basic.showString("M")
            huskylens.writeOSD("MaQueen Wins!", 100, 100)
        } else if (Result == Player) {
            basic.showString("P")
            huskylens.writeOSD("Player Wins!!", 100, 100)
        }
    } else {
        basic.showIcon(IconNames.Sad)
        huskylens.writeOSD("Anyone There?", 100, 100)
    }
})
// Function to work out who wins / draw
// 
// Algorithm is by Jeffrey  from "Never To Late To Learn" Website
// shorturl.at/afrzC
function Compare () {
    // If Result = 2 then game is a Draw
    Result = 2
    if (Player != Maqueen) {
        if (Math.abs(Player) == Math.abs(Maqueen)) {
            Result = Math.max(Player, Maqueen)
        } else {
            Result = Math.min(Player, Maqueen)
        }
    }
}
// Initialise connection to Husky
// 
// If successful switch to "Object Classification " mode
// Clear Husky Display  
// 
// Set Name for Each Husky Id ( not necessary but helps )
// Display "Rock Paper Scissors " on Husky screen 
// 
// Initialise variables
let Result = 0
let Player = 0
let Maqueen = 0
let Scissors = 0
let Paper = 0
let Rock = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.OBJECTCLASSIFICATION)
huskylens.clearOSD()
huskylens.writeName(1, "Rock")
huskylens.writeName(2, "Paper")
huskylens.writeName(3, "Scissors")
huskylens.writeOSD("Rock paper Scissors", 75, 30)
basic.pause(2000)
Rock = 0
Paper = -1
Scissors = 1
Maqueen = 0
Player = 0
Result = 0
// Get rID result of what Husky sees ( if known )
basic.forever(function () {
    huskylens.request()
})
