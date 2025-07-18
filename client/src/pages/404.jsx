import React from 'react'
import { Link } from 'react-router-dom'

import { ForbiddenIcon } from '../icons'

function Page404() {
  return (
    <div className="flex flex-col items-center">
      <ForbiddenIcon className="w-12 h-12 mt-8 text-purple-200" aria-hidden="true" />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">404</h1>
      <p className="text-gray-700 dark:text-gray-300">
      Seite nicht gefunden. Überprüfen Sie die Adresse oder{' '}
        <Link className="text-purple-600 hover:underline dark:text-purple-300" to="/">
        zurückgehen
        </Link>
        .
      </p>
    </div>
  )
}

export default Page404