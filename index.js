let actionsArray = [];
let types = {};

export function getTypes() {
    return types;
}

export function setActionTypes(actions, mutateWith = ['Request', 'Error']) {
    if (!actionsArray.length) {
        actionsArray = Object.keys(actions);
        
        window = window || {};
        window.types = types = actionsArray.reduce((res, cur) => {
            res[cur] = cur;

            mutateWith.forEach(e => {
                var key = cur + e;
                res[key] = key;
            });

            return res;
        }, {});
    }

    return actionsArray;
}

export function simpleActions(actions, mutateWith) {
    let actionsArray = setActionTypes(actions, mutateWith);

    actionsArray.forEach(function(key) {
        let action = actions[key];
        actions[key] = function() {
            if (!action) {
                console.warn(`The action ${key} should return Object or Promise`);
                action = {};
            }

            if (action.type) {
                types[key] = action.type;
            }

            return Object.assign(action.apply(this, arguments), {
                type: action.type || key
            });
        };
    });

    return actions;
}