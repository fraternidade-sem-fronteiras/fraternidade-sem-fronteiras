import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const ActivitiesController = () => import('#controllers/activities_controller')
const VolunteersController = () => import('#controllers/volunteers_controller')
const AssistedsController = () => import('#controllers/assisteds_controller')
const BenefitsController = () => import('#controllers/benefits_controller')
const ChildrenController = () => import('#controllers/children_controller')
const ContactsController = () => import('#controllers/contacts_controller')
const CountriesController = () => import('#controllers/countries_controller')
const DrugAssistedsController = () => import('#controllers/drug_assisteds_controller')
const DrugsController = () => import('#controllers/drugs_controller')
const GendersController = () => import('#controllers/genders_controller')
const IllnessAssistedsController = () => import('#controllers/illness_assisteds_controller')
const IllnessesController = () => import('#controllers/illnesses_controller')
const PermissionController = () => import('#controllers/permissions_controller')
const RoleController = () => import('#controllers/roles_controller')
const SchoolingsController = () => import('#controllers/schoolings_controller')
const StatesController = () => import('#controllers/states_controller')
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
      .only(['index', 'store', 'show', 'destroy'])
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
      .resource('countries', CountriesController)
      .only(['index', 'store', 'show', 'destroy'])
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
      .only(['index', 'store', 'show', 'destroy'])
      .use('*', middleware.auth())

    router.get('genders/:id/assisteds', [GendersController, 'getAssisteds']).use(middleware.auth())

    router
      .resource('assisted/illness', IllnessAssistedsController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('ilness', IllnessesController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router
      .resource('permissions', PermissionController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())
    router
      .get('permissions/:id/roles', [PermissionController, 'getRolesByPermission'])
      .use(middleware.auth())

    router
      .resource('roles', RoleController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())
    router
      .get('roles/:id/volunteers', [RoleController, 'getVolunteersByRole'])
      .use(middleware.auth())

    router.resource('schoolings', SchoolingsController).only(['index']).use('*', middleware.auth())

    router
      .get('schoolings/:id/assisteds', [SchoolingsController, 'getAssisteds'])
      .use(middleware.auth())

      router
      .resource('states', StatesController)
      .only(['index', 'store', 'show', 'destroy'])
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
      .group(() => {
        router.post('login', [VolunteersController, 'login'])
        router.post('logout', [VolunteersController, 'logout']).use(middleware.auth())
        router.get('profile', [VolunteersController, 'profile']).use(middleware.auth())
      })
      .prefix('volunteers')

    router
      .resource('volunteers', VolunteersController)
      .only(['index', 'store', 'show', 'update', 'destroy'])
      .use('*', middleware.auth())

    router.any('*', (ctx) => {
      return ctx.response
        .status(404)
        .json({ messages: ['Not Found'], error: 'NotFoundException', path: ctx.request.url() })
    })
  })
  .prefix('/api/v1')

router.on('*').render('app')
