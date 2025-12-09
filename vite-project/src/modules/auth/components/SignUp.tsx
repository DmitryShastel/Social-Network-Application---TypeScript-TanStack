import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as S from "../styles/signUp";
import {SignUpFormData, signUpSchema} from "../services/signUpSchema";

const formConfig = {
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        email: '',
        password: '',
        confirmPassword: ''
    },
};

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<SignUpFormData>(formConfig);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form data:', data);
        } catch (error) {
            setError('root', {
                message: 'An error occurred during sign up'
            });
        }
    };

    return (
        <S.Container>
            <S.FormContainer>
                <S.Title>Create Account</S.Title>

                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.FieldGroup>
                        <S.Label htmlFor="email">
                            Email
                        </S.Label>
                        <S.Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            hasError={!!errors.email}
                            {...register('email')}
                        />
                        {errors.email && (
                            <S.ErrorText>{errors.email.message}</S.ErrorText>
                        )}
                    </S.FieldGroup>

                    <S.FieldGroup>
                        <S.Label htmlFor="password">
                            Password
                        </S.Label>
                        <S.Input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            hasError={!!errors.password}
                            {...register('password')}
                        />
                        {errors.password && (
                            <S.ErrorText>{errors.password.message}</S.ErrorText>
                        )}
                    </S.FieldGroup>

                    <S.FieldGroup>
                        <S.Label htmlFor="confirmPassword">
                            Confirm Password
                        </S.Label>
                        <S.Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            hasError={!!errors.confirmPassword}
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <S.ErrorText>{errors.confirmPassword.message}</S.ErrorText>
                        )}
                    </S.FieldGroup>

                    <S.Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </S.Button>

                    <S.LinksContainer>
                        <S.Link to="/auth/login">
                            Already have an account? Sign in
                        </S.Link>
                    </S.LinksContainer>
                </S.Form>
            </S.FormContainer>
        </S.Container>
    );
};