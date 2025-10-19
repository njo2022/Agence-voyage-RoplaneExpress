'use client'
import { useEffect, useState } from 'react'
import { emailConfig } from '@/lib/email-config'

export default function EmailJSTest() {
  const [emailjs, setEmailjs] = useState<any>(null)
  const [testResult, setTestResult] = useState<string>('')
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    // Charger EmailJS dynamiquement
    const loadEmailJS = async () => {
      try {
        const emailjsModule = await import('@emailjs/browser')
        setEmailjs(emailjsModule.default)
        setConfig(emailConfig)
        console.log('EmailJS chargé:', emailjsModule.default)
        console.log('Configuration:', emailConfig)
      } catch (error) {
        console.error('Erreur lors du chargement d\'EmailJS:', error)
        setTestResult('Erreur lors du chargement d\'EmailJS: ' + String(error))
      }
    }

    loadEmailJS()
  }, [])

  const testEmailJS = async () => {
    if (!emailjs) {
      setTestResult('EmailJS non chargé')
      return
    }

    setTestResult('Test en cours...')

    try {
      // Test avec des données simplifiées
      const testParams = {
        to_email: config.destinationEmail,
        from_name: 'Test User',
        from_email: 'test@example.com',
        phone: '123456789',
        destination: 'Paris',
        departure_date: '2024-01-15',
        return_date: '2024-01-20',
        travelers: '2',
        budget: '1000€',
        message: 'Test message depuis l\'application',
        reply_to: 'test@example.com'
      }

      console.log('Envoi du test avec:', testParams)
      console.log('Configuration utilisée:', {
        serviceId: config.serviceId,
        templateId: config.templateId,
        publicKey: config.publicKey ? config.publicKey.substring(0, 10) + '...' : 'manquant'
      })

      const result = await emailjs.send(
        config.serviceId,
        config.templateId,
        testParams,
        config.publicKey
      )

      console.log('Résultat du test:', result)
      setTestResult(`✅ Test réussi! Status: ${result.status}, Text: ${result.text}`)

    } catch (error) {
      console.error('Erreur lors du test:', error)
      console.error('Type d\'erreur:', typeof error)
      console.error('Détails:', JSON.stringify(error, null, 2))
      
      let errorMsg = '❌ Test échoué: '
      if (error instanceof Error) {
        errorMsg += error.message
      } else if (typeof error === 'object' && error !== null) {
        const errorObj = error as any
        if (errorObj.status) {
          errorMsg += `Status ${errorObj.status}: ${errorObj.text || 'Erreur inconnue'}`
        } else {
          errorMsg += 'Erreur d\'objet: ' + JSON.stringify(error)
        }
      } else {
        errorMsg += String(error)
      }
      
      setTestResult(errorMsg)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test EmailJS - Roplane Express</h1>
        
        {/* Configuration actuelle */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration actuelle</h2>
          {config ? (
            <div className="space-y-2 font-mono text-sm">
              <div>Service ID: <span className="text-blue-600">{config.serviceId}</span></div>
              <div>Template ID: <span className="text-blue-600">{config.templateId}</span></div>
              <div>Public Key: <span className="text-blue-600">{config.publicKey ? config.publicKey.substring(0, 10) + '...' : 'manquant'}</span></div>
              <div>Destination Email: <span className="text-blue-600">{config.destinationEmail}</span></div>
            </div>
          ) : (
            <div>Configuration en cours de chargement...</div>
          )}
        </div>

        {/* Status EmailJS */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Status EmailJS</h2>
          <div className="font-mono text-sm">
            Status: {emailjs ? '✅ Chargé' : '❌ Non chargé'}
          </div>
        </div>

        {/* Test */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Test d'envoi</h2>
          <button 
            onClick={testEmailJS}
            disabled={!emailjs}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Lancer le test
          </button>
          
          {testResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded border">
              <h3 className="font-semibold mb-2">Résultat:</h3>
              <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Vérifiez que votre service EmailJS est actif</li>
            <li>Vérifiez que le template existe et a les bonnes variables</li>
            <li>Vérifiez que la clé publique est correcte</li>
            <li>Ouvrez la console pour voir les logs détaillés</li>
          </ol>
        </div>
      </div>
    </div>
  )
}