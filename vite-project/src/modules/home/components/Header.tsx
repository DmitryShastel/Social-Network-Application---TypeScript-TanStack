import {Link} from "@tanstack/react-router";
import {Button} from "../../../shared/ui/Button/Button";
import SignInStore from "../../../stores/signIn.store";
import {observer} from "mobx-react-lite";
import styled from "@emotion/styled";

const StyledHeader = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const SignUpButton = styled(NavButton)`
  background: #667eea;
  color: white;

  &:hover {
    background: #5a6fd8;
    border-color: #5a6fd8;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

export const Header = observer(() => {
    const {isLoggedIn, currentUser} = SignInStore;

    return (
        <StyledHeader>
            <HeaderContent>
                <Logo>MyBlog</Logo>
                <Nav>
                    {isLoggedIn ? (
                        <>
                            <NavButton to="/users/$userId" params={{userId: currentUser?.id || 1}}>
                                Profile
                            </NavButton>
                            <StyledButton title={'Log out'} onClick={() => SignInStore.signOut()}/>
                        </>
                    ) : (
                        <>
                            <NavButton to="/auth/login">Sign In</NavButton>
                            <SignUpButton to="/auth/register">Sign Up</SignUpButton>
                        </>
                    )}
                </Nav>
            </HeaderContent>
        </StyledHeader>
    );
});