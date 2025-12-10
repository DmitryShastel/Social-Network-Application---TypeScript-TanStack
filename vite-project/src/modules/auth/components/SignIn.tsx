import {useForm} from 'react-hook-form';
import {observer} from "mobx-react-lite";
import SignInStore from "../../../stores/signIn.store";
import {useRouter} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignInFormData, signInSchema} from "../services/signInSchema";
import * as S from "../styles/signIn";

export const SignIn = observer(() => {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const router = useRouter()

    const onSubmit = async (data: SignInFormData) => {
        try {
            const success = await SignInStore.signIn(data.username, data.password)
            if (success) {
                await router.navigate({to: '/'});
            } else {
                setError('root', {
                    message: 'Invalid username or password'
                });
            }
        } catch (error) {
            setError('root', {
                message: 'An error occurred during sign in'
            });
        }
    };

    const handleTestLogin = async () => {

        try {
            const success = await SignInStore.signIn('emilys', 'emilyspass')
            if (success) {
                await router.navigate({to: '/'});
            } else {
                setError('root', {
                    message: 'Invalid username or password'
                });
            }
        } catch (error) {
            setError('root', {
                message: 'An error occurred during sign in'
            });
        }
    };

    return (
        <S.Container>
            <S.FormContainer>
                <S.Title>Sign In</S.Title>

                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <S.FieldGroup>
                        <S.Label htmlFor="username">
                            Email / Username
                        </S.Label>
                        <S.Input
                            id="username"
                            type="text"
                            placeholder="Enter your email or username"
                            hasError={!!errors.username}
                            {...register('username')}
                        />
                        {errors.username && (
                            <S.ErrorText>{errors.username.message}</S.ErrorText>
                        )}
                    </S.FieldGroup>

                    <S.FieldGroup>
                        <S.Label htmlFor="password">
                            Password
                        </S.Label>
                        <S.Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            hasError={!!errors.password}
                            {...register('password')}
                        />
                        {errors.password && (
                            <S.ErrorText>{errors.password.message}</S.ErrorText>
                        )}
                    </S.FieldGroup>

                    <S.Button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </S.Button>

                    <S.Button
                        type="button"
                        onClick={handleTestLogin}
                    >
                        Test Login
                    </S.Button>

                    <S.LinksContainer>
                        <S.Link href="/auth/register">
                            Don't have an account? Sign up
                        </S.Link>
                    </S.LinksContainer>
                </S.Form>
            </S.FormContainer>
        </S.Container>
    );
});