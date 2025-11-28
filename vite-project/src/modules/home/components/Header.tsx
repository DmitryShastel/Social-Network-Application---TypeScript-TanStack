import {homeStyles} from "../styles/homeStyles";
import {Link} from "@tanstack/react-router";
import {Button} from "../../../shared/ui/Button/Button";

export const Header = () => {

    return (
        <div>
            <header css={homeStyles.header}>
                <div css={homeStyles.headerContent}>
                    <h1 css={homeStyles.logo}>MyBlog</h1>
                    <nav css={homeStyles.nav}>
                        <Link css={homeStyles.button} to="/auth/login"> SigIn </Link>
                        <Link css={homeStyles.button} to="/auth/register">Sign Up</Link>
                        <Button title={'Log out'} onClick={() => {
                        }}/>
                    </nav>
                </div>
            </header>
        </div>
    );
};
