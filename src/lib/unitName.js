import get from 'lodash/get'
import store from '@/store'

let unitSystems = {
    '1': { // Imperial
        oz: 'oz',
        ounce: 'ounce',
        ounces: 'ounces',
        in: 'in',
        inch: 'inch',
        inches: 'inches',
        ft: 'ft',
        foot: 'foot',
        feet: 'feet'
    },
    '2': { // Metric
        oz: 'g',
        ounce: 'gram',
        ounces: 'grams',
        in: 'mm',
        inch: 'millimeter',
        inches: 'millimeters',
        ft: 'm',
        foot: 'meter',
        feet: 'meters'
    }
}

export default (key) => {
    let unitSystemId = (get(store, 'state.user.units') || 1) + ''

    let unitSystem = unitSystems[unitSystemId] || unitSystems['1']

    return unitSystem[key] || key
}
