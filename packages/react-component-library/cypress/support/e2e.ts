import 'cypress-axe'
import 'cypress-plugin-tab'

import './commands'
import './assertions'
import consoleErrors from './consoleErrors'

consoleErrors.check()
