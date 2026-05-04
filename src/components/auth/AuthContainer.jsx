import React, { useState } from 'react';
import { Button, Card, Input, Logo } from '../common';

const AuthContainer = ({ initialView = 'signin', onAuthSuccess, onNavigateHome }) => {
    const [view, setView] = useState(initialView);
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value });
        if (errors.email) setErrors({ ...errors, email: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email) {
            setErrors({ email: 'Email is required' });
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (view === 'signin') {
                onAuthSuccess();
            } else {
                setView('signin');
            }
        }, 1500);
    };

    return (
        <div className="cb-auth-page">
            <button onClick={onNavigateHome} className="cb-auth-corner" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Logo size={24} />
            </button>

            <div className="cb-auth-center">
                <Card className="cb-auth-card">
                    <div className="cb-auth-card-inner">
                        <h1 className="cb-auth-h1">
                            {view === 'signin' ? 'Sign in to Coinbase' : 'Create your account'}
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleEmailChange}
                                placeholder="Your email address"
                                error={errors.email}
                                className="cb-auth-field"
                            />

                            <Button className="cb-auth-primary" loading={isLoading}>
                                Continue
                            </Button>
                        </form>

                        {view === 'signin' && (
                            <>
                                <div className="cb-auth-or">OR</div>
                                <div className="cb-auth-provider-list">
                                    <button className="cb-auth-provider">
                                        <i className="bi bi-person cb-auth-provider-ic" />
                                        Sign in with Passkey
                                    </button>
                                    <button className="cb-auth-provider">
                                        <i className="bi bi-google cb-auth-provider-ic" />
                                        Sign in with Google
                                    </button>
                                    <button className="cb-auth-provider">
                                        <i className="bi bi-apple cb-auth-provider-ic" />
                                        Sign in with Apple
                                    </button>
                                </div>
                            </>
                        )}

                        <p className="cb-auth-bottom">
                            {view === 'signin' ? (
                                <>
                                    Don’t have an account?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setView('signup'); }}>
                                        Sign up
                                    </a>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <a href="#" onClick={(e) => { e.preventDefault(); setView('signin'); }}>
                                        Sign in
                                    </a>
                                </>
                            )}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuthContainer;
