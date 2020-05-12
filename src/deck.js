function shuffle(array) {
    const _array = array.slice(0)

    for(let i = 0; i < array.length -1; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1))
        let temp = _array[i]

        _array[i] = _array[randomIndex];
        _array[randomIndex] = temp;
    }

    return _array

}

export default function initializeDeck() {
    let id = 0;
    const cards = ['ado-den-haag', 'ajax', 'az', 'fc-emmen', 'fc-groningen', 'fc-twente', 'fc-utrecht', 'feyenoord', 'fortuna-sittard', 'heracles', 'pec-zwolle', 'psv', 'rkc', 'sc-heerenveen', 'sparta', 'vitesse', 'vvv-venlo', 'willem-2'].reduce((acc, type) => {
        acc.push({
            id: id++,
            type
        })
        acc.push({
            id: id++,
            type
        })
        return acc
    }, [])

    return shuffle(cards)
}