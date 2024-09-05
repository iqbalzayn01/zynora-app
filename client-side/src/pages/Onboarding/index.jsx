import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';

import { signin } from '../../redux/auth/action';

import CLogin from '../../components/CLogin';

export default function Onboarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newFormErrors = { email: false, password: false };
    if (!formData.email) newFormErrors.email = true;
    if (!formData.password) newFormErrors.password = true;
    setFormErrors(newFormErrors);
    if (Object.values(newFormErrors).some(Boolean)) {
      setIsLoading(false);
      return;
    }

    try {
      await dispatch(signin(formData));
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error login:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex items-center justify-center bg-image-onboarding w-full h-screen p-20">
      {error && (
        <p className="absolute top-0 right-0 left-0 text-red-500 text-center">
          {error}
        </p>
      )}
      {formErrors.email && (
        <p className="absolute top-0 right-0 left-0 bg-red-400 text-center text-white px-5 py-2 rounded-lg">
          Email harus diisi
        </p>
      )}
      {formErrors.password && (
        <p className="absolute top-0 right-0 left-0 bg-red-400 text-center text-white px-5 py-2 rounded-lg">
          Password wajib diisi
        </p>
      )}
      <div className="flex items-center">
        <CLogin
          valueEmail={formData.email}
          valuePassword={formData.password}
          isLoading={isLoading}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
