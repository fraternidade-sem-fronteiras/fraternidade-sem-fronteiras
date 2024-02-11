/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .resource('volunteers', 'VolunteersController')
      .only(['index', 'store', 'show', 'update', 'destroy'])
  })
  .prefix('/api/v1')

router.on('*').render('app')
