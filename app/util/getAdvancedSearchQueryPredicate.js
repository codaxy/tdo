import {getSearchQueryPredicate} from "cx/util";

export function getAdvancedSearchQueryPredicate(query) {
    if (!query) return () => true;

    let parts = query.split(/(\(|\)| +)/);

    let checks = {};

    let fstr = ["return "];
    let opExpected = false;

    for (let i = 0; i < parts.length; i++) {
        let p = parts[i];

        switch (p) {
            case '(':
                fstr.push(parts[i]);
                opExpected = false;
                break;

            case ')':
                fstr.push(parts[i]);
                opExpected = true;
                break;

            case 'AND':
            case "&&":
                fstr.push(" && ");
                opExpected = false;
                break;

            case "||":
            case 'OR':
                fstr.push(" || ");
                opExpected = false;
                break;

            case 'NOT':
                if (opExpected)
                    fstr.push(" && ");
                fstr.push("!");
                opExpected = false;
                break;

            default:
                let x = p.trim();
                if (x) {
                    if (opExpected)
                        fstr.push(" && ");
                    fstr.push(`check('${x}', q)`);
                    checks[x] = getSearchQueryPredicate(x);
                    opExpected = true;
                }
                break;
        }
    }

    if (fstr.length == 1)
        return () => true;

    function check(word, query) {
        return checks[word](query)
    }

    try {
        let fbody = fstr.join('');
        //console.log(fbody);
        return new Function('check', 'q', fbody).bind(null, check);
    }
    catch (err) {
        return getSearchQueryPredicate(query);
    }
}
