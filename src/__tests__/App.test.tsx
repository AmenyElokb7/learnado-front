import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import App from '../App'

/**
 * @vitest-environment jsdom
 */

describe('App page', () => {
  it('renders page', () => {
    render(<App />)

    expect(screen.getByTestId('app-page')).toBeTruthy()
  })
})
