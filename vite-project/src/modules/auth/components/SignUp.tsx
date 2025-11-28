import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {signUpStyles} from "../styles/signUpStyles";
import {Link} from "@tanstack/react-router";
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
    } = useForm<signUpSchema>(formConfig as any);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            setError('root', {
                message: 'An error occurred during sign up'
            });
        }
    };

    return (
        <div css={signUpStyles.container}>
            <div css={signUpStyles.formContainer}>
                <h2 css={signUpStyles.title}>Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} css={signUpStyles.form}>
                    <div css={signUpStyles.fieldGroup}>
                        <label css={signUpStyles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            css={[signUpStyles.input, errors.email && signUpStyles.inputError]}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span css={signUpStyles.errorText}>{errors.email.message}</span>
                        )}
                    </div>

                    <div css={signUpStyles.fieldGroup}>
                        <label css={signUpStyles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            css={[signUpStyles.input, errors.password && signUpStyles.inputError]}
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            {...register('password')}
                        />
                        {errors.password && (
                            <span css={signUpStyles.errorText}>{errors.password.message}</span>
                        )}

                    </div>

                    <div css={signUpStyles.fieldGroup}>
                        <label css={signUpStyles.label} htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            css={[signUpStyles.input, errors.confirmPassword && signUpStyles.inputError]}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <span css={signUpStyles.errorText}>{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    {/* Server Error */}
                    {/*{errors.root && (*/}
                    {/*    <div css={signUpStyles.serverError}>*/}
                    {/*        {errors.root.message}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        css={[signUpStyles.button, isSubmitting && signUpStyles.buttonDisabled]}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div css={signUpStyles.linksContainer}>
                        <Link to="/auth/login" css={signUpStyles.link}>
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};