'use client';
import { useState } from 'react';


import { UserRole } from '@/utils/keelClient';
import styled, { keyframes } from 'styled-components';
import { Modal } from '@/components/Modal';
import { useKeel } from '@/utils/keelContext';

function HomePage() {
  const keel = useKeel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Customer);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await keel.api.mutations.authenticate({
        emailPassword: {
          email,
          password,
        },
        createIfNotExists: true,
      });

      if (response && response.data && response.data.token) {
        keel.client.setToken(response.data.token);
        setIsLoggedIn(true);
        setMessage('Logged in successfully!');
      } else {
        setMessage('Failed to log in' + response.error?.message);
      }
    } catch (error) {
      setMessage('Login error');
    }
  };

  const handleCreateUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await keel.api.mutations.createUser({ name: name, role: role });
      if (response && !response.error) {
        setMessage(`User ${response.data?.name} with a ${response.data?.role} role has been created successfully!`);
        setIsModalOpen(true);
      } else {
        setMessage('Failed to create user.' + response.error?.message);
      }
    } catch (error) {
      setMessage(`${error}`);
    }
  };

  const closeModalAndClearInput = () => {
    setIsModalOpen(false);
    setName('');
    setRole(UserRole.Customer);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Container>
          <form onSubmit={handleLogin}>
            <H2>Sign Up</H2>
            <div>
              <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
          {isModalOpen && <Modal message={message} onClose={() => setIsModalOpen(false)} />}
        </Container>
      ) : (
        <Container>
          <form onSubmit={handleCreateUser}>
            <H2>Create User</H2>
            <div>
              <label>
                Name
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div>
              <label>
                Role
                <Select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                  {Object.values(UserRole).map((roleValue) => (
                    <option key={roleValue} value={roleValue}>
                      {roleValue}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <div>
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </Container>
      )}
      {isModalOpen && <Modal message={message} onClose={closeModalAndClearInput} />}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  animation: ${slideIn} 0.5s ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid #4caf50;
  }
`;

const Message = styled.p`
  margin: 5px 0;
  animation: ${slideIn} 0.5s ease-in-out;
`;

const H2 = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  appearance: none; // this will remove the default arrow in some browsers
  animation: ${slideIn} 0.5s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.5);
  }

  option {
    color: #333;
    background-color: #fff;
  }
`;

export default HomePage;
