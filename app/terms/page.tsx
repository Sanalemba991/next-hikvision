export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using this service, you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access the materials on Hikvision's website 
              for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our service for any unlawful purpose or to solicit others to 
              perform unlawful acts.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no case shall Hikvision, its directors, officers, employees, affiliates, agents, 
              contractors, or licensors be liable for any injury, loss, claim, or damages.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@hikvision.com" className="text-red-600 hover:text-red-700">
                legal@hikvision.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}