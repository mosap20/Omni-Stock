import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col gap-6">
                        <Card className="overflow-hidden p-0">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <form className="p-6 md:p-8" onSubmit={submit}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">Create an account</h1>
                                            <p className="text-muted-foreground text-balance">
                                                Enter your details below to create your account
                                            </p>
                                        </div>
                                        
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                autoComplete="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                disabled={processing}
                                                placeholder="Mossaab sadki"
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                placeholder="mossaab@example.com"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                                placeholder="Create a password"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password_confirmation">Confirm password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                                placeholder="Confirm your password"
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        <Button type="submit" className="w-full" disabled={processing}>
                                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                            Create account
                                        </Button>
                                        
                                        <div className="text-center text-sm">
                                            Already have an account?{' '}
                                            <TextLink href={route('login')}>
                                                Log in
                                            </TextLink>
                                        </div>
                                    </div>
                                </form>
                                <div className="bg-muted relative hidden md:block">
                                    <img
                                        src="/images/67.jpeg"
                                        alt="Registration"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                            By clicking create account, you agree to our <a href="#">Terms of Service</a>{' '}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
