var fulldeck = createFullDeck52();
fulldeck = randomize(fulldeck);
var hand = dealhand(fulldeck, 7);
var visible = [];
setPreflop(hand);

function setPreflop(hand) {

    visible.push(hand[0]);
    visible.push(hand[1]);
    var miniScore = getMiniScore(visible);
    document.getElementById('card1').setAttribute("src", hand[0].filepath);
    document.getElementById('card2').setAttribute("src", hand[1].filepath);
    document.getElementById('flop1').setAttribute("src", "img/cards/back.png");
    document.getElementById('flop2').setAttribute("src", "img/cards/back.png");
    document.getElementById('flop3').setAttribute("src", "img/cards/back.png");
    document.getElementById('turn').setAttribute("src", "img/cards/back.png");
    document.getElementById('river').setAttribute("src", "img/cards/back.png");
    document.getElementById('textscore').innerHTML = miniScore.name;
    document.getElementById('btnpoker').innerHTML = "See Flop";
    document.getElementById('btnpoker').setAttribute('onclick', 'setFlop()');
}

function setFlop() {

    visible.push(hand[2]);
    visible.push(hand[3]);
    visible.push(hand[4]);
    var score = calculateScore(visible);
    document.getElementById('flop1').setAttribute("src", hand[2].filepath);
    document.getElementById('flop2').setAttribute("src", hand[3].filepath);
    document.getElementById('flop3').setAttribute("src", hand[4].filepath);
    document.getElementById('textscore').innerHTML = score.name;
    document.getElementById('btnpoker').innerHTML = "See Turn";
    document.getElementById('btnpoker').setAttribute('onclick', 'setTurn()');
}

function setTurn() {

    visible.push(hand[5]);
    var score = calculateScore(visible);
    document.getElementById('turn').setAttribute("src", hand[5].filepath);
    document.getElementById('textscore').innerHTML = score.name;
    document.getElementById('btnpoker').innerHTML = "See River";
    document.getElementById('btnpoker').setAttribute('onclick', 'setRiver()');
}

function setRiver() {
    var score = calculateScore(hand);
    document.getElementById('river').setAttribute("src", hand[6].filepath);
    document.getElementById('textscore').innerHTML = score.name;
    document.getElementById('btnpoker').innerHTML = "Restart";
    document.getElementById('btnpoker').setAttribute('onclick', 'document.location.reload()');
}




