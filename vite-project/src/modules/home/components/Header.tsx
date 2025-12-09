import {observer} from 'mobx-react-lite';
import SignInStore from '../../../stores/signIn.store';
import * as S from '../styles/header';

export const Header = observer(() => {
    const {isLoggedIn, currentUser} = SignInStore;

    return (
        <S.StyledHeader>
            <S.HeaderContent>
                <S.Logo>MyBlog</S.Logo>
                <S.Nav>
                    {isLoggedIn ? (
                        <>
                            <S.NavButton
                                to="/users/$userId"
                                params={{userId: currentUser?.id || 1}}
                            >
                                Profile
                            </S.NavButton>
                            <S.NavButton
                                to="/message/$userId/"
                                params={{userId: currentUser?.id || 1}}
                            >
                                Messages
                            </S.NavButton>
                            <S.StyledLogoutButton
                                title="Log out"
                                onClick={() => SignInStore.signOut()}
                            />
                        </>
                    ) : (
                        <>
                            <S.NavButton to="/auth/login">Sign In</S.NavButton>
                            <S.SignUpButton to="/auth/register">Sign Up</S.SignUpButton>
                        </>
                    )}
                </S.Nav>
            </S.HeaderContent>
        </S.StyledHeader>
    );
});