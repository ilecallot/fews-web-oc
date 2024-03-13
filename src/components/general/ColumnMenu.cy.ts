import { ColumnItem } from './ColumnItem'
import ColumnMenu from './ColumnMenu.vue'

const items: ColumnItem[] = [
  {
    id: '1',
    name: 'Item 1',
    children: [
      {
        id: '1.1',
        name: 'Item 1.1',
      },
      {
        id: '1.2',
        name: 'Item 1.2',
      },
    ],
  },
  {
    id: '2',
    name: 'Item 2',
  },
  {
    id: '3',
    name: 'Item 3',
  },
]

describe('<ColumnMenu />', () => {
  it('should render root list with items', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ColumnMenu, { props: { items } })
    cy.get('[data-cy="column-menu--toolbar"]').should('exist')
    cy.get('[data-cy="column-menu--toolbar"]').should('have.text', '')
    cy.get('[data-cy="column-menu--window"]').should('exist')
    cy.get('[data-cy="column-menu--item"]').should('have.length', 3)
    cy.get('[data-cy="column-menu--item"]').should(
      'have.text',
      'Item 1Item 2Item 3',
    )
  })

  it('should render Item 1 children', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ColumnMenu, { props: { items, active: '1' } })
    cy.get('[data-cy="column-menu--toolbar"]').should('exist')
    cy.get('[data-cy="column-menu--toolbar"]').should('have.text', 'Item 1')
    cy.get('[data-cy="column-menu--window"]').should('exist')
    cy.get('[data-cy="column-menu--item"]').should('have.length', 2)
    cy.get('[data-cy="column-menu--item"]').should(
      'have.text',
      'Item 1.1Item 1.2',
    )
  })

  it('should open Item 1', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ColumnMenu, { props: { items } })
    cy.get('[data-cy="column-menu--window"]').should('exist')
    cy.get('[data-cy="column-menu--window-item"] > :nth-child(1)').click()
    cy.get('[data-cy="column-menu--window-item"] > *').should('have.length', 2)

    // cy.get('[data-cy="column-menu--window-item :nth-child(1)"]').children().should(
    //   'have.text',
    //   'Item 1Item 2Item 3',
    // )
    cy.get(
      '[data-cy="column-menu--window-item"] .v-window-item--active',
    ).should('have.text', 'Item 1.1Item 1.2')
  })
})
