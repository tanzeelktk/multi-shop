import React, { useState } from 'react';
import { Button, Label, TextInput, Modal, ToggleSwitch } from 'flowbite-react';

const Security = () => {
  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2FA State
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // Security Notifications
  const [notifyLogin, setNotifyLogin] = useState(true);
  const [notifyPasswordChange, setNotifyPasswordChange] = useState(true);

  // Modal for logout from all devices
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Dummy login activity data
  const loginActivity = [
    { device: 'Chrome on Windows', location: 'New York, USA', time: '2026-01-18 10:15' },
    { device: 'Firefox on Mac', location: 'London, UK', time: '2026-01-17 22:30' },
    { device: 'Safari on iPhone', location: 'Islamabad, PK', time: '2026-01-16 08:45' },
  ];

  // Handle password change
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) return alert('Passwords do not match!');
    // API call to update password here
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <section className='flex flex-col gap-8 p-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Security Settings</h1>

      {/* Password Change */}
      <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Change Password</h2>
        <div className='flex flex-col gap-3 md:flex-row md:gap-4'>
          <TextInput
            type='password'
            placeholder='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className='flex-1'
          />
          <TextInput
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='flex-1'
          />
          <TextInput
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='flex-1'
          />
          <Button onClick={handleChangePassword}>Update Password</Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Two-Factor Authentication (2FA)</h2>
        <div className='flex items-center justify-between'>
          <p>Enable 2FA for added account security</p>
          <ToggleSwitch
            checked={twoFAEnabled}
            onChange={() => setTwoFAEnabled(!twoFAEnabled)}
          />
        </div>
      </div>

      {/* Security Notifications */}
      <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Security Notifications</h2>
        <div className='flex flex-col md:flex-row md:gap-6'>
          <div className='flex items-center justify-between w-full'>
            <p>Notify on login from new device</p>
            <ToggleSwitch
              checked={notifyLogin}
              onChange={() => setNotifyLogin(!notifyLogin)}
            />
          </div>
          <div className='flex items-center justify-between w-full'>
            <p>Notify on password change</p>
            <ToggleSwitch
              checked={notifyPasswordChange}
              onChange={() => setNotifyPasswordChange(!notifyPasswordChange)}
            />
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>Login Activity</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-gray-600'>Device</th>
                <th className='px-4 py-2 text-gray-600'>Location</th>
                <th className='px-4 py-2 text-gray-600'>Time</th>
              </tr>
            </thead>
            <tbody>
              {loginActivity.map((login, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className='px-4 py-2'>{login.device}</td>
                  <td className='px-4 py-2'>{login.location}</td>
                  <td className='px-4 py-2'>{login.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          color="red"
          className="self-end"
          onClick={() => setLogoutModalOpen(true)}
        >
          Log out from all devices
        </Button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        show={logoutModalOpen}
        size="sm"
        onClose={() => setLogoutModalOpen(false)}
      >
        <Modal.Body className='text-center space-y-4'>
          <p className='font-semibold'>Log out from all devices?</p>
          <p className='text-sm text-gray-500'>
            This action will sign out your account from all devices.
          </p>
          <div className='flex justify-center gap-3'>
            <Button
              color="gray"
              onClick={() => setLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                alert("Logged out from all devices!");
                setLogoutModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>

    </section>
  );
};

export default Security;
