
class Score {
    constructor() {
        this.value1 = 0;
        this.value2 = 0;
        this.color = 0;
        this.kicker = 0;
        this.figure = 0;
        this.score = 0;
        this.name = "";

    }
}

function colorToString(c) {
    var colorStr = "";
    if (c == 0) {
        colorStr = "Trèfle";
    } else if (c == 1) {
        colorStr = "Carreau";
    } else if (c == 2) {
        colorStr = "Coeur";
    } else if (c == 3) {
        colorStr = "Pique";
    }
    return colorStr;
}

function valueToString(c) {
    var valueStr = "";
    if (c == 0) {
        valueStr = "Deux";
    } else if (c == 1) {
        valueStr = "Trois";
    } else if (c == 2) {
        valueStr = "Quatre";
    } else if (c == 3) {
        valueStr = "Cinq";
    } else if (c == 4) {
        valueStr = "Six";
    } else if (c == 5) {
        valueStr = "Sept";
    } else if (c == 6) {
        valueStr = "Huit";
    } else if (c == 7) {
        valueStr = "Neuf";
    } else if (c == 8) {
        valueStr = "Dix";
    } else if (c == 9) {
        valueStr = "Valet";
    } else if (c == 10) {
        valueStr = "Dame";
    } else if (c == 11) {
        valueStr = "Roi";
    } else if (c == 12) {
        valueStr = "As";
    }
    return valueStr;
}

function sortByValueDesc(hand) {
    hand.sort(function compare(a, b) {
        if (a.value > b.value)
            return -1;
        if (a.value < b.value)
            return 1;
        return 0;
    });
    return hand;
}

function getMiniScore(hand) {
    var score = new Score();
    if (hand[0].value == hand[1].value) {
        score.value1 = hand[0].value;
        score.name = "Paire de " + valueToString(score.value1 - 2);
    } else {
        if (hand[0].value > hand[1].value) {
            score.value1 = hand[0].value;
        } else {
            score.value1 = hand[1].value;
        }
        score.name = "Hauteur " + valueToString(score.value1 - 2);
    }

    return score;

}

function calculateScore(hand) {

    var flush = 0;
    var quint = 0;

    var valuesTab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var score = new Score();
    for (card of hand) {
        valuesTab[card.value - 2]++;
    }

    var tabOcc = [0, 0, 0, 0, 0];
    for (var i = 0; i < valuesTab.length; i++) {
        tabOcc[valuesTab[i]]++;
    }


    while (score.figure == 0) {

        if (tabOcc[4] > 0) {
            score.figure = 8;
            score.value1 = valuesTab.indexOf(4);
            break;

        } else if (tabOcc[3] >= 2) {
            score.figure = 7;
            var c = 0;
            for (var i = 12; i > 0; i--) {
                if (valuesTab[i] == 3) {
                    c++;
                    if (c == 1) {
                        score.value1 = i;
                    } else if (c == 2) {
                        score.value2 = i;
                    }
                }
            }
            break;

        } else if ((tabOcc[3] == 1) && (tabOcc[2] >= 1)) {
            score.figure = 7;
            var c = 0;
            var d = 0;
            for (var i = 12; i > 0; i--) {
                if (valuesTab[i] == 3) {
                    score.value1 = i;
                } else if ((valuesTab[i] == 2) && (c == 0)) {
                    score.value2 = i;
                    c++;
                }
            }
            break;

        } else if (tabOcc[3] == 1) {
            score.figure = 4;
            for (var i = 12; i > 0; i--) {
                if (valuesTab[i] == 3) {
                    score.value1 = i;
                } else if (valuesTab[i] == 1) {
                    score.kicker = score.kicker + i * Math.pow(10, -2 * d);
                    d++;
                }
            }
            break;

        } else if (tabOcc[2] == 2) {
            score.figure = 3;
            var c = 0;
            var d = 0;
            for (var i = 12; i > 0; i--) {
                if ((valuesTab[i] == 2) && (c == 0)) {
                    score.value1 = i;
                    c++;
                } else if ((valuesTab[i] == 2) && (c == 1)) {
                    score.value2 = i;
                    c++;
                } else if (valuesTab[i] == 1) {
                    score.kicker = score.kicker + i * Math.pow(10, -2 * d);
                    d++;
                }
            }
            break;

        } else if (tabOcc[2] == 1) {
            score.figure = 2;
            var d = 0;
            for (var i = 12; i > 0; i--) {
                if (valuesTab[i] == 2) {
                    score.value1 = i;
                } else if (valuesTab[i] == 1) {
                    score.kicker = score.kicker + i * Math.pow(10, -2 * d);
                    d++;
                }
            }
            break;

        } else {
            score.figure = 1;
            var d = -1;
            for (var i = 12; i > 0; i--) {
                if ((valuesTab[i] == 1) && (d < 0)) {
                    score.value1 = i;
                    d++;
                } else if ((valuesTab[i] == 1) && (d >= 0)) {
                    score.kicker = score.kicker + i * Math.pow(10, -2 * d);
                    d++;
                }
            }
        }
    }

    var colorsTab = [0, 0, 0, 0];
    for (card of hand) {
        colorsTab[card.color - 1]++;
    }
    for (var i = 0; i < 4; i++) {
        if (colorsTab[i] >= 5) {
            flush = 1;
            score.color = i;
            if (score.figure < 6) {
                score.figure = 6;
                score.kicker = 0;
                score.value2 = 0;
                hand = sortByValueDesc(hand);
                var c = -1;
                for (card of hand) {
                    if ((card.color == (i + 1)) && (c >= 0)) {
                        score.kicker = score.kicker + ((card.value - 2) / Math.pow(10, 2 * c));
                        c++;
                    } else if ((card.color == (i + 1)) && (c < 0)) {
                        score.value1 = (card.value - 2);
                        c++;
                    }
                }
            }
        }
    }

    if ((valuesTab[12] > 0) && (valuesTab[0] > 0) && (valuesTab[1] > 0) && (valuesTab[2] > 0) && (valuesTab[3] > 0)) {
        quint = 1;
        if (score.figure < 5) {
            score.figure = 5;
            score.value1 = 3;
        }

    }

    for (var i = 0; i < 9; i++) {
        if ((valuesTab[i] > 0) && (valuesTab[i + 1] > 0) && (valuesTab[i + 2] > 0) && (valuesTab[i + 3] > 0) && (valuesTab[i + 4] > 0)) {
            quint = 1;
            if (score.figure < 5) {
                score.figure = 5;
                score.value1 = i + 4;
            }
        }
    }

    if ((flush == 1) && (quint == 1)) {
        sameColorCards = []
        for (card of hand) {
            if (card.color == score.color + 1) {
                sameColorCards.push(card);
            }
        }
        sameColorCards = sortByValueDesc(sameColorCards);

        for (var i = 0; i < sameColorCards.length - 4; i++) {
            if (sameColorCards[i].value == sameColorCards[i + 1].value + 1) {
                if (sameColorCards[i + 1].value == sameColorCards[i + 2].value + 1) {
                    if (sameColorCards[i + 2].value == sameColorCards[i + 3].value + 1) {
                        if (sameColorCards[i + 3].value == sameColorCards[i + 4].value + 1) {
                            score.figure = 9;
                            score.value1 = i;
                            score.kicker = 0;
                        }
                    }
                }
            }
        }
    }

    score.score = score.figure * 1000000 + score.value1 * 10000 + score.value2 * 100 + score.kicker;

    if (score.figure == 9) {
        score.name = "Quint Flush à " + colorToString(score.color) + ", hauteur " + valueToString(score.value1);
    } else if (score.figure == 8) {
        score.name = "Carré de " + valueToString(score.value1);
    } else if (score.figure == 7) {
        score.name = "Full aux " + valueToString(score.value1) + " par les " + valueToString(score.value2);
    } else if (score.figure == 6) {
        score.name = "Couleur à " + colorToString(score.color) + ", hauteur " + valueToString(score.value1);
    } else if (score.figure == 5) {
        score.name = "Quinte, hauteur " + valueToString(score.value1);
    } else if (score.figure == 4) {
        score.name = "Brelan de " + valueToString(score.value1);
    } else if (score.figure == 3) {
        score.name = "Double paire de " + valueToString(score.value1) + " et de " + valueToString(score.value2);
    } else if (score.figure == 2) {
        score.name = "Paire de " + valueToString(score.value1);
    } else if (score.figure == 1) {
        score.name = "Hauteur " + valueToString(score.value1);
    }


    return score;
}

