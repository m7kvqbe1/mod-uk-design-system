import { before, cy, describe, it } from 'local-cypress'

import selectors from '../../selectors'

describe('ContextMenu (a11y)', () => {
  describe('with icons', () => {
    before(() => {
      cy.visit('/iframe.html?viewMode=story&id=context-menu--with-icons')

      cy.injectAxe()

      cy.get(selectors.contextMenu.target)
        .eq(0)
        .rightclick({ scrollBehavior: false })

      cy.get(selectors.contextMenu.menu).should('be.visible')
    })

    it('passes a11y checks', () => {
      cy.checkA11y('#root')
    })
  })
})
