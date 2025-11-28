import {homeStyles} from "../styles/homeStyles";
import {Link} from "@tanstack/react-router";
import {Button} from "../../../shared/ui/Button/Button";
import SignInStore from "../../../stores/signIn.store";
import {observer} from "mobx-react-lite";

export const Header = observer(() => {
    const {isLoggedIn} = SignInStore;

    return (
        <div>
            <header css={homeStyles.header}>
                <div css={homeStyles.headerContent}>
                    <h1 css={homeStyles.logo}>MyBlog</h1>
                    <nav css={homeStyles.nav}>
                        {isLoggedIn ? (
                            <>
                                <Link css={homeStyles.button} to="/profile/$userId"
                                      params={{userId: '1'}}>Profile</Link>
                                <Button title={'Log out'} onClick={() => SignInStore.signOut()}/>
                            </>
                        ) : (
                            <>
                                <Link css={homeStyles.button} to="/auth/login">Sign In</Link>
                                <Link css={homeStyles.button} to="/auth/register">Sign Up</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
});



