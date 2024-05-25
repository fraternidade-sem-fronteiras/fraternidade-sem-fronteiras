import edge from 'edge.js'
import env from './env.js'

/**
 * Define a global property
 */
edge.global('apiUrl', env.get('API_URL'))

JSON.stringify
