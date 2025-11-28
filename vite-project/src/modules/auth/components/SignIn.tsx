import {useForm} from 'react-hook-form';
import {signInStyles} from "../styles/signInStyles";
import {SignInFormData, signInSchema} from "../services/signInSchema";
import {observer} from "mobx-react-lite";
import SignInStore from "../../../stores/signIn.store";
import {useRouter} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";


export const SignIn = observer(() => {
    //@ts-ignore
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: 'emilys',
            password: 'emilyspass',
        },
    });

    const router = useRouter()

    const onSubmit = async (data: SignInFormData) => {
        try {
            const success = await SignInStore.signIn(data.username, data.password)
            if (success) {
                await router.navigate({to: '/test'});
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
        <div css={signInStyles.container}>
            <div css={signInStyles.formContainer}>
                <h2 css={signInStyles.title}>Sign In</h2>

                <form onSubmit={handleSubmit(onSubmit)} css={signInStyles.form}>
                    <div css={signInStyles.fieldGroup}>
                        <label css={signInStyles.label} htmlFor="username">
                            Email / Username
                        </label>
                        <input
                            css={[signInStyles.input, errors.username && signInStyles.inputError]}
                            id="username"
                            type="text"
                            placeholder="Enter your email or username"
                            {...register('username')}
                        />
                        {errors.username && (
                            <span css={signInStyles.errorText}>{errors.username.message}</span>
                        )}
                    </div>

                    <div css={signInStyles.fieldGroup}>
                        <label css={signInStyles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            css={[signInStyles.input, errors.password && signInStyles.inputError]}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span css={signInStyles.errorText}>{errors.password.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        css={[signInStyles.button, isSubmitting && signInStyles.buttonDisabled]}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div css={signInStyles.linksContainer}>
                        <a href="/auth/register" css={signInStyles.link}>
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
});
