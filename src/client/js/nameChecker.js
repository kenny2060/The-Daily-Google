function checkForName(inputText) {
    // Left this is beacuse I like it :), I'm a geek too
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if (names.includes(inputText)) {
        alert("Welcome, Captain!")
    }

    if (inputText.length == 0) {
        alert("It works 60% of the time...Everytime, if you put in something to search")
        return false
    }
    return true
}

export { checkForName }
