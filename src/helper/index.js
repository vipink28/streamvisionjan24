//truncate string values

export const truncateText = (str = "", limit) => {
    if (str.length < limit) {
        return str
    } else {
        return str.slice(0, limit) + " ..."
    }
}

export const showYear = (dateString) => {
    let myDate = new Date(dateString);
    return myDate.getFullYear();
}


export const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}