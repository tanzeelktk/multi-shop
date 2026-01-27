import React, { useState } from 'react'
import { Button, Label, TextInput, Checkbox, ToggleSwitch } from 'flowbite-react'

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
    newPassword: ''
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  })

  const [appearance, setAppearance] = useState('light')
  const [security, setSecurity] = useState({
    twoFA: false,
    loginAlerts: true
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
  }

  const handleSecurityChange = (e) => {
    const { name, checked } = e.target
    setSecurity(prev => ({ ...prev, [name]: checked }))
  }

  return (
    <section className="flex flex-col gap-8 p-5 text-gray-700">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Your Name"
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Your Email"
            />
          </div>
          <div>
            <Label htmlFor="password" value="Current Password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              placeholder="Current Password"
            />
          </div>
          <div>
            <Label htmlFor="newPassword" value="New Password" />
            <TextInput
              id="newPassword"
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleProfileChange}
              placeholder="New Password"
            />
          </div>
          <Button className="mt-3">Update Profile</Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="emailNotifications"
              name="email"
              checked={notifications.email}
              onChange={handleNotificationChange}
            />
            <Label htmlFor="emailNotifications" value="Email Notifications" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="smsNotifications"
              name="sms"
              checked={notifications.sms}
              onChange={handleNotificationChange}
            />
            <Label htmlFor="smsNotifications" value="SMS Notifications" />
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="flex items-center gap-5">
          <span className="font-semibold">Theme:</span>
          <ToggleSwitch
            checked={appearance === 'dark'}
            label={appearance === 'dark' ? 'Dark Mode' : 'Light Mode'}
            onChange={() => setAppearance(prev => prev === 'light' ? 'dark' : 'light')}
          />
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <ToggleSwitch
              checked={security.twoFA}
              label={security.twoFA ? '2FA Enabled' : 'Enable Two-Factor Authentication'}
              onChange={() => setSecurity(prev => ({ ...prev, twoFA: !prev.twoFA }))}
            />
          </div>
          <div className="flex items-center gap-3">
            <ToggleSwitch
              checked={security.loginAlerts}
              label={security.loginAlerts ? 'Login Alerts Enabled' : 'Enable Login Alerts'}
              onChange={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save All Settings</Button>
      </div>
    </section>
  )
}

export default Settings
