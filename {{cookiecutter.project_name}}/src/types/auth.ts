import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().nonempty('Please enter an email address.').min(6, 'Email address must be at least 6 characters.'),
    password: z
      .string()
      .nonempty('Please enter a password.')
      .min(6, 'Password must be at least 6 characters.')
      .max(30, 'Password must be at most 30 characters.'),
    confirmPassword: z.string().nonempty('Please confirm your password.')
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const signInSchema = z.object({
  login: z
    .string()
    .nonempty('Please enter a username or email address.')
    .min(6, 'Username or email address must be at least 6 characters.'),
  password: z
    .string()
    .nonempty('Please enter a password.')
    .min(6, 'Password must be at least 6 characters.')
    .max(30, 'Password must be at most 30 characters.')
})

export type SignUpRequest = z.infer<typeof signUpSchema>
export type SignInRequest = z.infer<typeof signInSchema>
