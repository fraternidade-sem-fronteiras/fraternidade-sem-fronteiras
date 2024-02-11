/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ActivitiesController = () => import('#controllers/activities_controller')
const VolunteersController = () => import('#controllers/volunteers_controller')
const AssistedsController = () => import('#controllers/assisteds_controller')
const BenefitsController = () => import('#controllers/benefits_controller')
const ChildrenController = () => import('#controllers/children_controller')
const ContactsController = () => import('#controllers/contacts_controller')
const DrugAssistedsController = () => import('#controllers/drug_assisteds_controller')
const DrugsController = () => import('#controllers/drugs_controller')
const GendersController = () => import('#controllers/genders_controller')
const IllnessAssistedsController = () => import('#controllers/illness_assisteds_controller')
const IllnessesController = () => import('#controllers/illnesses_controller')
const MaritalStatusesController = () => import('#controllers/marital_statuses_controller')
const MedicinesController = () => import('#controllers/medicines_controller')
const VisitActivitiesController = () => import('#controllers/visit_activities_controller')
const VisitsController = () => import('#controllers/visits_controller')

router
  .group(() => {
    router
      .resource('activities', ActivitiesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('assisteds', AssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('benefits', BenefitsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('childs', ChildrenController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('contacts', ContactsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('assisted/drugs', DrugAssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router.resource('drugs', DrugsController).only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('genders', GendersController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('assisted/illness', IllnessAssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('ilness', IllnessesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('marital-status', MaritalStatusesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('medicines', MedicinesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('activities/visits', VisitActivitiesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('visits', VisitsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])

    router
      .resource('volunteers', VolunteersController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
  })
  .prefix('/api/v1')

router.on('*').render('app')
