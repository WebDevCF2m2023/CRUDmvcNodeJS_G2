/**
 * Color is : "RED" | "GREEN" | "BLUE" | "ORANGE" | "PURPLE" | "LIGHTBLUE" | "GREY"
 * 
 * @param {string} color
 * @param {string} text to color
 * @param {boolean} surlign if the text must be surlign
 */
module.exports = function color(color, text, surlign = false){
    let coloredText = `\x1B[0;${surlign ? "4;" : ""}3`;
    switch(color){
        case "RED":
            coloredText += "1";
            break;
        case "GREEN":
            coloredText += "2";
            break;
        case "GOLD":
        case "ORANGE":
            coloredText += "3";
            break;
        case "BLUE":
            coloredText += "4";
            break;
        case "PURPLE":
            coloredText += "5";
            break;
        case "LIGHTBLUE":
            coloredText += "6";
            break;
        case "GREY":
            coloredText += "7";
            break;
    }
    coloredText += "m" + text + "\x1B[0m";
    return coloredText;
}