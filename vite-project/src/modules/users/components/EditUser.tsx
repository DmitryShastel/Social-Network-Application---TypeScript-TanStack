import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "@tanstack/react-router";
import {Button} from '../../../shared/ui/Button/Button';
import UserStore from "../../../stores/user.store";
import SignInStore from "../../../stores/signIn.store";
import * as S from "../styles/editUser";

export const EditUser = observer(() => {
    const {user, isLoading} = UserStore;
    const {isLoggedIn} = SignInStore;
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
            const result = await UserStore.updateUser(parseInt(userId), formData);

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: 'Profile updated successfully!'
                });
                setTimeout(() => {
                    router.navigate({to: '/users/$userId', params: {userId}});
                }, 2000);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Failed to update profile. Please try again.'
            });
        }
    };

    const handleCancel = () => {
        router.navigate({to: '/users/$userId', params: {userId}});
    };

    const handelBack = () => {
        router.navigate({to: '/users/$userId', params: {userId}});
    }

    if (!user) {
        return (
            <S.EditContainer>
                <S.EditCard>
                    <S.LoadingText>
                        <p>Loading user data...</p>
                    </S.LoadingText>
                </S.EditCard>
            </S.EditContainer>
        );
    }

    return (
        <S.EditContainer>
            <Button title={'Back'} onClick={handelBack}/>
            <S.EditCard>
                <S.Title>Edit Profile</S.Title>

                {message && (
                    <S.Message type={message.type}>
                        {message.text}
                    </S.Message>
                )}

                <S.Form onSubmit={handleSubmit}>
                    <S.FormGroup>
                        <S.Label htmlFor="firstName">First Name *</S.Label>
                        <S.Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="lastName">Last Name *</S.Label>
                        <S.Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="email">Email *</S.Label>
                        <S.Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label htmlFor="phone">Phone</S.Label>
                        <S.Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>Address</S.Label>
                        <S.Input
                            placeholder="Street address"
                            name="address.address"
                            value={formData.address.address}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <S.AddressRow>
                            <S.AddressInput
                                placeholder="City"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <S.AddressInput
                                placeholder="State"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </S.AddressRow>
                        <S.AddressRow>
                            <S.AddressInput
                                placeholder="Postal Code"
                                name="address.postalCode"
                                value={formData.address.postalCode}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <S.AddressInput
                                placeholder="Country"
                                name="address.country"
                                value={formData.address.country}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </S.AddressRow>
                    </S.FormGroup>

                    <S.ButtonsContainer>
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
                    </S.ButtonsContainer>
                </S.Form>

                {isLoading && (
                    <S.LoadingOverlay>
                        <div>Saving changes...</div>
                    </S.LoadingOverlay>
                )}
            </S.EditCard>
        </S.EditContainer>
    );
});