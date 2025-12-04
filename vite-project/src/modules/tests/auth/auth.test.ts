import {beforeEach, describe, expect, it} from 'vitest';
import SignInStore from "../../stores/signIn.store";

describe('SignInStore tests', () => {
    beforeEach(() => {
        SignInStore.isLoggedIn = false;
        SignInStore.currentUser = null;
    });

    it('first condition - not logged in', () => {
        expect(SignInStore.isLoggedIn).toBe(false)
        expect(SignInStore.currentUser).toBeNull();
    });
});