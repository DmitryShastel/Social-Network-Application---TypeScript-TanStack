import styled from '@emotion/styled';
import {Button} from '../../../shared/ui/Button/Button';

// Styled Components
const UserContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserDetails = styled.div`
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #667eea;
  min-width: 100px;
  margin-right: 1rem;
`;

const DetailValue = styled.span`
  color: #333;
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// дефолтная заглушка
const DEFAULT_AVATAR = '';

export const User = () => {
    //test temp data
    // const userData = {
    //     image: '',
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     address: '123 Main Street, New York, NY 10001',
    //     email: 'john.doe@example.com',
    //     phone: '+1 (555) 123-4567'
    // };

    const handleEdit = () => {
        console.log('Edit page is opened');
    };

    const handleShowUsers = () => {
        console.log('users list is opened');
    };

    return (
        <UserContainer>
            <UserCard>
                <UserHeader>
                    <UserImage
                        src={userData.image || DEFAULT_AVATAR}
                        alt={`${userData.firstName} ${userData.lastName}`}
                        onError={(e) => {
                            e.currentTarget.src = DEFAULT_AVATAR;
                        }}
                    />
                    <UserInfo>
                        <UserName>
                            {userData.firstName} {userData.lastName}
                        </UserName>
                    </UserInfo>
                </UserHeader>

                <UserDetails>
                    <DetailItem>
                        <DetailLabel>First Name:</DetailLabel>
                        <DetailValue>{userData.firstName}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Last Name:</DetailLabel>
                        <DetailValue>{userData.lastName}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Address:</DetailLabel>
                        <DetailValue>{userData.address}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Email:</DetailLabel>
                        <DetailValue>{userData.email}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Phone:</DetailLabel>
                        <DetailValue>{userData.phone}</DetailValue>
                    </DetailItem>
                </UserDetails>

                <ButtonsContainer>
                    <Button
                        title="Edit Profile"
                        onClick={handleEdit}
                    />
                    <Button
                        title="Show Users List"
                        onClick={handleShowUsers}
                    />
                </ButtonsContainer>
            </UserCard>
        </UserContainer>
    );
};
