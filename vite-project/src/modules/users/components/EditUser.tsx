import styled from '@emotion/styled';
import {Button} from '../../../shared/ui/Button/Button';
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "@tanstack/react-router";
import UserStore from "../../../stores/user.store";
import SignInStore from "../../../stores/signIn.store";

const EditContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const EditCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 0 0 2rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  background-clip: inherit;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #667eea;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  background: ${props => props.type === 'success'
          ? 'rgba(72, 187, 120, 0.1)'
          : 'rgba(245, 101, 101, 0.1)'};
  color: ${props => props.type === 'success'
          ? '#2e7d32'
          : '#d32f2f'};
  border: 1px solid ${props => props.type === 'success'
          ? 'rgba(72, 187, 120, 0.3)'
          : 'rgba(245, 101, 101, 0.3)'};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  backdrop-filter: blur(2px);
`;

export const EditUser = observer(() => {
    const {user, isLoading} = UserStore;
    const {isLoggedIn} = SignInStore
    const {userId} = useParams({from: '/users/$userId/edit'});
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        }
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (userId) {
            const id = parseInt(userId);
            UserStore.currentUser(id);
        }
    }, [userId]);

    useEffect(() => {

        if (!isLoggedIn) {
            router.navigate({to: '/'});
            return;
        }
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: {
                    address: user.address?.address || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    postalCode: user.address?.postalCode || '',
                    country: user.address?.country || ''
                }
            });
        }
    }, [user, isLoggedIn]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const result = await UserStore.updateUser(parseInt(userId), formData)

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: 'Profile updated successfully!'
                })
                setTimeout(() => {
                    router.navigate({to: '/users/$userId', params: {userId}})
                }, 2000)
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: result.error || 'Failed to update profile. Please try again.'
            });
        }
    };

    const handleCancel = () => {
        router.navigate({to: '/users/$userId', params: {userId}});
    };

    if (!user) {
        return (
            <EditContainer>
                <EditCard>
                    <div style={{textAlign: 'center', padding: '3rem'}}>
                        <p>Loading user data...</p>
                    </div>
                </EditCard>
            </EditContainer>
        );
    }

    return (
        <EditContainer>
            <EditCard>
                <Title>Edit Profile</Title>

                {message && (
                    <Message type={message.type}>
                        {message.text}
                    </Message>
                )}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Address</Label>
                        <Input
                            placeholder="Street address"
                            name="address.address"
                            value={formData.address.address}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                            <Input
                                placeholder="City"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                style={{flex: 1}}
                                disabled={isLoading}
                            />
                            <Input
                                placeholder="State"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                style={{flex: 1}}
                                disabled={isLoading}
                            />
                        </div>
                        <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
                            <Input
                                placeholder="Postal Code"
                                name="address.postalCode"
                                value={formData.address.postalCode}
                                onChange={handleChange}
                                style={{flex: 1}}
                                disabled={isLoading}
                            />
                            <Input
                                placeholder="Country"
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                                style={{flex: 1}}
                                disabled={isLoading}
                            />
                        </div>
                    </FormGroup>

                    <ButtonsContainer>
                        <Button
                            title="Save Changes"
                            type="submit"
                            disabled={isLoading}
                        />
                        <Button
                            title="Cancel"
                            onClick={handleCancel}
                            disabled={isLoading}
                        />
                    </ButtonsContainer>
                </Form>

                {isLoading && (
                    <LoadingOverlay>
                        <div>Saving changes...</div>
                    </LoadingOverlay>
                )}
            </EditCard>
        </EditContainer>
    );
});