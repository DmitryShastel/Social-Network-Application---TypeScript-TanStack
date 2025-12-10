import {z} from 'zod';

export const signInSchema = z.object({
    username: z.string()
        .min(1, 'Username is required')
        .min(6, 'Username must be at least 6 characters')
        .regex(/^[A-Za-z]{6,}$/, 'Username must contain only letters')
        .refine(
            (val) => /[A-Z]/.test(val) && /[a-z]/.test(val),
            'Username must contain at least one uppercase and one lowercase letter'
        ),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
            'Password must contain at least one uppercase letter, one lowercase letter and one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?)'
        ),
});

export type SignInFormData = z.infer<typeof signInSchema>;


