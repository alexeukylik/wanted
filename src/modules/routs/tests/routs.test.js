import test from 'ava';
import Routs from '../routs';

import Profile from 'Module/Balance/profile.jsx';

test('Should be correct datastructure', t => {
    t.plan(Routs.length * 4);

    Routs.forEach(item => {
        t.is('string' === typeof item.name, true);
        t.is('string' === typeof item.path, true);
        t.is('function' === typeof item.component, true);
        t.is(Object.values(item).length, 3);
    });
});

test('Balance route', t => {
    const expected = {
        name: 'profile',
        path: '/profile',
        component: Profile
    };

    const Route = Routs.find(route => expected.name === route.name);

    t.not(Route, undefined);
    t.deepEqual(Route, expected);
});
