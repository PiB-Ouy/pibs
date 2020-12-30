class Card {

    constructor(id, color, value) {
        var temp = (10 * value) + color;
        this.id = id;
        this.color = color;
        this.value = value;
        this.filepath = "/img/cards/" + temp + ".png";
        this.name = this.getName();

    }

    getName() {
        var figure = "";
        var family = "";

        if (this.value == 2) {
            figure = "Deux";
        } else if (this.value == 3) {
            figure = "Trois";
        } else if (this.value == 4) {
            figure = "Quatre";
        } else if (this.value == 5) {
            figure = "Cinq";
        } else if (this.value == 6) {
            figure = "Six";
        } else if (this.value == 7) {
            figure = "Sept";
        } else if (this.value == 8) {
            figure = "Huit";
        } else if (this.value == 9) {
            figure = "Neuf";
        } else if (this.value == 10) {
            figure = "Dix";
        } else if (this.value == 11) {
            figure = "Valet";
        } else if (this.value == 12) {
            figure = "Dame";
        } else if (this.value == 13) {
            figure = "Roi";
        } else if (this.value == 14) {
            figure = "As";
        }

        if (this.color == 1) {
            family = "Trèfle";
        } else if (this.color == 2) {
            family = "Carreau";
        } else if (this.color == 3) {
            family = "Coeur";
        } else if (this.color == 4) {
            family = "Pique";
        }

        return figure + " de " + family;

    }
}


function createFullDeck52() {
    var deck = [];
    var i = 0;
    var j = 0;
    var id = 0;

    while (i < 4) {
        i++;
        j = 1;

        while (j < 14) {
            id++;
            j++;
            var card = new Card(id, i, j);
            deck.push(card)
        }
    }
    return deck;
}

function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

function dealhand(fulldeck, number) {
    var hand = [];
    for (var i = 0; i < number; i++) {
        hand.push(fulldeck[i]);
        fulldeck.splice(i, 1);
    }
    return hand;
}