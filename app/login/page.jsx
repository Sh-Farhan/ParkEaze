'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter();

  const [aadhar, setAadhar] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({AadharCardNumber : aadhar,PhoneNumber: phone }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      setSuccess(true)
      router.push('/parking')
      // Handle successful login here (e.g., redirect, update state, etc.)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aadhar">Aadhar Card Number</Label>
            <Input
              id="aadhar"
              type="text"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
              placeholder="Enter your 12-digit Aadhar number"
              pattern="\d{12}"
              title="Please enter a valid 12-digit Aadhar number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter your phone number"
              pattern="\d{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-100 text-green-800 border-green-300">
              <AlertDescription>Login successful!</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm

