import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signInStyles} from "../Styles/signInStyles";
import {SignInFormData, signInSchema} from "../services/signInSchema";

const formConfig = {
    resolver: zodResolver(signInSchema),
    defaultValues: {
        email: '',
        password: '',
    },
};

export const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm<SignInFormData>(formConfig as any);

    const onSubmit = async (data: SignInFormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

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
                        <label css={signInStyles.label} htmlFor="email">
                            Email / Username
                        </label>
                        <input
                            css={[signInStyles.input, errors.email && signInStyles.inputError]}
                            id="email"
                            type="text"
                            placeholder="Enter your email or username"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span css={signInStyles.errorText}>{errors.email.message}</span>
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

                    {/* Server Error */}
                    {/*{errors.root && (*/}
                    {/*    <div css={signInStyles.serverError}>*/}
                    {/*        {errors.root.message}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        css={[signInStyles.button, isSubmitting && signInStyles.buttonDisabled]}
                    >
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div css={signInStyles.linksContainer}>
                        <a href="/signup" css={signInStyles.link}>
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
