import {homeStyles} from "../styles/homeStyles";
import {Link} from "@tanstack/react-router";

export const Header = () => {
    
    return (
        <div>
            <header css={homeStyles.header}>
                <div css={homeStyles.headerContent}>
                    <h1 css={homeStyles.logo}>MyBlog</h1>
                    <nav css={homeStyles.nav}>
                        <Link css={homeStyles.button} to="/auth/signin"> SigIn </Link>
                        <button css={[homeStyles.button, homeStyles.signUpButton]}>Sign Up</button>
                    </nav>
                </div>
            </header>
        </div>
    );
};
