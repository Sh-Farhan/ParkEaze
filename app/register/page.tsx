// 'use client'

// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { AlertCircle } from 'lucide-react'

// export default function RegisterPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     name: '',
//     AadharCardNumberCardNumberCardNumber: '',
//     phone: '',
//     license: ''
//   })
//   const [errors, setErrors] = useState({
//     name: '',
//     AadharCardNumberCardNumber: '',
//     phone: '',
//     license: ''
//   })

//   const validateForm = () => {
//     let isValid = true
//     const newErrors = { name: '', AadharCardNumberCardNumber: '', phone: '', license: '' }

//     // Name validation
//     if (formData.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters long'
//       isValid = false
//     }

//     // AadharCardNumberCardNumber validation (12 digits)
//     if (!/^\d{12}$/.test(formData.AadharCardNumberCardNumber)) {
//       newErrors.AadharCardNumberCardNumber = 'AadharCardNumberCardNumber number must be 12 digits'
//       isValid = false
//     }

//     // Phone validation (10 digits, may start with +91)
//     if (!/^(\+91)?[6-9]\d{9}$/.test(formData.phone)) {
//       newErrors.phone = 'Enter a valid Indian phone number'
//       isValid = false
//     }

//     // Driving license validation (basic check for now)
//     if (formData.license.length < 8) {
//       newErrors.license = 'Driving license number is too short'
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (validateForm()) {
//       console.log('Form submitted:', formData)
//       // Here you would typically send the data to your backend
//       // For now, we'll just redirect to a success page
//       router.push('/register/success')
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Register for ParkEaze</CardTitle>
//           <CardDescription>Enter your details to create an account</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name (as per government ID)</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Enter your full legal name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               {errors.name && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.name}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="AadharCardNumberCardNumber">AadharCardNumberCardNumber Card Number</Label>
//               <Input
//                 id="AadharCardNumberCardNumber"
//                 name="AadharCardNumberCardNumber"
//                 type="text"
//                 placeholder="Enter 12 digit AadharCardNumberCardNumber number"
//                 value={formData.AadharCardNumberCardNumber}
//                 onChange={handleChange}
//               />
//               {errors.AadharCardNumberCardNumber && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.AadharCardNumberCardNumber}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               {errors.phone && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.phone}
//                 </p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="license">Driving License Number</Label>
//               <Input
//                 id="license"
//                 name="license"
//                 type="text"
//                 placeholder="Enter your driving license number"
//                 value={formData.license}
//                 onChange={handleChange}
//               />
//               {errors.license && (
//                 <p className="text-sm text-red-500 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {errors.license}
//                 </p>
//               )}
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="w-full">Register</Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    FullName: '',
    AadharCardNumber: '',
    PhoneNumber: '',
  })
  const [errors, setErrors] = useState({
    FullName: '',
    AadharCardNumber: '',
    PhoneNumber: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    let isValid = true
    const newErrors = { FullName: '', AadharCardNumber: '', PhoneNumber: '' }

    if (formData.FullName.trim().length < 2) {
      newErrors.FullName = 'Name must be at least 2 characters long'
      isValid = false
    }

    if (!/^\d{12}$/.test(formData.AadharCardNumber)) {
      newErrors.AadharCardNumber = 'Aadhar number must be 12 digits'
      isValid = false
    }

    if (!/^(\+91)?[6-9]\d{9}$/.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = 'Enter a valid Indian phone number'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const registerUser = async (userData) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      return await response.json()
    } catch (error) {
      throw new Error(error.message || 'An error occurred during registration')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setApiError('')
      try {
        await registerUser(formData)
        router.push('/register/success')
      } catch (error) {
        setApiError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Register for ParkEaze</CardTitle>
          <CardDescription>Enter your details to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="FullName">Full Name (as per government ID)</Label>
              <Input
                id="FullName"
                name="FullName"
                type="text"
                placeholder="Enter your full legal name"
                value={formData.FullName}
                onChange={handleChange}
              />
              {errors.FullName && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.FullName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="AadharCardNumber">Aadhar Card Number</Label>
              <Input
                id="AadharCardNumber"
                name="AadharCardNumber"
                type="text"
                placeholder="Enter 12 digit Aadhar number"
                value={formData.AadharCardNumber}
                onChange={handleChange}
              />
              {errors.AadharCardNumber && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.AadharCardNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="PhoneNumber">Phone Number</Label>
              <Input
                id="PhoneNumber"
                name="PhoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.PhoneNumber}
                onChange={handleChange}
              />
              {errors.PhoneNumber && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.PhoneNumber}
                </p>
              )}
            </div>
            {apiError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

