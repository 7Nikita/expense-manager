export function validateHEXColor(color) {
    for (const el of color) {
        if (el >= '0' && el <= '9') {
            continue;
        } else if (el >= 'a' && el <= 'f') {
            continue;
        } else {
            return false;
        }
    }
    return true;
}