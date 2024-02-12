import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

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

router.named({
  auth: () => import('#middleware/authentication_middleware'),
})

router
  .group(() => {
    router
      .resource('activities', ActivitiesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('assisteds', AssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('benefits', BenefitsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('childs', ChildrenController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('contacts', ContactsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('assisted/drugs', DrugAssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('drugs', DrugsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('genders', GendersController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('assisted/illness', IllnessAssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('ilness', IllnessesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('marital-status', MaritalStatusesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('medicines', MedicinesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('activities/visits', VisitActivitiesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('visits', VisitsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('volunteers', VolunteersController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router.post('volunteers/login', [VolunteersController, 'login'])
    router.post('volunteers/logout', [VolunteersController, 'logout']).use(middleware.auth())
  })
  .prefix('/api/v1')

router.on('*').render('app')
