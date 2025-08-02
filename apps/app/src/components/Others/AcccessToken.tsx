import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const STORAGE_KEY = 'TGGS-useAccessToken'

export default function AccessToken() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem(STORAGE_KEY))
  }, [])

  const copyToken = () => {
    if (!token) {
      alert('No access token found. Please request one.')
      return
    }
    navigator.clipboard.writeText(token)
    alert('Token copied to clipboard!')
  }

  const requestToken = () => {
    alert('Please request an access token from your admin or service.')
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">Your Access Token</Label>

      {token ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 border border-gray-200 rounded px-3 py-2 flex items-center">
            <span className="text-sm font-mono">{'•'.repeat(20)}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center px-4 py-2 h-auto"
            onClick={copyToken}
          >
            Copy
          </Button>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={requestToken}>
          Request Access Token
        </Button>
      )}
    </div>
  )
}
