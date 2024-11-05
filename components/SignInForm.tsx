import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

// Common Types
type FormStep = 'signin' | 'signup' | 'forgot-password' | 'create-password';

interface FormErrors {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

// Form Validation Functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

const validatePassword = (password: string) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return '';
};

const validateName = (name: string) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return '';
};

// Common Input Component
const FormInput = ({ 
  label, 
  type, 
  name, 
  value, 
  error, 
  onChange, 
  placeholder,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        type={showPassword ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Main Authentication Component
const AuthForms = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    resetToken: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: currentStep !== 'forgot-password' ? validatePassword(formData.password) : '',
      confirmPassword: currentStep === 'signup' || currentStep === 'create-password' 
        ? formData.password !== formData.confirmPassword 
          ? 'Passwords do not match' 
          : ''
        : '',
      name: currentStep === 'signup' ? validateName(formData.name) : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      switch (currentStep) {
        case 'signin':
          // Add signin API call
          console.log('Signing in:', { email: formData.email, password: formData.password });
          break;
        case 'signup':
          // Add signup API call
          console.log('Signing up:', { 
            email: formData.email, 
            password: formData.password,
            name: formData.name 
          });
          break;
        case 'forgot-password':
          // Add forgot password API call
          console.log('Password reset requested for:', formData.email);
          break;
        case 'create-password':
          // Add create new password API call
          console.log('Creating new password:', { 
            password: formData.password,
            resetToken: formData.resetToken 
          });
          break;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 'signin':
        return (
          <>
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              placeholder="Enter your password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep('forgot-password')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>
          </>
        );

      case 'signup':
        return (
          <>
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              placeholder="Create a password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
          </>
        );

      case 'forgot-password':
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </>
        );

      case 'create-password':
        return (
          <>
            <FormInput
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              placeholder="Create a new password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
            <FormInput
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        {currentStep !== 'signin' && (
          <button
            type="button"
            onClick={() => setCurrentStep('signin')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
        )}
        <h2 className="text-2xl font-bold text-gray-800">
          {currentStep === 'signin' && 'Sign In'}
          {currentStep === 'signup' && 'Sign Up'}
          {currentStep === 'forgot-password' && 'Forgot Password'}
          {currentStep === 'create-password' && 'Create New Password'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : (
            currentStep === 'signin' ? 'Sign In' :
            currentStep === 'signup' ? 'Sign Up' :
            currentStep === 'forgot-password' ? 'Send Reset Link' :
            'Update Password'
          )}
        </button>
      </form>

      {currentStep === 'signin' && (
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentStep('signup')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </button>
        </p>
      )}
    </div>
  );
};

export default AuthForms;