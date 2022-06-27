import { mcD } from './data/mcd';
export const getPrices = (names, in_header, out_header) => {
    let toWrite = []
    for (const name of names) {
        let found = false
        for (const elem of mcD) {
            if (elem.name === name) {
                var obj = {}
                found = true
                let price = elem.price
                obj[in_header] = name
                obj[out_header] = price
                toWrite.push(obj)
            }

        } if (!found) {
            toWrite.push({
                in_header: name,
                out_header: 'not-found'
            })
        }

    }
    return toWrite
}