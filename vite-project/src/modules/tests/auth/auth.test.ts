import {beforeEach, describe, expect, it} from 'vitest';
import SignInStore from "../../../stores/signIn.store";


describe('SignInStore tests', () => {
    beforeEach(() => {
        SignInStore.isLoggedIn = false;
        SignInStore.currentUser = null;
    });

    it('first condition - not logged in', () => {
        expect(SignInStore.isLoggedIn).toBe(false)
        expect(SignInStore.currentUser).toBeNull();
    });
    it('signOut method - should clear auth state', () => {
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
            length: 0,
            key: vi.fn(),
        };

        vi.stubGlobal('localStorage', localStorageMock);

        SignInStore.isLoggedIn = true;
        SignInStore.currentUser = {id: 1};

        SignInStore.signOut();

        expect(SignInStore.isLoggedIn).toBe(false);
        expect(SignInStore.currentUser).toBeNull();
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    });
});