import filter from "lodash/filter";

/**
 * Функции, которые используются только в этом проекте.
 * Все функции, объявленные здесь, будут доступны во всем проекте как $n.example()
 */
export default {
    example() {
        console.log('This is example function')
    },
    errorsToArray(errors) {
        return $n.reduce(errors, (result, errors) => {
            result.push(errors[0])
            return result
        }, [])
    },
    applyMask(mask, value) {

        if (mask === 'phone') {
            const digits = value.replace(/[^0-9]/g, '')

            let formattedNumber = '+7';

            if (digits.length > 1) {
                formattedNumber += ' (' + digits.slice(1, 4);
            }

            if (digits.length >= 5) {
                formattedNumber += ') ' + digits.slice(4, 7);
            }

            if (digits.length >= 8) {
                formattedNumber += ' ' + digits.slice(7, 9);
            }

            if (digits.length >= 10) {
                formattedNumber += '-' + digits.slice(9, 11);
            }

            return formattedNumber
        }

        return value
    },
}
